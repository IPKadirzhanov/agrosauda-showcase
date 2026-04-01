import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Handshake, ArrowRightLeft, Send, Filter, MapPin, Package, TrendingUp, 
  Truck, Shield, User, Phone, Mail, Plus, X, Search, CheckCircle, Clock, AlertTriangle
} from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const productTypes = [
  'Пшеница', 'Ячмень', 'Кукуруза', 'Подсолнечник', 'Рис', 'Овёс',
  'Картофель', 'Лук', 'Морковь', 'Капуста', 'Томаты', 'Огурцы',
  'КРС', 'МРС', 'Лошади', 'Птица',
  'Молоко', 'Мясо', 'Шерсть', 'Кожа',
  'Удобрения', 'Семена', 'Корма', 'Другое'
];

const regions = [
  'Алматинская', 'Астана', 'Акмолинская', 'Актюбинская', 'Атырауская',
  'Восточно-Казахстанская', 'Жамбылская', 'Западно-Казахстанская',
  'Карагандинская', 'Костанайская', 'Кызылординская', 'Мангистауская',
  'Павлодарская', 'Северо-Казахстанская', 'Туркестанская', 'Шымкент'
];

const statusLabels: Record<string, string> = {
  active: 'Активная',
  in_negotiation: 'В переговорах',
  completed: 'Завершена',
  cancelled: 'Отменена',
};

const statusColors: Record<string, string> = {
  active: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  in_negotiation: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  completed: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  cancelled: 'bg-red-500/10 text-red-600 border-red-500/20',
};

const trustLabels: Record<string, string> = {
  new: 'Новый',
  active: 'Активный',
  verified: 'Верифицирован',
};

const trustIcons: Record<string, React.ReactNode> = {
  new: <Clock className="w-3 h-3" />,
  active: <TrendingUp className="w-3 h-3" />,
  verified: <Shield className="w-3 h-3" />,
};

interface BrokerRequest {
  id: string;
  user_id: string | null;
  request_type: 'sell' | 'buy';
  product_type: string;
  quantity: string;
  price_expectation: string | null;
  location: string;
  contact_name: string;
  contact_phone: string | null;
  contact_email: string | null;
  description: string | null;
  needs_delivery: boolean | null;
  delivery_notes: string | null;
  status: string;
  trust_level: string;
  is_flagged: boolean | null;
  created_at: string;
}

const emptyForm = {
  request_type: 'sell' as 'sell' | 'buy',
  product_type: '',
  quantity: '',
  price_expectation: '',
  location: '',
  contact_name: '',
  contact_phone: '',
  contact_email: '',
  description: '',
  needs_delivery: false,
  delivery_notes: '',
};

