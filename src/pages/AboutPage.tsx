import { Target, Eye, Award, Users, Globe, TrendingUp } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCounter from '@/components/AnimatedCounter';
import { useLanguage } from '@/i18n/LanguageContext';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function AboutPage() {
  const { t, lang } = useLanguage();
  const titles: Record<string, string> = { ru: 'О компании Agrosauda — агро маркетплейс Казахстана', en: 'About Agrosauda — Agricultural Marketplace of Kazakhstan', kz: 'Agrosauda туралы — Қазақстанның агро маркетплейсі', cn: '关于Agrosauda — 哈萨克斯坦农业市场' };
  const descs: Record<string, string> = { ru: 'Agrosauda — крупнейшая агроплатформа Казахстана. Миссия, ценности и преимущества маркетплейса для фермеров и поставщиков.', en: 'Agrosauda is Kazakhstan\'s largest agricultural platform. Mission, values and marketplace advantages for farmers and suppliers.', kz: 'Agrosauda — Қазақстанның ең ірі агроплатформасы. Фермерлер мен жеткізушілерге арналған миссия, құндылықтар.', cn: 'Agrosauda是哈萨克斯坦最大的农业平台。面向农民和供应商的使命、价值观和优势。' };
  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEOHead title={titles[lang] || titles.ru} description={descs[lang] || descs.ru} keywords="Agrosauda, о компании, агро маркетплейс, Казахстан, сельское хозяйство" canonical="https://agrosauda.kz/about" jsonLd={{ '@context': 'https://schema.org', '@type': 'AboutPage', name: titles[lang] || titles.ru, description: descs[lang] || descs.ru, url: 'https://agrosauda.kz/about' }} />
      <Breadcrumbs />
      <section className="section-padding hero-gradient-bg">
        <div className="container-main text-center">
          <AnimatedSection>
            <h1 className="font-display font-bold text-4xl sm:text-5xl mb-4">{t.about.pageTitle}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.about.pageSubtitle}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="premium-card p-8 rounded-2xl h-full">
                <Target className="w-10 h-10 text-primary mb-4" />
                <h2 className="font-display font-bold text-2xl mb-3">{t.about.mission}</h2>
                <p className="text-muted-foreground leading-relaxed">{t.about.missionText}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="premium-card p-8 rounded-2xl h-full">
                <Eye className="w-10 h-10 text-primary mb-4" />
                <h2 className="font-display font-bold text-2xl mb-3">{t.about.vision}</h2>
                <p className="text-muted-foreground leading-relaxed">{t.about.visionText}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 12500, label: t.about.statsProducts, suffix: '+' },
              { value: 4800, label: t.about.statsSellers, suffix: '+' },
              { value: 14, label: t.about.statsRegions, suffix: '' },
              { value: 99, label: t.about.statsUptime, suffix: '%' },
            ].map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-3xl text-primary mb-1"><AnimatedCounter end={s.value} suffix={s.suffix} /></div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection>
            <h2 className="font-display font-bold text-3xl text-center mb-12">{t.about.whyUs}</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: t.about.advantage1Title, desc: t.about.advantage1Desc },
              { icon: Award, title: t.about.advantage2Title, desc: t.about.advantage2Desc },
              { icon: TrendingUp, title: t.about.advantage3Title, desc: t.about.advantage3Desc },
              { icon: Users, title: t.about.advantage4Title, desc: t.about.advantage4Desc },
              { icon: Target, title: t.about.advantage5Title, desc: t.about.advantage5Desc },
              { icon: Eye, title: t.about.advantage6Title, desc: t.about.advantage6Desc },
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

      <section className="section-padding bg-muted/30">
        <div className="container-main max-w-3xl text-center">
          <AnimatedSection>
            <h2 className="font-display font-bold text-3xl mb-4">{t.about.companyTitle}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t.about.companyText1}</p>
            <p className="text-muted-foreground leading-relaxed">{t.about.companyText2}</p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}