import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n';
import {
  Package, BarChart3, Store, User, LogOut, Plus, ChevronRight, ShoppingBag
} from 'lucide-react';
import { toast } from 'sonner';

type Tab = 'products' | 'create' | 'analytics' | 'store';

export default function BusinessDashboardPage() {
  const { user, profile, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('products');
  const [myProducts, setMyProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth', { replace: true });
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from('products').select('*').eq('seller_user_id', user.id).order('created_at', { ascending: false }).then(r => setMyProducts(r.data || []));
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    toast.success(t.dashboard.loggedOut);
  };

  if (authLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" /></div>;
  }

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'products', label: t.businessDashboard.myProducts, icon: Package },
    { id: 'create', label: t.businessDashboard.createProduct, icon: Plus },
    { id: 'analytics', label: t.businessDashboard.analytics, icon: BarChart3 },
    { id: 'store', label: t.businessDashboard.storeProfile, icon: Store },
  ];

  const activeCount = myProducts.filter(p => p.status === 'active').length;
  const formatPrice = (p: number) => new Intl.NumberFormat('ru-RU').format(p) + ' ₸';

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
                  <p className="font-semibold text-foreground truncate">{profile?.display_name || t.businessDashboard.title}</p>
                  <p className="text-xs text-primary font-medium">{t.businessAuth.business}</p>
                </div>
              </div>
              <nav className="space-y-1">
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id === 'create' ? 'create' : tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === tab.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'}`}>
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
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
            {activeTab === 'products' && (
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display font-bold">{t.businessDashboard.myProducts}</h2>
                  <Button size="sm" onClick={() => setActiveTab('create')} className="gap-2 rounded-xl"><Plus className="w-4 h-4" /> {t.dashboard.add}</Button>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 rounded-xl bg-accent/30">
                    <p className="text-2xl font-bold text-foreground">{myProducts.length}</p>
                    <p className="text-xs text-muted-foreground">{t.businessDashboard.totalProducts}</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-accent/30">
                    <p className="text-2xl font-bold text-primary">{activeCount}</p>
                    <p className="text-xs text-muted-foreground">{t.businessDashboard.activeProducts}</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-accent/30">
                    <p className="text-2xl font-bold text-foreground">0</p>
                    <p className="text-xs text-muted-foreground">{t.businessDashboard.totalViews}</p>
                  </div>
                </div>
                {myProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">{t.businessDashboard.noProducts}</p>
                    <Button className="mt-4 rounded-xl" onClick={() => setActiveTab('create')}>{t.businessDashboard.createProduct}</Button>
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
                          {p.status === 'active' ? t.dashboard.active : p.status}
                        </span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'create' && (
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-display font-bold mb-6">{t.businessDashboard.createProduct}</h2>
                <div className="text-center py-12">
                  <Plus className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                  <p className="text-muted-foreground mb-4">Используйте страницу "Продать товар" для создания новых объявлений</p>
                  <Link to="/sell"><Button className="rounded-xl">{t.nav.sell}</Button></Link>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-display font-bold mb-6">{t.businessDashboard.analytics}</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="text-center p-6 rounded-xl bg-accent/30">
                    <BarChart3 className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-3xl font-bold text-foreground">{myProducts.length}</p>
                    <p className="text-sm text-muted-foreground">{t.businessDashboard.totalProducts}</p>
                  </div>
                  <div className="text-center p-6 rounded-xl bg-accent/30">
                    <Package className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-3xl font-bold text-foreground">{activeCount}</p>
                    <p className="text-sm text-muted-foreground">{t.businessDashboard.activeProducts}</p>
                  </div>
                  <div className="text-center p-6 rounded-xl bg-accent/30">
                    <Store className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-3xl font-bold text-foreground">0</p>
                    <p className="text-sm text-muted-foreground">{t.businessDashboard.totalViews}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'store' && (
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-display font-bold mb-6">{t.businessDashboard.storeProfile}</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div><p className="text-sm text-muted-foreground mb-1">{t.dashboard.name}</p><p className="font-medium">{profile?.display_name || '—'}</p></div>
                  <div><p className="text-sm text-muted-foreground mb-1">{t.dashboard.email}</p><p className="font-medium">{user.email}</p></div>
                  <div><p className="text-sm text-muted-foreground mb-1">{t.dashboard.phone}</p><p className="font-medium">{profile?.phone || '—'}</p></div>
                  <div><p className="text-sm text-muted-foreground mb-1">{t.businessAuth.roleSelect}</p><p className="font-medium text-primary">{t.businessAuth.business}</p></div>
                </div>
              </div>
            )}
          </motion.main>
        </div>
      </div>
    </div>
  );
}
