import { Bot, Search, TrendingUp, Sparkles } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import AIChatWidget from '@/components/AIChatWidget';

const agents = [
  {
    name: 'АгроПомощник',
    desc: 'Умный ассистент для поиска товаров, сравнения цен и навигации по маркетплейсу',
    icon: Search,
    agentType: 'agro_pomoshnik' as const,
    features: ['Поиск товаров по описанию', 'Сравнение цен и характеристик', 'Рекомендации по выбору', 'Навигация по платформе'],
    placeholder: 'Спросите о товарах, категориях, покупке...',
  },
  {
    name: 'СубсидияГид',
    desc: 'AI-ассистент по государственным субсидиям, грантам и программам поддержки',
    icon: TrendingUp,
    agentType: 'subsidiya_gid' as const,
    features: ['Подбор подходящих субсидий', 'Помощь с документами', 'Отслеживание дедлайнов', 'Консультации по заявкам'],
    placeholder: 'Спросите о субсидиях, грантах, документах...',
  },
];

export default function AIAssistantsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="section-padding hero-gradient-bg">
        <div className="container-main text-center">
          <AnimatedSection>
            <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
              <Bot className="w-10 h-10" />
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl mb-4">AI Ассистенты</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Умные помощники на базе искусственного интеллекта для навигации по маркетплейсу и субсидиям
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Agents */}
      <section className="section-padding">
        <div className="container-main">
          <div className="space-y-16">
            {agents.map((agent, i) => (
              <AnimatedSection key={i} delay={0.1}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  {/* Info */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <agent.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="font-display font-bold text-2xl">{agent.name}</h2>
                        <p className="text-sm text-muted-foreground">{agent.desc}</p>
                      </div>
                    </div>
                    <div className="space-y-2 mt-6">
                      {agent.features.map((f, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm">
                          <Sparkles className="w-4 h-4 text-primary shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Real Chat */}
                  <AIChatWidget
                    agentType={agent.agentType}
                    agentName={agent.name}
                    placeholder={agent.placeholder}
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
