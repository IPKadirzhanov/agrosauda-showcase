import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Store, ShieldCheck, TrendingUp, Users, Star, ArrowRight, BadgeCheck,
  Building2, Truck, Award, Globe, Phone, Mail, ChevronRight, Sparkles,
  BarChart3, Eye, MessageSquare, Zap
} from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCounter from '@/components/AnimatedCounter';

const shops = [
  { name: 'АгроТехСнаб', desc: 'Официальный дилер тракторов и комбайнов', rating: 4.9, products: 156, verified: true, category: 'Техника', img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop' },
  { name: 'КазСемена Плюс', desc: 'Семена зерновых и масличных культур', rating: 4.8, products: 89, verified: true, category: 'Семена', img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop' },
  { name: 'ИрригоМастер', desc: 'Системы полива и ирригации', rating: 4.7, products: 234, verified: true, category: 'Ирригация', img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop' },
  { name: 'ФертиГрупп KZ', desc: 'Удобрения и агрохимия', rating: 4.9, products: 312, verified: true, category: 'Удобрения', img: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c10?w=400&h=300&fit=crop' },
  { name: 'ЖивотноводЭкспо', desc: 'Оборудование для животноводства', rating: 4.6, products: 178, verified: true, category: 'Животноводство', img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop' },
  { name: 'ТеплицаПро', desc: 'Тепличные комплексы и оборудование', rating: 4.8, products: 95, verified: false, category: 'Теплицы', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop' },
];

const benefits = [
  { icon: ShieldCheck, title: 'Доверие покупателей', desc: 'Верифицированный профиль повышает доверие и конверсию продаж на 340%' },
  { icon: Eye, title: 'Максимальная видимость', desc: 'Приоритетное размещение в поиске и рекомендациях на всей платформе' },
  { icon: TrendingUp, title: 'Рост продаж', desc: 'Средний рост продаж партнёров — 280% за первые 6 месяцев' },
  { icon: MessageSquare, title: 'Прямые запросы', desc: 'Получайте заявки напрямую от покупателей со всего Казахстана' },
  { icon: BarChart3, title: 'Аналитика', desc: 'Детальная статистика просмотров, запросов и конверсий вашего магазина' },
  { icon: Sparkles, title: 'Премиум-презентация', desc: 'Профессиональная витрина с брендингом, каталогом и отзывами' },
];

const steps = [
  { num: '01', title: 'Регистрация', desc: 'Заполните данные о компании и загрузите документы' },
  { num: '02', title: 'Верификация', desc: 'Наша команда проверит документы за 24 часа' },
  { num: '03', title: 'Настройка магазина', desc: 'Оформите витрину, загрузите каталог товаров' },
  { num: '04', title: 'Начало продаж', desc: 'Получайте заказы и растите вместе с Agrosauda' },
];

const stats = [
  { value: 850, suffix: '+', label: 'Магазинов' },
  { value: 12000, suffix: '+', label: 'Товаров' },
  { value: 98, suffix: '%', label: 'Довольных клиентов' },
  { value: 25, suffix: '+', label: 'Регионов' },
];

export default function AgroShopPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />

        <div className="container-main px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <Store className="w-4 h-4" />
                Для бизнеса — ТОО / ИП
              </div>
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-6">
                Откройте свой{' '}
                <span className="text-gradient">Agro Shop</span>
                <br />на платформе
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Профессиональная витрина для сельскохозяйственных компаний, поставщиков и дистрибьюторов. Продавайте технику, семена, удобрения и оборудование по всему Казахстану.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-premium !px-8 !py-4 !rounded-xl !text-base inline-flex items-center gap-2">
                  Открыть Agro Shop <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/contact" className="btn-outline-premium !px-8 !py-4 !rounded-xl !text-base inline-flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Связаться с менеджером
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="relative">
                {/* Floating cards */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="premium-card rounded-2xl p-6 max-w-sm mx-auto"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-sm">АгроТехСнаб ТОО</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <BadgeCheck className="w-3.5 h-3.5 text-primary" /> Верифицирован
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=120&h=120&fit=crop',
                      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=120&h=120&fit=crop',
                      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=120&h=120&fit=crop',
                    ].map((src, i) => (
                      <div key={i} className="aspect-square rounded-lg overflow-hidden">
                        <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">156 товаров</span>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> 4.9
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-6 -left-6 glass-card rounded-xl px-4 py-3 flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground">Продажи за месяц</p>
                    <p className="font-display font-bold text-sm">+280%</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -top-4 -right-4 glass-card rounded-xl px-4 py-3 flex items-center gap-2"
                >
                  <Award className="w-5 h-5 text-primary" />
                  <span className="font-display font-bold text-xs">TOP Seller</span>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6 border-y border-border/50 bg-card/50">
        <div className="container-main px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1} className="text-center">
                <p className="font-display font-bold text-3xl text-primary">
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="section-padding">
        <div className="container-main px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">Для кого Agro Shop?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Профессиональная витрина для всех участников агробизнеса</p>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: '🚜', label: 'Дилеры техники' },
              { icon: '🌾', label: 'Поставщики семян' },
              { icon: '💧', label: 'Ирригация' },
              { icon: '🧪', label: 'Удобрения и химия' },
              { icon: '🏗️', label: 'Теплицы' },
              { icon: '🐄', label: 'Животноводство' },
              { icon: '⚙️', label: 'Запчасти' },
              { icon: '🔌', label: 'Оборудование' },
              { icon: '📦', label: 'Дистрибьюторы' },
              { icon: '🏪', label: 'Агромагазины' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="premium-card rounded-xl p-5 text-center hover:border-primary/30 transition-all duration-300 group cursor-pointer">
                  <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                  <p className="text-sm font-medium">{item.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Shops */}
      <section className="section-padding bg-accent/30">
        <div className="container-main px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">Лучшие Agro Shops</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Проверенные поставщики и магазины на платформе</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="premium-card rounded-2xl overflow-hidden group">
                  <div className="relative h-44 overflow-hidden">
                    <img src={shop.img} alt={shop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                      <span className="text-white font-display font-bold text-lg">{shop.name}</span>
                      {shop.verified && (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/90 text-primary-foreground text-[11px] font-bold">
                          <BadgeCheck className="w-3.5 h-3.5" /> Verified
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-muted-foreground mb-3">{shop.desc}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span className="px-2.5 py-1 rounded-md bg-accent">{shop.category}</span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> {shop.rating}
                      </span>
                      <span>{shop.products} товаров</span>
                    </div>
                    <button className="w-full text-center py-3 rounded-xl bg-primary/8 text-primary text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-400 border border-primary/10 hover:border-primary">
                      Посетить магазин <ChevronRight className="w-4 h-4 inline" />
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container-main px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">Преимущества Agro Shop</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Почему бизнесы выбирают Agrosauda</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="premium-card rounded-2xl p-7 group hover:border-primary/30 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                    <b.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-accent/30">
        <div className="container-main px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">Как открыть Agro Shop</h2>
            <p className="text-muted-foreground">4 простых шага для начала работы</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="premium-card rounded-2xl p-6 text-center relative overflow-hidden group">
                  <span className="font-display font-black text-6xl text-primary/10 absolute top-2 right-4 group-hover:text-primary/20 transition-colors duration-300">{step.num}</span>
                  <div className="relative z-10">
                    <h3 className="font-display font-bold text-lg mb-2 mt-6">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-main px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative rounded-3xl overflow-hidden bg-primary p-10 sm:p-16 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <Zap className="w-12 h-12 text-primary-foreground/80 mx-auto mb-6" />
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-foreground mb-4">
                  Готовы открыть Agro Shop?
                </h2>
                <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 text-lg">
                  Присоединяйтесь к сотням успешных агробизнесов на платформе Agrosauda
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-background text-foreground font-bold hover:bg-background/90 transition-all duration-300 shadow-lg">
                    Стать продавцом <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-bold hover:bg-primary-foreground/10 transition-all duration-300">
                    <Mail className="w-4 h-4" /> Написать нам
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
