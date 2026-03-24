export interface Product {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  price: number;
  location: string;
  seller: string;
  condition: 'Новый' | 'Б/У' | 'Восстановленный';
  description: string;
  image: string;
  featured?: boolean;
  specs?: Record<string, string>;
}

export interface Category {
  name: string;
  slug: string;
  icon: string;
  count: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  lessons: number;
  image: string;
  instructor: string;
}

export interface SubsidyProgram {
  id: string;
  title: string;
  description: string;
  amount: string;
  deadline: string;
  region: string;
  category: string;
}

export const categories: Category[] = [
  { name: 'Тракторы', slug: 'tractors', icon: '🚜', count: 342 },
  { name: 'Комбайны', slug: 'combines', icon: '🌾', count: 187 },
  { name: 'Сеялки', slug: 'seeders', icon: '🌱', count: 256 },
  { name: 'Уборочная техника', slug: 'harvesters', icon: '🔧', count: 198 },
  { name: 'Системы орошения', slug: 'irrigation', icon: '💧', count: 143 },
  { name: 'Удобрения', slug: 'fertilizers', icon: '🧪', count: 534 },
  { name: 'Семена', slug: 'seeds', icon: '🌿', count: 892 },
  { name: 'Животноводство', slug: 'livestock', icon: '🐄', count: 267 },
  { name: 'Теплицы', slug: 'greenhouses', icon: '🏡', count: 124 },
  { name: 'Запчасти', slug: 'spare-parts', icon: '⚙️', count: 1203 },
  { name: 'Зернопереработка', slug: 'grain-processing', icon: '🏭', count: 89 },
  { name: 'Кормовое оборудование', slug: 'feed-equipment', icon: '🥬', count: 156 },
  { name: 'Хранение', slug: 'storage', icon: '🏗️', count: 178 },
  { name: 'Инструменты', slug: 'farm-tools', icon: '🔨', count: 445 },
];

