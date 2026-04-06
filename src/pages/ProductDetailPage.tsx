import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Shield, MapPin, User, Share2, Phone, MessageCircle } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import ProductCard from '@/components/ProductCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEOHead from '@/components/SEOHead';
import { formatPrice } from '@/data/mockData';
import { useTranslatedData } from '@/hooks/useTranslatedData';
import { useState } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@/i18n/LanguageContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const { products } = useTranslatedData();
  const product = products.find(p => p.id === id);
  const [liked, setLiked] = useState(false);
  const similar = products.filter(p => p.id !== id && p.categorySlug === product?.categorySlug).slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <p className="text-4xl mb-4">😕</p>
        <h1 className="font-display font-bold text-2xl mb-2">{t.productDetail.notFound}</h1>
        <Link to="/marketplace" className="text-primary font-semibold">← {t.productDetail.backToCatalog}</Link>
      </div>
    );
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'KZT',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: product.seller },
    },
    category: product.category,
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEOHead
        title={`${product.title} — ${lang === 'ru' ? 'купить на Agrosauda' : 'Agrosauda'} | ${formatPrice(product.price)}`}
        description={`${product.title} — ${product.description?.slice(0, 140)}. ${product.location}. ${formatPrice(product.price)}`}
        keywords={`${product.title}, ${product.category}, ${product.location}, купить, Agrosauda`}
        canonical={`https://agrosauda.kz/product/${product.id}`}
        ogImage={product.image}
        ogType="product"
        jsonLd={productJsonLd}
      />
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-6">
          <Breadcrumbs items={[
            { label: t.productDetail.marketplace, path: '/marketplace' },
            { label: product.category, path: `/category/${product.categorySlug}` },
            { label: product.title },
          ]} />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatedSection className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden aspect-[16/10]">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="lg:col-span-1">
            <div className="premium-card p-6 rounded-2xl lg:sticky lg:top-24">
              <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold mb-3 ${
                product.condition === 'Новый' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
              }`}>
                {product.condition === 'Новый' ? t.common.newCondition : t.common.usedCondition}
              </span>
              <h1 className="font-display font-bold text-xl mb-2">{product.title}</h1>
              <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
                <MapPin className="w-3 h-3" /> {product.location}
              </div>
              <div className="text-3xl font-display font-bold text-primary mb-6">{formatPrice(product.price)}</div>

              <div className="space-y-2.5 mb-6">
                <button
                  onClick={() => toast.success(t.productDetail.orderPlaced)}
                  className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg"
                >
                  {t.productDetail.placeOrder}
                </button>
                <button
                  onClick={() => toast.success(t.productDetail.requestSent)}
                  className="w-full py-3 rounded-xl border-2 border-primary/30 text-foreground font-semibold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> {t.productDetail.contactSeller}
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setLiked(!liked); toast.success(liked ? t.productDetail.removedFromFavorites : t.productDetail.addedToFavorites); }}
                    className="flex-1 py-3 rounded-xl border border-border hover:bg-accent transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Heart className={`w-4 h-4 ${liked ? 'fill-primary text-primary' : ''}`} /> {liked ? t.productDetail.inFavorites : t.productDetail.addToFavorites}
                  </button>
                  <button className="flex-1 py-3 rounded-xl border border-border hover:bg-accent transition-colors flex items-center justify-center gap-2 text-sm">
                    <Share2 className="w-4 h-4" /> {t.productDetail.share}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/50 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{product.seller}</p>
                    <p className="text-xs text-muted-foreground">{t.productDetail.seller}</p>
                  </div>
                </div>
              </div>

              <Link to="/safe-deal" className="block p-4 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-sm text-primary">{t.productDetail.safeDeal}</span>
                </div>
                <p className="text-xs text-muted-foreground">{t.productDetail.safeDealDesc}</p>
              </Link>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.3} className="mt-8">
          <div className="premium-card p-6 sm:p-8 rounded-2xl">
            <h2 className="font-display font-bold text-xl mb-4">{t.productDetail.description}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
            {product.specs && (
              <>
                <h3 className="font-display font-semibold text-lg mb-3">{t.productDetail.specs}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-sm text-muted-foreground">{key}</span>
                      <span className="text-sm font-medium">{val as string}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </AnimatedSection>

        {similar.length > 0 && (
          <section className="mt-16">
            <AnimatedSection>
              <h2 className="font-display font-bold text-2xl mb-6">{t.productDetail.similarProducts}</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {similar.map((p, i) => (
                <AnimatedSection key={p.id} delay={i * 0.1}>
                  <ProductCard product={p} />
                </AnimatedSection>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
