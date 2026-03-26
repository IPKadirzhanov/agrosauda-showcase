import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Plus, ChevronRight, Flame, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCounter from '@/components/AnimatedCounter';

const categoryGroups = [
  {
    title: 'Сельхозтехника',
    items: [
      { icon: '🚜', name: 'Тракторы', count: 324 },
      { icon: '🚜', name: 'Мини-тракторы', count: 156 },
      { icon: '🌾', name: 'Комбайны', count: 89 },
      { icon: '⚙️', name: 'Жатки', count: 67 },
      { icon: '🌱', name: 'Сеялки', count: 112 },
      { icon: '🔧', name: 'Плуги', count: 98 },
      { icon: '⛏️', name: 'Культиваторы', count: 134 },
      { icon: '🚛', name: 'Прицепы', count: 201 },
      { icon: '💨', name: 'Опрыскиватели', count: 78 },
    ],
  },
  {
    title: 'Полив и ирригация',
    items: [
      { icon: '💧', name: 'Системы полива', count: 145 },
      { icon: '🔌', name: 'Водяные насосы', count: 210 },
      { icon: '🏗️', name: 'Тепличное оборуд.', count: 87 },
      { icon: '🏠', name: 'Теплицы', count: 64 },
    ],
  },
  {
    title: 'Семена и корма',
    items: [
      { icon: '🌾', name: 'Семена', count: 430 },
      { icon: '🌽', name: 'Зерно', count: 312 },
      { icon: '🥬', name: 'Корма', count: 189 },
      { icon: '🧪', name: 'Удобрения', count: 267 },
      { icon: '🛡️', name: 'Пестициды', count: 98 },
      { icon: '⚗️', name: 'Агрохимия', count: 134 },
      { icon: '🪨', name: 'Почвогрунты', count: 56 },
    ],
  },
  {
    title: 'Животноводство',
    items: [
      { icon: '🐄', name: 'Оборуд. животновод.', count: 178 },
      { icon: '🥛', name: 'Молочное оборуд.', count: 92 },
      { icon: '🐔', name: 'Птицеводство', count: 67 },
      { icon: '🍽️', name: 'Кормовые системы', count: 45 },
      { icon: '💊', name: 'Ветеринарные товары', count: 134 },
    ],
  },
  {
    title: 'Запчасти и расходники',
    items: [
      { icon: '⚙️', name: 'Запчасти', count: 567 },
      { icon: '🔧', name: 'Детали двигателей', count: 234 },
      { icon: '🛞', name: 'Шины для с/х техники', count: 189 },
      { icon: '🔋', name: 'Аккумуляторы', count: 112 },
      { icon: '🛢️', name: 'Масла и смазки', count: 156 },
    ],
  },
  {
    title: 'Хранение и переработка',
    items: [
      { icon: '🏭', name: 'Складское оборуд.', count: 78 },
      { icon: '🌾', name: 'Зернохранилища', count: 45 },
      { icon: '🔥', name: 'Сушильное оборуд.', count: 34 },
      { icon: '📦', name: 'Упаковочное оборуд.', count: 56 },
      { icon: '🍎', name: 'Переработка фруктов', count: 29 },
      { icon: '🥕', name: 'Переработка овощей', count: 23 },
    ],
  },
  {
    title: 'Инструменты и энергия',
    items: [
      { icon: '🔨', name: 'Ручной инструмент', count: 312 },
      { icon: '⚡', name: 'Электроинструмент', count: 234 },
      { icon: '🔌', name: 'Генераторы', count: 89 },
      { icon: '☀️', name: 'Солнечные панели', count: 67 },
      { icon: '🧱', name: 'Стройматериалы', count: 145 },
      { icon: '🏗️', name: 'Ограждения', count: 98 },
    ],
  },
  {
    title: 'Специализированное',
    items: [
      { icon: '🐝', name: 'Пчеловодство', count: 78 },
      { icon: '🐟', name: 'Рыбоводство', count: 34 },
      { icon: '🌳', name: 'Садовое оборуд.', count: 112 },
      { icon: '🍇', name: 'Оборуд. для садов', count: 45 },
      { icon: '🐮', name: 'Оборуд. коровников', count: 56 },
      { icon: '🗼', name: 'Силосное оборуд.', count: 38 },
    ],
  },
  {
    title: 'Услуги и прочее',
    items: [
      { icon: '🚚', name: 'Транспортные услуги', count: 167 },
      { icon: '🔧', name: 'Ремонт техники', count: 145 },
      { icon: '📋', name: 'Аренда техники', count: 89 },
      { icon: '🏞️', name: 'Земельные участки', count: 234 },
      { icon: '👨‍🌾', name: 'Фермерские услуги', count: 78 },
      { icon: '📦', name: 'Прочие агротовары', count: 312 },
    ],
  },
];

