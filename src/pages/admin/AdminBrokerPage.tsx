import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Trash2, AlertTriangle, Shield, Handshake } from 'lucide-react';
import { toast } from 'sonner';

const statusLabels: Record<string, string> = {
  active: 'Активная', in_negotiation: 'В переговорах', completed: 'Завершена', cancelled: 'Отменена',
};

const statusColors: Record<string, string> = {
  active: 'bg-emerald-500/10 text-emerald-600', in_negotiation: 'bg-amber-500/10 text-amber-600',
  completed: 'bg-blue-500/10 text-blue-600', cancelled: 'bg-red-500/10 text-red-600',
};

export default function AdminBrokerPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => { fetchRequests(); }, []);

  async function fetchRequests() {
    const { data } = await supabase.from('broker_requests').select('*').order('created_at', { ascending: false });
    setRequests(data || []);
  }

  async function deleteRequest(id: string) {
    const { error } = await supabase.from('broker_requests').delete().eq('id', id);
    if (error) { toast.error('Ошибка удаления'); return; }
    toast.success('Заявка удалена');
    fetchRequests();
  }

  async function toggleFlag(id: string, current: boolean) {
    const { error } = await supabase.from('broker_requests').update({ is_flagged: !current } as any).eq('id', id);
    if (error) { toast.error('Ошибка'); return; }
    toast.success(current ? 'Флаг снят' : 'Заявка помечена');
    fetchRequests();
  }

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from('broker_requests').update({ status } as any).eq('id', id);
    if (error) { toast.error('Ошибка обновления'); return; }
    toast.success('Статус обновлён');
    fetchRequests();
  }

  const filtered = requests.filter(r => {
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    if (search) {
      const s = search.toLowerCase();
      return r.product_type?.toLowerCase().includes(s) || r.contact_name?.toLowerCase().includes(s) || r.location?.toLowerCase().includes(s);
    }
    return true;
  });

  const activeCount = requests.filter(r => r.status === 'active').length;
  const flaggedCount = requests.filter(r => r.is_flagged).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AgroBroker — Управление</h1>
        <p className="text-muted-foreground">Управление заявками покупателей и продавцов</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent className="pt-6 text-center">
          <div className="text-3xl font-bold">{requests.length}</div>
          <div className="text-sm text-muted-foreground">Всего заявок</div>
        </CardContent></Card>
        <Card><CardContent className="pt-6 text-center">
          <div className="text-3xl font-bold text-emerald-600">{activeCount}</div>
          <div className="text-sm text-muted-foreground">Активных</div>
        </CardContent></Card>
        <Card><CardContent className="pt-6 text-center">
          <div className="text-3xl font-bold text-amber-600">{flaggedCount}</div>
          <div className="text-sm text-muted-foreground">Помечены ⚠️</div>
        </CardContent></Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Поиск..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            <SelectItem value="active">Активные</SelectItem>
            <SelectItem value="in_negotiation">В переговорах</SelectItem>
            <SelectItem value="completed">Завершённые</SelectItem>
            <SelectItem value="cancelled">Отменённые</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Тип</TableHead>
              <TableHead>Продукт</TableHead>
              <TableHead>Кол-во</TableHead>
              <TableHead>Регион</TableHead>
              <TableHead>Контакт</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">Нет заявок</TableCell></TableRow>
            ) : filtered.map(r => (
              <TableRow key={r.id} className={r.is_flagged ? 'bg-destructive/5' : ''}>
                <TableCell>
                  <Badge variant="outline" className={r.request_type === 'sell' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-blue-500/10 text-blue-600'}>
                    {r.request_type === 'sell' ? 'Продажа' : 'Покупка'}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{r.product_type}</TableCell>
                <TableCell>{r.quantity}</TableCell>
                <TableCell>{r.location}</TableCell>
                <TableCell>{r.contact_name}</TableCell>
                <TableCell>
                  <Select value={r.status} onValueChange={v => updateStatus(r.id, v)}>
                    <SelectTrigger className="h-8 w-36"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Активная</SelectItem>
                      <SelectItem value="in_negotiation">В переговорах</SelectItem>
                      <SelectItem value="completed">Завершена</SelectItem>
                      <SelectItem value="cancelled">Отменена</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{new Date(r.created_at).toLocaleDateString('ru')}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleFlag(r.id, r.is_flagged)}>
                      <AlertTriangle className={`w-4 h-4 ${r.is_flagged ? 'text-amber-500' : 'text-muted-foreground'}`} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteRequest(r.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
