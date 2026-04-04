import { BookOpen, Clock, GraduationCap, Play } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useTranslatedData } from '@/hooks/useTranslatedData';

export default function EducationPage() {
  const { t } = useLanguage();
  const courseCategories = [t.education.all, t.education.agroBusiness, t.education.machinery, t.education.cropFarming, t.education.animalHusbandry, t.education.subsidiesCategory, t.education.technologies];
  // Map translated categories back to data categories for filtering
  const categoryMap: Record<string, string> = {
    [t.education.agroBusiness]: 'Агробизнес',
    [t.education.machinery]: 'Техника',
    [t.education.cropFarming]: 'Растениеводство',
    [t.education.animalHusbandry]: 'Животноводство',
    [t.education.subsidiesCategory]: 'Субсидии',
    [t.education.technologies]: 'Технологии',
  };

  const [activeCategory, setActiveCategory] = useState(t.education.all);
  const filtered = activeCategory === t.education.all ? courses : courses.filter(c => c.category === (categoryMap[activeCategory] || activeCategory));

  return (
    <div className="min-h-screen pt-24 pb-20">
      <section className="section-padding hero-gradient-bg">
        <div className="container-main text-center">
          <AnimatedSection>
            <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-10 h-10" />
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl mb-4">{t.education.pageTitle}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.education.pageSubtitle}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection className="mb-8">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {courseCategories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-card border border-border hover:bg-accent'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <AnimatedSection key={course.id} delay={i * 0.1}>
                <div className="premium-card rounded-2xl overflow-hidden group h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        <Play className="w-6 h-6 ml-1" />
                      </div>
                    </div>
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-foreground/80 text-background text-xs font-semibold">{course.level}</span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <span className="text-xs text-primary font-semibold">{course.category}</span>
                    <h3 className="font-display font-semibold text-lg mt-1 mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{course.instructor}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration}</span>
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {course.lessons} {t.education.lessons}</span>
                    </div>
                    <button className="mt-auto pt-4 w-full py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                      {t.education.startLearning}
                    </button>
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