export const products: Product[] = [
  {
    id: '1', title: 'Трактор John Deere 8R 410', category: 'Тракторы', categorySlug: 'tractors',
    price: 85000000, location: 'Астана', seller: 'АгроТех KZ', condition: 'Новый',
    description: 'Мощный трактор 410 л.с. с интеллектуальной системой управления, GPS навигацией и автоматическим рулевым управлением. Идеален для крупных хозяйств.',
    image: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=600&h=400&fit=crop', featured: true,
    specs: { 'Мощность': '410 л.с.', 'Год': '2024', 'Двигатель': 'PowerTech PSS 13.6L', 'Трансмиссия': 'e23 PowerShift' }
  },
  {
    id: '2', title: 'Комбайн CLAAS Lexion 8900', category: 'Комбайны', categorySlug: 'combines',
    price: 120000000, location: 'Костанай', seller: 'КазАгроМаш', condition: 'Новый',
    description: 'Флагманский зерноуборочный комбайн с системой CEMOS AUTOMATIC и пропускной способностью до 80 т/ч.',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop', featured: true,
    specs: { 'Пропускная способность': '80 т/ч', 'Бункер': '18 000 л', 'Мощность': '790 л.с.' }
  },
  {
    id: '3', title: 'Сеялка пневматическая Amazone Cirrus 6003-2', category: 'Сеялки', categorySlug: 'seeders',
    price: 28500000, location: 'Караганда', seller: 'ФермерСнаб', condition: 'Новый',
    description: 'Универсальная пневматическая сеялка для зерновых, мелкосемянных и бобовых культур. Ширина захвата 6 м.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop',
    specs: { 'Ширина захвата': '6 м', 'Бункер': '3 000 л', 'Тип': 'Пневматическая' }
  },
  {
    id: '4', title: 'Система капельного орошения Netafim', category: 'Системы орошения', categorySlug: 'irrigation',
    price: 4500000, location: 'Алматы', seller: 'ИрригацияПлюс', condition: 'Новый',
    description: 'Комплексная система капельного орошения для 50 гектаров. Включает фильтры, насосы и управляющую автоматику.',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop',
    specs: { 'Площадь': '50 га', 'Тип': 'Капельное', 'Управление': 'Автоматическое' }
  },
  {
    id: '5', title: 'Удобрение NPK 15-15-15 (тонна)', category: 'Удобрения', categorySlug: 'fertilizers',
    price: 280000, location: 'Шымкент', seller: 'АгроХим Казахстан', condition: 'Новый',
    description: 'Комплексное минеральное удобрение с равным содержанием азота, фосфора и калия. Подходит для всех культур.',
    image: 'https://images.unsplash.com/photo-1592722182765-d3ba07313097?w=600&h=400&fit=crop',
    specs: { 'Состав': 'N15-P15-K15', 'Фасовка': '1 000 кг', 'Форма': 'Гранулы' }
  },
  {
    id: '6', title: 'Семена пшеницы "Астана-2" элита', category: 'Семена', categorySlug: 'seeds',
    price: 195000, location: 'Акмолинская обл.', seller: 'Семена Казахстана', condition: 'Новый',
    description: 'Элитные семена озимой пшеницы сорта "Астана-2". Высокая урожайность до 45 ц/га, морозоустойчивость.',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop',
    specs: { 'Сорт': 'Астана-2', 'Класс': 'Элита', 'Урожайность': 'до 45 ц/га' }
  },
  {
    id: '7', title: 'Трактор МТЗ Беларус 1221.3', category: 'Тракторы', categorySlug: 'tractors',
    price: 18500000, location: 'Павлодар', seller: 'МТЗ-Центр', condition: 'Новый',
    description: 'Универсальный колёсный трактор 130 л.с. Идеален для средних фермерских хозяйств Казахстана.',
    image: 'https://images.unsplash.com/photo-1605338198618-558e7661cf1e?w=600&h=400&fit=crop', featured: true,
    specs: { 'Мощность': '130 л.с.', 'Тяговый класс': '2.0', 'Привод': '4x4' }
  },
  {
    id: '8', title: 'Теплица промышленная 1000 м²', category: 'Теплицы', categorySlug: 'greenhouses',
    price: 15000000, location: 'Туркестан', seller: 'ТеплицаСтрой', condition: 'Новый',
    description: 'Промышленная теплица с поликарбонатным покрытием, системой отопления и вентиляции. Площадь 1000 м².',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=400&fit=crop',
    specs: { 'Площадь': '1 000 м²', 'Покрытие': 'Поликарбонат 8мм', 'Высота': '5 м' }
  },
  {
    id: '9', title: 'Зерносушилка PEDROTTI XL 550', category: 'Зернопереработка', categorySlug: 'grain-processing',
    price: 42000000, location: 'Костанай', seller: 'ЗерноТех', condition: 'Б/У',
    description: 'Мобильная зерносушилка производительностью 55 т/ч. Работает на газе, экономичная, надёжная.',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop',
    specs: { 'Производительность': '55 т/ч', 'Топливо': 'Газ', 'Состояние': 'Хорошее, 2021 г.' }
  },
  {
    id: '10', title: 'Кормораздатчик-смеситель KUHN', category: 'Кормовое оборудование', categorySlug: 'feed-equipment',
    price: 12800000, location: 'Актобе', seller: 'ЖивотноводСнаб', condition: 'Новый',
    description: 'Вертикальный кормосмеситель-раздатчик объёмом 20 м³ для крупных ферм.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
    specs: { 'Объём': '20 м³', 'Тип': 'Вертикальный', 'Ножи': '2 шнека' }
  },
  {
    id: '11', title: 'Силосная яма 500 тонн', category: 'Хранение', categorySlug: 'storage',
    price: 8500000, location: 'Кызылорда', seller: 'СтройАгро', condition: 'Новый',
    description: 'Строительство силосной ямы с бетонными стенами и дренажной системой. Ёмкость 500 тонн.',
    image: 'https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?w=600&h=400&fit=crop',
    specs: { 'Ёмкость': '500 тонн', 'Материал': 'Бетон М400', 'Дренаж': 'Есть' }
  },
  {
    id: '12', title: 'Опрыскиватель самоходный Amazone Pantera', category: 'Уборочная техника', categorySlug: 'harvesters',
    price: 55000000, location: 'Северо-Казахстанская обл.', seller: 'АгроМаш Север', condition: 'Б/У',
    description: 'Самоходный опрыскиватель с шириной захвата 36 м и баком 4000 л. GPS управление.',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=400&fit=crop', featured: true,
    specs: { 'Ширина захвата': '36 м', 'Бак': '4 000 л', 'GPS': 'Да' }
  },
];

export const regions = [
  'Все регионы', 'Астана', 'Алматы', 'Шымкент', 'Костанай', 'Караганда', 'Павлодар',
  'Актобе', 'Туркестан', 'Кызылорда', 'Акмолинская обл.', 'Северо-Казахстанская обл.',
  'Восточно-Казахстанская обл.', 'Жамбылская обл.', 'Западно-Казахстанская обл.',
];

