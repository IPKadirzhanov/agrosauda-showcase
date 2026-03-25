import { Bot, Search, TrendingUp, Sparkles, Zap, Shield, Globe, MessageSquare } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import AIChatWidget from '@/components/AIChatWidget';
import { motion } from 'framer-motion';

const agents = [
  {
    name: 'АгроПомощник',
    desc: 'Умный ассистент для поиска товаров, сравнения цен и навигации по маркетплейсу',
    icon: Search,
    agentType: 'agro_pomoshnik' as const,
    features: [
      { text: 'Поиск товаров по описанию', icon: Search },
      { text: 'Навигация по платформе', icon: Zap },
      { text: 'Рекомендации по выбору', icon: Sparkles },
      { text: 'Помощь с покупкой и продажей', icon: Shield },
    ],
    placeholder: 'Как купить трактор на Agrosauda?',
    suggestions: [
      'Как продать товар?',
      'Какие категории есть?',
      'Как работает безопасная сделка?',
      'Помоги найти технику',
    ],
    gradient: 'from-primary/20 via-primary/5 to-transparent',
  },
  {
    name: 'СубсидияГид',
    desc: 'AI-ассистент по государственным субсидиям, грантам и программам поддержки',
    icon: TrendingUp,
    agentType: 'subsidiya_gid' as const,
    features: [
      { text: 'Подбор подходящих субсидий', icon: Search },
      { text: 'Помощь с документами', icon: Shield },
      { text: 'Отслеживание дедлайнов', icon: Zap },
      { text: 'Консультации по заявкам', icon: Sparkles },
    ],
    placeholder: 'Какие субсидии доступны для фермеров?',
    suggestions: [
      'Гранты для молодых фермеров',
      'Какие документы нужны?',
      'Субсидирование кредитов',
      'Кто может получить субсидию?',
    ],
    gradient: 'from-accent/30 via-accent/5 to-transparent',
  },
];

export default function AIAssistantsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container-main text-center relative z-10">
          <AnimatedSection>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 text-primary flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/10"
            >
              <Bot className="w-12 h-12" />
            </motion.div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mb-5 tracking-tight">
              AI Ассистенты
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed">
              Два умных помощника на базе ИИ — для навигации по маркетплейсу и по субсидиям
            </p>
          </AnimatedSection>

          {/* Badges */}
          <AnimatedSection delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {[
                { icon: MessageSquare, text: 'Реальный AI-чат' },
                { icon: Globe, text: 'RU / KZ / EN' },
                { icon: Zap, text: 'Мгновенные ответы' },
              ].map((badge, i) => (
                <div key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 border border-border/50 text-sm text-muted-foreground backdrop-blur-sm">
                  <badge.icon className="w-4 h-4 text-primary" />
                  {badge.text}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Agents */}
      <section className="section-padding">
        <div className="container-main">
          <div className="space-y-24">
            {agents.map((agent, i) => (
              <AnimatedSection key={i} delay={0.1}>
                <div className={`relative rounded-3xl overflow-hidden border border-border/30 bg-gradient-to-br ${agent.gradient} p-1`}>
                  <div className="bg-card/90 backdrop-blur-sm rounded-[calc(1.5rem-4px)] p-6 sm:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                      {/* Info */}
                      <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-lg shadow-primary/5">
                            <agent.icon className="w-7 h-7" />
                          </div>
                          <div>
                            <h2 className="font-display font-bold text-2xl sm:text-3xl">{agent.name}</h2>
                            <p className="text-sm text-muted-foreground mt-0.5">{agent.desc}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                          {agent.features.map((f, j) => (
                            <motion.div
                              key={j}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.1 }}
                              viewport={{ once: true }}
                              className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/30"
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <f.icon className="w-4 h-4 text-primary" />
                              </div>
                              <span className="text-sm font-medium">{f.text}</span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Language support badge */}
                        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-xs text-muted-foreground">
                          <Globe className="w-3.5 h-3.5" />
                          Поддерживает: Русский, Қазақша, English
                        </div>
                      </div>

                      {/* Chat */}
                      <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                        <AIChatWidget
                          agentType={agent.agentType}
                          agentName={agent.name}
                          placeholder={agent.placeholder}
                          suggestions={agent.suggestions}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection>
            <div className="text-center premium-card rounded-3xl p-10 sm:p-14 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
              <div className="relative z-10">
                <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
                <h2 className="font-display font-bold text-2xl sm:text-3xl mb-3">Нужна помощь?</h2>
                <p className="text-muted-foreground max-w-lg mx-auto mb-6">
                  Наши AI-ассистенты доступны 24/7 и готовы ответить на ваши вопросы на русском, казахском или английском языке
                </p>
                <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 400, behavior: 'smooth' }); }} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg">
                  <MessageSquare className="w-5 h-5" />
                  Начать диалог
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
