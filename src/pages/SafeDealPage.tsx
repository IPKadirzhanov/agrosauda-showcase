import { Shield, CheckCircle, Lock, ArrowRight, Users, CreditCard } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { Link } from 'react-router-dom';

const steps = [
  { icon: Users, title: 'Покупатель находит товар', desc: 'Выбирает товар на маркетплейсе и нажимает "Безопасная сделка"' },
  { icon: CreditCard, title: 'Оплата на эскроу-счёт', desc: 'Деньги замораживаются и хранятся на защищённом счёте Agrosauda' },
  { icon: Lock, title: 'Продавец отправляет товар', desc: 'После подтверждения оплаты продавец доставляет товар покупателю' },
  { icon: CheckCircle, title: 'Подтверждение и выплата', desc: 'Покупатель подтверждает получение, средства переводятся продавцу' },
];

const benefits = [
  { title: 'Защита покупателя', desc: 'Деньги не поступят продавцу до подтверждения получения товара.', icon: '🛡️' },
  { title: 'Защита продавца', desc: 'Гарантированная оплата после доставки подтверждённого товара.', icon: '✅' },
  { title: 'Арбитраж споров', desc: 'Независимая комиссия разрешает спорные ситуации справедливо.', icon: '⚖️' },
  { title: 'Прозрачность', desc: 'Полная история сделки и статус оплаты доступны обеим сторонам.', icon: '📊' },
];

export default function SafeDealPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="section-padding hero-gradient-bg">
        <div className="container-main text-center">
          <AnimatedSection>
            <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10" />
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl mb-4">Безопасная сделка</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
              Эскроу-система Agrosauda защищает покупателей и продавцов при каждой сделке. Ваши деньги в безопасности.
            </p>
            <Link to="/marketplace" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg">
              Перейти к покупкам <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection>
            <h2 className="font-display font-bold text-3xl text-center mb-12">Как работает безопасная сделка</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="relative premium-card p-6 rounded-2xl text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7" />
                  </div>
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <h3 className="font-display font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-muted/30">
        <div className="container-main">
          <AnimatedSection>
            <h2 className="font-display font-bold text-3xl text-center mb-12">Преимущества системы</h2>
          </AnimatedSection>
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

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-main max-w-3xl">
          <AnimatedSection>
            <h2 className="font-display font-bold text-3xl text-center mb-12">Часто задаваемые вопросы</h2>
          </AnimatedSection>
          {[
            { q: 'Сколько стоит безопасная сделка?', a: 'Комиссия составляет 1.5% от суммы сделки и оплачивается покупателем.' },
            { q: 'Как долго хранятся деньги на эскроу?', a: 'До 14 дней с момента отправки товара. При необходимости срок может быть продлён.' },
            { q: 'Что делать, если товар не соответствует описанию?', a: 'Вы можете открыть спор, и независимая комиссия примет решение.' },
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
