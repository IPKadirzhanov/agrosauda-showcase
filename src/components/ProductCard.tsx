import { Link } from 'react-router-dom';
import { Product, formatPrice } from '@/data/mockData';
import { Heart, MapPin } from 'lucide-react';
import { useState } from 'react';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="premium-card rounded-2xl overflow-hidden group">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-primary text-primary' : 'text-foreground/70'}`} />
        </button>
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold ${
          product.condition === 'Новый' ? 'bg-primary text-primary-foreground' : 'bg-foreground/80 text-background'
        }`}>
          {product.condition}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <h3 className="font-display font-semibold text-sm leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
          <MapPin className="w-3 h-3" />
          {product.location}
        </div>
        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-lg text-primary">{formatPrice(product.price)}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{product.seller}</p>
        <Link
          to={`/product/${product.id}`}
          className="mt-3 block w-full text-center py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}
