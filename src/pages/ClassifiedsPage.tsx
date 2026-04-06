import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Plus, ChevronRight, Flame, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCounter from '@/components/AnimatedCounter';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/i18n/LanguageContext';
import { useTranslatedData } from '@/hooks/useTranslatedData';

export default function ClassifiedsPage() {
  const { t } = useLanguage();
  const { classifiedsData } = useTranslatedData();
  const [search, setSearch] = useState('');

  const categoryGroups = classifiedsData.categoryGroups;
  const popularCategories = classifiedsData.popularCategories;
  const sampleListings = classifiedsData.sampleListings;
  const allCategories = categoryGroups.flatMap(g => g.items);

  const filteredGroups = useMemo(() => {
    if (!search) return categoryGroups;
    return categoryGroups.map(g => ({
      ...g, items: g.items.filter(item => item.name.toLowerCase().includes(search.toLowerCase())),
    })).filter(g => g.items.length > 0);
  }, [search, categoryGroups]);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Объявления — сельхозтехника и оборудование | Agrosauda"
        description="Доска объявлений сельскохозяйственной техники и оборудования в Казахстане. Тракторы, комбайны, семена, удобрения — от частных лиц и компаний."
        keywords="объявления сельхозтехника, доска объявлений, Казахстан, тракторы б/у, комбайны, agrosauda"
        canonical="https://agrosauda.kz/classifieds"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Объявления сельхозтехники Казахстана',
          url: 'https://agrosauda.kz/classifieds',
        }}
      />
      <Breadcrumbs items={[{ label: t.classifieds.pageTitle }]} className="container-main px-4 sm:px-6 lg:px-8 pt-24 mb-2" />
      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="container-main px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h1 className="font-display font-bold text-4xl sm:text-5xl leading-[1.1] mb-4">
              {t.classifieds.heroTitle1} <span className="text-gradient">{t.classifieds.heroTitle2}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">{t.classifieds.heroDesc}</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="text" placeholder={t.classifieds.searchPlaceholder} value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
              </div>
              <Link to="/sell" className="btn-premium !px-8 !py-4 !rounded-xl !text-base inline-flex items-center justify-center gap-2"><Plus className="w-5 h-5" /> {t.classifieds.postAd}</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-5 border-y border-border/50 bg-card/50">
        <div className="container-main px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { value: 5200, suffix: '+', label: t.classifieds.adsCount },
              { value: 850, suffix: '+', label: t.classifieds.categoriesCount },
              { value: 16, suffix: '', label: t.classifieds.regionsKz },
            ].map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <p className="font-display font-bold text-2xl sm:text-3xl text-primary"><AnimatedCounter end={s.value} suffix={s.suffix} /></p>
                <p className="text-xs sm:text-sm text-muted-foreground">{s.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Popular categories */}
      <section className="section-padding">
        <div className="container-main px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl flex items-center gap-2"><Flame className="w-6 h-6 text-primary" /> {t.classifieds.popularCategories}</h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularCategories.map((cat, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div className="premium-card rounded-xl p-5 text-center hover:border-primary/30 transition-all duration-300 cursor-pointer group h-full">
                  <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
                  <p className="font-medium text-sm mb-1">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">{cat.count} {t.classifieds.listingsLabel}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* All categories grouped */}
      <section className="section-padding bg-accent/30">
        <div className="container-main px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl sm:text-3xl mb-2">{t.classifieds.allCategories}</h2>
            <p className="text-muted-foreground">{t.classifieds.findSection} {allCategories.length}+ {t.classifieds.categoriesPlus}</p>
          </AnimatedSection>
          <div className="space-y-8">
            {filteredGroups.map((group, gi) => (
              <AnimatedSection key={gi} delay={gi * 0.05}>
                <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2"><span className="w-1.5 h-6 rounded-full bg-primary" /> {group.title}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {group.items.map((item, ii) => (
                    <Link key={ii} to="/marketplace" className="premium-card rounded-lg px-4 py-3 flex items-center gap-3 hover:border-primary/30 transition-all duration-300 group">
                      <span className="text-xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-[11px] text-muted-foreground">{item.count}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Sample listings */}
      <section className="section-padding">
        <div className="container-main px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl">{t.classifieds.freshListings}</h2>
            <Link to="/marketplace" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">{t.classifieds.allListings} <ArrowRight className="w-4 h-4" /></Link>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sampleListings.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div className="premium-card rounded-2xl overflow-hidden group h-full flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-[11px] font-bold uppercase ${item.condition === 'Новый' ? 'bg-primary text-primary-foreground' : 'bg-foreground/80 text-background'}`}>{item.condition}</span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">{item.category}</p>
                    <h3 className="font-display font-bold text-[15px] mb-2 line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">📍 {item.location}</p>
                    <p className="font-display font-extrabold text-xl text-primary">{item.price}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-main px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative rounded-3xl overflow-hidden bg-primary p-10 sm:p-16 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-foreground mb-4">{t.classifieds.ctaTitle}</h2>
                <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 text-lg">{t.classifieds.ctaDesc}</p>
                <Link to="/sell" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-background text-foreground font-bold hover:bg-background/90 transition-all duration-300 shadow-lg">
                  <Plus className="w-5 h-5" /> {t.classifieds.postAd}
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
