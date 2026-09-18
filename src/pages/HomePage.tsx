import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Search as SearchIcon, ShoppingBag, Tag, TrendingUp, Bot, BookOpen,
  Newspaper, MapPin, Flame, Store,
} from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import ProductCard from '@/components/ProductCard';
import SEOHead from '@/components/SEOHead';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/i18n/LanguageContext';
import { useTranslatedData } from '@/hooks/useTranslatedData';
import { useCatalogProducts } from '@/hooks/useCatalog';
import { homeStrings, type HomeLang } from '@/data/homeStrings';

interface DemandRow {
  id: string;
  product_type: string;
  quantity: string | null;
  location: string | null;
}

const CATEGORY_IMAGES: Record<string, string> = {
  tractors: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500&h=500&fit=crop',
  combines: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&h=500&fit=crop',
  seeds: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=500&fit=crop',
  fertilizers: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=500&h=500&fit=crop',
  'spare-parts': 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=500&h=500&fit=crop',
  irrigation: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=500&fit=crop',
  livestock: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=500&h=500&fit=crop',
  seeders: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&h=500&fit=crop',
};
const FALLBACK_CATEGORY_IMAGE =
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=500&fit=crop';

export default function HomePage() {
  const { t, lang } = useLanguage();
  const s = homeStrings[(lang as HomeLang) || 'ru'];
  const navigate = useNavigate();
  const { categories, newsArticles } = useTranslatedData();
  const { products, dbProducts, hasDbProducts } = useCatalogProducts();
  const [query, setQuery] = useState('');
  const [demand, setDemand] = useState<DemandRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from('broker_requests')
      .select('id,product_type,quantity,location')
      .eq('request_type', 'buy')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(4)
      .then(({ data }) => {
        if (!cancelled) setDemand((data as DemandRow[]) || []);
      });
    return () => { cancelled = true; };
  }, []);

  // Реальные счётчики по категориям из опубликованных объявлений
  const popularCategories = useMemo(() => {
    const counts = new Map<string, number>();
    dbProducts.forEach(p => counts.set(p.categorySlug, (counts.get(p.categorySlug) || 0) + 1));
    const withCounts = categories.map(c => ({ ...c, real: counts.get(c.slug) || 0 }));
    const sorted = [...withCounts].sort((a, b) => b.real - a.real);
    return sorted.slice(0, 6);
  }, [categories, dbProducts]);

  const latest = (hasDbProducts ? dbProducts : products).slice(0, 8);
  const topOffers = (hasDbProducts ? dbProducts : products).filter(p => p.featured).slice(0, 4);

  const services = [
    { icon: TrendingUp, title: s.subsidies, desc: s.subsidiesDesc, link: '/subsidies' },
    { icon: Bot, title: s.ai, desc: s.aiDesc, link: '/ai-assistants' },
    { icon: BookOpen, title: s.education, desc: s.educationDesc, link: '/education' },
    { icon: Newspaper, title: s.news, desc: s.newsDesc, link: '/news' },
  ];

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : '/search');
  };

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Agrosauda',
    url: 'https://agrosauda.kz',
    logo: 'https://agrosauda.kz/logo1.png',
    description: 'Сельскохозяйственный маркетплейс Казахстана',
    areaServed: { '@type': 'Country', name: 'Kazakhstan' },
    sameAs: [],
  };

  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Agrosauda',
    url: 'https://agrosauda.kz',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://agrosauda.kz/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const SectionHead = ({ title, href, action, icon }: { title: string; href: string; action: string; icon?: React.ReactNode }) => (
    <div className="flex items-end justify-between gap-4 mb-5 sm:mb-7">
      <h2 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl flex items-center gap-2">
        {icon}{title}
      </h2>
      <Link to={href} className="inline-flex items-center gap-1 text-primary font-semibold text-[13px] sm:text-sm whitespace-nowrap hover:gap-2 transition-all">
        {action} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Agrosauda — Сельскохозяйственный маркетплейс Казахстана"
        description="Покупайте и продавайте технику, семена, удобрения, зерно и оборудование для агробизнеса по всему Казахстану на Agrosauda."
        keywords="сельхозтехника, тракторы, комбайны, семена, удобрения, зерно, Казахстан, маркетплейс, agrosauda"
        canonical="https://agrosauda.kz/"
        jsonLd={[orgJsonLd, webSiteJsonLd]}
        hreflang={[
          { lang: 'ru', url: 'https://agrosauda.kz/' },
          { lang: 'kk', url: 'https://agrosauda.kz/?lang=kz' },
          { lang: 'en', url: 'https://agrosauda.kz/?lang=en' },
          { lang: 'zh', url: 'https://agrosauda.kz/?lang=cn' },
          { lang: 'x-default', url: 'https://agrosauda.kz/' },
        ]}
      />

      {/* ═══════ HERO ═══════ */}
      <section className="relative pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8">
        <div className="container-main">
          <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=1080&fit=crop"
              alt="Поля и сельхозтехника в Казахстане"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/65 to-foreground/30" />
            <div className="relative px-5 sm:px-10 lg:px-16 py-14 sm:py-20 lg:py-28 max-w-3xl">
              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="font-display font-extrabold text-[30px] sm:text-[44px] lg:text-[56px] leading-[1.08] text-background mb-4"
              >
                {s.heroTitle}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-background/75 text-[15px] sm:text-lg max-w-xl"
              >
                {s.heroSubtitle}
              </motion.p>
            </div>
          </div>

          {/* Поиск */}
          <div className="relative z-10 -mt-7 sm:-mt-9 px-1 sm:px-6">
            <form onSubmit={submitSearch} className="premium-card !rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center gap-2 px-3">
                <SearchIcon className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={s.searchPlaceholder}
                  aria-label={s.searchPlaceholder}
                  className="w-full bg-transparent py-3 text-[15px] outline-none"
                />
              </div>
              <button type="submit" className="btn-premium !py-3.5 !px-8 !rounded-xl !text-[15px]">
                {s.searchBtn}
              </button>
            </form>
          </div>

          {/* Купить / Продать */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">
            <Link to="/marketplace" className="premium-card rounded-2xl p-4 sm:p-6 flex items-center gap-3 group">
              <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </span>
              <span className="min-w-0">
                <span className="block font-display font-bold text-base sm:text-lg group-hover:text-primary transition-colors">{s.buy}</span>
                <span className="block text-xs sm:text-sm text-muted-foreground truncate">{s.buyDesc}</span>
              </span>
            </Link>
            <Link to="/sell" className="premium-card rounded-2xl p-4 sm:p-6 flex items-center gap-3 group">
              <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Tag className="w-5 h-5 text-primary" />
              </span>
              <span className="min-w-0">
                <span className="block font-display font-bold text-base sm:text-lg group-hover:text-primary transition-colors">{s.sell}</span>
                <span className="block text-xs sm:text-sm text-muted-foreground truncate">{s.sellDesc}</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ ПОПУЛЯРНЫЕ КАТЕГОРИИ ═══════ */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="container-main">
          <SectionHead title={s.popular} href="/marketplace" action={s.allCategories} />
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:overflow-visible">
            {popularCategories.map((cat, i) => (
              <AnimatedSection key={cat.slug} delay={i * 0.04} className="shrink-0 w-[42%] sm:w-auto">
                <Link to={`/category/${cat.slug}`} className="premium-card rounded-2xl overflow-hidden block group h-full">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={CATEGORY_IMAGES[cat.slug] || FALLBACK_CATEGORY_IMAGE}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">{cat.name}</p>
                    {cat.real > 0 && (
                      <p className="text-xs text-muted-foreground mt-0.5">{cat.real} {s.items}</p>
                    )}
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ СЕЙЧАС ИЩУТ ═══════ */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="container-main">
          <SectionHead
            title={s.demand}
            href="/agrobroker"
            action={s.allDemand}
            icon={<Flame className="w-5 h-5 text-primary" />}
          />
          {demand.length === 0 ? (
            <div className="premium-card rounded-2xl p-8 text-center text-muted-foreground text-sm">
              {s.demandEmpty}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {demand.map((d, i) => (
                <AnimatedSection key={d.id} delay={i * 0.06}>
                  <Link to="/agrobroker" className="premium-card rounded-2xl p-4 block h-full">
                    <p className="font-semibold text-sm mb-1.5 line-clamp-2">{d.product_type}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      {d.quantity ? `${d.quantity} · ` : ''}
                      <MapPin className="w-3 h-3" /> {d.location || '—'}
                    </p>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════ НОВЫЕ ОБЪЯВЛЕНИЯ ═══════ */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="container-main">
          <SectionHead title={s.newListings} href="/marketplace" action={s.allListings} />
          {latest.length === 0 ? (
            <div className="premium-card rounded-2xl p-10 text-center">
              <p className="text-muted-foreground text-sm mb-5">{s.listingsEmpty}</p>
              <Link to="/sell" className="btn-premium inline-flex !py-3 !text-sm">{s.listingsEmptyCta}</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {latest.map((p, i) => (
                <AnimatedSection key={p.id} delay={i * 0.05}><ProductCard product={p} /></AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════ AGRO SHOP ═══════ */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="container-main">
          <AnimatedSection>
            <Link to="/agro-shop" className="relative block rounded-[24px] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1600&h=700&fit=crop"
                alt="Agro Shop — проверенные товары для агробизнеса"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 to-foreground/35" />
              <div className="relative p-6 sm:p-12 max-w-lg">
                <span className="inline-flex items-center gap-1.5 text-background/80 text-xs font-semibold uppercase tracking-wide mb-3">
                  <Store className="w-4 h-4" /> Agrosauda
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-background mb-2">{s.shopTitle}</h2>
                <p className="text-background/75 text-sm sm:text-base mb-6">{s.shopDesc}</p>
                <span className="btn-premium inline-flex items-center gap-2 !py-3 !px-6 !text-sm">
                  {s.shopBtn} <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════ СЕРВИСЫ ═══════ */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="container-main">
          <SectionHead title={s.servicesTitle} href="/services" action={s.allCategories} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {services.map((item, i) => (
              <AnimatedSection key={item.link} delay={i * 0.06}>
                <Link to={item.link} className="premium-card rounded-2xl p-4 sm:p-6 block h-full group">
                  <span className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-primary" />
                  </span>
                  <h3 className="font-display font-bold text-[15px] sm:text-base mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ЛУЧШИЕ ПРЕДЛОЖЕНИЯ ═══════ */}
      {topOffers.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
          <div className="container-main">
            <SectionHead title={t.home.popularTitle} href="/marketplace" action={t.home.allProducts} />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {topOffers.map((p, i) => (
                <AnimatedSection key={p.id} delay={i * 0.05}><ProductCard product={p} /></AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════ НОВОСТИ ═══════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="container-main">
          <SectionHead title={s.newsTitle} href="/news" action={s.allNews} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {newsArticles.slice(0, 3).map((n, i) => (
              <AnimatedSection key={n.id} delay={i * 0.06}>
                <Link to="/news" className="premium-card rounded-2xl overflow-hidden block h-full group">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={n.image} alt={n.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] uppercase tracking-wide text-primary font-semibold mb-1.5">{n.category}</p>
                    <h3 className="font-display font-bold text-[15px] leading-snug mb-2 group-hover:text-primary transition-colors">{n.title}</h3>
                    <p className="text-xs text-muted-foreground">{n.date}</p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
