import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import ProductCard from '@/components/ProductCard';
import { products, categories, regions } from '@/data/mockData';

const conditions = ['Все', 'Новый', 'Б/У', 'Восстановленный'];
const sortOptions = ['По умолчанию', 'Цена: по возрастанию', 'Цена: по убыванию', 'Новые'];

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Все регионы');
  const [selectedCondition, setSelectedCondition] = useState('Все');
  const [sortBy, setSortBy] = useState('По умолчанию');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000000]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (search) result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
    if (selectedCategory) result = result.filter(p => p.categorySlug === selectedCategory);
    if (selectedRegion !== 'Все регионы') result = result.filter(p => p.location === selectedRegion);
    if (selectedCondition !== 'Все') result = result.filter(p => p.condition === selectedCondition);
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sortBy === 'Цена: по возрастанию') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'Цена: по убыванию') result.sort((a, b) => b.price - a.price);
    return result;
  }, [search, selectedCategory, selectedRegion, selectedCondition, sortBy, priceRange]);

  return (
    <div className="min-h-screen pt-24">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="mb-8">
          <h1 className="font-display font-bold text-3xl sm:text-4xl mb-2">Маркетплейс</h1>
          <p className="text-muted-foreground">Найдите технику, оборудование и материалы для вашего хозяйства</p>
        </AnimatedSection>

        {/* Search & Filter Bar */}
        <AnimatedSection delay={0.1} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск по названию, описанию..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-border bg-card hover:bg-accent transition-colors text-sm font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" /> Фильтры
            </button>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-4 py-3.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {sortOptions.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </AnimatedSection>

        {/* Filters Panel */}
        {showFilters && (
          <AnimatedSection className="mb-6">
            <div className="premium-card p-5 rounded-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Категория</label>
                  <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm">
                    <option value="">Все категории</option>
                    {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Регион</label>
                  <select value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm">
                    {regions.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Состояние</label>
                  <select value={selectedCondition} onChange={e => setSelectedCondition(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm">
                    {conditions.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Макс. цена (₸)</label>
                  <input
                    type="range"
                    min={0}
                    max={200000000}
                    step={1000000}
                    value={priceRange[1]}
                    onChange={e => setPriceRange([0, Number(e.target.value)])}
                    className="w-full accent-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-1">до {new Intl.NumberFormat('ru-KZ').format(priceRange[1])} ₸</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Category Chips */}
        <AnimatedSection delay={0.15} className="mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory('')}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory ? 'bg-primary text-primary-foreground' : 'bg-card border border-border hover:bg-accent'
              }`}
            >
              Все
            </button>
            {categories.slice(0, 10).map(cat => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.slug ? 'bg-primary text-primary-foreground' : 'bg-card border border-border hover:bg-accent'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Results */}
        <div className="mb-4 text-sm text-muted-foreground">
          Найдено: <span className="font-semibold text-foreground">{filtered.length}</span> товаров
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-20">
          {filtered.map((product, i) => (
            <AnimatedSection key={product.id} delay={i * 0.05}>
              <ProductCard product={product} />
            </AnimatedSection>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <p className="font-display font-semibold text-xl mb-2">Ничего не найдено</p>
              <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
