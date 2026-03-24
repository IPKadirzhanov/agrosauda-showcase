import { Link } from 'react-router-dom';
import { Product, formatPrice } from '@/data/mockData';
import { Heart, MapPin, ArrowRight } from 'lucide-react';
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
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Image overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-sm"
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-primary text-primary' : 'text-foreground/60'}`} />
        </button>
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-[11px] font-bold tracking-wide uppercase ${
          product.condition === 'Новый' 
            ? 'bg-primary text-primary-foreground shadow-md' 
            : 'bg-foreground/80 text-background'
        }`}>
          {product.condition}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-1.5">{product.category}</p>
        <h3 className="font-display font-bold text-[15px] leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {product.title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
          <MapPin className="w-3 h-3" />
          {product.location}
        </div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-display font-extrabold text-xl text-primary">{formatPrice(product.price)}</span>
        </div>
        <p className="text-[11px] text-muted-foreground mb-4">{product.seller}</p>
        <Link
          to={`/product/${product.id}`}
          className="block w-full text-center py-3 rounded-xl bg-primary/8 text-primary text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-400 border border-primary/10 hover:border-primary group/btn"
        >
          <span className="inline-flex items-center gap-1.5">
            Подробнее <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </span>
        </Link>
      </div>
    </div>
  );
}