export default function AgroBrokerPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<BrokerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterProduct, setFilterProduct] = useState<string>('all');
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [search, setSearch] = useState('');

  useEffect(() => { fetchRequests(); }, []);

  async function fetchRequests() {
    setLoading(true);
    const { data } = await supabase
      .from('broker_requests')
      .select('*')
      .order('created_at', { ascending: false });
    setRequests((data as BrokerRequest[] | null) || []);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) { toast.error('Войдите в аккаунт для создания заявки'); return; }
    if (!form.product_type || !form.quantity || !form.location || !form.contact_name) {
      toast.error('Заполните обязательные поля'); return;
    }
    setSubmitting(true);
    const { error } = await supabase.from('broker_requests').insert({
      user_id: user.id,
      request_type: form.request_type,
      product_type: form.product_type,
      quantity: form.quantity,
      price_expectation: form.price_expectation || null,
      location: form.location,
      contact_name: form.contact_name,
      contact_phone: form.contact_phone || null,
      contact_email: form.contact_email || null,
      description: form.description || null,
      needs_delivery: form.needs_delivery,
      delivery_notes: form.delivery_notes || null,
    } as any);
    setSubmitting(false);
    if (error) { toast.error('Ошибка создания заявки'); console.error(error); return; }
    toast.success('Заявка успешно создана!');
    setForm(emptyForm);
    setDialogOpen(false);
    fetchRequests();
  }

  const filtered = requests.filter(r => {
    if (filterType !== 'all' && r.request_type !== filterType) return false;
    if (filterProduct !== 'all' && r.product_type !== filterProduct) return false;
    if (filterRegion !== 'all' && !r.location.includes(filterRegion)) return false;
    if (search && !r.product_type.toLowerCase().includes(search.toLowerCase()) && !r.description?.toLowerCase().includes(search.toLowerCase()) && !r.contact_name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const sellCount = requests.filter(r => r.request_type === 'sell' && r.status === 'active').length;
  const buyCount = requests.filter(r => r.request_type === 'buy' && r.status === 'active').length;
  const matchCount = Math.min(sellCount, buyCount);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient-bg opacity-90" />
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="container-main relative z-10 text-center">
          <AnimatedSection>
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm px-4 py-1.5 text-sm">
              <Handshake className="w-4 h-4 mr-2" /> Новая функция платформы
            </Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
              Agro<span className="text-gradient">Broker</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Профессиональная платформа для связи продавцов и покупателей сельхозпродукции. 
              Находите лучшие предложения, заключайте сделки быстро и безопасно.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="btn-premium !text-base gap-2">
                    <Plus className="w-5 h-5" /> Создать заявку
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-display">Новая заявка AgroBroker</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="flex gap-2">
                      <Button type="button" variant={form.request_type === 'sell' ? 'default' : 'outline'} className="flex-1" onClick={() => setForm(f => ({ ...f, request_type: 'sell' }))}>
                        <TrendingUp className="w-4 h-4 mr-2" /> Продаю
                      </Button>
                      <Button type="button" variant={form.request_type === 'buy' ? 'default' : 'outline'} className="flex-1" onClick={() => setForm(f => ({ ...f, request_type: 'buy' }))}>
                        <Package className="w-4 h-4 mr-2" /> Покупаю
                      </Button>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Тип продукции *</label>
                      <Select value={form.product_type} onValueChange={v => setForm(f => ({ ...f, product_type: v }))}>
                        <SelectTrigger><SelectValue placeholder="Выберите продукцию" /></SelectTrigger>
                        <SelectContent>{productTypes.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Количество *</label>
                        <Input placeholder="напр. 50 тонн" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Ожидаемая цена</label>
                        <Input placeholder="напр. 120 000 ₸/т" value={form.price_expectation} onChange={e => setForm(f => ({ ...f, price_expectation: e.target.value }))} />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Регион *</label>
                      <Select value={form.location} onValueChange={v => setForm(f => ({ ...f, location: v }))}>
                        <SelectTrigger><SelectValue placeholder="Выберите регион" /></SelectTrigger>
                        <SelectContent>{regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Контактное лицо *</label>
                      <Input placeholder="ФИО" value={form.contact_name} onChange={e => setForm(f => ({ ...f, contact_name: e.target.value }))} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Телефон</label>
                        <Input placeholder="+7 ..." value={form.contact_phone} onChange={e => setForm(f => ({ ...f, contact_phone: e.target.value }))} />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Email</label>
                        <Input placeholder="email@..." value={form.contact_email} onChange={e => setForm(f => ({ ...f, contact_email: e.target.value }))} />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Описание</label>
                      <Textarea placeholder="Дополнительная информация о вашем предложении..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} />
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="delivery" checked={form.needs_delivery} onChange={e => setForm(f => ({ ...f, needs_delivery: e.target.checked }))} className="w-4 h-4 rounded border-border" />
                      <label htmlFor="delivery" className="text-sm">Нужна доставка</label>
                    </div>
                    {form.needs_delivery && (
                      <Input placeholder="Примечания по доставке" value={form.delivery_notes} onChange={e => setForm(f => ({ ...f, delivery_notes: e.target.value }))} />
                    )}
                    <Button type="submit" className="w-full btn-premium" disabled={submitting}>
                      {submitting ? 'Создание...' : 'Отправить заявку'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border/50">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, label: 'Заявок на продажу', value: sellCount, color: 'text-emerald-500' },
              { icon: Package, label: 'Заявок на покупку', value: buyCount, color: 'text-blue-500' },
              { icon: Handshake, label: 'Потенциальных сделок', value: matchCount, color: 'text-primary' },
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Card className="premium-card text-center">
                  <CardContent className="pt-6">
                    <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                    <div className="text-3xl font-display font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Requests */}
      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold">Активные заявки</h2>
              <div className="flex flex-wrap gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-9 w-48" placeholder="Поиск..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все типы</SelectItem>
                    <SelectItem value="sell">Продажа</SelectItem>
                    <SelectItem value="buy">Покупка</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterProduct} onValueChange={setFilterProduct}>
                  <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все продукты</SelectItem>
                    {productTypes.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={filterRegion} onValueChange={setFilterRegion}>
                  <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все регионы</SelectItem>
                    {regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AnimatedSection>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <Card key={i} className="animate-pulse"><CardContent className="pt-6 h-48" /></Card>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <AnimatedSection>
              <div className="text-center py-20">
                <ArrowRightLeft className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Заявок пока нет</h3>
                <p className="text-muted-foreground mb-6">Создайте первую заявку и найдите партнёра для сделки</p>
                <Button onClick={() => setDialogOpen(true)} className="btn-premium">
                  <Plus className="w-4 h-4 mr-2" /> Создать заявку
                </Button>
              </div>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filtered.map((req, i) => (
                  <motion.div
                    key={req.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="premium-card h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className={req.request_type === 'sell' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-blue-500/10 text-blue-600 border-blue-500/20'}>
                            {req.request_type === 'sell' ? '📦 Продажа' : '🛒 Покупка'}
                          </Badge>
                          <Badge variant="outline" className={statusColors[req.status] || ''}>
                            {statusLabels[req.status] || req.status}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{req.product_type}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Package className="w-4 h-4 shrink-0" /> {req.quantity}
                        </div>
                        {req.price_expectation && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <TrendingUp className="w-4 h-4 shrink-0" /> {req.price_expectation}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 shrink-0" /> {req.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="w-4 h-4 shrink-0" /> {req.contact_name}
                        </div>
                        {req.needs_delivery && (
                          <div className="flex items-center gap-2 text-sm text-primary">
                            <Truck className="w-4 h-4 shrink-0" /> Нужна доставка
                          </div>
                        )}
                        {req.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2 pt-1 border-t border-border/50">{req.description}</p>
                        )}
                        <div className="flex items-center justify-between pt-2 border-t border-border/50">
                          <Badge variant="outline" className="text-xs gap-1">
                            {trustIcons[req.trust_level]} {trustLabels[req.trust_level] || 'Новый'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(req.created_at).toLocaleDateString('ru')}
                          </span>
                        </div>
                        {user && req.user_id !== user.id && (
                          <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => toast.success('Запрос на связь отправлен!')}>
                            <Handshake className="w-4 h-4 mr-2" /> Связаться
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-muted/30">
        <div className="container-main">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-12">Как работает AgroBroker</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Send, title: 'Создайте заявку', desc: 'Укажите что продаёте или покупаете, количество и цену' },
              { icon: ArrowRightLeft, title: 'Подбор партнёра', desc: 'Система подберёт подходящие предложения по типу, региону и цене' },
              { icon: Handshake, title: 'Переговоры', desc: 'Свяжитесь с партнёром, обсудите детали сделки' },
              { icon: CheckCircle, title: 'Сделка', desc: 'Заключите сделку с поддержкой платформы и доставки' },
            ].map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
