import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, X, Bot, RotateCcw, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

type Msg = { role: 'user' | 'assistant'; content: string };

interface AIChatWidgetProps {
  agentType: 'agro_pomoshnik' | 'subsidiya_gid';
  agentName: string;
  placeholder?: string;
  className?: string;
  accentColor?: string;
  suggestions?: string[];
}

const CHAT_URL_MAP = {
  agro_pomoshnik: 'agro-pomoshnik',
  subsidiya_gid: 'subsidiya-gid',
};

export default function AIChatWidget({
  agentType,
  agentName,
  placeholder = 'Задайте вопрос...',
  className = '',
  suggestions = [],
}: AIChatWidgetProps) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
        if (resp.status === 429) {
          setError('Слишком много запросов. Подождите немного.');
        } else if (resp.status === 402) {
          setError('Сервис временно недоступен.');
        } else {
          setError(errData.error || 'Произошла ошибка');
        }
        setIsLoading(false);
        return;
      }

      const newConvId = resp.headers.get('X-Conversation-Id');
      if (newConvId) setConversationId(newConvId);

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
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      if (textBuffer.trim()) {
        for (let raw of textBuffer.split('\n')) {
          if (!raw) continue;
          if (raw.endsWith('\r')) raw = raw.slice(0, -1);
          if (!raw.startsWith('data: ')) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch { /* ignore */ }
        }
      }
    } catch (e) {
      console.error('Chat error:', e);
      setError('Не удалось отправить сообщение. Попробуйте ещё раз.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setConversationId(null);
    setError(null);
  };

  return (
    <div className={`rounded-2xl overflow-hidden flex flex-col border border-border/50 bg-card/80 backdrop-blur-sm shadow-xl ${className}`}>
      {/* Header */}
      <div className="px-5 py-4 border-b border-border/50 flex items-center gap-3 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-primary border-2 border-card animate-pulse" />
        </div>
        <div className="flex-1">
          <span className="text-sm font-semibold">{agentName}</span>
          <p className="text-xs text-muted-foreground">
            {isLoading ? 'Печатает...' : 'Онлайн'}
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={resetChat}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            title="Новый чат"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="p-5 space-y-4 min-h-[280px] max-h-[420px] overflow-y-auto scrollbar-thin">
        <AnimatePresence mode="popLayout">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <p className="text-sm font-medium mb-1">Привет! Я {agentName}</p>
              <p className="text-xs text-muted-foreground mb-5">Задайте мне вопрос или выберите тему ниже</p>
              {suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(s)}
                      className="px-3 py-1.5 rounded-full text-xs border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {messages.map((msg, j) => (
            <motion.div
              key={j}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center mr-2 mt-1 shrink-0">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                </div>
              )}
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-md shadow-md'
                  : 'bg-muted/70 border border-border/30 rounded-bl-md'
              }`}>
                {msg.role === 'assistant' ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:mb-1.5 [&>p:last-child]:mb-0 [&>ul]:mt-1 [&>ol]:mt-1 [&>h3]:text-sm [&>h3]:font-semibold [&>h3]:mt-2 [&>h3]:mb-1">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center mr-2 mt-1 shrink-0">
              <Bot className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="bg-muted/70 border border-border/30 px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex gap-1.5 items-center">
                <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-destructive text-xs py-2 bg-destructive/5 rounded-lg px-3">
            {error}
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-2 border-t border-border/30">
        <form onSubmit={e => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-xl border border-border/50 bg-background/80 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 disabled:opacity-50 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all disabled:opacity-40 shadow-md hover:shadow-lg"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </div>
  );
}