export const newsArticles: NewsArticle[] = [
  { id: '1', title: 'Казахстан увеличит экспорт зерна на 20% в 2025 году', excerpt: 'Министерство сельского хозяйства анонсировало программу увеличения экспортного потенциала зерновых культур.', category: 'Рынок', date: '22 марта 2026', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop', readTime: '5 мин' },
  { id: '2', title: 'Новые субсидии на капельное орошение в Туркестанской области', excerpt: 'Государство компенсирует до 50% затрат на установку систем капельного орошения для фермеров юга Казахстана.', category: 'Субсидии', date: '20 марта 2026', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop', readTime: '3 мин' },
  { id: '3', title: 'Цифровизация сельского хозяйства: опыт Костанайской области', excerpt: 'Как GPS-навигация и дроны меняют работу крупных зерновых хозяйств в северном Казахстане.', category: 'Технологии', date: '18 марта 2026', image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=400&fit=crop', readTime: '7 мин' },
  { id: '4', title: 'Рекордный урожай подсолнечника в Восточном Казахстане', excerpt: 'Фермеры ВКО собрали рекордные 850 тысяч тонн подсолнечника, превысив прошлогодний показатель на 15%.', category: 'Урожай', date: '15 марта 2026', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop', readTime: '4 мин' },
  { id: '5', title: 'Обзор рынка сельхозтехники Казахстана 2026', excerpt: 'Анализ тенденций рынка, популярные бренды и прогнозы на ближайшие годы.', category: 'Аналитика', date: '12 марта 2026', image: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=600&h=400&fit=crop', readTime: '10 мин' },
  { id: '6', title: 'Органическое земледелие: перспективы для Казахстана', excerpt: 'Мировой рынок органических продуктов растёт на 12% ежегодно. Какие возможности это открывает для казахстанских фермеров?', category: 'Тренды', date: '10 марта 2026', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop', readTime: '6 мин' },
];

export const courses: Course[] = [
  { id: '1', title: 'Основы агробизнеса', category: 'Агробизнес', level: 'Начинающий', duration: '12 часов', lessons: 24, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop', instructor: 'Ерлан Сатыбалдиев' },
  { id: '2', title: 'Управление зерноуборочной техникой', category: 'Техника', level: 'Средний', duration: '8 часов', lessons: 16, image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop', instructor: 'Бауыржан Кенжебаев' },
  { id: '3', title: 'Системы орошения для аридных зон', category: 'Растениеводство', level: 'Продвинутый', duration: '15 часов', lessons: 30, image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop', instructor: 'Айгерім Нұрланова' },
  { id: '4', title: 'Субсидии и гранты для фермеров', category: 'Субсидии', level: 'Начинающий', duration: '6 часов', lessons: 12, image: 'https://images.unsplash.com/photo-1592722182765-d3ba07313097?w=600&h=400&fit=crop', instructor: 'Марат Оспанов' },
  { id: '5', title: 'Животноводство: от А до Я', category: 'Животноводство', level: 'Средний', duration: '20 часов', lessons: 40, image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop', instructor: 'Гүлнар Абдрахманова' },
  { id: '6', title: 'Точное земледелие и дроны', category: 'Технологии', level: 'Продвинутый', duration: '10 часов', lessons: 20, image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=400&fit=crop', instructor: 'Дамир Искаков' },
];

export const subsidyPrograms: SubsidyProgram[] = [
  { id: '1', title: 'Субсидирование процентной ставки по кредитам', description: 'Компенсация до 10% годовых по кредитам на покупку сельхозтехники.', amount: 'до 50 000 000 ₸', deadline: '31 декабря 2026', region: 'Все регионы', category: 'Кредитование' },
  { id: '2', title: 'Субсидии на капельное орошение', description: 'Возмещение до 50% затрат на установку систем орошения.', amount: 'до 25 000 000 ₸', deadline: '30 сентября 2026', region: 'Юг Казахстана', category: 'Орошение' },
  { id: '3', title: 'Поддержка начинающих фермеров', description: 'Грантовая программа для фермеров, начинающих деятельность.', amount: 'до 8 000 000 ₸', deadline: '1 июня 2026', region: 'Все регионы', category: 'Гранты' },
  { id: '4', title: 'Субсидии на семена и удобрения', description: 'Частичная компенсация затрат на элитные семена и удобрения.', amount: 'до 3 000 000 ₸', deadline: '1 апреля 2026', region: 'Все регионы', category: 'Растениеводство' },
  { id: '5', title: 'Программа развития животноводства', description: 'Субсидирование покупки племенного скота и оборудования.', amount: 'до 30 000 000 ₸', deadline: '31 декабря 2026', region: 'Все регионы', category: 'Животноводство' },
];

export const testimonials = [
  { name: 'Ерлан Тажибаев', role: 'Фермер, Костанайская область', text: 'Agrosauda помогла мне найти трактор на 30% дешевле рыночной цены. Безопасная сделка — это отличная гарантия!', avatar: 'ЕТ' },
  { name: 'Айгуль Сериккызы', role: 'КХ "Береке", Алматинская обл.', text: 'Благодаря платформе мы нашли покупателей для нашего урожая напрямую, без посредников. Рекомендую!', avatar: 'АС' },
  { name: 'Бауыржан Касымов', role: 'ТОО "АгроСтар", Акмолинская обл.', text: 'Субсидийный ассистент помог оформить документы за неделю вместо месяца. Получили грант на 8 млн тенге!', avatar: 'БК' },
];

export const stats = [
  { value: 12500, label: 'Товаров на платформе', suffix: '+' },
  { value: 4800, label: 'Активных продавцов', suffix: '+' },
  { value: 850, label: 'Сделок в месяц', suffix: '+' },
  { value: 14, label: 'Регионов Казахстана', suffix: '' },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-KZ').format(price) + ' ₸';
}
