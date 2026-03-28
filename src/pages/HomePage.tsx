import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Sparkles, BookOpen, TrendingUp, Bot, Newspaper, Play, CheckCircle2, Star, Zap, Globe } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCounter from '@/components/AnimatedCounter';
import ProductCard from '@/components/ProductCard';
import { products, categories, stats, testimonials } from '@/data/mockData';

export default function HomePage() {
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=1080&fit=crop"
          >
            <source src="https://cdn.pixabay.com/video/2020/07/30/45349-446275734_large.mp4" type="video/mp4" />
          </video>
          {/* Multi-layer dark overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-32 right-[15%] z-10 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="glass-card rounded-2xl p-4 pr-6 animate-float"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Безопасная сделка</p>
                <p className="text-white/50 text-[11px]">Эскроу-защита</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-40 right-[10%] z-10 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="glass-card rounded-2xl p-4 pr-6 animate-float-delayed"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-white text-xs font-semibold">12 500+ товаров</p>
                <p className="text-white/50 text-[11px]">По всему Казахстану</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hero content */}
        <div className="container-main px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="premium-badge mb-8 inline-flex !bg-white/10 !border-white/15 !text-white/90">
                <Sparkles className="w-3.5 h-3.5" /> Агромаркетплейс нового поколения
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-display font-extrabold text-[42px] sm:text-[56px] md:text-[68px] lg:text-[78px] leading-[1.02] mb-7 text-white"
            >
              Сельское хозяйство{' '}
              <span className="bg-gradient-to-r from-primary to-emerald-300 bg-clip-text text-transparent">
                Казахстана
              </span>{' '}
              <br className="hidden sm:block" />
              на одной платформе
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg sm:text-xl text-white/65 max-w-2xl mb-10 leading-relaxed font-light"
            >
              Покупайте и продавайте сельскохозяйственную технику, оборудование, семена и удобрения.
              Безопасные сделки, субсидии, обучение и AI&#8209;ассистенты&nbsp;— всё в одном месте.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/marketplace" className="btn-premium inline-flex items-center gap-2.5 !text-[15px]">
                Каталог товаров <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/sell" className="btn-outline-premium !border-white/20 !text-white hover:!bg-white/8 inline-flex items-center gap-2">
                Продать товар
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-6 mt-12 pt-8 border-t border-white/10"
            >
              <div className="flex -space-x-2">
                {['ЕТ', 'АС', 'БК', 'МО'].map((initials, i) => (
                  <div key={i} className="w-9 h-9 rounded-full bg-primary/30 border-2 border-black/30 flex items-center justify-center text-[10px] font-bold text-white">
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />)}
                </div>
                <p className="text-white/45 text-xs">4 800+ продавцов доверяют Agrosauda</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ STATS BAR ═══════════════════════════ */}
      <section className="relative z-10 -mt-1">
        <div className="container-main px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl border border-border shadow-lg p-6 sm:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, i) => (
                <AnimatedSection key={i} delay={i * 0.1} className="text-center relative">
                  <div className="text-3xl sm:text-4xl font-display font-extrabold text-primary mb-1.5">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</p>
                  {i < stats.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-border hidden md:block" />
                  )}
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ CATEGORIES ═══════════════════════════ */}
      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection>
            <div className="text-center mb-14">
              <span className="premium-badge mb-4">Каталог</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] mb-4">Категории товаров</h2>
              <p className="text-muted-foreground max-w-lg mx-auto text-base">Найдите всё необходимое для вашего хозяйства</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {categories.map((cat, i) => (
              <AnimatedSection key={cat.slug} delay={i * 0.04}>
                <Link to={`/marketplace?cat=${cat.slug}`} className="premium-card p-5 rounded-xl text-center group block">
                  <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform duration-500">{cat.icon}</span>
                  <p className="font-semibold text-sm mb-0.5 group-hover:text-primary transition-colors duration-300">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">{cat.count} товаров</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider mx-auto max-w-5xl" />

      {/* ═══════════════════════════ FEATURED PRODUCTS ═══════════════════════════ */}
      <section className="section-padding relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-transparent to-accent/20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container-main relative">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="premium-badge mb-4">Рекомендуемое</span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] mb-2">Популярная техника</h2>
                <p className="text-muted-foreground text-base">Лучшие предложения на платформе</p>
              </div>
              <Link to="/marketplace" className="hidden sm:inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-300">
                Все товары <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product, i) => (
              <AnimatedSection key={product.id} delay={i * 0.1}>
                <ProductCard product={product} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ SERVICES GRID ═══════════════════════════ */}
      <section className="section-padding relative">
        <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
        <div className="container-main relative">
          <AnimatedSection>
            <div className="text-center mb-14">
              <span className="premium-badge mb-4">Экосистема</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] mb-4">Возможности платформы</h2>
              <p className="text-muted-foreground max-w-lg mx-auto text-base">Больше, чем просто маркетплейс</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Shield, title: 'Безопасная сделка', desc: 'Гарантия защиты для покупателей и продавцов через эскроу-систему', link: '/safe-deal', gradient: 'from-primary/10 to-primary/5' },
              { icon: TrendingUp, title: 'Субсидии и гранты', desc: 'AI-ассистент поможет найти и оформить государственные субсидии', link: '/subsidies', gradient: 'from-accent to-accent/50' },
              { icon: Bot, title: 'AI Ассистенты', desc: 'Умные помощники для поиска товаров, субсидий и навигации', link: '/ai-assistants', gradient: 'from-primary/10 to-primary/5' },
              { icon: BookOpen, title: 'Обучение', desc: 'Курсы и материалы по агробизнесу, технике и субсидиям', link: '/education', gradient: 'from-accent to-accent/50' },
              { icon: Newspaper, title: 'Новости АПК', desc: 'Актуальные новости сельского хозяйства Казахстана', link: '/news', gradient: 'from-primary/10 to-primary/5' },
              { icon: Sparkles, title: 'Аналитика рынка', desc: 'Данные о ценах, спросе и трендах аграрного рынка', link: '/marketplace', gradient: 'from-accent to-accent/50' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <Link to={item.link} className="premium-card p-7 rounded-2xl block group relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${item.gradient} rounded-full blur-2xl -translate-y-8 translate-x-8 opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-500">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-lg mb-2.5 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    <div className="mt-4 flex items-center gap-1.5 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Подробнее <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ HOW IT WORKS ═══════════════════════════ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.025] via-transparent to-primary/[0.03] pointer-events-none" />
        <div className="container-main relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="premium-badge mb-4">Процесс</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] mb-4">Как это работает</h2>
              <p className="text-muted-foreground text-base">Простой путь от поиска до покупки</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden md:block" />
            
            {[
              { step: '01', title: 'Найдите товар', desc: 'Используйте фильтры или AI-поиск для выбора нужного товара', icon: Globe },
              { step: '02', title: 'Свяжитесь с продавцом', desc: 'Напрямую или через платформу обсудите детали сделки', icon: Zap },
              { step: '03', title: 'Безопасная оплата', desc: 'Средства хранятся на эскроу-счёте до подтверждения получения', icon: Shield },
              { step: '04', title: 'Получите товар', desc: 'Подтвердите получение и средства поступят продавцу', icon: CheckCircle2 },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.12}>
                <div className="text-center relative">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/12 to-primary/5 border border-primary/10 flex items-center justify-center mx-auto mb-5 relative">
                    <item.icon className="w-8 h-8 text-primary" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center shadow-md">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px] mx-auto">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ TESTIMONIALS ═══════════════════════════ */}
      <section className="section-padding relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container-main relative">
          <AnimatedSection>
            <div className="text-center mb-14">
              <span className="premium-badge mb-4">Отзывы</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] mb-4">Отзывы пользователей</h2>
              <p className="text-muted-foreground text-base">Что говорят наши клиенты</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.12}>
                <div className="premium-card p-7 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, si) => <Star key={si} className="w-4 h-4 fill-primary/80 text-primary/80" />)}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 relative">"{t.text}"</p>
                  <div className="flex items-center gap-3 relative">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 text-primary font-display font-bold text-sm flex items-center justify-center">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ CTA ═══════════════════════════ */}
      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection>
            <div className="relative rounded-[28px] overflow-hidden p-12 sm:p-20 text-center">
              {/* CTA background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-emerald-600 to-teal-700" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsla(0,0%,100%,0.12),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsla(0,0%,100%,0.08),transparent_50%)]" />
              
              {/* Decorative shapes */}
              <div className="absolute top-8 left-8 w-20 h-20 rounded-full border border-white/10 animate-pulse-soft" />
              <div className="absolute bottom-8 right-12 w-32 h-32 rounded-full border border-white/[0.07]" />
              <div className="absolute top-1/2 right-[20%] w-2 h-2 rounded-full bg-white/20 animate-float" />
              <div className="absolute top-[30%] left-[15%] w-1.5 h-1.5 rounded-full bg-white/15 animate-float-delayed" />

              <div className="relative z-10">
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white mb-5 leading-tight">
                  Начните торговать<br className="hidden sm:block" /> на Agrosauda
                </h2>
                <p className="text-white/65 max-w-lg mx-auto mb-10 text-base sm:text-lg font-light">
                  Присоединяйтесь к тысячам фермеров и предпринимателей Казахстана
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/marketplace" className="px-8 py-4 rounded-2xl bg-white text-foreground font-bold text-[15px] hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    Каталог товаров
                  </Link>
                  <Link to="/sell" className="px-8 py-4 rounded-2xl border-2 border-white/25 text-white font-bold text-[15px] hover:bg-white/10 transition-all duration-300">
                    Разместить объявление
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
