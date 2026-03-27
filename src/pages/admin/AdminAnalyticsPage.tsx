import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['hsl(142,64%,38%)', 'hsl(200,70%,50%)', 'hsl(280,60%,55%)', 'hsl(30,80%,55%)', 'hsl(350,65%,50%)'];

export default function AdminAnalyticsPage() {
  const [catData, setCatData] = useState<any[]>([]);
  const [productsByDay, setProductsByDay] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data: cats } = await supabase.from('categories').select('name, count');
      setCatData((cats || []).filter(c => (c.count || 0) > 0).slice(0, 8));

      const { data: prods } = await supabase.from('products').select('created_at').order('created_at');
      const byDay: Record<string, number> = {};
      (prods || []).forEach(p => {
        const day = new Date(p.created_at).toLocaleDateString('ru');
        byDay[day] = (byDay[day] || 0) + 1;
      });
      setProductsByDay(Object.entries(byDay).slice(-14).map(([date, count]) => ({ date, count })));
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Аналитика</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Товары по дням</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={productsByDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Распределение по категориям</CardTitle></CardHeader>
          <CardContent>
            {catData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={catData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {catData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-muted-foreground py-12">Нет данных</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
