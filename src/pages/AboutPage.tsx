import { Target, Eye, Award, Users, Globe, TrendingUp } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="section-padding hero-gradient-bg">
        <div className="container-main text-center">
          <AnimatedSection>
            <h1 className="font-display font-bold text-4xl sm:text-5xl mb-4">О платформе Agrosauda</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Agrosauda — сельскохозяйственный маркетплейс нового поколения, созданный для модернизации аграрного сектора Казахстана
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="premium-card p-8 rounded-2xl h-full">
                <Target className="w-10 h-10 text-primary mb-4" />
                <h2 className="font-display font-bold text-2xl mb-3">Миссия</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Создать единую цифровую экосистему для казахстанского сельского хозяйства, объединяющую фермеров, поставщиков, покупателей и государство на одной прозрачной платформе.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="premium-card p-8 rounded-2xl h-full">
                <Eye className="w-10 h-10 text-primary mb-4" />
                <h2 className="font-display font-bold text-2xl mb-3">Видение</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Казахстан — один из мировых лидеров в цифровом сельском хозяйстве, где каждый фермер имеет доступ к лучшим технологиям, рынкам и государственной поддержке.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-muted/30">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 12500, label: 'Товаров', suffix: '+' },
              { value: 4800, label: 'Продавцов', suffix: '+' },
              { value: 14, label: 'Регионов', suffix: '' },
              { value: 99, label: 'Uptime %', suffix: '%' },
            ].map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-3xl text-primary mb-1"><AnimatedCounter end={s.value} suffix={s.suffix} /></div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection>
            <h2 className="font-display font-bold text-3xl text-center mb-12">Почему Agrosauda</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: 'Покрытие всех регионов', desc: 'Работаем во всех 14 регионах Казахстана' },
              { icon: Award, title: 'Безопасные сделки', desc: 'Эскроу-система и верификация продавцов' },
              { icon: TrendingUp, title: 'AI-технологии', desc: 'Умные ассистенты и аналитика рынка' },
              { icon: Users, title: 'Сообщество', desc: 'Тысячи фермеров и предпринимателей' },
              { icon: Target, title: 'Субсидии', desc: 'Помощь с государственными программами' },
              { icon: Eye, title: 'Прозрачность', desc: 'Открытые цены и рейтинги продавцов' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="premium-card p-6 rounded-2xl">
                  <item.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-display font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Company */}
      <section className="section-padding bg-muted/30">
        <div className="container-main max-w-3xl text-center">
          <AnimatedSection>
            <h2 className="font-display font-bold text-3xl mb-4">Компания</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Agrosauda разработана и поддерживается командой <span className="text-primary font-semibold">IPKadirzhanov</span> — технологической компанией, специализирующейся на цифровых решениях для агропромышленного комплекса Казахстана.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Мы верим в силу технологий для трансформации сельского хозяйства и работаем над тем, чтобы каждый фермер имел доступ к современным инструментам торговли, обучения и государственной поддержки.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
