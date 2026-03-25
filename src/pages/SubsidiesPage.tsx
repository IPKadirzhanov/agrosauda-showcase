import { Search, Sparkles, HelpCircle } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import AIChatWidget from '@/components/AIChatWidget';
import { subsidyPrograms } from '@/data/mockData';
import { useState } from 'react';

export default function SubsidiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = subsidyPrograms.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="section-padding hero-gradient-bg">
        <div className="container-main text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> AI-ассистент по субсидиям
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl mb-4">Субсидии и гранты</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
              Найдите подходящие программы государственной поддержки с помощью AI-ассистента Agrosauda
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск по субсидиям..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-card text-base focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-lg"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* AI Chat Assistant */}
      <section className="section-padding bg-muted/20">
        <div className="container-main max-w-2xl">
          <AnimatedSection>
            <h2 className="font-display font-bold text-3xl text-center mb-6">Спросите СубсидияГид</h2>
            <AIChatWidget
              agentType="subsidiya_gid"
              agentName="СубсидияГид"
              placeholder="Какие субсидии доступны для начинающих фермеров?"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Programs */}
      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection>
            <h2 className="font-display font-bold text-3xl mb-8">Доступные программы</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((program, i) => (
              <AnimatedSection key={program.id} delay={i * 0.1}>
                <div className="premium-card p-6 rounded-2xl">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold">{program.category}</span>
                    <span className="text-xs text-muted-foreground">{program.region}</span>
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{program.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{program.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Сумма</p>
                      <p className="font-display font-bold text-primary">{program.amount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Дедлайн</p>
                      <p className="text-sm font-medium">{program.deadline}</p>
                    </div>
                  </div>
                  <button className="mt-4 w-full py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                    Подать заявку
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">🔍</p>
              <p className="font-display font-semibold text-xl">Программы не найдены</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted/30">
        <div className="container-main max-w-3xl">
          <AnimatedSection>
            <h2 className="font-display font-bold text-3xl text-center mb-8">Вопросы о субсидиях</h2>
          </AnimatedSection>
          {[
            { q: 'Кто может получить субсидию?', a: 'Фермеры, КХ, ТОО и ИП, зарегистрированные в Казахстане и ведущие сельскохозяйственную деятельность.' },
            { q: 'Какие документы нужны?', a: 'Регистрационные документы, бизнес-план, справки об отсутствии задолженностей, документы на землю.' },
            { q: 'Как AI-ассистент помогает?', a: 'Анализирует ваш профиль, регион и деятельность, подбирает подходящие программы и помогает с документами.' },
          ].map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="premium-card p-5 rounded-xl mb-3">
                <div className="flex gap-3">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}