const allCategories = categoryGroups.flatMap(g => g.items);

const popularCategories = [
  { icon: '🚜', name: 'Тракторы', count: 324 },
  { icon: '⚙️', name: 'Запчасти', count: 567 },
  { icon: '🌾', name: 'Семена', count: 430 },
  { icon: '🌽', name: 'Зерно', count: 312 },
  { icon: '💧', name: 'Системы полива', count: 145 },
  { icon: '🧪', name: 'Удобрения', count: 267 },
];

const sampleListings = [
  { title: 'Трактор МТЗ-82.1 2023 года', price: '12 500 000 ₸', location: 'Костанай', condition: 'Б/У', img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop', category: 'Тракторы' },
  { title: 'Семена пшеницы "Астана-2"', price: '450 000 ₸', location: 'Акмолинская обл.', condition: 'Новый', img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop', category: 'Семена' },
  { title: 'Система капельного полива 10 га', price: '3 200 000 ₸', location: 'Алматинская обл.', condition: 'Новый', img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop', category: 'Полив' },
  { title: 'Комбайн Claas Tucano 2021', price: '45 000 000 ₸', location: 'Северо-Казахст.', condition: 'Б/У', img: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c10?w=400&h=300&fit=crop', category: 'Комбайны' },
  { title: 'Удобрение КАС-32, 20 тонн', price: '2 800 000 ₸', location: 'Караганда', condition: 'Новый', img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop', category: 'Удобрения' },
  { title: 'Генератор дизельный 50 кВт', price: '1 950 000 ₸', location: 'Шымкент', condition: 'Новый', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop', category: 'Генераторы' },
];

export default function ClassifiedsPage() {
  const [search, setSearch] = useState('');
  const [activeGroup, setActiveGroup] = useState('');

  const filteredGroups = useMemo(() => {
    if (!search) return categoryGroups;
    return categoryGroups.map(g => ({
      ...g,
      items: g.items.filter(item => item.name.toLowerCase().includes(search.toLowerCase())),
    })).filter(g => g.items.length > 0);
  }, [search]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="container-main px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h1 className="font-display font-bold text-4xl sm:text-5xl leading-[1.1] mb-4">
              Доска <span className="text-gradient">объявлений</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Тысячи объявлений от частных лиц и фермеров по всему Казахстану. Покупайте и продавайте агротовары легко.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Поиск по категориям..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
              <Link to="/sell" className="btn-premium !px-8 !py-4 !rounded-xl !text-base inline-flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" /> Подать объявление
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-5 border-y border-border/50 bg-card/50">
        <div className="container-main px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { value: 5200, suffix: '+', label: 'Объявлений' },
              { value: 850, suffix: '+', label: 'Категорий товаров' },
              { value: 16, suffix: '', label: 'Регионов КЗ' },
            ].map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <p className="font-display font-bold text-2xl sm:text-3xl text-primary">
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </p>
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
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl flex items-center gap-2">
                <Flame className="w-6 h-6 text-primary" /> Популярные категории
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularCategories.map((cat, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div className="premium-card rounded-xl p-5 text-center hover:border-primary/30 transition-all duration-300 cursor-pointer group">
                  <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
                  <p className="font-medium text-sm mb-1">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">{cat.count} объявл.</p>
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
            <h2 className="font-display font-bold text-2xl sm:text-3xl mb-2">Все категории</h2>
            <p className="text-muted-foreground">Найдите нужный раздел среди {allCategories.length}+ категорий</p>
          </AnimatedSection>

          <div className="space-y-8">
            {filteredGroups.map((group, gi) => (
              <AnimatedSection key={gi} delay={gi * 0.05}>
                <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-primary" /> {group.title}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {group.items.map((item, ii) => (
                    <Link
                      key={ii}
                      to="/marketplace"
                      className="premium-card rounded-lg px-4 py-3 flex items-center gap-3 hover:border-primary/30 transition-all duration-300 group"
                    >
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
            <h2 className="font-display font-bold text-2xl sm:text-3xl">Свежие объявления</h2>
            <Link to="/marketplace" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Все объявления <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sampleListings.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div className="premium-card rounded-2xl overflow-hidden group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-[11px] font-bold uppercase ${
                      item.condition === 'Новый' ? 'bg-primary text-primary-foreground' : 'bg-foreground/80 text-background'
                    }`}>
                      {item.condition}
                    </span>
                  </div>
                  <div className="p-5">
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
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-foreground mb-4">
                  Разместите объявление бесплатно
                </h2>
                <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 text-lg">
                  Продайте технику, семена, оборудование или предложите услуги тысячам фермеров Казахстана
                </p>
                <Link to="/sell" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-background text-foreground font-bold hover:bg-background/90 transition-all duration-300 shadow-lg">
                  <Plus className="w-5 h-5" /> Подать объявление
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
