import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AdminAIPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('ai_conversations').select('*').order('updated_at', { ascending: false }).limit(50)
      .then(({ data }) => setConversations(data || []));
  }, []);

  const openMessages = async (id: string) => {
    setSelectedId(id);
    const { data } = await supabase.from('ai_messages')
      .select('*')
      .eq('conversation_id', id)
      .order('created_at');
    setMessages(data || []);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">AI Агенты — Диалоги</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {['agro_pomoshnik', 'subsidiya_gid'].map(agent => {
          const count = conversations.filter(c => c.agent_type === agent).length;
          return (
            <Card key={agent}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{agent === 'agro_pomoshnik' ? 'АгроПомощник' : 'СубсидияГид'}</p>
                  <p className="text-sm text-muted-foreground">{count} диалогов</p>
                </div>
                <Badge>{agent}</Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Последние диалоги</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Агент</TableHead>
                <TableHead>Язык</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Действие</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conversations.map(c => (
                <TableRow key={c.id}>
                  <TableCell><Badge variant="secondary">{c.agent_type}</Badge></TableCell>
                  <TableCell>{c.language}</TableCell>
                  <TableCell>{new Date(c.created_at).toLocaleString('ru')}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => openMessages(c.id)}
                      className="text-sm text-primary hover:underline"
                    >
                      Просмотр
                    </button>
                  </TableCell>
                </TableRow>
              ))}
              {conversations.length === 0 && (
                <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">Нет диалогов</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selectedId} onOpenChange={() => setSelectedId(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Сообщения диалога</DialogTitle></DialogHeader>
          <ScrollArea className="max-h-[400px]">
            <div className="space-y-3 p-1">
              {messages.map(m => (
                <div key={m.id} className={`p-3 rounded-lg text-sm ${
                  m.role === 'user' ? 'bg-accent ml-8' : 'bg-primary/10 mr-8'
                }`}>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    {m.role === 'user' ? 'Пользователь' : 'AI'}
                  </p>
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              ))}
              {messages.length === 0 && <p className="text-center text-muted-foreground py-4">Нет сообщений</p>}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
