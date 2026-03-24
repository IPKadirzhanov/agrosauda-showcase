import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Shield, MapPin, User, Share2, Phone, MessageCircle } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import ProductCard from '@/components/ProductCard';
import { products, formatPrice } from '@/data/mockData';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [liked, setLiked] = useState(false);
  const similar = products.filter(p => p.id !== id && p.categorySlug === product?.categorySlug).slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <p className="text-4xl mb-4">😕</p>
        <h1 className="font-display font-bold text-2xl mb-2">Товар не найден</h1>
        <Link to="/marketplace" className="text-primary font-semibold">← Вернуться в каталог</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <AnimatedSection className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/marketplace" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Маркетплейс
            </Link>
            <span>/</span>
            <span>{product.category}</span>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image */}
          <AnimatedSection className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden aspect-[16/10]">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </div>
          </AnimatedSection>

          {/* Sticky Action Card */}
          <AnimatedSection delay={0.2} className="lg:col-span-1">
            <div className="premium-card p-6 rounded-2xl lg:sticky lg:top-24">
              <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold mb-3 ${
                product.condition === 'Новый' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
              }`}>
                {product.condition}
              </span>
              <h1 className="font-display font-bold text-xl mb-2">{product.title}</h1>
              <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
                <MapPin className="w-3 h-3" /> {product.location}
              </div>
              <div className="text-3xl font-display font-bold text-primary mb-6">{formatPrice(product.price)}</div>

              <div className="space-y-2.5 mb-6">
                <button
                  onClick={() => toast.success('Заказ оформлен! (демо)')}
                  className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg"
                >
                  Оформить заказ
                </button>
                <button
                  onClick={() => toast.success('Запрос отправлен продавцу (демо)')}
                  className="w-full py-3 rounded-xl border-2 border-primary/30 text-foreground font-semibold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> Связаться с продавцом
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setLiked(!liked); toast.success(liked ? 'Удалено из избранного' : 'Добавлено в избранное'); }}
                    className="flex-1 py-3 rounded-xl border border-border hover:bg-accent transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Heart className={`w-4 h-4 ${liked ? 'fill-primary text-primary' : ''}`} /> {liked ? 'В избранном' : 'В избранное'}
                  </button>
                  <button className="flex-1 py-3 rounded-xl border border-border hover:bg-accent transition-colors flex items-center justify-center gap-2 text-sm">
                    <Share2 className="w-4 h-4" /> Поделиться
                  </button>
                </div>
              </div>

              {/* Seller */}
              <div className="p-4 rounded-xl bg-muted/50 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{product.seller}</p>
                    <p className="text-xs text-muted-foreground">Продавец</p>
                  </div>
                </div>
              </div>

              {/* Safe Deal */}
              <Link to="/safe-deal" className="block p-4 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-sm text-primary">Безопасная сделка</span>
                </div>
                <p className="text-xs text-muted-foreground">Ваши деньги под защитой до получения товара</p>
              </Link>
            </div>
          </AnimatedSection>
        </div>

        {/* Description & Specs */}
        <AnimatedSection delay={0.3} className="mt-8">
          <div className="premium-card p-6 sm:p-8 rounded-2xl">
            <h2 className="font-display font-bold text-xl mb-4">Описание</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
            {product.specs && (
              <>
                <h3 className="font-display font-semibold text-lg mb-3">Характеристики</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-sm text-muted-foreground">{key}</span>
                      <span className="text-sm font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </AnimatedSection>

        {/* Similar */}
        {similar.length > 0 && (
          <section className="mt-16">
            <AnimatedSection>
              <h2 className="font-display font-bold text-2xl mb-6">Похожие товары</h2>
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
