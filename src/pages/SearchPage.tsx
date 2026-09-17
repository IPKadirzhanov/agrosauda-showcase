import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import SEOHead from '@/components/SEOHead';
import { useCatalogProducts } from '@/hooks/useCatalog';
import { useLanguage } from '@/i18n/LanguageContext';
import { homeStrings, type HomeLang } from '@/data/homeStrings';

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const [value, setValue] = useState(q);
  const { products, dbProducts, hasDbProducts } = useCatalogProducts();
  const { lang } = useLanguage();
  const s = homeStrings[(lang as HomeLang) || 'ru'];

  const source = hasDbProducts ? dbProducts : products;

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return source;
    return source.filter(p =>
      [p.title, p.category, p.location, p.seller, p.description]
        .filter(Boolean)
        .some(field => String(field).toLowerCase().includes(term)),
    );
  }, [q, source]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title={`${q ? `${q} — ` : ''}Поиск — Agrosauda`}
        description="Поиск сельхозтехники, семян, удобрений и оборудования на Agrosauda."
        noindex
      />
      <div className="container-main">
        <form
          onSubmit={(e) => { e.preventDefault(); setParams(value.trim() ? { q: value.trim() } : {}); }}
          className="flex gap-2 mb-8"
        >
          <div className="flex-1 flex items-center gap-2 px-4 rounded-2xl bg-card border border-border">
            <SearchIcon className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={s.searchPlaceholder}
              className="w-full bg-transparent py-3.5 text-[15px] outline-none"
            />
          </div>
          <button type="submit" className="btn-premium !px-6 !py-3.5 !text-[15px]">{s.searchBtn}</button>
        </form>

        <h1 className="font-display font-extrabold text-2xl sm:text-3xl mb-6">
          {q ? `«${q}»` : s.searchBtn} · {results.length}
        </h1>

        {results.length === 0 ? (
          <div className="premium-card rounded-2xl p-10 text-center">
            <p className="text-muted-foreground mb-5">{s.listingsEmpty}</p>
            <Link to="/sell" className="btn-premium inline-flex !py-3 !text-sm">{s.listingsEmptyCta}</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {results.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
