import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const routeLabels: Record<string, Record<string, string>> = {
  ru: {
    marketplace: 'Маркетплейс',
    'agro-shop': 'Agro Shop',
    'safe-deal': 'Безопасная сделка',
    subsidies: 'Субсидии',
    'ai-assistants': 'ИИ-ассистенты',
    education: 'Обучение',
    news: 'Новости',
    about: 'О нас',
    contact: 'Контакты',
    sell: 'Продать',
    favorites: 'Избранное',
    classifieds: 'Объявления',
    agrobroker: 'АгроБрокер',
    agroshorts: 'AgroShorts',
    category: 'Категория',
  },
  en: {
    marketplace: 'Marketplace',
    'agro-shop': 'Agro Shop',
    'safe-deal': 'Safe Deal',
    subsidies: 'Subsidies',
    'ai-assistants': 'AI Assistants',
    education: 'Education',
    news: 'News',
    about: 'About',
    contact: 'Contact',
    sell: 'Sell',
    favorites: 'Favorites',
    classifieds: 'Classifieds',
    agrobroker: 'AgroBroker',
    agroshorts: 'AgroShorts',
    category: 'Category',
  },
  kz: {
    marketplace: 'Маркетплейс',
    'agro-shop': 'Agro Shop',
    'safe-deal': 'Қауіпсіз мәміле',
    subsidies: 'Субсидиялар',
    'ai-assistants': 'ЖИ-көмекшілер',
    education: 'Оқыту',
    news: 'Жаңалықтар',
    about: 'Біз туралы',
    contact: 'Байланыс',
    sell: 'Сату',
    favorites: 'Таңдаулылар',
    classifieds: 'Хабарландырулар',
    agrobroker: 'АгроБрокер',
    agroshorts: 'AgroShorts',
    category: 'Категория',
  },
  cn: {
    marketplace: '市场',
    'agro-shop': '农业商店',
    'safe-deal': '安全交易',
    subsidies: '补贴',
    'ai-assistants': 'AI助手',
    education: '教育',
    news: '新闻',
    about: '关于我们',
    contact: '联系我们',
    sell: '出售',
    favorites: '收藏',
    classifieds: '分类广告',
    agrobroker: '农业经纪',
    agroshorts: '短视频',
    category: '分类',
  },
};

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const location = useLocation();
  const { lang } = useLanguage();
  const labels = routeLabels[lang] || routeLabels.ru;

  const breadcrumbs: BreadcrumbItem[] = items || (() => {
    const segments = location.pathname.split('/').filter(Boolean);
    return segments.map((seg, i) => ({
      label: labels[seg] || seg.charAt(0).toUpperCase() + seg.slice(1),
      path: i < segments.length - 1 ? '/' + segments.slice(0, i + 1).join('/') : undefined,
    }));
  })();

  if (breadcrumbs.length === 0) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: lang === 'ru' ? 'Главная' : lang === 'kz' ? 'Басты бет' : lang === 'cn' ? '首页' : 'Home', item: 'https://agrosauda.kz' },
      ...breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: b.label,
        ...(b.path ? { item: `https://agrosauda.kz${b.path}` } : {}),
      })),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="breadcrumb" className={`flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap ${className}`}>
        <Link to="/" className="hover:text-primary transition-colors inline-flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
        </Link>
        {breadcrumbs.map((b, i) => (
          <span key={i} className="inline-flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3" />
            {b.path ? (
              <Link to={b.path} className="hover:text-primary transition-colors">{b.label}</Link>
            ) : (
              <span className="text-foreground font-medium">{b.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
