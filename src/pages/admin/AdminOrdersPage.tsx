import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const statusMap: Record<string, string> = {
  pending: 'Ожидание',
  active: 'Активна',
  completed: 'Завершена',
  cancelled: 'Отменена',
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('safe_deal_orders').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setOrders(data || []));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Безопасные сделки</h1>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map(o => (
                <TableRow key={o.id}>
                  <TableCell className="font-mono text-xs">{o.id.slice(0, 8)}...</TableCell>
                  <TableCell className="font-semibold">{Number(o.amount).toLocaleString()} ₸</TableCell>
                  <TableCell>
                    <Badge variant={o.status === 'completed' ? 'default' : 'secondary'}>
                      {statusMap[o.status] || o.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(o.created_at).toLocaleDateString('ru')}</TableCell>
                </TableRow>
              ))}
              {orders.length === 0 && (
                <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">Нет сделок</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
