import { Bot, MessageCircle, Search, TrendingUp, Shield, Sparkles } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

const agents = [
  {
    name: 'АгроПомощник',
    desc: 'Умный ассистент для поиска товаров, сравнения цен и навигации по маркетплейсу',
    icon: Search,
    features: ['Поиск товаров по описанию', 'Сравнение цен и характеристик', 'Рекомендации по выбору', 'Навигация по платформе'],
    chatExample: [
      { role: 'user', text: 'Найди тракторы до 20 млн тенге в Костанае' },
      { role: 'bot', text: 'Нашёл 8 тракторов в Костанайской области до 20 000 000 ₸. Топ-3: МТЗ 1221.3 — 18 500 000 ₸, Кейс JX90 — 15 200 000 ₸, ДТ-75 — 8 900 000 ₸. Показать детали?' },
    ],
  },
  {
    name: 'СубсидияГид',
    desc: 'AI-ассистент по государственным субсидиям, грантам и программам поддержки',
    icon: TrendingUp,
    features: ['Подбор подходящих субсидий', 'Помощь с документами', 'Отслеживание дедлайнов', 'Консультации по заявкам'],
    chatExample: [
      { role: 'user', text: 'Какие субсидии доступны для начинающих фермеров?' },
      { role: 'bot', text: 'Для начинающих фермеров доступны: 1) Грант до 8 000 000 ₸ — дедлайн 1 июня 2026. 2) Субсидирование ставки по кредитам до 10%. 3) Льготное кредитование через КазАгро. Помочь с оформлением?' },
    ],
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
                    <button className="mt-6 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg">
                      Начать диалог
                    </button>
                  </div>

                  {/* Chat UI */}
                  <div className="premium-card rounded-2xl overflow-hidden">
                    <div className="bg-foreground/5 px-5 py-3 border-b border-border flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary animate-pulse-soft" />
                      <span className="text-sm font-medium">{agent.name}</span>
                    </div>
                    <div className="p-5 space-y-4">
                      {agent.chatExample.map((msg, j) => (
                        <div key={j} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                            msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-muted rounded-bl-md'
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-5 pb-5">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Задайте вопрос..."
                          className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                          readOnly
                        />
                        <button className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                          <MessageCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
