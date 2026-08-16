import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Trash2, Check, X } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminListingsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'pending' | 'active' | 'rejected' | 'all'>('pending');

  const load = () => {
    supabase.from('products').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setProducts(data || []));
  };

  useEffect(() => { load(); }, []);

  const toggleFeatured = async (id: string, current: boolean) => {
    await supabase.from('products').update({ featured: !current }).eq('id', id);
    toast.success(current ? 'Убрано из рекомендуемых' : 'Добавлено в рекомендуемые');
    load();
  };

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('products').update({ status }).eq('id', id);
    if (error) return toast.error(error.message);
    toast.success(status === 'active' ? 'Объявление одобрено' : 'Объявление отклонено');
    load();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) return toast.error(error.message);
    toast.success('Удалено');
    load();
  };

  const pendingCount = products.filter(p => (p.status || 'active') === 'pending').length;

  const filtered = products.filter(p => filter === 'all' || (p.status || 'active') === filter).filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Товары и объявления</h1>
        <span className="text-sm text-muted-foreground">{products.length} всего · {pendingCount} на проверке</span>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-4">
            {([['pending', `На проверке (${pendingCount})`], ['active', 'Опубликованные'], ['rejected', 'Отклонённые'], ['all', 'Все']] as const).map(([key, label]) => (
              <Button key={key} size="sm" variant={filter === key ? 'default' : 'outline'} onClick={() => setFilter(key as any)}>{label}</Button>
            ))}
          </div>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Поиск..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Цена</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Локация</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">{p.title}</TableCell>
                  <TableCell>{Number(p.price).toLocaleString()} ₸</TableCell>
                  <TableCell><Badge variant="secondary">{p.category_slug}</Badge></TableCell>
                  <TableCell>{p.location}</TableCell>
                  <TableCell>
                    <Badge variant={p.featured ? 'default' : 'outline'}>
                      {p.featured ? '⭐ Рекомендуемый' : p.status || 'active'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {(p.status || 'active') !== 'active' && (
                        <Button size="sm" variant="default" onClick={() => setStatus(p.id, 'active')}><Check className="w-4 h-4 mr-1" />Одобрить</Button>
                      )}
                      {(p.status || 'active') !== 'rejected' && (
                        <Button size="sm" variant="outline" onClick={() => setStatus(p.id, 'rejected')}><X className="w-4 h-4 mr-1" />Отклонить</Button>
                      )}
                      <Button size="sm" variant="ghost" onClick={() => toggleFeatured(p.id, !!p.featured)}>
                        {p.featured ? 'Убрать ⭐' : 'Рекомендовать'}
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove(p.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Нет товаров</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
