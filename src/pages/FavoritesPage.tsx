import { Heart } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/mockData';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
  const [favorites] = useState(products.slice(0, 3));
  const [isEmpty] = useState(false);

  if (isEmpty) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center">
        <div className="container-main px-4">
          <AnimatedSection>
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="font-display font-bold text-3xl mb-3">Избранное пусто</h1>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">Добавляйте товары в избранное, чтобы не потерять интересные предложения</p>
            <Link to="/marketplace" className="inline-flex px-7 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
              Перейти к каталогу
            </Link>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-8">
          <h1 className="font-display font-bold text-3xl sm:text-4xl mb-2">Избранное</h1>
          <p className="text-muted-foreground">{favorites.length} товаров в избранном</p>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {favorites.map((product, i) => (
            <AnimatedSection key={product.id} delay={i * 0.1}>
              <ProductCard product={product} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
