// Локализованные строки новой главной страницы.
// Использует существующую систему языков (см. src/i18n/LanguageContext.tsx).

export type HomeLang = 'ru' | 'kz' | 'en' | 'cn';

export interface HomeStrings {
  heroTitle: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  searchBtn: string;
  buy: string;
  buyDesc: string;
  sell: string;
  sellDesc: string;
  popular: string;
  allCategories: string;
  demand: string;
  allDemand: string;
  demandEmpty: string;
  newListings: string;
  allListings: string;
  listingsEmpty: string;
  listingsEmptyCta: string;
  shopTitle: string;
  shopDesc: string;
  shopBtn: string;
  servicesTitle: string;
  subsidies: string;
  subsidiesDesc: string;
  ai: string;
  aiDesc: string;
  education: string;
  educationDesc: string;
  news: string;
  newsDesc: string;
  newsTitle: string;
  allNews: string;
  items: string;
  verified: string;
}

export const homeStrings: Record<HomeLang, HomeStrings> = {
  ru: {
    heroTitle: 'Купите или продайте всё для агробизнеса',
    heroSubtitle: 'Техника, семена, удобрения, зерно, оборудование и многое другое — на одной платформе.',
    searchPlaceholder: 'Что вы ищете?',
    searchBtn: 'Найти',
    buy: 'Купить',
    buyDesc: 'Найти нужный товар',
    sell: 'Продать',
    sellDesc: 'Разместить объявление',
    popular: 'Популярное',
    allCategories: 'Все категории',
    demand: 'Сейчас ищут',
    allDemand: 'Весь спрос',
    demandEmpty: 'Пока нет активных заявок покупателей',
    newListings: 'Новые объявления',
    allListings: 'Все объявления',
    listingsEmpty: 'Объявлений пока нет',
    listingsEmptyCta: 'Разместить первое объявление',
    shopTitle: 'Agro Shop',
    shopDesc: 'Проверенные товары от надёжных поставщиков',
    shopBtn: 'Перейти',
    servicesTitle: 'Сервисы Agrosauda',
    subsidies: 'Субсидии и гранты',
    subsidiesDesc: 'Господдержка для фермеров',
    ai: 'AI-помощник',
    aiDesc: 'Ответы на вопросы 24/7',
    education: 'Обучение и вебинары',
    educationDesc: 'Курсы для агробизнеса',
    news: 'Аналитика и новости',
    newsDesc: 'Рынок и цены',
    newsTitle: 'Новости и аналитика',
    allNews: 'Все новости',
    items: 'объявлений',
    verified: 'Проверенный продавец',
  },
  kz: {
    heroTitle: 'Агробизнеске қажеттінің бәрін сатып алыңыз немесе сатыңыз',
    heroSubtitle: 'Техника, тұқым, тыңайтқыш, астық, жабдық — бір платформада.',
    searchPlaceholder: 'Не іздеп жүрсіз?',
    searchBtn: 'Табу',
    buy: 'Сатып алу',
    buyDesc: 'Қажетті тауарды табу',
    sell: 'Сату',
    sellDesc: 'Хабарландыру беру',
    popular: 'Танымал',
    allCategories: 'Барлық санаттар',
    demand: 'Қазір іздеуде',
    allDemand: 'Барлық сұраныс',
    demandEmpty: 'Әзірге белсенді сатып алушы өтінімдері жоқ',
    newListings: 'Жаңа хабарландырулар',
    allListings: 'Барлық хабарландырулар',
    listingsEmpty: 'Әзірге хабарландырулар жоқ',
    listingsEmptyCta: 'Алғашқы хабарландыруды беру',
    shopTitle: 'Agro Shop',
    shopDesc: 'Сенімді жеткізушілердің тексерілген тауарлары',
    shopBtn: 'Өту',
    servicesTitle: 'Agrosauda сервистері',
    subsidies: 'Субсидиялар мен гранттар',
    subsidiesDesc: 'Фермерлерге мемлекеттік қолдау',
    ai: 'AI-көмекші',
    aiDesc: 'Сұрақтарға 24/7 жауап',
    education: 'Оқыту және вебинарлар',
    educationDesc: 'Агробизнеске арналған курстар',
    news: 'Талдау және жаңалықтар',
    newsDesc: 'Нарық пен бағалар',
    newsTitle: 'Жаңалықтар және талдау',
    allNews: 'Барлық жаңалықтар',
    items: 'хабарландыру',
    verified: 'Тексерілген сатушы',
  },
  en: {
    heroTitle: 'Buy or sell everything for agribusiness',
    heroSubtitle: 'Machinery, seeds, fertilizers, grain, equipment and more — on one platform.',
    searchPlaceholder: 'What are you looking for?',
    searchBtn: 'Search',
    buy: 'Buy',
    buyDesc: 'Find what you need',
    sell: 'Sell',
    sellDesc: 'Post a listing',
    popular: 'Popular',
    allCategories: 'All categories',
    demand: 'In demand now',
    allDemand: 'All demand',
    demandEmpty: 'No active buyer requests yet',
    newListings: 'New listings',
    allListings: 'All listings',
    listingsEmpty: 'No listings yet',
    listingsEmptyCta: 'Post the first listing',
    shopTitle: 'Agro Shop',
    shopDesc: 'Verified goods from trusted suppliers',
    shopBtn: 'Open',
    servicesTitle: 'Agrosauda services',
    subsidies: 'Subsidies and grants',
    subsidiesDesc: 'State support for farmers',
    ai: 'AI assistant',
    aiDesc: 'Answers 24/7',
    education: 'Learning and webinars',
    educationDesc: 'Courses for agribusiness',
    news: 'Analytics and news',
    newsDesc: 'Market and prices',
    newsTitle: 'News and analytics',
    allNews: 'All news',
    items: 'listings',
    verified: 'Verified seller',
  },
  cn: {
    heroTitle: '买卖农业所需的一切',
    heroSubtitle: '农机、种子、化肥、粮食、设备等 — 尽在一个平台。',
    searchPlaceholder: '您在找什么？',
    searchBtn: '搜索',
    buy: '购买',
    buyDesc: '找到所需商品',
    sell: '出售',
    sellDesc: '发布信息',
    popular: '热门',
    allCategories: '全部分类',
    demand: '当前需求',
    allDemand: '全部需求',
    demandEmpty: '暂无买家需求',
    newListings: '最新信息',
    allListings: '全部信息',
    listingsEmpty: '暂无信息',
    listingsEmptyCta: '发布第一条信息',
    shopTitle: 'Agro Shop',
    shopDesc: '可靠供应商的优质商品',
    shopBtn: '进入',
    servicesTitle: 'Agrosauda 服务',
    subsidies: '补贴与拨款',
    subsidiesDesc: '农民的国家支持',
    ai: 'AI 助手',
    aiDesc: '全天候解答',
    education: '培训与网络研讨会',
    educationDesc: '农业课程',
    news: '分析与新闻',
    newsDesc: '市场与价格',
    newsTitle: '新闻与分析',
    allNews: '全部新闻',
    items: '条信息',
    verified: '已验证卖家',
  },
};
