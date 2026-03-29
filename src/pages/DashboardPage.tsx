import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  User, Package, Heart, MessageSquare, Shield, Clock,
  LogOut, Edit3, Save, X, ChevronRight, ShoppingBag, Plus
} from 'lucide-react';

type Tab = 'profile' | 'listings' | 'favorites' | 'messages' | 'deals' | 'activity';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'profile', label: 'Профиль', icon: User },
  { id: 'listings', label: 'Мои объявления', icon: Package },
  { id: 'favorites', label: 'Избранное', icon: Heart },
  { id: 'messages', label: 'Сообщения', icon: MessageSquare },
  { id: 'deals', label: 'Безопасные сделки', icon: Shield },
  { id: 'activity', label: 'Активность', icon: Clock },
];

export default function DashboardPage() {
  const { user, profile, signOut, refreshProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [myProducts, setMyProducts] = useState<any[]>([]);
  const [myFavorites, setMyFavorites] = useState<any[]>([]);
  const [myInquiries, setMyInquiries] = useState<any[]>([]);
  const [myDeals, setMyDeals] = useState<any[]>([]);

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth', { replace: true });
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    // Fetch user data
    supabase.from('products').select('*').eq('seller_user_id', user.id).order('created_at', { ascending: false }).then(r => setMyProducts(r.data || []));
    supabase.from('favorites').select('*, products(*)').eq('user_id', user.id).then(r => setMyFavorites(r.data || []));
    supabase.from('inquiries').select('*, products(title)').eq('sender_id', user.id).order('created_at', { ascending: false }).then(r => setMyInquiries(r.data || []));
    supabase.from('safe_deal_orders').select('*, products(title)').or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`).order('created_at', { ascending: false }).then(r => setMyDeals(r.data || []));
  }, [user]);

  useEffect(() => {
    if (profile) {
      setEditName(profile.display_name || '');
      setEditPhone(profile.phone || '');
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    if (!user) return;
    const { error } = await supabase.from('profiles').update({
      display_name: editName,
      phone: editPhone,
    }).eq('user_id', user.id);
    if (error) { toast.error('Ошибка сохранения'); return; }
    toast.success('Профиль обновлён');
    setEditing(false);
    refreshProfile();
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    toast.success('Вы вышли из аккаунта');
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const formatPrice = (p: number) => new Intl.NumberFormat('ru-RU').format(p) + ' ₸';
  const formatDate = (d: string) => new Date(d).toLocaleDateString('ru-RU');

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-64 shrink-0"
          >
            <div className="glass-card rounded-2xl p-5 sticky top-24">
              {/* User info */}
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-border/50">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {(profile?.display_name || user.email)?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">{profile?.display_name || 'Пользователь'}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-5 border-t border-border/50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  Выйти
                </button>
              </div>
            </div>
          </motion.aside>

          {/* Main content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 min-w-0"
          >
            {activeTab === 'profile' && (
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display font-bold">Мой профиль</h2>
                  {!editing ? (
                    <Button variant="outline" size="sm" onClick={() => setEditing(true)} className="gap-2 rounded-xl">
                      <Edit3 className="w-4 h-4" /> Редактировать
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSaveProfile} className="gap-2 rounded-xl">
                        <Save className="w-4 h-4" /> Сохранить
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setEditing(false)} className="rounded-xl">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Имя</label>
                    {editing ? (
                      <Input value={editName} onChange={e => setEditName(e.target.value)} className="rounded-xl" />
                    ) : (
                      <p className="font-medium">{profile?.display_name || '—'}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Телефон</label>
                    {editing ? (
                      <Input value={editPhone} onChange={e => setEditPhone(e.target.value)} placeholder="+7 ..." className="rounded-xl" />
                    ) : (
                      <p className="font-medium">{profile?.phone || '—'}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Дата регистрации</label>
                    <p className="font-medium">{formatDate(user.created_at)}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border/50">
                  {[
                    { label: 'Объявления', value: myProducts.length, icon: Package },
                    { label: 'Избранное', value: myFavorites.length, icon: Heart },
                    { label: 'Сообщения', value: myInquiries.length, icon: MessageSquare },
                    { label: 'Сделки', value: myDeals.length, icon: Shield },
                  ].map(s => (
                    <div key={s.label} className="text-center p-3 rounded-xl bg-accent/30">
                      <s.icon className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <p className="text-2xl font-bold text-foreground">{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'listings' && (
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display font-bold">Мои объявления</h2>
                  <Link to="/sell">
                    <Button size="sm" className="gap-2 rounded-xl"><Plus className="w-4 h-4" /> Добавить</Button>
                  </Link>
                </div>
                {myProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">У вас пока нет объявлений</p>
                    <Link to="/sell"><Button className="mt-4 rounded-xl">Разместить объявление</Button></Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {myProducts.map(p => (
                      <Link key={p.id} to={`/product/${p.id}`} className="flex items-center gap-4 p-4 rounded-xl hover:bg-accent/30 transition-colors">
                        <div className="w-16 h-16 rounded-lg bg-accent/50 overflow-hidden shrink-0">
                          {p.image && <img src={p.image} alt="" className="w-full h-full object-cover" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{p.title}</p>
                          <p className="text-sm text-primary font-semibold">{formatPrice(p.price)}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${p.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          {p.status === 'active' ? 'Активно' : p.status}
                        </span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-display font-bold mb-6">Избранное</h2>
                {myFavorites.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">Нет сохранённых товаров</p>
                    <Link to="/agro-shop"><Button variant="outline" className="mt-4 rounded-xl">Перейти в магазин</Button></Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {myFavorites.map((f: any) => (
                      <Link key={f.id} to={`/product/${f.product_id}`} className="flex items-center gap-4 p-4 rounded-xl hover:bg-accent/30 transition-colors">
                        <div className="w-16 h-16 rounded-lg bg-accent/50 overflow-hidden shrink-0">
                          {f.products?.image && <img src={f.products.image} alt="" className="w-full h-full object-cover" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{f.products?.title || 'Товар'}</p>
                          <p className="text-sm text-primary font-semibold">{f.products?.price ? formatPrice(f.products.price) : ''}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-display font-bold mb-6">Мои обращения</h2>
                {myInquiries.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">Нет обращений</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {myInquiries.map(inq => (
                      <div key={inq.id} className="p-4 rounded-xl bg-accent/20">
                        <div className="flex justify-between mb-1">
                          <p className="font-medium text-sm">{inq.products?.title || 'Запрос'}</p>
                          <span className="text-xs text-muted-foreground">{formatDate(inq.created_at)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{inq.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'deals' && (
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-display font-bold mb-6">Безопасные сделки</h2>
                {myDeals.length === 0 ? (
                  <div className="text-center py-12">
                    <Shield className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">Нет сделок</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {myDeals.map(d => (
                      <div key={d.id} className="p-4 rounded-xl bg-accent/20 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{d.products?.title || 'Сделка'}</p>
                          <p className="text-sm text-primary font-semibold">{formatPrice(d.amount)}</p>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full ${
                          d.status === 'completed' ? 'bg-primary/10 text-primary' :
                          d.status === 'pending' ? 'bg-yellow-500/10 text-yellow-600' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {d.status === 'pending' ? 'Ожидает' : d.status === 'completed' ? 'Завершена' : d.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-display font-bold mb-6">История активности</h2>
                <div className="space-y-3">
                  {[...myProducts.slice(0, 3).map(p => ({ type: 'listing', title: `Объявление: ${p.title}`, date: p.created_at })),
                    ...myInquiries.slice(0, 3).map(i => ({ type: 'inquiry', title: `Обращение: ${i.message?.slice(0, 50)}`, date: i.created_at })),
                    ...myDeals.slice(0, 3).map(d => ({ type: 'deal', title: `Сделка: ${formatPrice(d.amount)}`, date: d.created_at })),
                  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10).map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-accent/20">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        item.type === 'listing' ? 'bg-primary/10 text-primary' :
                        item.type === 'deal' ? 'bg-yellow-500/10 text-yellow-600' :
                        'bg-accent text-muted-foreground'
                      }`}>
                        {item.type === 'listing' ? <Package className="w-4 h-4" /> :
                         item.type === 'deal' ? <Shield className="w-4 h-4" /> :
                         <MessageSquare className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(item.date)}</p>
                      </div>
                    </div>
                  ))}
                  {myProducts.length === 0 && myInquiries.length === 0 && myDeals.length === 0 && (
                    <div className="text-center py-12">
                      <Clock className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                      <p className="text-muted-foreground">Нет активности</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.main>
        </div>
      </div>
    </div>
  );
}
