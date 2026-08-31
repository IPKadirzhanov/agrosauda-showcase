import { useParams, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { useTranslatedData } from '@/hooks/useTranslatedData';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductCard from '@/components/ProductCard';
import AnimatedSection from '@/components/AnimatedSection';
import { seoCategories, seoCities, getCategoryTitle, getCityName, getCategorySEOText } from '@/data/seoData';
import { ArrowRight } from 'lucide-react';

const ruSlugMap: Record<string, { category: string; city?: string }> = {
  '/zerno': { category: 'grain-processing' },
  '/pshenica': { category: 'seeds' },
  '/kukuruza': { category: 'seeds' },
  '/skot': { category: 'livestock' },
  '/texnika': { category: 'tractors' },
  '/udobreniya': { category: 'fertilizers' },
  '/semena': { category: 'seeds' },
  '/pshenica-almaty': { category: 'seeds', city: 'almaty' },
  '/pshenica-astana': { category: 'seeds', city: 'astana' },
  '/pshenica-shymkent': { category: 'seeds', city: 'shymkent' },
  '/skot-almaty': { category: 'livestock', city: 'almaty' },
  '/texnika-almaty': { category: 'tractors', city: 'almaty' },
};

export default function CategoryPage() {
  const { categorySlug: paramCatSlug, citySlug: paramCitySlug } = useParams<{ categorySlug: string; citySlug?: string }>();
  const location = useLocation();
  const { lang, t } = useLanguage();
  const { categories } = useTranslatedData();
  const { products } = useCatalogProducts();


  const ruMapping = ruSlugMap[location.pathname];
  const categorySlug = ruMapping?.category || paramCatSlug;
  const citySlug = ruMapping?.city || paramCitySlug;

  const category = seoCategories.find(c => c.slug === categorySlug);
  const city = citySlug ? seoCities.find(c => c.slug === citySlug) : null;

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t.notFound.title}</h1>
          <Link to="/marketplace" className="text-primary hover:underline">{t.notFound.goHome}</Link>
        </div>
      </div>
    );
  }

  const catTitle = getCategoryTitle(categorySlug!, lang);
  const cityName = city ? getCityName(citySlug!, lang) : '';
  const locationSuffix = cityName ? ` — ${cityName}` : '';

  // Filter products
  const filtered = products.filter(p => {
    const matchCat = p.categorySlug === categorySlug;
    if (!matchCat) return false;
    if (city) {
      const cityNameRu = getCityName(citySlug!, 'ru');
      return p.location.toLowerCase().includes(cityNameRu.toLowerCase());
    }
    return true;
  });

  const pageTitle = `${catTitle}${locationSuffix} — ${lang === 'ru' ? 'купить на Agrosauda' : lang === 'kz' ? 'Agrosauda-да сатып алу' : lang === 'cn' ? '在Agrosauda购买' : 'Buy on Agrosauda'}`;
  const pageDesc = `${catTitle}${locationSuffix}. ${lang === 'ru' ? `${filtered.length} предложений от проверенных продавцов. Безопасная сделка, субсидии до 50%.` : `${filtered.length} offers from verified sellers.`}`;

  const breadcrumbs = [
    { label: t.nav.agroShop || 'Маркетплейс', path: '/marketplace' },
    ...(city ? [{ label: catTitle, path: `/category/${categorySlug}` }] : []),
    { label: city ? `${catTitle} — ${cityName}` : catTitle },
  ];

  const relatedCategories = category.relatedSlugs
    .map(s => seoCategories.find(c => c.slug === s))
    .filter(Boolean);

  const cities = city ? [] : seoCities.slice(0, 8);

  const seoText = getCategorySEOText(categorySlug!, lang, citySlug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pageTitle,
    description: pageDesc,
    url: `https://agrosauda.kz/category/${categorySlug}${citySlug ? `/${citySlug}` : ''}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: filtered.length,
      itemListElement: filtered.slice(0, 10).map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: p.title,
          url: `https://agrosauda.kz/product/${p.id}`,
          offers: {
            '@type': 'Offer',
            price: p.price,
            priceCurrency: 'KZT',
            availability: 'https://schema.org/InStock',
          },
        },
      })),
    },
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={pageTitle}
        description={pageDesc}
        keywords={`${catTitle}, ${cityName || 'Казахстан'}, сельхозтехника, agrosauda, купить, продать`}
        canonical={`https://agrosauda.kz/category/${categorySlug}${citySlug ? `/${citySlug}` : ''}`}
        jsonLd={jsonLd}
      />

      <section className="pt-24 pb-8">
        <div className="container-main px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          <AnimatedSection>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{category.icon}</span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl">{catTitle}{locationSuffix}</h1>
            </div>
            <p className="text-muted-foreground">
              {filtered.length} {lang === 'ru' ? 'предложений' : lang === 'kz' ? 'ұсыныс' : lang === 'cn' ? '个报价' : 'offers'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* City sub-links for SEO */}
      {cities.length > 0 && (
        <section className="pb-6">
          <div className="container-main px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              {cities.map(c => (
                <Link
                  key={c.slug}
                  to={`/category/${categorySlug}/${c.slug}`}
                  className="px-3 py-1.5 rounded-lg text-sm bg-accent hover:bg-primary/10 hover:text-primary transition-colors border border-border/50"
                >
                  {catTitle} — {getCityName(c.slug, lang)}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products grid */}
      <section className="pb-12">
        <div className="container-main px-4 sm:px-6 lg:px-8">
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((p, i) => (
                <AnimatedSection key={p.id} delay={i * 0.05}>
                  <ProductCard product={p} />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                {lang === 'ru' ? 'Пока нет предложений в этой категории' : 'No offers yet'}
              </p>
              <Link to="/sell" className="btn-premium inline-flex items-center gap-2">
                {t.nav.sell || 'Разместить объявление'} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* SEO text block */}
      <section className="pb-12">
        <div className="container-main px-4 sm:px-6 lg:px-8">
          <div className="premium-card rounded-2xl p-8">
            <div className="prose prose-sm max-w-none text-muted-foreground">
              {seoText.split('\n\n').map((para, i) => (
                <p key={i} className="mb-4 last:mb-0 leading-relaxed">{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related categories & internal linking */}
      <section className="pb-16">
        <div className="container-main px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-xl mb-4">
            {lang === 'ru' ? 'Смотрите также' : lang === 'kz' ? 'Сондай-ақ қараңыз' : lang === 'cn' ? '另请参阅' : 'See also'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedCategories.map(rc => rc && (
              <Link
                key={rc.slug}
                to={`/category/${rc.slug}`}
                className="premium-card rounded-xl p-5 flex items-center gap-3 hover:border-primary/30 transition-all group"
              >
                <span className="text-2xl">{rc.icon}</span>
                <span className="font-medium group-hover:text-primary transition-colors">
                  {getCategoryTitle(rc.slug, lang)}
                </span>
                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
            {/* Link back to main marketplace */}
            <Link
              to="/marketplace"
              className="premium-card rounded-xl p-5 flex items-center gap-3 hover:border-primary/30 transition-all group"
            >
              <span className="text-2xl">🛒</span>
              <span className="font-medium group-hover:text-primary transition-colors">
                {lang === 'ru' ? 'Все товары' : lang === 'kz' ? 'Барлық тауарлар' : lang === 'cn' ? '所有商品' : 'All products'}
              </span>
              <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
