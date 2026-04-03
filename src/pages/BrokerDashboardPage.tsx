import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/i18n';
import {
  ShoppingBag, Users, Handshake, TrendingUp, User, LogOut, Package, Plus, ArrowLeftRight, FileText, CheckCircle, Clock, MapPin, Phone, Mail
} from 'lucide-react';
import { toast } from 'sonner';

type Tab = 'claimed' | 'sell' | 'buy' | 'matching' | 'completed' | 'profile';

export default function BrokerDashboardPage() {
  const { user, profile, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('claimed');
  const [claimedRequests, setClaimedRequests] = useState<any[]>([]);
  const [sellRequests, setSellRequests] = useState<any[]>([]);
  const [buyRequests, setBuyRequests] = useState<any[]>([]);
  const [completedRequests, setCompletedRequests] = useState<any[]>([]);

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth', { replace: true });
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    // Claimed (in_progress) requests by this broker
    supabase.from('broker_requests').select('*').eq('claimed_by', user.id).eq('status', 'in_progress').order('claimed_at', { ascending: false }).then(r => setClaimedRequests(r.data || []));
    // All active sell/buy requests
    supabase.from('broker_requests').select('*').eq('request_type', 'sell').eq('status', 'active').order('created_at', { ascending: false }).then(r => setSellRequests(r.data || []));
    supabase.from('broker_requests').select('*').eq('request_type', 'buy').eq('status', 'active').order('created_at', { ascending: false }).then(r => setBuyRequests(r.data || []));
    // Completed by this broker
    supabase.from('broker_requests').select('*').eq('claimed_by', user.id).eq('status', 'completed').order('updated_at', { ascending: false }).then(r => setCompletedRequests(r.data || []));
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    toast.success(t.dashboard.loggedOut);
  };

  async function markCompleted(id: string) {
    const { error } = await supabase.from('broker_requests').update({ status: 'completed' } as any).eq('id', id);
    if (error) { toast.error('Ошибка'); return; }
    toast.success('Заявка завершена');
    // Refresh
    setClaimedRequests(prev => prev.filter(r => r.id !== id));
    const completed = claimedRequests.find(r => r.id === id);
    if (completed) setCompletedRequests(prev => [{ ...completed, status: 'completed' }, ...prev]);
  }

  if (authLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" /></div>;
  }

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'claimed', label: 'Мои заявки', icon: FileText },
    { id: 'sell', label: t.brokerDashboard.sellRequests, icon: ShoppingBag },
    { id: 'buy', label: t.brokerDashboard.buyRequests, icon: Users },
    { id: 'matching', label: t.brokerDashboard.matching, icon: ArrowLeftRight },
    { id: 'completed', label: 'Завершённые', icon: CheckCircle },
    { id: 'profile', label: t.brokerDashboard.profile, icon: User },
  ];

  const matches = sellRequests.filter(s =>
    buyRequests.some(b => b.product_type === s.product_type && b.location === s.location)
  );

  const renderRequestDetail = (r: any) => (
    <div key={r.id} className="p-5 rounded-xl bg-accent/20 hover:bg-accent/30 transition-colors space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={r.request_type === 'sell' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-blue-500/10 text-blue-600'}>
            {r.request_type === 'sell' ? 'Продажа' : 'Покупка'}
          </Badge>
          <span className="font-semibold">{r.product_type}</span>
        </div>
        <Badge variant="outline" className="text-xs">
          {r.status === 'in_progress' ? 'В работе' : r.status === 'completed' ? 'Завершена' : r.status}
        </Badge>
      </div>
      <div className="grid sm:grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground"><Package className="w-4 h-4" /> {r.quantity}</div>
        {r.price_expectation && <div className="flex items-center gap-2 text-muted-foreground"><TrendingUp className="w-4 h-4" /> {r.price_expectation}</div>}
        <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="w-4 h-4" /> {r.location}</div>
        <div className="flex items-center gap-2 text-muted-foreground"><User className="w-4 h-4" /> {r.contact_name}</div>
        {r.contact_phone && <div className="flex items-center gap-2 text-muted-foreground"><Phone className="w-4 h-4" /> {r.contact_phone}</div>}
        {r.contact_email && <div className="flex items-center gap-2 text-muted-foreground"><Mail className="w-4 h-4" /> {r.contact_email}</div>}
      </div>
      {r.description && <p className="text-sm text-muted-foreground border-t border-border/50 pt-2">{r.description}</p>}
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
        <span>Взята: {r.claimed_at ? new Date(r.claimed_at).toLocaleDateString('ru') : '—'}</span>
        <span>Создана: {new Date(r.created_at).toLocaleDateString('ru')}</span>
      </div>
      {r.status === 'in_progress' && (
        <Button size="sm" variant="outline" className="w-full mt-2 gap-2" onClick={() => markCompleted(r.id)}>
          <CheckCircle className="w-4 h-4" /> Завершить заявку
        </Button>
      )}
    </div>
  );

  const renderRequests = (requests: any[], type: string) => (
    <div className="glass-card rounded-2xl p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold">{type === 'sell' ? t.brokerDashboard.sellRequests : t.brokerDashboard.buyRequests}</h2>
        <Link to="/agrobroker"><Button size="sm" className="gap-2 rounded-xl"><Plus className="w-4 h-4" /> Смотреть все</Button></Link>
      </div>
      {requests.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">{t.brokerDashboard.noRequests}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map(r => (
            <div key={r.id} className="flex items-center gap-4 p-4 rounded-xl bg-accent/20 hover:bg-accent/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">{r.product_type} — {r.quantity}</p>
                <p className="text-sm text-muted-foreground">{r.location} • {r.contact_name}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full ${r.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                {r.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:w-64 shrink-0">
            <div className="glass-card rounded-2xl p-5 sticky top-24">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-border/50">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {(profile?.display_name || user.email)?.[0]?.toUpperCase() || 'B'}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">{profile?.display_name || t.brokerDashboard.title}</p>
                  <p className="text-xs text-primary font-medium">{t.businessAuth.broker}</p>
                </div>
              </div>
              <nav className="space-y-1">
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === tab.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'}`}>
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                    {tab.id === 'claimed' && claimedRequests.length > 0 && (
                      <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">{claimedRequests.length}</span>
                    )}
                  </button>
                ))}
              </nav>
              <div className="mt-6 pt-5 border-t border-border/50">
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all">
                  <LogOut className="w-4 h-4" /> {t.nav.logout}
                </button>
              </div>
            </div>
          </motion.aside>

          <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex-1 min-w-0">
            {activeTab === 'claimed' && (
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-display font-bold mb-6">Мои активные заявки</h2>
                {claimedRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">Нет активных заявок</p>
                    <Link to="/agrobroker"><Button size="sm" className="mt-4 gap-2"><Handshake className="w-4 h-4" /> Найти заявки</Button></Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {claimedRequests.map(renderRequestDetail)}
                  </div>
                )}
              </div>
            )}
            {activeTab === 'sell' && renderRequests(sellRequests, 'sell')}
            {activeTab === 'buy' && renderRequests(buyRequests, 'buy')}
            {activeTab === 'matching' && (
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-display font-bold mb-6">{t.brokerDashboard.matching}</h2>
                {matches.length === 0 ? (
                  <div className="text-center py-12">
                    <ArrowLeftRight className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">{t.brokerDashboard.noRequests}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {matches.map(s => {
                      const buyer = buyRequests.find(b => b.product_type === s.product_type && b.location === s.location);
                      return (
                        <div key={s.id} className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold text-primary">{t.brokerDashboard.matchFound}</span>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-background/50">
                              <p className="text-xs text-muted-foreground mb-1">{t.agrobroker.sell}</p>
                              <p className="font-medium text-sm">{s.product_type} — {s.quantity}</p>
                              <p className="text-xs text-muted-foreground">{s.contact_name}, {s.location}</p>
                            </div>
                            {buyer && (
                              <div className="p-3 rounded-lg bg-background/50">
                                <p className="text-xs text-muted-foreground mb-1">{t.agrobroker.buy}</p>
                                <p className="font-medium text-sm">{buyer.product_type} — {buyer.quantity}</p>
                                <p className="text-xs text-muted-foreground">{buyer.contact_name}, {buyer.location}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            {activeTab === 'completed' && (
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-display font-bold mb-6">Завершённые заявки</h2>
                {completedRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">Нет завершённых заявок</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {completedRequests.map(renderRequestDetail)}
                  </div>
                )}
              </div>
            )}
            {activeTab === 'profile' && (
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-display font-bold mb-6">{t.dashboard.myProfile}</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div><p className="text-sm text-muted-foreground mb-1">{t.dashboard.name}</p><p className="font-medium">{profile?.display_name || '—'}</p></div>
                  <div><p className="text-sm text-muted-foreground mb-1">{t.dashboard.email}</p><p className="font-medium">{user.email}</p></div>
                  <div><p className="text-sm text-muted-foreground mb-1">{t.dashboard.phone}</p><p className="font-medium">{profile?.phone || '—'}</p></div>
                  <div><p className="text-sm text-muted-foreground mb-1">{t.businessAuth.roleSelect}</p><p className="font-medium text-primary">{t.businessAuth.broker}</p></div>
                </div>
                <div className="mt-6 pt-5 border-t border-border/50 grid sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-xl bg-accent/20">
                    <div className="text-2xl font-bold text-primary">{claimedRequests.length}</div>
                    <div className="text-xs text-muted-foreground">В работе</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-accent/20">
                    <div className="text-2xl font-bold text-emerald-600">{completedRequests.length}</div>
                    <div className="text-xs text-muted-foreground">Завершено</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-accent/20">
                    <div className="text-2xl font-bold">{sellRequests.length + buyRequests.length}</div>
                    <div className="text-xs text-muted-foreground">Доступно</div>
                  </div>
                </div>
              </div>
            )}
          </motion.main>
        </div>
      </div>
    </div>
  );
}
