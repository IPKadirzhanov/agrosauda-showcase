import { useState, useEffect } from 'react';
import { Film, Eye, Heart, Trash2, Shield, ShieldOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Short {
  id: string;
  title: string;
  video_url: string;
  views_count: number;
  likes_count: number;
  comments_count: number;
  status: string;
  created_at: string;
  author_name?: string;
}

export default function AdminShortsPage() {
  const [shorts, setShorts] = useState<Short[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchShorts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('agro_shorts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!data) { setLoading(false); return; }

    const userIds = [...new Set(data.map(s => s.user_id))];
    const { data: profiles } = await supabase.from('profiles').select('user_id, display_name').in('user_id', userIds);
    const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);

    setShorts(data.map(s => ({ ...s, author_name: profileMap.get(s.user_id)?.display_name || 'User' })));
    setLoading(false);
  };

  useEffect(() => { fetchShorts(); }, []);

  const totalViews = shorts.reduce((s, v) => s + v.views_count, 0);
  const totalLikes = shorts.reduce((s, v) => s + v.likes_count, 0);

  const handleBlock = async (id: string, current: string) => {
    const newStatus = current === 'blocked' ? 'active' : 'blocked';
    await supabase.from('agro_shorts').update({ status: newStatus }).eq('id', id);
    toast.success(newStatus === 'blocked' ? 'Видео заблокировано' : 'Видео разблокировано');
    fetchShorts();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('agro_shorts').delete().eq('id', id);
    toast.success('Видео удалено');
    fetchShorts();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">AgroShorts</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Film, label: 'Всего видео', value: shorts.length },
          { icon: Eye, label: 'Всего просмотров', value: totalViews },
          { icon: Heart, label: 'Всего лайков', value: totalLikes },
        ].map(stat => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <stat.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-4 font-medium">Видео</th>
                <th className="text-left p-4 font-medium">Автор</th>
                <th className="text-center p-4 font-medium">Просмотры</th>
                <th className="text-center p-4 font-medium">Лайки</th>
                <th className="text-center p-4 font-medium">Статус</th>
                <th className="text-right p-4 font-medium">Действия</th>
              </tr>
            </thead>
            <tbody>
              {shorts.map(s => (
                <tr key={s.id} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-10 bg-muted rounded overflow-hidden shrink-0">
                        <video src={s.video_url} className="w-full h-full object-cover" muted preload="metadata" />
                      </div>
                      <span className="font-medium truncate max-w-[200px]">{s.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{s.author_name}</td>
                  <td className="p-4 text-center">{s.views_count}</td>
                  <td className="p-4 text-center">{s.likes_count}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.status === 'active' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                      {s.status === 'active' ? 'Активный' : 'Заблокирован'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleBlock(s.id, s.status)}>
                        {s.status === 'blocked' ? <ShieldOff className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)} className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && <div className="p-8 text-center text-muted-foreground">Загрузка...</div>}
        {!loading && shorts.length === 0 && <div className="p-8 text-center text-muted-foreground">Нет видео</div>}
      </div>
    </div>
  );
}
