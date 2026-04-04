import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Loader2, Bot, RotateCcw, Sparkles, Plus, MessageSquare, ChevronLeft, Menu } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

type Msg = { role: 'user' | 'assistant'; content: string };

type ConversationMeta = {
  id: string;
  agent_type: string;
  created_at: string;
  updated_at: string;
  preview: string;
};

const CHAT_URL_MAP = {
  agro_pomoshnik: 'agro-pomoshnik',
  subsidiya_gid: 'subsidiya-gid',
};

const AGENT_NAMES: Record<string, Record<string, string>> = {
  agro_pomoshnik: { ru: 'АгроПомощник', en: 'AgroHelper', kz: 'АгроКөмекші', cn: '农业助手' },
  subsidiya_gid: { ru: 'СубсидияГид', en: 'SubsidyGuide', kz: 'СубсидияГид', cn: '补贴指南' },
};

export default function AIChatPage() {
  const { t, lang } = useLanguage();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const agentType = (searchParams.get('agent') || 'subsidiya_gid') as 'agro_pomoshnik' | 'subsidiya_gid';
  const agentName = AGENT_NAMES[agentType]?.[lang] || AGENT_NAMES[agentType]?.ru || 'AI';

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [conversations, setConversations] = useState<ConversationMeta[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load conversation history
  const loadConversations = useCallback(async () => {
    setLoadingHistory(true);
    try {
      const { data: convs, error } = await supabase
        .from('ai_conversations')
        .select('*')
        .eq('agent_type', agentType)
        .order('updated_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Failed to load conversations:', error);
        setConversations([]);
        setLoadingHistory(false);
        return;
      }

      if (convs && convs.length > 0) {
        // Try to get first user message for each conversation (non-blocking)
        const convIds = convs.map(c => c.id);
        const { data: firstMsgs } = await supabase
          .from('ai_messages')
          .select('conversation_id, content')
          .in('conversation_id', convIds)
          .eq('role', 'user')
          .order('created_at', { ascending: true });

        const previewMap: Record<string, string> = {};
        firstMsgs?.forEach(m => {
          if (!previewMap[m.conversation_id]) {
            previewMap[m.conversation_id] = m.content.slice(0, 60);
          }
        });

        setConversations(convs.map(c => ({
          ...c,
          preview: previewMap[c.id] || new Date(c.created_at).toLocaleDateString('ru'),
        })));
      } else {
        setConversations([]);
      }
    } catch (e) {
      console.error('Load conversations error:', e);
      setConversations([]);
    }
    setLoadingHistory(false);
  }, [agentType]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load a specific conversation
  const loadConversation = async (id: string) => {
    setConversationId(id);
    setError(null);
    const { data } = await supabase
      .from('ai_messages')
      .select('*')
      .eq('conversation_id', id)
      .order('created_at');
    setMessages(data?.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })) || []);
    if (isMobile) setSidebarOpen(false);
  };

  const startNewChat = () => {
    setConversationId(null);
    setMessages([]);
    setError(null);
    if (isMobile) setSidebarOpen(false);
  };

  const deleteConversation = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await supabase.from('ai_messages').delete().eq('conversation_id', id);
    await supabase.from('ai_conversations').delete().eq('id', id);
    if (conversationId === id) startNewChat();
    loadConversations();
  };

  const sendMessage = async (overrideText?: string) => {
    const text = overrideText || input.trim();
    if (!text || isLoading) return;
    setError(null);

    const userMsg: Msg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    let assistantSoFar = '';
    const allMessages = [...messages, userMsg];

    try {
      const functionName = CHAT_URL_MAP[agentType];
      const baseUrl = import.meta.env.VITE_SUPABASE_URL;
      const url = `${baseUrl}/functions/v1/${functionName}`;

      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: allMessages.map(m => ({ role: m.role, content: m.content })),
          conversationId,
        }),
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({ error: 'Unknown error' }));
        setError(resp.status === 429 ? 'Слишком много запросов.' : errData.error || 'Ошибка');
        setIsLoading(false);
        return;
      }

      const newConvId = resp.headers.get('X-Conversation-Id');
      if (newConvId) {
        setConversationId(newConvId);
        // Refresh sidebar after a short delay
        setTimeout(() => loadConversations(), 1000);
      }

      const reader = resp.body!.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';

      const upsertAssistant = (chunk: string) => {
        assistantSoFar += chunk;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant') {
            return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
          }
          return [...prev, { role: 'assistant', content: assistantSoFar }];
        });
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });
        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) upsertAssistant(content);
          } catch { break; }
        }
      }

      // Refresh conversations list
      setTimeout(() => loadConversations(), 500);
    } catch (e) {
      console.error('Chat error:', e);
      setError('Не удалось отправить сообщение.');
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = agentType === 'subsidiya_gid'
    ? ['Какие субсидии есть?', 'Как подать заявку?', 'Документы для субсидий']
    : ['Как продать товар?', 'Какие категории есть?', 'Помоги найти технику'];

  return (
    <div className="h-screen flex bg-background pt-16">
      {/* Sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      {sidebarOpen && (
        <aside
          className={`${isMobile ? 'fixed z-50 top-16 bottom-0 left-0' : 'relative'} w-72 bg-card border-r border-border flex flex-col`}
        >
          <div className="p-3 border-b border-border">
            <button
              onClick={startNewChat}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              {t?.aiChat?.newChat || 'Новый чат'}
            </button>
          </div>

          {/* Agent switcher */}
          <div className="p-3 border-b border-border flex gap-2">
            {(['subsidiya_gid', 'agro_pomoshnik'] as const).map(at => (
              <button
                key={at}
                onClick={() => {
                  navigate(`/ai-chat?agent=${at}`);
                  startNewChat();
                }}
                className={`flex-1 text-xs py-2 px-2 rounded-lg transition-colors font-medium ${
                  agentType === at ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                {AGENT_NAMES[at]?.[lang] || at}
              </button>
            ))}
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {loadingHistory ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              </div>
            ) : conversations.length === 0 ? (
              <p className="text-center text-xs text-muted-foreground py-8">
                {t?.aiChat?.noHistory || 'Нет истории'}
              </p>
            ) : (
              conversations.map(c => (
                <button
                  key={c.id}
                  onClick={() => loadConversation(c.id)}
                  className={`w-full text-left group flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    conversationId === c.id ? 'bg-primary/10 text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span className="truncate flex-1">{c.preview}</span>
                  <button
                    onClick={(e) => deleteConversation(c.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 hover:text-destructive transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </button>
              ))
            )}
          </div>
        </aside>
      )}

      {/* Main chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="h-14 border-b border-border flex items-center gap-3 px-4 bg-card/50 backdrop-blur-sm shrink-0">
          <button onClick={() => setSidebarOpen(prev => !prev)} className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
            {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{agentName}</p>
            <p className="text-xs text-muted-foreground">
              {isLoading ? (t?.aiChat?.typing || 'Печатает...') : (t?.aiChat?.online || 'Онлайн')}
            </p>
          </div>
          {messages.length > 0 && (
            <button onClick={startNewChat} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all">
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-2">{agentName}</h2>
                <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
                  {agentType === 'subsidiya_gid'
                    ? (t?.aiChat?.subsidyDesc || 'Помогу найти субсидии и гранты')
                    : (t?.aiChat?.agroDesc || 'Помогу с навигацией по маркетплейсу')}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(s)}
                      className="px-4 py-2.5 rounded-xl text-sm border border-border/50 bg-card hover:bg-muted/50 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, j) => (
              <div key={j} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-muted/50 border border-border/30 rounded-bl-md'
                }`}>
                  {msg.role === 'assistant' ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:mb-1.5 [&>p:last-child]:mb-0">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : msg.content}
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-muted/50 border border-border/30 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="text-center text-destructive text-xs py-2 bg-destructive/5 rounded-lg px-3">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border bg-card/50 backdrop-blur-sm px-4 py-3">
          <form
            onSubmit={e => { e.preventDefault(); sendMessage(); }}
            className="max-w-3xl mx-auto flex gap-2"
          >
            <textarea
              ref={inputRef}
              placeholder={t?.aiChat?.placeholder || 'Введите сообщение...'}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              disabled={isLoading}
              rows={1}
              className="flex-1 px-4 py-3 rounded-xl border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 resize-none"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all disabled:opacity-40 shadow-md self-end"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
