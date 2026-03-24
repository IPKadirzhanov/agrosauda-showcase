import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Sparkles, BookOpen, TrendingUp, Bot, Newspaper } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCounter from '@/components/AnimatedCounter';
import ProductCard from '@/components/ProductCard';
import { products, categories, stats, testimonials, formatPrice } from '@/data/mockData';

function HeroParticle({ className }: { className: string }) {
  return <div className={`absolute rounded-full bg-primary/20 ${className}`} />;
}

export default function HomePage() {
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden hero-gradient-bg">
        {/* Animated bg elements */}
        <HeroParticle className="w-64 h-64 top-20 -left-32 animate-float blur-3xl" />
        <HeroParticle className="w-96 h-96 top-40 right-0 animate-float-slow blur-3xl opacity-30" />
        <HeroParticle className="w-48 h-48 bottom-20 left-1/3 animate-float-delayed blur-2xl opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(142_70%_42%/0.06),transparent_60%)]" />

        <div className="container-main px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" /> Агромаркетплейс нового поколения
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6"
            >
              Сельское хозяйство{' '}
              <span className="text-gradient">Казахстана</span>{' '}
              на одной платформе
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed"
            >
              Покупайте и продавайте сельскохозяйственную технику, оборудование, семена и удобрения.
              Безопасные сделки, субсидии, обучение и AI-ассистенты — всё в одном месте.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap gap-3"
            >
              <Link to="/marketplace" className="px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity shadow-lg inline-flex items-center gap-2">
                Каталог товаров <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/sell" className="px-7 py-3.5 rounded-xl border-2 border-primary/30 text-foreground font-semibold text-base hover:bg-primary/5 transition-colors inline-flex items-center gap-2">
                Продать товар
              </Link>
              <Link to="/safe-deal" className="px-7 py-3.5 rounded-xl bg-foreground/5 text-foreground font-semibold text-base hover:bg-foreground/10 transition-colors inline-flex items-center gap-2">
                <Shield className="w-4 h-4" /> Безопасная сделка
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border">
        <div className="container-main px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1} className="text-center">
                <div className="text-3xl sm:text-4xl text-primary mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">Категории товаров</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Найдите всё необходимое для вашего хозяйства</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {categories.map((cat, i) => (
              <AnimatedSection key={cat.slug} delay={i * 0.05}>
                <Link to={`/marketplace?cat=${cat.slug}`} className="premium-card p-4 rounded-xl text-center group block">
                  <span className="text-3xl mb-2 block">{cat.icon}</span>
                  <p className="font-medium text-sm mb-0.5 group-hover:text-primary transition-colors">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">{cat.count} товаров</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-muted/30">
        <div className="container-main">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl mb-2">Популярная техника</h2>
                <p className="text-muted-foreground">Лучшие предложения на платформе</p>
              </div>
              <Link to="/marketplace" className="hidden sm:inline-flex items-center gap-2 text-primary font-semibold hover:opacity-80 transition-opacity">
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

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">Возможности платформы</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Больше, чем просто маркетплейс</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Shield, title: 'Безопасная сделка', desc: 'Гарантия защиты для покупателей и продавцов через эскроу-систему', link: '/safe-deal', color: 'bg-primary/10 text-primary' },
              { icon: TrendingUp, title: 'Субсидии и гранты', desc: 'AI-ассистент поможет найти и оформить государственные субсидии', link: '/subsidies', color: 'bg-accent text-accent-foreground' },
              { icon: Bot, title: 'AI Ассистенты', desc: 'Умные помощники для поиска товаров, субсидий и навигации', link: '/ai-assistants', color: 'bg-primary/10 text-primary' },
              { icon: BookOpen, title: 'Обучение', desc: 'Курсы и материалы по агробизнесу, технике и субсидиям', link: '/education', color: 'bg-accent text-accent-foreground' },
              { icon: Newspaper, title: 'Новости АПК', desc: 'Актуальные новости сельского хозяйства Казахстана', link: '/news', color: 'bg-primary/10 text-primary' },
              { icon: Sparkles, title: 'Аналитика рынка', desc: 'Данные о ценах, спросе и трендах аграрного рынка', link: '/marketplace', color: 'bg-accent text-accent-foreground' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Link to={item.link} className="premium-card p-6 rounded-2xl block group">
                  <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-muted/30">
        <div className="container-main">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">Как это работает</h2>
              <p className="text-muted-foreground">Простой путь от поиска до покупки</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Найдите товар', desc: 'Используйте фильтры или AI-поиск для выбора нужного товара' },
              { step: '02', title: 'Свяжитесь с продавцом', desc: 'Напрямую или через платформу обсудите детали сделки' },
              { step: '03', title: 'Безопасная оплата', desc: 'Средства хранятся на эскроу-счёте до подтверждения получения' },
              { step: '04', title: 'Получите товар', desc: 'Подтвердите получение и средства поступят продавцу' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary font-display font-bold text-xl flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">Отзывы пользователей</h2>
              <p className="text-muted-foreground">Что говорят наши клиенты</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="premium-card p-6 rounded-2xl">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-display font-bold text-sm flex items-center justify-center">
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

      {/* CTA */}
      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection>
            <div className="relative rounded-3xl overflow-hidden bg-primary p-10 sm:p-16 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsla(0,0%,100%,0.1),transparent_60%)]" />
              <div className="relative z-10">
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-foreground mb-4">
                  Начните торговать на Agrosauda
                </h2>
                <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">
                  Присоединяйтесь к тысячам фермеров и предпринимателей Казахстана
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link to="/marketplace" className="px-7 py-3.5 rounded-xl bg-background text-foreground font-semibold hover:opacity-90 transition-opacity">
                    Каталог товаров
                  </Link>
                  <Link to="/sell" className="px-7 py-3.5 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors">
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
