import { Shield, CheckCircle, Lock, ArrowRight, Users, CreditCard } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function SafeDealPage() {
  const { t, lang } = useLanguage();

  const steps = [
    { icon: Users, title: t.safeDeal.step1Title, desc: t.safeDeal.step1Desc },
    { icon: CreditCard, title: t.safeDeal.step2Title, desc: t.safeDeal.step2Desc },
    { icon: Lock, title: t.safeDeal.step3Title, desc: t.safeDeal.step3Desc },
    { icon: CheckCircle, title: t.safeDeal.step4Title, desc: t.safeDeal.step4Desc },
  ];

  const benefits = [
    { title: t.safeDeal.benefit1Title, desc: t.safeDeal.benefit1Desc, icon: '🛡️' },
    { title: t.safeDeal.benefit2Title, desc: t.safeDeal.benefit2Desc, icon: '✅' },
    { title: t.safeDeal.benefit3Title, desc: t.safeDeal.benefit3Desc, icon: '⚖️' },
    { title: t.safeDeal.benefit4Title, desc: t.safeDeal.benefit4Desc, icon: '📊' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEOHead title={lang === 'ru' ? 'Безопасная сделка — Agrosauda' : lang === 'en' ? 'Safe Deal — Agrosauda' : lang === 'kz' ? 'Қауіпсіз мәміле — Agrosauda' : '安全交易 — Agrosauda'} description={lang === 'ru' ? 'Безопасная сделка на Agrosauda: защита покупателя, гарантия возврата средств, проверенные продавцы.' : 'Safe deal on Agrosauda: buyer protection, money-back guarantee, verified sellers.'} keywords="безопасная сделка, гарантия, защита покупателя, Agrosauda" canonical="https://agrosauda.kz/safe-deal" jsonLd={{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Безопасная сделка Agrosauda', url: 'https://agrosauda.kz/safe-deal' }} />
      <Breadcrumbs />
      <section className="section-padding hero-gradient-bg">
        <div className="container-main text-center">
          <AnimatedSection>
            <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10" />
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl mb-4">{t.safeDeal.pageTitle}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">{t.safeDeal.pageSubtitle}</p>
            <Link to="/marketplace" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg">
              {t.safeDeal.goToShop} <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection><h2 className="font-display font-bold text-3xl text-center mb-12">{t.safeDeal.howItWorksTitle}</h2></AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="relative premium-card p-6 rounded-2xl text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4"><step.icon className="w-7 h-7" /></div>
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">{i + 1}</div>
                  <h3 className="font-display font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-main">
          <AnimatedSection><h2 className="font-display font-bold text-3xl text-center mb-12">{t.safeDeal.benefitsTitle}</h2></AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {benefits.map((b, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="premium-card p-6 rounded-2xl flex gap-4">
                  <span className="text-3xl">{b.icon}</span>
                  <div>
                    <h3 className="font-display font-semibold mb-1">{b.title}</h3>
                    <p className="text-sm text-muted-foreground">{b.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-3xl">
          <AnimatedSection><h2 className="font-display font-bold text-3xl text-center mb-12">{t.safeDeal.faqTitle}</h2></AnimatedSection>
          {[
            { q: t.safeDeal.faq1Q, a: t.safeDeal.faq1A },
            { q: t.safeDeal.faq2Q, a: t.safeDeal.faq2A },
            { q: t.safeDeal.faq3Q, a: t.safeDeal.faq3A },
          ].map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="premium-card p-5 rounded-xl mb-3">
                <h3 className="font-semibold mb-1">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}