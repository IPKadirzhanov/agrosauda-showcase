// Translation maps for mockData and ClassifiedsPage hardcoded content
// Keyed by language code

type LangCode = 'ru' | 'kz' | 'en' | 'cn';

interface DataTranslations {
  categories: Record<string, string>; // keyed by slug
  regions: string[];
  conditions: { new: string; used: string; restored: string };
  stats: { label1: string; label2: string; label3: string; label4: string };
  products: Record<string, { title: string; description: string; category: string; location: string; seller: string; specs?: Record<string, string> }>;
  news: Record<string, { title: string; excerpt: string; category: string; date: string; readTime: string }>;
  courses: Record<string, { title: string; category: string; level: string; duration: string; instructor: string }>;
  subsidies: Record<string, { title: string; description: string; amount: string; deadline: string; region: string; category: string }>;
  testimonials: { name: string; role: string; text: string }[];
  classifieds: {
    categoryGroups: { title: string; items: { icon: string; name: string; count: number }[] }[];
    popularCategories: { icon: string; name: string; count: number }[];
    sampleListings: { title: string; price: string; location: string; condition: string; img: string; category: string }[];
  };
}

const ru: DataTranslations = {
  categories: {
    tractors: 'Тракторы', combines: 'Комбайны', seeders: 'Сеялки', harvesters: 'Уборочная техника',
    irrigation: 'Системы орошения', fertilizers: 'Удобрения', seeds: 'Семена', livestock: 'Животноводство',
    greenhouses: 'Теплицы', 'spare-parts': 'Запчасти', 'grain-processing': 'Зернопереработка',
    'feed-equipment': 'Кормовое оборудование', storage: 'Хранение', 'farm-tools': 'Инструменты',
  },
  regions: [
    'Все регионы', 'Астана', 'Алматы', 'Шымкент', 'Костанай', 'Караганда', 'Павлодар',
    'Актобе', 'Туркестан', 'Кызылорда', 'Акмолинская обл.', 'Северо-Казахстанская обл.',
    'Восточно-Казахстанская обл.', 'Жамбылская обл.', 'Западно-Казахстанская обл.',
  ],
  conditions: { new: 'Новый', used: 'Б/У', restored: 'Восстановленный' },
  stats: { label1: 'Товаров на платформе', label2: 'Активных продавцов', label3: 'Сделок в месяц', label4: 'Регионов Казахстана' },
  products: {
    '1': { title: 'Трактор John Deere 8R 410', description: 'Мощный трактор 410 л.с. с интеллектуальной системой управления, GPS навигацией и автоматическим рулевым управлением. Идеален для крупных хозяйств.', category: 'Тракторы', location: 'Астана', seller: 'АгроТех KZ', specs: { 'Мощность': '410 л.с.', 'Год': '2024', 'Двигатель': 'PowerTech PSS 13.6L', 'Трансмиссия': 'e23 PowerShift' } },
    '2': { title: 'Комбайн CLAAS Lexion 8900', description: 'Флагманский зерноуборочный комбайн с системой CEMOS AUTOMATIC и пропускной способностью до 80 т/ч.', category: 'Комбайны', location: 'Костанай', seller: 'КазАгроМаш', specs: { 'Пропускная способность': '80 т/ч', 'Бункер': '18 000 л', 'Мощность': '790 л.с.' } },
    '3': { title: 'Сеялка пневматическая Amazone Cirrus 6003-2', description: 'Универсальная пневматическая сеялка для зерновых, мелкосемянных и бобовых культур. Ширина захвата 6 м.', category: 'Сеялки', location: 'Караганда', seller: 'ФермерСнаб', specs: { 'Ширина захвата': '6 м', 'Бункер': '3 000 л', 'Тип': 'Пневматическая' } },
    '4': { title: 'Система капельного орошения Netafim', description: 'Комплексная система капельного орошения для 50 гектаров. Включает фильтры, насосы и управляющую автоматику.', category: 'Системы орошения', location: 'Алматы', seller: 'ИрригацияПлюс', specs: { 'Площадь': '50 га', 'Тип': 'Капельное', 'Управление': 'Автоматическое' } },
    '5': { title: 'Удобрение NPK 15-15-15 (тонна)', description: 'Комплексное минеральное удобрение с равным содержанием азота, фосфора и калия. Подходит для всех культур.', category: 'Удобрения', location: 'Шымкент', seller: 'АгроХим Казахстан', specs: { 'Состав': 'N15-P15-K15', 'Фасовка': '1 000 кг', 'Форма': 'Гранулы' } },
    '6': { title: 'Семена пшеницы "Астана-2" элита', description: 'Элитные семена озимой пшеницы сорта "Астана-2". Высокая урожайность до 45 ц/га, морозоустойчивость.', category: 'Семена', location: 'Акмолинская обл.', seller: 'Семена Казахстана', specs: { 'Сорт': 'Астана-2', 'Класс': 'Элита', 'Урожайность': 'до 45 ц/га' } },
    '7': { title: 'Трактор МТЗ Беларус 1221.3', description: 'Универсальный колёсный трактор 130 л.с. Идеален для средних фермерских хозяйств Казахстана.', category: 'Тракторы', location: 'Павлодар', seller: 'МТЗ-Центр', specs: { 'Мощность': '130 л.с.', 'Тяговый класс': '2.0', 'Привод': '4x4' } },
    '8': { title: 'Теплица промышленная 1000 м²', description: 'Промышленная теплица с поликарбонатным покрытием, системой отопления и вентиляции. Площадь 1000 м².', category: 'Теплицы', location: 'Туркестан', seller: 'ТеплицаСтрой', specs: { 'Площадь': '1 000 м²', 'Покрытие': 'Поликарбонат 8мм', 'Высота': '5 м' } },
    '9': { title: 'Зерносушилка PEDROTTI XL 550', description: 'Мобильная зерносушилка производительностью 55 т/ч. Работает на газе, экономичная, надёжная.', category: 'Зернопереработка', location: 'Костанай', seller: 'ЗерноТех', specs: { 'Производительность': '55 т/ч', 'Топливо': 'Газ', 'Состояние': 'Хорошее, 2021 г.' } },
    '10': { title: 'Кормораздатчик-смеситель KUHN', description: 'Вертикальный кормосмеситель-раздатчик объёмом 20 м³ для крупных ферм.', category: 'Кормовое оборудование', location: 'Актобе', seller: 'ЖивотноводСнаб', specs: { 'Объём': '20 м³', 'Тип': 'Вертикальный', 'Ножи': '2 шнека' } },
    '11': { title: 'Силосная яма 500 тонн', description: 'Строительство силосной ямы с бетонными стенами и дренажной системой. Ёмкость 500 тонн.', category: 'Хранение', location: 'Кызылорда', seller: 'СтройАгро', specs: { 'Ёмкость': '500 тонн', 'Материал': 'Бетон М400', 'Дренаж': 'Есть' } },
    '12': { title: 'Опрыскиватель самоходный Amazone Pantera', description: 'Самоходный опрыскиватель с шириной захвата 36 м и баком 4000 л. GPS управление.', category: 'Уборочная техника', location: 'Северо-Казахстанская обл.', seller: 'АгроМаш Север', specs: { 'Ширина захвата': '36 м', 'Бак': '4 000 л', 'GPS': 'Да' } },
  },
  news: {
    '1': { title: 'Казахстан увеличит экспорт зерна на 20% в 2025 году', excerpt: 'Министерство сельского хозяйства анонсировало программу увеличения экспортного потенциала зерновых культур.', category: 'Рынок', date: '22 марта 2026', readTime: '5 мин' },
    '2': { title: 'Новые субсидии на капельное орошение в Туркестанской области', excerpt: 'Государство компенсирует до 50% затрат на установку систем капельного орошения для фермеров юга Казахстана.', category: 'Субсидии', date: '20 марта 2026', readTime: '3 мин' },
    '3': { title: 'Цифровизация сельского хозяйства: опыт Костанайской области', excerpt: 'Как GPS-навигация и дроны меняют работу крупных зерновых хозяйств в северном Казахстане.', category: 'Технологии', date: '18 марта 2026', readTime: '7 мин' },
    '4': { title: 'Рекордный урожай подсолнечника в Восточном Казахстане', excerpt: 'Фермеры ВКО собрали рекордные 850 тысяч тонн подсолнечника, превысив прошлогодний показатель на 15%.', category: 'Урожай', date: '15 марта 2026', readTime: '4 мин' },
    '5': { title: 'Обзор рынка сельхозтехники Казахстана 2026', excerpt: 'Анализ тенденций рынка, популярные бренды и прогнозы на ближайшие годы.', category: 'Аналитика', date: '12 марта 2026', readTime: '10 мин' },
    '6': { title: 'Органическое земледелие: перспективы для Казахстана', excerpt: 'Мировой рынок органических продуктов растёт на 12% ежегодно. Какие возможности это открывает для казахстанских фермеров?', category: 'Тренды', date: '10 марта 2026', readTime: '6 мин' },
  },
  courses: {
    '1': { title: 'Основы агробизнеса', category: 'Агробизнес', level: 'Начинающий', duration: '12 часов', instructor: 'Ерлан Сатыбалдиев' },
    '2': { title: 'Управление зерноуборочной техникой', category: 'Техника', level: 'Средний', duration: '8 часов', instructor: 'Бауыржан Кенжебаев' },
    '3': { title: 'Системы орошения для аридных зон', category: 'Растениеводство', level: 'Продвинутый', duration: '15 часов', instructor: 'Айгерім Нұрланова' },
    '4': { title: 'Субсидии и гранты для фермеров', category: 'Субсидии', level: 'Начинающий', duration: '6 часов', instructor: 'Марат Оспанов' },
    '5': { title: 'Животноводство: от А до Я', category: 'Животноводство', level: 'Средний', duration: '20 часов', instructor: 'Гүлнар Абдрахманова' },
    '6': { title: 'Точное земледелие и дроны', category: 'Технологии', level: 'Продвинутый', duration: '10 часов', instructor: 'Дамир Искаков' },
  },
  subsidies: {
    '1': { title: 'Субсидирование процентной ставки по кредитам', description: 'Компенсация до 10% годовых по кредитам на покупку сельхозтехники.', amount: 'до 50 000 000 ₸', deadline: '31 декабря 2026', region: 'Все регионы', category: 'Кредитование' },
    '2': { title: 'Субсидии на капельное орошение', description: 'Возмещение до 50% затрат на установку систем орошения.', amount: 'до 25 000 000 ₸', deadline: '30 сентября 2026', region: 'Юг Казахстана', category: 'Орошение' },
    '3': { title: 'Поддержка начинающих фермеров', description: 'Грантовая программа для фермеров, начинающих деятельность.', amount: 'до 8 000 000 ₸', deadline: '1 июня 2026', region: 'Все регионы', category: 'Гранты' },
    '4': { title: 'Субсидии на семена и удобрения', description: 'Частичная компенсация затрат на элитные семена и удобрения.', amount: 'до 3 000 000 ₸', deadline: '1 апреля 2026', region: 'Все регионы', category: 'Растениеводство' },
    '5': { title: 'Программа развития животноводства', description: 'Субсидирование покупки племенного скота и оборудования.', amount: 'до 30 000 000 ₸', deadline: '31 декабря 2026', region: 'Все регионы', category: 'Животноводство' },
  },
  testimonials: [
    { name: 'Ерлан Тажибаев', role: 'Фермер, Костанайская область', text: 'Agrosauda помогла мне найти трактор на 30% дешевле рыночной цены. Безопасная сделка — это отличная гарантия!' },
    { name: 'Айгуль Сериккызы', role: 'КХ "Береке", Алматинская обл.', text: 'Благодаря платформе мы нашли покупателей для нашего урожая напрямую, без посредников. Рекомендую!' },
    { name: 'Бауыржан Касымов', role: 'ТОО "АгроСтар", Акмолинская обл.', text: 'Субсидийный ассистент помог оформить документы за неделю вместо месяца. Получили грант на 8 млн тенге!' },
  ],
  classifieds: {
    categoryGroups: [
      { title: 'Сельхозтехника', items: [
        { icon: '🚜', name: 'Тракторы', count: 324 }, { icon: '🚜', name: 'Мини-тракторы', count: 156 },
        { icon: '🌾', name: 'Комбайны', count: 89 }, { icon: '⚙️', name: 'Жатки', count: 67 },
        { icon: '🌱', name: 'Сеялки', count: 112 }, { icon: '🔧', name: 'Плуги', count: 98 },
        { icon: '⛏️', name: 'Культиваторы', count: 134 }, { icon: '🚛', name: 'Прицепы', count: 201 },
        { icon: '💨', name: 'Опрыскиватели', count: 78 },
      ]},
      { title: 'Полив и ирригация', items: [
        { icon: '💧', name: 'Системы полива', count: 145 }, { icon: '🔌', name: 'Водяные насосы', count: 210 },
        { icon: '🏗️', name: 'Тепличное оборуд.', count: 87 }, { icon: '🏠', name: 'Теплицы', count: 64 },
      ]},
      { title: 'Семена и корма', items: [
        { icon: '🌾', name: 'Семена', count: 430 }, { icon: '🌽', name: 'Зерно', count: 312 },
        { icon: '🥬', name: 'Корма', count: 189 }, { icon: '🧪', name: 'Удобрения', count: 267 },
        { icon: '🛡️', name: 'Пестициды', count: 98 }, { icon: '⚗️', name: 'Агрохимия', count: 134 },
        { icon: '🪨', name: 'Почвогрунты', count: 56 },
      ]},
      { title: 'Животноводство', items: [
        { icon: '🐄', name: 'Оборуд. животновод.', count: 178 }, { icon: '🥛', name: 'Молочное оборуд.', count: 92 },
        { icon: '🐔', name: 'Птицеводство', count: 67 }, { icon: '🍽️', name: 'Кормовые системы', count: 45 },
        { icon: '💊', name: 'Ветеринарные товары', count: 134 },
      ]},
      { title: 'Запчасти и расходники', items: [
        { icon: '⚙️', name: 'Запчасти', count: 567 }, { icon: '🔧', name: 'Детали двигателей', count: 234 },
        { icon: '🛞', name: 'Шины для с/х техники', count: 189 }, { icon: '🔋', name: 'Аккумуляторы', count: 112 },
        { icon: '🛢️', name: 'Масла и смазки', count: 156 },
      ]},
      { title: 'Хранение и переработка', items: [
        { icon: '🏭', name: 'Складское оборуд.', count: 78 }, { icon: '🌾', name: 'Зернохранилища', count: 45 },
        { icon: '🔥', name: 'Сушильное оборуд.', count: 34 }, { icon: '📦', name: 'Упаковочное оборуд.', count: 56 },
        { icon: '🍎', name: 'Переработка фруктов', count: 29 }, { icon: '🥕', name: 'Переработка овощей', count: 23 },
      ]},
      { title: 'Инструменты и энергия', items: [
        { icon: '🔨', name: 'Ручной инструмент', count: 312 }, { icon: '⚡', name: 'Электроинструмент', count: 234 },
        { icon: '🔌', name: 'Генераторы', count: 89 }, { icon: '☀️', name: 'Солнечные панели', count: 67 },
        { icon: '🧱', name: 'Стройматериалы', count: 145 }, { icon: '🏗️', name: 'Ограждения', count: 98 },
      ]},
      { title: 'Специализированное', items: [
        { icon: '🐝', name: 'Пчеловодство', count: 78 }, { icon: '🐟', name: 'Рыбоводство', count: 34 },
        { icon: '🌳', name: 'Садовое оборуд.', count: 112 }, { icon: '🍇', name: 'Оборуд. для садов', count: 45 },
        { icon: '🐮', name: 'Оборуд. коровников', count: 56 }, { icon: '🗼', name: 'Силосное оборуд.', count: 38 },
      ]},
      { title: 'Услуги и прочее', items: [
        { icon: '🚚', name: 'Транспортные услуги', count: 167 }, { icon: '🔧', name: 'Ремонт техники', count: 145 },
        { icon: '📋', name: 'Аренда техники', count: 89 }, { icon: '🏞️', name: 'Земельные участки', count: 234 },
        { icon: '👨‍🌾', name: 'Фермерские услуги', count: 78 }, { icon: '📦', name: 'Прочие агротовары', count: 312 },
      ]},
    ],
    popularCategories: [
      { icon: '🚜', name: 'Тракторы', count: 324 }, { icon: '⚙️', name: 'Запчасти', count: 567 },
      { icon: '🌾', name: 'Семена', count: 430 }, { icon: '🌽', name: 'Зерно', count: 312 },
      { icon: '💧', name: 'Системы полива', count: 145 }, { icon: '🧪', name: 'Удобрения', count: 267 },
    ],
    sampleListings: [
      { title: 'Трактор МТЗ-82.1 2023 года', price: '12 500 000 ₸', location: 'Костанай', condition: 'Б/У', img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop', category: 'Тракторы' },
      { title: 'Семена пшеницы "Астана-2"', price: '450 000 ₸', location: 'Акмолинская обл.', condition: 'Новый', img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop', category: 'Семена' },
      { title: 'Система капельного полива 10 га', price: '3 200 000 ₸', location: 'Алматинская обл.', condition: 'Новый', img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop', category: 'Полив' },
      { title: 'Комбайн Claas Tucano 2021', price: '45 000 000 ₸', location: 'Северо-Казахст.', condition: 'Б/У', img: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c10?w=400&h=300&fit=crop', category: 'Комбайны' },
      { title: 'Удобрение КАС-32, 20 тонн', price: '2 800 000 ₸', location: 'Караганда', condition: 'Новый', img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop', category: 'Удобрения' },
      { title: 'Генератор дизельный 50 кВт', price: '1 950 000 ₸', location: 'Шымкент', condition: 'Новый', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop', category: 'Генераторы' },
    ],
  },
};

const en: DataTranslations = {
  categories: {
    tractors: 'Tractors', combines: 'Combines', seeders: 'Seeders', harvesters: 'Harvesting Equipment',
    irrigation: 'Irrigation Systems', fertilizers: 'Fertilizers', seeds: 'Seeds', livestock: 'Livestock',
    greenhouses: 'Greenhouses', 'spare-parts': 'Spare Parts', 'grain-processing': 'Grain Processing',
    'feed-equipment': 'Feed Equipment', storage: 'Storage', 'farm-tools': 'Farm Tools',
  },
  regions: [
    'All Regions', 'Astana', 'Almaty', 'Shymkent', 'Kostanay', 'Karaganda', 'Pavlodar',
    'Aktobe', 'Turkestan', 'Kyzylorda', 'Akmola Region', 'North Kazakhstan Region',
    'East Kazakhstan Region', 'Zhambyl Region', 'West Kazakhstan Region',
  ],
  conditions: { new: 'New', used: 'Used', restored: 'Refurbished' },
  stats: { label1: 'Products on platform', label2: 'Active sellers', label3: 'Deals per month', label4: 'Regions of Kazakhstan' },
  products: {
    '1': { title: 'John Deere 8R 410 Tractor', description: 'Powerful 410 HP tractor with intelligent control system, GPS navigation and automatic steering. Ideal for large farms.', category: 'Tractors', location: 'Astana', seller: 'AgroTech KZ', specs: { 'Power': '410 HP', 'Year': '2024', 'Engine': 'PowerTech PSS 13.6L', 'Transmission': 'e23 PowerShift' } },
    '2': { title: 'CLAAS Lexion 8900 Combine', description: 'Flagship grain harvester with CEMOS AUTOMATIC system and throughput up to 80 t/h.', category: 'Combines', location: 'Kostanay', seller: 'KazAgroMash', specs: { 'Throughput': '80 t/h', 'Hopper': '18,000 L', 'Power': '790 HP' } },
    '3': { title: 'Amazone Cirrus 6003-2 Pneumatic Seeder', description: 'Universal pneumatic seeder for grain, small-seed and legume crops. Working width 6 m.', category: 'Seeders', location: 'Karaganda', seller: 'FarmerSupply', specs: { 'Working width': '6 m', 'Hopper': '3,000 L', 'Type': 'Pneumatic' } },
    '4': { title: 'Netafim Drip Irrigation System', description: 'Complete drip irrigation system for 50 hectares. Includes filters, pumps and control automation.', category: 'Irrigation Systems', location: 'Almaty', seller: 'IrrigationPlus', specs: { 'Area': '50 ha', 'Type': 'Drip', 'Control': 'Automatic' } },
    '5': { title: 'NPK 15-15-15 Fertilizer (ton)', description: 'Complex mineral fertilizer with equal nitrogen, phosphorus and potassium content. Suitable for all crops.', category: 'Fertilizers', location: 'Shymkent', seller: 'AgroChem Kazakhstan', specs: { 'Composition': 'N15-P15-K15', 'Packaging': '1,000 kg', 'Form': 'Granules' } },
    '6': { title: 'Wheat Seeds "Astana-2" Elite', description: 'Elite winter wheat seeds variety "Astana-2". High yield up to 4.5 t/ha, frost resistant.', category: 'Seeds', location: 'Akmola Region', seller: 'Seeds of Kazakhstan', specs: { 'Variety': 'Astana-2', 'Class': 'Elite', 'Yield': 'up to 4.5 t/ha' } },
    '7': { title: 'MTZ Belarus 1221.3 Tractor', description: 'Universal wheeled tractor 130 HP. Ideal for medium-sized farms in Kazakhstan.', category: 'Tractors', location: 'Pavlodar', seller: 'MTZ Center', specs: { 'Power': '130 HP', 'Traction class': '2.0', 'Drive': '4x4' } },
    '8': { title: 'Industrial Greenhouse 1000 m²', description: 'Industrial greenhouse with polycarbonate covering, heating and ventilation system. Area 1000 m².', category: 'Greenhouses', location: 'Turkestan', seller: 'GreenBuild', specs: { 'Area': '1,000 m²', 'Covering': 'Polycarbonate 8mm', 'Height': '5 m' } },
    '9': { title: 'PEDROTTI XL 550 Grain Dryer', description: 'Mobile grain dryer with 55 t/h capacity. Gas-powered, economical, reliable.', category: 'Grain Processing', location: 'Kostanay', seller: 'GrainTech', specs: { 'Capacity': '55 t/h', 'Fuel': 'Gas', 'Condition': 'Good, 2021' } },
    '10': { title: 'KUHN Feed Mixer-Distributor', description: 'Vertical feed mixer-distributor with 20 m³ volume for large farms.', category: 'Feed Equipment', location: 'Aktobe', seller: 'LivestockSupply', specs: { 'Volume': '20 m³', 'Type': 'Vertical', 'Augers': '2 augers' } },
    '11': { title: 'Silage Pit 500 tons', description: 'Construction of silage pit with concrete walls and drainage system. Capacity 500 tons.', category: 'Storage', location: 'Kyzylorda', seller: 'AgroBuild', specs: { 'Capacity': '500 tons', 'Material': 'Concrete M400', 'Drainage': 'Yes' } },
    '12': { title: 'Amazone Pantera Self-propelled Sprayer', description: 'Self-propelled sprayer with 36 m boom width and 4000 L tank. GPS control.', category: 'Harvesting Equipment', location: 'North Kazakhstan Region', seller: 'AgroMash North', specs: { 'Boom width': '36 m', 'Tank': '4,000 L', 'GPS': 'Yes' } },
  },
  news: {
    '1': { title: 'Kazakhstan to increase grain exports by 20% in 2025', excerpt: 'Ministry of Agriculture announced a program to increase grain export potential.', category: 'Market', date: 'March 22, 2026', readTime: '5 min' },
    '2': { title: 'New subsidies for drip irrigation in Turkestan region', excerpt: 'Government compensates up to 50% of costs for installing drip irrigation systems for farmers in southern Kazakhstan.', category: 'Subsidies', date: 'March 20, 2026', readTime: '3 min' },
    '3': { title: 'Digitalization of agriculture: Kostanay region experience', excerpt: 'How GPS navigation and drones are changing the work of large grain farms in northern Kazakhstan.', category: 'Technology', date: 'March 18, 2026', readTime: '7 min' },
    '4': { title: 'Record sunflower harvest in East Kazakhstan', excerpt: 'EKR farmers harvested a record 850 thousand tons of sunflower, exceeding last year by 15%.', category: 'Harvest', date: 'March 15, 2026', readTime: '4 min' },
    '5': { title: 'Agricultural machinery market review Kazakhstan 2026', excerpt: 'Market trend analysis, popular brands and forecasts for the coming years.', category: 'Analytics', date: 'March 12, 2026', readTime: '10 min' },
    '6': { title: 'Organic farming: prospects for Kazakhstan', excerpt: 'The global organic products market is growing by 12% annually. What opportunities does this open for Kazakh farmers?', category: 'Trends', date: 'March 10, 2026', readTime: '6 min' },
  },
  courses: {
    '1': { title: 'Agribusiness Fundamentals', category: 'Agribusiness', level: 'Beginner', duration: '12 hours', instructor: 'Yerlan Satybaldiyev' },
    '2': { title: 'Combine Harvester Operation', category: 'Machinery', level: 'Intermediate', duration: '8 hours', instructor: 'Bauyrzhan Kenzhebayev' },
    '3': { title: 'Irrigation Systems for Arid Zones', category: 'Crop Science', level: 'Advanced', duration: '15 hours', instructor: 'Aigerim Nurlanova' },
    '4': { title: 'Subsidies and Grants for Farmers', category: 'Subsidies', level: 'Beginner', duration: '6 hours', instructor: 'Marat Ospanov' },
    '5': { title: 'Livestock Farming: A to Z', category: 'Livestock', level: 'Intermediate', duration: '20 hours', instructor: 'Gulnar Abdrakhmanova' },
    '6': { title: 'Precision Farming and Drones', category: 'Technology', level: 'Advanced', duration: '10 hours', instructor: 'Damir Iskakov' },
  },
  subsidies: {
    '1': { title: 'Loan Interest Rate Subsidies', description: 'Compensation of up to 10% annual interest on loans for purchasing agricultural machinery.', amount: 'up to 50,000,000 ₸', deadline: 'December 31, 2026', region: 'All Regions', category: 'Lending' },
    '2': { title: 'Drip Irrigation Subsidies', description: 'Reimbursement of up to 50% of costs for installing irrigation systems.', amount: 'up to 25,000,000 ₸', deadline: 'September 30, 2026', region: 'South Kazakhstan', category: 'Irrigation' },
    '3': { title: 'Beginner Farmer Support', description: 'Grant program for farmers starting their business.', amount: 'up to 8,000,000 ₸', deadline: 'June 1, 2026', region: 'All Regions', category: 'Grants' },
    '4': { title: 'Seeds and Fertilizer Subsidies', description: 'Partial compensation for costs of elite seeds and fertilizers.', amount: 'up to 3,000,000 ₸', deadline: 'April 1, 2026', region: 'All Regions', category: 'Crop Science' },
    '5': { title: 'Livestock Development Program', description: 'Subsidization for purchasing breeding livestock and equipment.', amount: 'up to 30,000,000 ₸', deadline: 'December 31, 2026', region: 'All Regions', category: 'Livestock' },
  },
  testimonials: [
    { name: 'Yerlan Tazhibayev', role: 'Farmer, Kostanay Region', text: 'Agrosauda helped me find a tractor 30% below market price. Safe deal is a great guarantee!' },
    { name: 'Aigul Serikkizi', role: 'Farm "Bereke", Almaty Region', text: 'Thanks to the platform, we found buyers for our harvest directly, without middlemen. Highly recommend!' },
    { name: 'Bauyrzhan Kasymov', role: 'AgroStar LLC, Akmola Region', text: 'The subsidy assistant helped process documents in a week instead of a month. We received an 8 million tenge grant!' },
  ],
  classifieds: {
    categoryGroups: [
      { title: 'Agricultural Machinery', items: [
        { icon: '🚜', name: 'Tractors', count: 324 }, { icon: '🚜', name: 'Mini Tractors', count: 156 },
        { icon: '🌾', name: 'Combines', count: 89 }, { icon: '⚙️', name: 'Headers', count: 67 },
        { icon: '🌱', name: 'Seeders', count: 112 }, { icon: '🔧', name: 'Plows', count: 98 },
        { icon: '⛏️', name: 'Cultivators', count: 134 }, { icon: '🚛', name: 'Trailers', count: 201 },
        { icon: '💨', name: 'Sprayers', count: 78 },
      ]},
      { title: 'Irrigation & Watering', items: [
        { icon: '💧', name: 'Irrigation Systems', count: 145 }, { icon: '🔌', name: 'Water Pumps', count: 210 },
        { icon: '🏗️', name: 'Greenhouse Equip.', count: 87 }, { icon: '🏠', name: 'Greenhouses', count: 64 },
      ]},
      { title: 'Seeds & Feed', items: [
        { icon: '🌾', name: 'Seeds', count: 430 }, { icon: '🌽', name: 'Grain', count: 312 },
        { icon: '🥬', name: 'Feed', count: 189 }, { icon: '🧪', name: 'Fertilizers', count: 267 },
        { icon: '🛡️', name: 'Pesticides', count: 98 }, { icon: '⚗️', name: 'Agrochemistry', count: 134 },
        { icon: '🪨', name: 'Soil Substrates', count: 56 },
      ]},
      { title: 'Livestock', items: [
        { icon: '🐄', name: 'Livestock Equip.', count: 178 }, { icon: '🥛', name: 'Dairy Equip.', count: 92 },
        { icon: '🐔', name: 'Poultry Farming', count: 67 }, { icon: '🍽️', name: 'Feed Systems', count: 45 },
        { icon: '💊', name: 'Veterinary Products', count: 134 },
      ]},
      { title: 'Parts & Consumables', items: [
        { icon: '⚙️', name: 'Spare Parts', count: 567 }, { icon: '🔧', name: 'Engine Parts', count: 234 },
        { icon: '🛞', name: 'Agri Tires', count: 189 }, { icon: '🔋', name: 'Batteries', count: 112 },
        { icon: '🛢️', name: 'Oils & Lubricants', count: 156 },
      ]},
      { title: 'Storage & Processing', items: [
        { icon: '🏭', name: 'Warehouse Equip.', count: 78 }, { icon: '🌾', name: 'Grain Storage', count: 45 },
        { icon: '🔥', name: 'Drying Equip.', count: 34 }, { icon: '📦', name: 'Packaging Equip.', count: 56 },
        { icon: '🍎', name: 'Fruit Processing', count: 29 }, { icon: '🥕', name: 'Vegetable Processing', count: 23 },
      ]},
      { title: 'Tools & Energy', items: [
        { icon: '🔨', name: 'Hand Tools', count: 312 }, { icon: '⚡', name: 'Power Tools', count: 234 },
        { icon: '🔌', name: 'Generators', count: 89 }, { icon: '☀️', name: 'Solar Panels', count: 67 },
        { icon: '🧱', name: 'Building Materials', count: 145 }, { icon: '🏗️', name: 'Fencing', count: 98 },
      ]},
      { title: 'Specialized', items: [
        { icon: '🐝', name: 'Beekeeping', count: 78 }, { icon: '🐟', name: 'Fish Farming', count: 34 },
        { icon: '🌳', name: 'Garden Equip.', count: 112 }, { icon: '🍇', name: 'Orchard Equip.', count: 45 },
        { icon: '🐮', name: 'Barn Equip.', count: 56 }, { icon: '🗼', name: 'Silage Equip.', count: 38 },
      ]},
      { title: 'Services & Other', items: [
        { icon: '🚚', name: 'Transport Services', count: 167 }, { icon: '🔧', name: 'Equipment Repair', count: 145 },
        { icon: '📋', name: 'Equipment Rental', count: 89 }, { icon: '🏞️', name: 'Land Plots', count: 234 },
        { icon: '👨‍🌾', name: 'Farming Services', count: 78 }, { icon: '📦', name: 'Other Agri Products', count: 312 },
      ]},
    ],
    popularCategories: [
      { icon: '🚜', name: 'Tractors', count: 324 }, { icon: '⚙️', name: 'Spare Parts', count: 567 },
      { icon: '🌾', name: 'Seeds', count: 430 }, { icon: '🌽', name: 'Grain', count: 312 },
      { icon: '💧', name: 'Irrigation', count: 145 }, { icon: '🧪', name: 'Fertilizers', count: 267 },
    ],
    sampleListings: [
      { title: 'MTZ-82.1 Tractor 2023', price: '12,500,000 ₸', location: 'Kostanay', condition: 'Used', img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop', category: 'Tractors' },
      { title: 'Wheat Seeds "Astana-2"', price: '450,000 ₸', location: 'Akmola Region', condition: 'New', img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop', category: 'Seeds' },
      { title: 'Drip Irrigation System 10 ha', price: '3,200,000 ₸', location: 'Almaty Region', condition: 'New', img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop', category: 'Irrigation' },
      { title: 'Claas Tucano Combine 2021', price: '45,000,000 ₸', location: 'North Kazakhstan', condition: 'Used', img: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c10?w=400&h=300&fit=crop', category: 'Combines' },
      { title: 'UAN-32 Fertilizer, 20 tons', price: '2,800,000 ₸', location: 'Karaganda', condition: 'New', img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop', category: 'Fertilizers' },
      { title: 'Diesel Generator 50 kW', price: '1,950,000 ₸', location: 'Shymkent', condition: 'New', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop', category: 'Generators' },
    ],
  },
};

const kz: DataTranslations = {
  categories: {
    tractors: 'Тракторлар', combines: 'Комбайндар', seeders: 'Сеуіштер', harvesters: 'Жинау техникасы',
    irrigation: 'Суару жүйелері', fertilizers: 'Тыңайтқыштар', seeds: 'Тұқымдар', livestock: 'Мал шаруашылығы',
    greenhouses: 'Жылыжайлар', 'spare-parts': 'Қосалқы бөлшектер', 'grain-processing': 'Астық өңдеу',
    'feed-equipment': 'Жем жабдықтары', storage: 'Сақтау', 'farm-tools': 'Құралдар',
  },
  regions: [
    'Барлық өңірлер', 'Астана', 'Алматы', 'Шымкент', 'Қостанай', 'Қарағанды', 'Павлодар',
    'Ақтөбе', 'Түркістан', 'Қызылорда', 'Ақмола облысы', 'Солтүстік Қазақстан облысы',
    'Шығыс Қазақстан облысы', 'Жамбыл облысы', 'Батыс Қазақстан облысы',
  ],
  conditions: { new: 'Жаңа', used: 'Б/У', restored: 'Қалпына келтірілген' },
  stats: { label1: 'Платформадағы тауарлар', label2: 'Белсенді сатушылар', label3: 'Айлық мәмілелер', label4: 'Қазақстан өңірлері' },
  products: {
    '1': { title: 'John Deere 8R 410 тракторы', description: 'Интеллектуалды басқару жүйесі, GPS навигациясы бар қуатты 410 а.к. трактор. Ірі шаруашылықтарға арналған.', category: 'Тракторлар', location: 'Астана', seller: 'АгроТех KZ', specs: { 'Қуат': '410 а.к.', 'Жыл': '2024', 'Қозғалтқыш': 'PowerTech PSS 13.6L', 'Трансмиссия': 'e23 PowerShift' } },
    '2': { title: 'CLAAS Lexion 8900 комбайны', description: 'CEMOS AUTOMATIC жүйесі бар жетекші астық жинау комбайны, өнімділігі 80 т/сағ дейін.', category: 'Комбайндар', location: 'Қостанай', seller: 'ҚазАгроМаш', specs: { 'Өнімділік': '80 т/сағ', 'Бункер': '18 000 л', 'Қуат': '790 а.к.' } },
    '3': { title: 'Amazone Cirrus 6003-2 пневматикалық сеуіш', description: 'Астық, ұсақ тұқымды және бұршақ дақылдарына арналған әмбебап сеуіш. Ені 6 м.', category: 'Сеуіштер', location: 'Қарағанды', seller: 'ФермерСнаб', specs: { 'Ені': '6 м', 'Бункер': '3 000 л', 'Түрі': 'Пневматикалық' } },
    '4': { title: 'Netafim тамшылатып суару жүйесі', description: '50 гектарға арналған кешенді тамшылатып суару жүйесі. Сүзгілер, сорғылар кіреді.', category: 'Суару жүйелері', location: 'Алматы', seller: 'ИрригацияПлюс', specs: { 'Аумақ': '50 га', 'Түрі': 'Тамшылатып', 'Басқару': 'Автоматты' } },
    '5': { title: 'NPK 15-15-15 тыңайтқышы (тонна)', description: 'Азот, фосфор және калий мөлшері тең кешенді минералды тыңайтқыш.', category: 'Тыңайтқыштар', location: 'Шымкент', seller: 'АгроХим Қазақстан', specs: { 'Құрамы': 'N15-P15-K15', 'Қаптау': '1 000 кг', 'Түрі': 'Түйіршіктер' } },
    '6': { title: 'Бидай тұқымы "Астана-2" элита', description: '"Астана-2" қысқы бидай тұқымы. Жоғары өнімділік 45 ц/га дейін.', category: 'Тұқымдар', location: 'Ақмола облысы', seller: 'Қазақстан тұқымдары', specs: { 'Сорт': 'Астана-2', 'Класс': 'Элита', 'Өнімділік': '45 ц/га дейін' } },
    '7': { title: 'МТЗ Беларус 1221.3 тракторы', description: 'Орта шаруашылықтарға арналған 130 а.к. әмбебап доңғалақты трактор.', category: 'Тракторлар', location: 'Павлодар', seller: 'МТЗ-Центр', specs: { 'Қуат': '130 а.к.', 'Тарту класы': '2.0', 'Жетек': '4x4' } },
    '8': { title: 'Өнеркәсіптік жылыжай 1000 м²', description: 'Поликарбонат жабыны, жылыту және желдету жүйесі бар өнеркәсіптік жылыжай.', category: 'Жылыжайлар', location: 'Түркістан', seller: 'ТеплицаСтрой', specs: { 'Аумақ': '1 000 м²', 'Жабын': 'Поликарбонат 8мм', 'Биіктік': '5 м' } },
    '9': { title: 'PEDROTTI XL 550 астық кептіргіш', description: 'Өнімділігі 55 т/сағ мобильді астық кептіргіш. Газбен жұмыс істейді.', category: 'Астық өңдеу', location: 'Қостанай', seller: 'АстықТех', specs: { 'Өнімділік': '55 т/сағ', 'Отын': 'Газ', 'Жағдай': 'Жақсы, 2021 ж.' } },
    '10': { title: 'KUHN жем араластырғыш-таратқыш', description: 'Ірі фермаларға арналған 20 м³ тік жем араластырғыш-таратқыш.', category: 'Жем жабдықтары', location: 'Ақтөбе', seller: 'МалШаруаСнаб', specs: { 'Көлемі': '20 м³', 'Түрі': 'Тік', 'Бұрандалар': '2 бұранда' } },
    '11': { title: 'Сілос шұңқыры 500 тонна', description: 'Бетон қабырғалары мен дренаж жүйесі бар сілос шұңқырын салу. Сыйымдылығы 500 тонна.', category: 'Сақтау', location: 'Қызылорда', seller: 'ҚұрылысАгро', specs: { 'Сыйымдылық': '500 тонна', 'Материал': 'Бетон М400', 'Дренаж': 'Бар' } },
    '12': { title: 'Amazone Pantera өздігінен жүретін бүріккіш', description: 'Ені 36 м, бак 4000 л өздігінен жүретін бүріккіш. GPS басқару.', category: 'Жинау техникасы', location: 'Солтүстік Қазақстан облысы', seller: 'АгроМаш Солтүстік', specs: { 'Ені': '36 м', 'Бак': '4 000 л', 'GPS': 'Иә' } },
  },
  news: {
    '1': { title: 'Қазақстан 2025 жылы астық экспортын 20%-ға арттырады', excerpt: 'Ауыл шаруашылығы министрлігі астық экспорт әлеуетін арттыру бағдарламасын жариялады.', category: 'Нарық', date: '2026 жылғы 22 наурыз', readTime: '5 мин' },
    '2': { title: 'Түркістан облысындағы тамшылатып суаруға жаңа субсидиялар', excerpt: 'Мемлекет оңтүстік Қазақстан фермерлеріне суару жүйелерін орнату шығындарының 50%-ын өтейді.', category: 'Субсидиялар', date: '2026 жылғы 20 наурыз', readTime: '3 мин' },
    '3': { title: 'Ауыл шаруашылығын цифрландыру: Қостанай облысының тәжірибесі', excerpt: 'GPS навигациясы мен дрондар ірі астық шаруашылықтарының жұмысын қалай өзгертеді.', category: 'Технологиялар', date: '2026 жылғы 18 наурыз', readTime: '7 мин' },
    '4': { title: 'Шығыс Қазақстанда күнбағыстың рекордтық өнімі', excerpt: 'ШҚО фермерлері 850 мың тонна күнбағыс жинап, өткен жылдан 15%-ға асырды.', category: 'Өнім', date: '2026 жылғы 15 наурыз', readTime: '4 мин' },
    '5': { title: 'Қазақстан ауыл шаруашылығы техникасы нарығына шолу 2026', excerpt: 'Нарық үрдістерін талдау, танымал брендтер мен болашаққа болжамдар.', category: 'Талдау', date: '2026 жылғы 12 наурыз', readTime: '10 мин' },
    '6': { title: 'Органикалық егіншілік: Қазақстан үшін перспективалар', excerpt: 'Органикалық өнімдер нарығы жылына 12%-ға өсуде. Бұл қазақстандық фермерлерге қандай мүмкіндіктер ашады?', category: 'Трендтер', date: '2026 жылғы 10 наурыз', readTime: '6 мин' },
  },
  courses: {
    '1': { title: 'Агробизнес негіздері', category: 'Агробизнес', level: 'Бастаушы', duration: '12 сағат', instructor: 'Ерлан Сатыбалдиев' },
    '2': { title: 'Астық жинау техникасын басқару', category: 'Техника', level: 'Орта', duration: '8 сағат', instructor: 'Бауыржан Кенжебаев' },
    '3': { title: 'Құрғақ аймақтарға арналған суару жүйелері', category: 'Өсімдік шаруашылығы', level: 'Жоғары', duration: '15 сағат', instructor: 'Айгерім Нұрланова' },
    '4': { title: 'Фермерлерге арналған субсидиялар мен гранттар', category: 'Субсидиялар', level: 'Бастаушы', duration: '6 сағат', instructor: 'Марат Оспанов' },
    '5': { title: 'Мал шаруашылығы: А-дан Я-ға', category: 'Мал шаруашылығы', level: 'Орта', duration: '20 сағат', instructor: 'Гүлнар Абдрахманова' },
    '6': { title: 'Нақты егіншілік және дрондар', category: 'Технологиялар', level: 'Жоғары', duration: '10 сағат', instructor: 'Дамир Искаков' },
  },
  subsidies: {
    '1': { title: 'Несие пайыздық мөлшерлемесін субсидиялау', description: 'Ауыл шаруашылығы техникасын сатып алу несиелері бойынша жылдық 10%-ға дейін өтемақы.', amount: '50 000 000 ₸ дейін', deadline: '2026 жылғы 31 желтоқсан', region: 'Барлық өңірлер', category: 'Несиелеу' },
    '2': { title: 'Тамшылатып суаруға субсидиялар', description: 'Суару жүйелерін орнату шығындарының 50%-ын өтеу.', amount: '25 000 000 ₸ дейін', deadline: '2026 жылғы 30 қыркүйек', region: 'Оңтүстік Қазақстан', category: 'Суару' },
    '3': { title: 'Бастаушы фермерлерді қолдау', description: 'Іс-әрекетін бастаған фермерлерге арналған грант бағдарламасы.', amount: '8 000 000 ₸ дейін', deadline: '2026 жылғы 1 маусым', region: 'Барлық өңірлер', category: 'Гранттар' },
    '4': { title: 'Тұқым мен тыңайтқышқа субсидиялар', description: 'Элиталық тұқымдар мен тыңайтқыштарға шығындарды ішінара өтеу.', amount: '3 000 000 ₸ дейін', deadline: '2026 жылғы 1 сәуір', region: 'Барлық өңірлер', category: 'Өсімдік шаруашылығы' },
    '5': { title: 'Мал шаруашылығын дамыту бағдарламасы', description: 'Асыл тұқымды мал мен жабдық сатып алуды субсидиялау.', amount: '30 000 000 ₸ дейін', deadline: '2026 жылғы 31 желтоқсан', region: 'Барлық өңірлер', category: 'Мал шаруашылығы' },
  },
  testimonials: [
    { name: 'Ерлан Тәжібаев', role: 'Фермер, Қостанай облысы', text: 'Agrosauda маған нарықтық бағадан 30%-ға арзан трактор табуға көмектесті. Қауіпсіз мәміле — тамаша кепілдік!' },
    { name: 'Айгүл Серікқызы', role: 'ШК "Береке", Алматы облысы', text: 'Платформаның арқасында біз өнімімізге тікелей сатып алушылар таптық. Ұсынамын!' },
    { name: 'Бауыржан Қасымов', role: 'ЖШС "АгроСтар", Ақмола облысы', text: 'Субсидия көмекшісі құжаттарды бір аптада рәсімдеуге көмектесті. 8 млн теңге грант алдық!' },
  ],
  classifieds: {
    categoryGroups: [
      { title: 'Ауыл шаруашылығы техникасы', items: [
        { icon: '🚜', name: 'Тракторлар', count: 324 }, { icon: '🚜', name: 'Шағын тракторлар', count: 156 },
        { icon: '🌾', name: 'Комбайндар', count: 89 }, { icon: '⚙️', name: 'Жатқалар', count: 67 },
        { icon: '🌱', name: 'Сеуіштер', count: 112 }, { icon: '🔧', name: 'Соқалар', count: 98 },
        { icon: '⛏️', name: 'Культиваторлар', count: 134 }, { icon: '🚛', name: 'Тіркемелер', count: 201 },
        { icon: '💨', name: 'Бүріккіштер', count: 78 },
      ]},
      { title: 'Суару және ирригация', items: [
        { icon: '💧', name: 'Суару жүйелері', count: 145 }, { icon: '🔌', name: 'Су сорғылары', count: 210 },
        { icon: '🏗️', name: 'Жылыжай жабдығы', count: 87 }, { icon: '🏠', name: 'Жылыжайлар', count: 64 },
      ]},
      { title: 'Тұқымдар мен жемдер', items: [
        { icon: '🌾', name: 'Тұқымдар', count: 430 }, { icon: '🌽', name: 'Астық', count: 312 },
        { icon: '🥬', name: 'Жемдер', count: 189 }, { icon: '🧪', name: 'Тыңайтқыштар', count: 267 },
        { icon: '🛡️', name: 'Пестицидтер', count: 98 }, { icon: '⚗️', name: 'Агрохимия', count: 134 },
        { icon: '🪨', name: 'Топырақ субстраттар', count: 56 },
      ]},
      { title: 'Мал шаруашылығы', items: [
        { icon: '🐄', name: 'Мал жабдығы', count: 178 }, { icon: '🥛', name: 'Сүт жабдығы', count: 92 },
        { icon: '🐔', name: 'Құс шаруашылығы', count: 67 }, { icon: '🍽️', name: 'Жем жүйелері', count: 45 },
        { icon: '💊', name: 'Ветеринарлық тауарлар', count: 134 },
      ]},
      { title: 'Бөлшектер мен шығын материалдар', items: [
        { icon: '⚙️', name: 'Қосалқы бөлшектер', count: 567 }, { icon: '🔧', name: 'Қозғалтқыш бөлшектері', count: 234 },
        { icon: '🛞', name: 'А/ш шиналары', count: 189 }, { icon: '🔋', name: 'Аккумуляторлар', count: 112 },
        { icon: '🛢️', name: 'Майлар мен жағармайлар', count: 156 },
      ]},
      { title: 'Сақтау және өңдеу', items: [
        { icon: '🏭', name: 'Қойма жабдығы', count: 78 }, { icon: '🌾', name: 'Астық қоймалары', count: 45 },
        { icon: '🔥', name: 'Кептіру жабдығы', count: 34 }, { icon: '📦', name: 'Орау жабдығы', count: 56 },
        { icon: '🍎', name: 'Жеміс өңдеу', count: 29 }, { icon: '🥕', name: 'Көкөніс өңдеу', count: 23 },
      ]},
      { title: 'Құралдар мен энергия', items: [
        { icon: '🔨', name: 'Қол құралдары', count: 312 }, { icon: '⚡', name: 'Электр құралдар', count: 234 },
        { icon: '🔌', name: 'Генераторлар', count: 89 }, { icon: '☀️', name: 'Күн панельдері', count: 67 },
        { icon: '🧱', name: 'Құрылыс материалдары', count: 145 }, { icon: '🏗️', name: 'Қоршаулар', count: 98 },
      ]},
      { title: 'Мамандандырылған', items: [
        { icon: '🐝', name: 'Ара шаруашылығы', count: 78 }, { icon: '🐟', name: 'Балық шаруашылығы', count: 34 },
        { icon: '🌳', name: 'Бау-бақша жабдығы', count: 112 }, { icon: '🍇', name: 'Бақ жабдығы', count: 45 },
        { icon: '🐮', name: 'Қора жабдығы', count: 56 }, { icon: '🗼', name: 'Сілос жабдығы', count: 38 },
      ]},
      { title: 'Қызметтер мен басқа', items: [
        { icon: '🚚', name: 'Көлік қызметтері', count: 167 }, { icon: '🔧', name: 'Техника жөндеу', count: 145 },
        { icon: '📋', name: 'Техника жалдау', count: 89 }, { icon: '🏞️', name: 'Жер учаскелері', count: 234 },
        { icon: '👨‍🌾', name: 'Фермерлік қызметтер', count: 78 }, { icon: '📦', name: 'Басқа агротауарлар', count: 312 },
      ]},
    ],
    popularCategories: [
      { icon: '🚜', name: 'Тракторлар', count: 324 }, { icon: '⚙️', name: 'Бөлшектер', count: 567 },
      { icon: '🌾', name: 'Тұқымдар', count: 430 }, { icon: '🌽', name: 'Астық', count: 312 },
      { icon: '💧', name: 'Суару жүйелері', count: 145 }, { icon: '🧪', name: 'Тыңайтқыштар', count: 267 },
    ],
    sampleListings: [
      { title: 'МТЗ-82.1 тракторы 2023 жыл', price: '12 500 000 ₸', location: 'Қостанай', condition: 'Б/У', img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop', category: 'Тракторлар' },
      { title: 'Бидай тұқымы "Астана-2"', price: '450 000 ₸', location: 'Ақмола облысы', condition: 'Жаңа', img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop', category: 'Тұқымдар' },
      { title: 'Тамшылатып суару жүйесі 10 га', price: '3 200 000 ₸', location: 'Алматы облысы', condition: 'Жаңа', img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop', category: 'Суару' },
      { title: 'Claas Tucano комбайны 2021', price: '45 000 000 ₸', location: 'Солтүстік Қазақстан', condition: 'Б/У', img: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c10?w=400&h=300&fit=crop', category: 'Комбайндар' },
      { title: 'КАС-32 тыңайтқышы, 20 тонна', price: '2 800 000 ₸', location: 'Қарағанды', condition: 'Жаңа', img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop', category: 'Тыңайтқыштар' },
      { title: 'Дизельді генератор 50 кВт', price: '1 950 000 ₸', location: 'Шымкент', condition: 'Жаңа', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop', category: 'Генераторлар' },
    ],
  },
};

const cnData: DataTranslations = {
  categories: {
    tractors: '拖拉机', combines: '联合收割机', seeders: '播种机', harvesters: '收割设备',
    irrigation: '灌溉系统', fertilizers: '化肥', seeds: '种子', livestock: '畜牧业',
    greenhouses: '温室', 'spare-parts': '零配件', 'grain-processing': '粮食加工',
    'feed-equipment': '饲料设备', storage: '仓储', 'farm-tools': '农具',
  },
  regions: [
    '所有地区', '阿斯塔纳', '阿拉木图', '奇姆肯特', '科斯塔奈', '卡拉干达', '巴甫洛达尔',
    '阿克托别', '突厥斯坦', '克孜勒奥尔达', '阿克莫拉州', '北哈萨克斯坦州',
    '东哈萨克斯坦州', '扎姆贝尔州', '西哈萨克斯坦州',
  ],
  conditions: { new: '全新', used: '二手', restored: '翻新' },
  stats: { label1: '平台商品数', label2: '活跃卖家', label3: '月交易量', label4: '哈萨克斯坦地区' },
  products: {
    '1': { title: 'John Deere 8R 410 拖拉机', description: '410马力强力拖拉机，配备智能控制系统、GPS导航和自动转向。适合大型农场。', category: '拖拉机', location: '阿斯塔纳', seller: 'AgroTech KZ', specs: { '功率': '410马力', '年份': '2024', '发动机': 'PowerTech PSS 13.6L', '变速箱': 'e23 PowerShift' } },
    '2': { title: 'CLAAS Lexion 8900 联合收割机', description: '旗舰谷物收割机，配备CEMOS AUTOMATIC系统，产量达80吨/小时。', category: '联合收割机', location: '科斯塔奈', seller: 'KazAgroMash', specs: { '产量': '80吨/时', '料仓': '18,000升', '功率': '790马力' } },
    '3': { title: 'Amazone Cirrus 6003-2 气力播种机', description: '适用于谷物、小粒种子和豆类作物的通用气力播种机。工作宽度6米。', category: '播种机', location: '卡拉干达', seller: 'FarmerSupply', specs: { '工作宽度': '6米', '料仓': '3,000升', '类型': '气力式' } },
    '4': { title: 'Netafim 滴灌系统', description: '50公顷综合滴灌系统。包括过滤器、水泵和自动控制。', category: '灌溉系统', location: '阿拉木图', seller: 'IrrigationPlus', specs: { '面积': '50公顷', '类型': '滴灌', '控制': '自动' } },
    '5': { title: 'NPK 15-15-15 化肥（吨）', description: '氮磷钾含量相等的复合矿物肥料。适用于所有作物。', category: '化肥', location: '奇姆肯特', seller: 'AgroChem Kazakhstan', specs: { '成分': 'N15-P15-K15', '包装': '1,000公斤', '形态': '颗粒' } },
    '6': { title: '小麦种子"阿斯塔纳-2"精英级', description: '"阿斯塔纳-2"品种精英级冬小麦种子。亩产高达4.5吨/公顷。', category: '种子', location: '阿克莫拉州', seller: 'Seeds of Kazakhstan', specs: { '品种': 'Astana-2', '等级': '精英', '产量': '最高4.5吨/公顷' } },
    '7': { title: 'MTZ Belarus 1221.3 拖拉机', description: '130马力通用轮式拖拉机。适合中型农场。', category: '拖拉机', location: '巴甫洛达尔', seller: 'MTZ Center', specs: { '功率': '130马力', '牵引等级': '2.0', '驱动': '4x4' } },
    '8': { title: '工业温室 1000平方米', description: '聚碳酸酯覆盖、供暖和通风系统的工业温室。面积1000平方米。', category: '温室', location: '突厥斯坦', seller: 'GreenBuild', specs: { '面积': '1,000平方米', '覆盖': '聚碳酸酯8mm', '高度': '5米' } },
    '9': { title: 'PEDROTTI XL 550 谷物烘干机', description: '产量55吨/小时的移动谷物烘干机。燃气驱动，经济可靠。', category: '粮食加工', location: '科斯塔奈', seller: 'GrainTech', specs: { '产量': '55吨/时', '燃料': '天然气', '状况': '良好，2021年' } },
    '10': { title: 'KUHN 饲料搅拌分配器', description: '20立方米立式饲料搅拌分配器，适合大型农场。', category: '饲料设备', location: '阿克托别', seller: 'LivestockSupply', specs: { '容量': '20立方米', '类型': '立式', '螺旋': '2个螺旋' } },
    '11': { title: '青贮窖 500吨', description: '混凝土墙壁和排水系统的青贮窖建设。容量500吨。', category: '仓储', location: '克孜勒奥尔达', seller: 'AgroBuild', specs: { '容量': '500吨', '材料': '混凝土M400', '排水': '有' } },
    '12': { title: 'Amazone Pantera 自走式喷雾器', description: '工作宽度36米、水箱4000升的自走式喷雾器。GPS控制。', category: '收割设备', location: '北哈萨克斯坦州', seller: 'AgroMash North', specs: { '工作宽度': '36米', '水箱': '4,000升', 'GPS': '是' } },
  },
  news: {
    '1': { title: '哈萨克斯坦2025年将增加20%的粮食出口', excerpt: '农业部宣布了增加粮食出口潜力的计划。', category: '市场', date: '2026年3月22日', readTime: '5分钟' },
    '2': { title: '突厥斯坦地区滴灌新补贴', excerpt: '政府为南哈萨克斯坦农民补偿高达50%的滴灌安装费用。', category: '补贴', date: '2026年3月20日', readTime: '3分钟' },
    '3': { title: '农业数字化：科斯塔奈州经验', excerpt: 'GPS导航和无人机如何改变北哈萨克斯坦大型谷物农场的运作。', category: '技术', date: '2026年3月18日', readTime: '7分钟' },
    '4': { title: '东哈萨克斯坦向日葵创纪录丰收', excerpt: '东哈州农民收获了创纪录的85万吨向日葵，比去年增长15%。', category: '收成', date: '2026年3月15日', readTime: '4分钟' },
    '5': { title: '2026年哈萨克斯坦农业机械市场回顾', excerpt: '市场趋势分析、热门品牌和未来几年预测。', category: '分析', date: '2026年3月12日', readTime: '10分钟' },
    '6': { title: '有机农业：哈萨克斯坦的前景', excerpt: '全球有机产品市场每年增长12%。这为哈萨克斯坦农民带来了什么机遇？', category: '趋势', date: '2026年3月10日', readTime: '6分钟' },
  },
  courses: {
    '1': { title: '农业经营基础', category: '农业经营', level: '初级', duration: '12小时', instructor: 'Yerlan Satybaldiyev' },
    '2': { title: '联合收割机操作', category: '机械', level: '中级', duration: '8小时', instructor: 'Bauyrzhan Kenzhebayev' },
    '3': { title: '干旱地区灌溉系统', category: '作物学', level: '高级', duration: '15小时', instructor: 'Aigerim Nurlanova' },
    '4': { title: '农民补贴和补助金', category: '补贴', level: '初级', duration: '6小时', instructor: 'Marat Ospanov' },
    '5': { title: '畜牧业：从入门到精通', category: '畜牧业', level: '中级', duration: '20小时', instructor: 'Gulnar Abdrakhmanova' },
    '6': { title: '精准农业和无人机', category: '技术', level: '高级', duration: '10小时', instructor: 'Damir Iskakov' },
  },
  subsidies: {
    '1': { title: '贷款利率补贴', description: '购买农业机械贷款年利率最高补偿10%。', amount: '最高50,000,000₸', deadline: '2026年12月31日', region: '所有地区', category: '贷款' },
    '2': { title: '滴灌补贴', description: '报销高达50%的灌溉系统安装费用。', amount: '最高25,000,000₸', deadline: '2026年9月30日', region: '南哈萨克斯坦', category: '灌溉' },
    '3': { title: '新手农民支持', description: '面向初创农民的补助计划。', amount: '最高8,000,000₸', deadline: '2026年6月1日', region: '所有地区', category: '补助金' },
    '4': { title: '种子和化肥补贴', description: '部分补偿精品种子和化肥费用。', amount: '最高3,000,000₸', deadline: '2026年4月1日', region: '所有地区', category: '作物学' },
    '5': { title: '畜牧业发展计划', description: '补贴购买种畜和设备。', amount: '最高30,000,000₸', deadline: '2026年12月31日', region: '所有地区', category: '畜牧业' },
  },
  testimonials: [
    { name: 'Yerlan Tazhibayev', role: '农民，科斯塔奈州', text: 'Agrosauda帮我找到了比市场价便宜30%的拖拉机。安全交易是很好的保障！' },
    { name: 'Aigul Serikkizi', role: '"Bereke"农场，阿拉木图州', text: '通过平台，我们直接找到了农产品买家，无需中间商。强烈推荐！' },
    { name: 'Bauyrzhan Kasymov', role: 'AgroStar有限公司，阿克莫拉州', text: '补贴助手帮助我们在一周内处理了文件，而不是一个月。我们获得了800万坚戈的补助金！' },
  ],
  classifieds: {
    categoryGroups: [
      { title: '农业机械', items: [
        { icon: '🚜', name: '拖拉机', count: 324 }, { icon: '🚜', name: '小型拖拉机', count: 156 },
        { icon: '🌾', name: '联合收割机', count: 89 }, { icon: '⚙️', name: '割台', count: 67 },
        { icon: '🌱', name: '播种机', count: 112 }, { icon: '🔧', name: '犁', count: 98 },
        { icon: '⛏️', name: '中耕机', count: 134 }, { icon: '🚛', name: '拖车', count: 201 },
        { icon: '💨', name: '喷雾器', count: 78 },
      ]},
      { title: '灌溉', items: [
        { icon: '💧', name: '灌溉系统', count: 145 }, { icon: '🔌', name: '水泵', count: 210 },
        { icon: '🏗️', name: '温室设备', count: 87 }, { icon: '🏠', name: '温室', count: 64 },
      ]},
      { title: '种子和饲料', items: [
        { icon: '🌾', name: '种子', count: 430 }, { icon: '🌽', name: '谷物', count: 312 },
        { icon: '🥬', name: '饲料', count: 189 }, { icon: '🧪', name: '化肥', count: 267 },
        { icon: '🛡️', name: '农药', count: 98 }, { icon: '⚗️', name: '农化产品', count: 134 },
        { icon: '🪨', name: '土壤基质', count: 56 },
      ]},
      { title: '畜牧业', items: [
        { icon: '🐄', name: '畜牧设备', count: 178 }, { icon: '🥛', name: '乳制品设备', count: 92 },
        { icon: '🐔', name: '家禽养殖', count: 67 }, { icon: '🍽️', name: '饲料系统', count: 45 },
        { icon: '💊', name: '兽医产品', count: 134 },
      ]},
      { title: '零配件', items: [
        { icon: '⚙️', name: '备件', count: 567 }, { icon: '🔧', name: '发动机零件', count: 234 },
        { icon: '🛞', name: '农用轮胎', count: 189 }, { icon: '🔋', name: '蓄电池', count: 112 },
        { icon: '🛢️', name: '润滑油', count: 156 },
      ]},
      { title: '存储和加工', items: [
        { icon: '🏭', name: '仓库设备', count: 78 }, { icon: '🌾', name: '粮仓', count: 45 },
        { icon: '🔥', name: '干燥设备', count: 34 }, { icon: '📦', name: '包装设备', count: 56 },
        { icon: '🍎', name: '水果加工', count: 29 }, { icon: '🥕', name: '蔬菜加工', count: 23 },
      ]},
      { title: '工具和能源', items: [
        { icon: '🔨', name: '手动工具', count: 312 }, { icon: '⚡', name: '电动工具', count: 234 },
        { icon: '🔌', name: '发电机', count: 89 }, { icon: '☀️', name: '太阳能板', count: 67 },
        { icon: '🧱', name: '建筑材料', count: 145 }, { icon: '🏗️', name: '围栏', count: 98 },
      ]},
      { title: '专业设备', items: [
        { icon: '🐝', name: '养蜂', count: 78 }, { icon: '🐟', name: '养鱼', count: 34 },
        { icon: '🌳', name: '园艺设备', count: 112 }, { icon: '🍇', name: '果园设备', count: 45 },
        { icon: '🐮', name: '牛棚设备', count: 56 }, { icon: '🗼', name: '青贮设备', count: 38 },
      ]},
      { title: '服务和其他', items: [
        { icon: '🚚', name: '运输服务', count: 167 }, { icon: '🔧', name: '设备维修', count: 145 },
        { icon: '📋', name: '设备租赁', count: 89 }, { icon: '🏞️', name: '土地', count: 234 },
        { icon: '👨‍🌾', name: '农业服务', count: 78 }, { icon: '📦', name: '其他农产品', count: 312 },
      ]},
    ],
    popularCategories: [
      { icon: '🚜', name: '拖拉机', count: 324 }, { icon: '⚙️', name: '备件', count: 567 },
      { icon: '🌾', name: '种子', count: 430 }, { icon: '🌽', name: '谷物', count: 312 },
      { icon: '💧', name: '灌溉系统', count: 145 }, { icon: '🧪', name: '化肥', count: 267 },
    ],
    sampleListings: [
      { title: 'MTZ-82.1 拖拉机 2023年', price: '12,500,000 ₸', location: '科斯塔奈', condition: '二手', img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop', category: '拖拉机' },
      { title: '小麦种子"阿斯塔纳-2"', price: '450,000 ₸', location: '阿克莫拉州', condition: '全新', img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop', category: '种子' },
      { title: '滴灌系统 10公顷', price: '3,200,000 ₸', location: '阿拉木图州', condition: '全新', img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop', category: '灌溉' },
      { title: 'Claas Tucano 联合收割机 2021', price: '45,000,000 ₸', location: '北哈萨克斯坦', condition: '二手', img: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c10?w=400&h=300&fit=crop', category: '联合收割机' },
      { title: 'UAN-32 化肥 20吨', price: '2,800,000 ₸', location: '卡拉干达', condition: '全新', img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop', category: '化肥' },
      { title: '柴油发电机 50千瓦', price: '1,950,000 ₸', location: '奇姆肯特', condition: '全新', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop', category: '发电机' },
    ],
  },
};

const allTranslations: Record<LangCode, DataTranslations> = { ru, kz, en, cn: cnData };

export function getDataTranslations(lang: LangCode): DataTranslations {
  return allTranslations[lang] || ru;
}

export type { DataTranslations };
