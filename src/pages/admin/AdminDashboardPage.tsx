import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShoppingBag, MessageSquare, ShieldCheck, TrendingUp, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    users: 0, products: 0, conversations: 0, orders: 0, categories: 0, inquiries: 0
  });
  const [recentProducts, setRecentProducts] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const [u, p, c, o, cat, inq, recent] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('ai_conversations').select('id', { count: 'exact', head: true }),
        supabase.from('safe_deal_orders').select('id', { count: 'exact', head: true }),
        supabase.from('categories').select('id', { count: 'exact', head: true }),
        supabase.from('inquiries').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('*').order('created_at', { ascending: false }).limit(5),
      ]);
      setStats({
        users: u.count || 0,
        products: p.count || 0,
        conversations: c.count || 0,
        orders: o.count || 0,
        categories: cat.count || 0,
        inquiries: inq.count || 0,
      });
      setRecentProducts(recent.data || []);
    };
    load();
  }, []);

  const statCards = [
    { label: 'Пользователи', value: stats.users, icon: Users, color: 'text-blue-500' },
    { label: 'Товары', value: stats.products, icon: ShoppingBag, color: 'text-green-500' },
    { label: 'AI Диалоги', value: stats.conversations, icon: MessageSquare, color: 'text-purple-500' },
    { label: 'Сделки', value: stats.orders, icon: ShieldCheck, color: 'text-orange-500' },
    { label: 'Категории', value: stats.categories, icon: Package, color: 'text-cyan-500' },
    { label: 'Заявки', value: stats.inquiries, icon: TrendingUp, color: 'text-pink-500' },
  ];

  const chartData = statCards.map(s => ({ name: s.label, value: s.value }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Дашборд</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map(s => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <s.icon className={`w-8 h-8 ${s.color}`} />
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Обзор данных</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Последние товары</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentProducts.map(p => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{p.title}</p>
                    <p className="text-xs text-muted-foreground">{p.location}</p>
                  </div>
                  <span className="text-sm font-semibold">{Number(p.price).toLocaleString()} ₸</span>
                </div>
              ))}
              {recentProducts.length === 0 && <p className="text-sm text-muted-foreground">Нет товаров</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
