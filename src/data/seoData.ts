// SEO categories and cities for Kazakh agricultural market

export interface SEOCategory {
  slug: string;
  titleRu: string;
  titleEn: string;
  titleKz: string;
  titleCn: string;
  icon: string;
  relatedSlugs: string[];
}

export interface SEOCity {
  slug: string;
  nameRu: string;
  nameEn: string;
  nameKz: string;
  nameCn: string;
  region?: string;
}

export const seoCategories: SEOCategory[] = [
  { slug: 'tractors', titleRu: 'Тракторы', titleEn: 'Tractors', titleKz: 'Тракторлар', titleCn: '拖拉机', icon: '🚜', relatedSlugs: ['combines', 'spare-parts'] },
  { slug: 'combines', titleRu: 'Комбайны', titleEn: 'Combines', titleKz: 'Комбайндар', titleCn: '联合收割机', icon: '🌾', relatedSlugs: ['tractors', 'harvesters'] },
  { slug: 'seeders', titleRu: 'Сеялки', titleEn: 'Seeders', titleKz: 'Сепкіштер', titleCn: '播种机', icon: '🌱', relatedSlugs: ['seeds', 'fertilizers'] },
  { slug: 'harvesters', titleRu: 'Уборочная техника', titleEn: 'Harvesters', titleKz: 'Жинау техникасы', titleCn: '收割设备', icon: '🔧', relatedSlugs: ['combines', 'tractors'] },
  { slug: 'irrigation', titleRu: 'Системы орошения', titleEn: 'Irrigation Systems', titleKz: 'Суару жүйелері', titleCn: '灌溉系统', icon: '💧', relatedSlugs: ['greenhouses', 'fertilizers'] },
  { slug: 'fertilizers', titleRu: 'Удобрения', titleEn: 'Fertilizers', titleKz: 'Тыңайтқыштар', titleCn: '化肥', icon: '🧪', relatedSlugs: ['seeds', 'irrigation'] },
  { slug: 'seeds', titleRu: 'Семена', titleEn: 'Seeds', titleKz: 'Тұқымдар', titleCn: '种子', icon: '🌿', relatedSlugs: ['fertilizers', 'seeders'] },
  { slug: 'livestock', titleRu: 'Животноводство', titleEn: 'Livestock', titleKz: 'Мал шаруашылығы', titleCn: '畜牧业', icon: '🐄', relatedSlugs: ['feed-equipment', 'storage'] },
  { slug: 'greenhouses', titleRu: 'Теплицы', titleEn: 'Greenhouses', titleKz: 'Жылыжайлар', titleCn: '温室', icon: '🏡', relatedSlugs: ['irrigation', 'seeds'] },
  { slug: 'spare-parts', titleRu: 'Запчасти', titleEn: 'Spare Parts', titleKz: 'Қосалқы бөлшектер', titleCn: '备件', icon: '⚙️', relatedSlugs: ['tractors', 'combines'] },
  { slug: 'grain-processing', titleRu: 'Зернопереработка', titleEn: 'Grain Processing', titleKz: 'Астық өңдеу', titleCn: '粮食加工', icon: '🏭', relatedSlugs: ['storage', 'combines'] },
  { slug: 'feed-equipment', titleRu: 'Кормовое оборудование', titleEn: 'Feed Equipment', titleKz: 'Жем жабдықтары', titleCn: '饲料设备', icon: '🥬', relatedSlugs: ['livestock', 'storage'] },
  { slug: 'storage', titleRu: 'Хранение', titleEn: 'Storage', titleKz: 'Сақтау', titleCn: '存储', icon: '🏗️', relatedSlugs: ['grain-processing', 'livestock'] },
  { slug: 'farm-tools', titleRu: 'Инструменты', titleEn: 'Farm Tools', titleKz: 'Құралдар', titleCn: '农具', icon: '🔨', relatedSlugs: ['spare-parts', 'tractors'] },
];

export const seoCities: SEOCity[] = [
  { slug: 'astana', nameRu: 'Астана', nameEn: 'Astana', nameKz: 'Астана', nameCn: '阿斯塔纳' },
  { slug: 'almaty', nameRu: 'Алматы', nameEn: 'Almaty', nameKz: 'Алматы', nameCn: '阿拉木图' },
  { slug: 'shymkent', nameRu: 'Шымкент', nameEn: 'Shymkent', nameKz: 'Шымкент', nameCn: '奇姆肯特' },
  { slug: 'kostanay', nameRu: 'Костанай', nameEn: 'Kostanay', nameKz: 'Қостанай', nameCn: '库斯塔奈' },
  { slug: 'karaganda', nameRu: 'Караганда', nameEn: 'Karaganda', nameKz: 'Қарағанды', nameCn: '卡拉干达' },
  { slug: 'pavlodar', nameRu: 'Павлодар', nameEn: 'Pavlodar', nameKz: 'Павлодар', nameCn: '巴甫洛达尔' },
  { slug: 'aktobe', nameRu: 'Актобе', nameEn: 'Aktobe', nameKz: 'Ақтөбе', nameCn: '阿克托别' },
  { slug: 'turkestan', nameRu: 'Туркестан', nameEn: 'Turkestan', nameKz: 'Түркістан', nameCn: '突厥斯坦' },
  { slug: 'kyzylorda', nameRu: 'Кызылорда', nameEn: 'Kyzylorda', nameKz: 'Қызылорда', nameCn: '克孜勒奥尔达' },
  { slug: 'atyrau', nameRu: 'Атырау', nameEn: 'Atyrau', nameKz: 'Атырау', nameCn: '阿特劳' },
  { slug: 'oral', nameRu: 'Уральск', nameEn: 'Oral', nameKz: 'Орал', nameCn: '乌拉尔' },
  { slug: 'semey', nameRu: 'Семей', nameEn: 'Semey', nameKz: 'Семей', nameCn: '塞梅伊' },
  { slug: 'taldykorgan', nameRu: 'Талдыкорган', nameEn: 'Taldykorgan', nameKz: 'Талдықорған', nameCn: '塔尔迪库尔干' },
  { slug: 'petropavl', nameRu: 'Петропавловск', nameEn: 'Petropavl', nameKz: 'Петропавл', nameCn: '彼得罗巴甫洛夫斯克' },
];

export function getCategoryTitle(slug: string, lang: string): string {
  const cat = seoCategories.find(c => c.slug === slug);
  if (!cat) return slug;
  const key = `title${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof SEOCategory;
  return (cat[key] as string) || cat.titleRu;
}

export function getCityName(slug: string, lang: string): string {
  const city = seoCities.find(c => c.slug === slug);
  if (!city) return slug;
  const key = `name${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof SEOCity;
  return (city[key] as string) || city.nameRu;
}

// SEO text blocks for categories (Russian - primary market)
export function getCategorySEOText(categorySlug: string, lang: string, citySlug?: string): string {
  const cat = getCategoryTitle(categorySlug, 'ru');
  const city = citySlug ? getCityName(citySlug, 'ru') : '';
  const cityText = city ? ` в ${city}` : ' в Казахстане';

  const texts: Record<string, string> = {
    tractors: `Купить трактор${cityText} — выгодные предложения на Agrosauda. На нашем маркетплейсе представлен широкий выбор тракторов от ведущих производителей: John Deere, CLAAS, Case IH, New Holland, МТЗ Беларус и Кировец. Мы предлагаем как новую технику с гарантией от официальных дилеров, так и б/у тракторы в отличном состоянии по доступным ценам.\n\nКазахстан — один из крупнейших сельскохозяйственных регионов Центральной Азии, и правильный выбор трактора критически важен для эффективного ведения хозяйства. На Agrosauda вы найдёте тракторы различной мощности — от 80 до 600 л.с., подходящие для любых задач: обработка почвы, посев, уборка урожая, транспортировка.\n\nПреимущества покупки на Agrosauda: безопасная сделка с гарантией возврата средств, проверенные продавцы с рейтингом, возможность получить субсидию до 50% от стоимости техники по государственным программам Казахстана. Доставка по всему Казахстану. Оформите заявку на сайте или свяжитесь с нашими менеджерами для консультации.`,

    combines: `Зерноуборочные и кормоуборочные комбайны${cityText} — купить на Agrosauda. В нашем каталоге собраны предложения от проверенных продавцов: CLAAS Lexion и Tucano, John Deere S-серия, New Holland CR, Ростсельмаш ACROS и TORUM.\n\nКазахстан ежегодно собирает более 20 миллионов тонн зерна, и современные комбайны — ключ к сокращению потерь при уборке. На Agrosauda представлены комбайны с пропускной способностью от 8 до 80 т/ч, оснащённые GPS-навигацией, системами автоматического вождения и мониторинга урожайности.\n\nИспользуйте фильтры для поиска по мощности, ширине захвата, году выпуска и цене. Безопасная сделка гарантирует защиту покупателя. Государственные субсидии покрывают до 25% стоимости новой техники.`,

    seeds: `Купить семена сельскохозяйственных культур${cityText} на Agrosauda. Элитные и репродукционные семена пшеницы, ячменя, подсолнечника, рапса, кукурузы, сои и других культур от сертифицированных поставщиков.\n\nКачественные семена — основа высокого урожая. На платформе Agrosauda представлены семена, адаптированные к климатическим условиям Казахстана: засухоустойчивые сорта для северных регионов, скороспелые гибриды для юга, морозоустойчивые сорта озимых культур.\n\nВсе поставщики проходят верификацию, семена имеют сертификаты качества и фитосанитарные заключения. Субсидии на элитные семена покрывают до 40% затрат по программе Минсельхоза РК. Доставка по всем регионам Казахстана.`,

    livestock: `Оборудование для животноводства и племенной скот${cityText} — Agrosauda. Кормосмесители, доильные установки, оборудование для содержания КРС и МРС, инкубаторы, ветеринарные препараты.\n\nЖивотноводство — одна из ключевых отраслей сельского хозяйства Казахстана с поголовьем более 8 миллионов голов КРС. На Agrosauda вы найдёте всё необходимое для модернизации фермы: от кормораздатчиков и поилок до комплексных решений «под ключ».\n\nГосударственная программа развития животноводства предусматривает субсидирование покупки племенного скота (до 50% стоимости) и оборудования (до 25%). Воспользуйтесь нашим ИИ-ассистентом «Субсидия Гид» для подбора оптимальной программы господдержки.`,

    fertilizers: `Удобрения и агрохимия${cityText} — купить оптом и в розницу на Agrosauda. Минеральные удобрения (NPK, аммиачная селитра, карбамид), органические удобрения, средства защиты растений, микроудобрения, стимуляторы роста.\n\nПравильное питание почвы — залог высоких урожаев в условиях Казахстана. На нашей платформе вы найдёте удобрения от ведущих производителей: EuroChem, PhosAgro, КазФосфат и других. Цены от производителей, доставка по всему Казахстану.\n\nВоспользуйтесь субсидией на удобрения — государство компенсирует до 50% затрат для зерновых культур и до 30% для других культур. Наш ИИ-ассистент поможет рассчитать нормы внесения и подобрать оптимальный состав для вашего региона.`,

    irrigation: `Системы орошения и полива${cityText} — Agrosauda. Капельное орошение, дождевальные машины, насосное оборудование, трубы и фитинги для ирригации.\n\nКазахстан — страна с аридным климатом, где орошение критически важно для 70% сельскохозяйственных угодий. На Agrosauda представлены решения от мировых лидеров: Netafim, Rivulis, Valley, T-L Irrigation.\n\nГосударственная программа субсидирует установку систем орошения до 50% стоимости. Капельное орошение сокращает расход воды на 40-60% и увеличивает урожайность на 30-50%. Наши специалисты помогут с проектированием и подбором оборудования.`,

    greenhouses: `Теплицы и тепличное оборудование${cityText} — Agrosauda. Промышленные и фермерские теплицы, поликарбонат, системы отопления, автоматизация климата.\n\nТепличный бизнес в Казахстане активно развивается благодаря государственной поддержке и растущему спросу на свежие овощи. На Agrosauda вы найдёте готовые тепличные комплексы и отдельные компоненты для модернизации.\n\nСубсидии на строительство теплиц покрывают до 25% инвестиционных затрат. Средняя окупаемость тепличного бизнеса в Казахстане — 3-5 лет при правильном планировании.`,

    'spare-parts': `Запасные части для сельхозтехники${cityText} — Agrosauda. Оригинальные и аналоговые запчасти для тракторов, комбайнов, сеялок, опрыскивателей и другой техники.\n\nБыстрая поставка запчастей — критически важна в сезон. На Agrosauda представлено более 1200 позиций от проверенных поставщиков. Фильтры, ремни, подшипники, гидравлика, электрика — всё в одном месте.\n\nГарантия качества, безопасная сделка, доставка по всему Казахстану. Не нашли нужную деталь? Оставьте заявку на АгроБрокере — наши брокеры найдут необходимую запчасть.`,

    'grain-processing': `Оборудование для переработки зерна${cityText} — Agrosauda. Зерносушилки, зерноочистительные машины, мельницы, элеваторное оборудование.\n\nКазахстан производит более 20 млн тонн зерна ежегодно. Правильная послеуборочная обработка увеличивает стоимость зерна на 15-30%. На Agrosauda представлены зерносушилки от 10 до 100 т/ч, сепараторы, транспортёры и комплексные линии.\n\nГосударственные программы субсидируют модернизацию зернохранилищ и перерабатывающих мощностей. Безопасная сделка и проверенные продавцы на Agrosauda.`,

    'feed-equipment': `Кормовое оборудование${cityText} — кормосмесители, кормораздатчики, грануляторы на Agrosauda. Техника для заготовки, хранения и раздачи кормов от ведущих производителей.\n\nЭффективное кормление — основа рентабельного животноводства. На нашей платформе вы найдёте оборудование для всех этапов кормопроизводства. Государственные субсидии покрывают до 25% стоимости оборудования.`,

    'farm-tools': `Сельскохозяйственные инструменты и инвентарь${cityText} — Agrosauda. Ручной и механизированный инструмент для фермерских хозяйств.\n\nОт садовых инструментов до профессионального оборудования — всё для эффективной работы на земле. Проверенные продавцы, доступные цены, доставка по Казахстану.`,

    storage: `Оборудование для хранения сельхозпродукции${cityText} — Agrosauda. Силосные ямы, зернохранилища, овощехранилища, холодильное оборудование.\n\nПравильное хранение сокращает потери урожая на 20-30%. На Agrosauda представлены решения для хранения зерна, овощей, фруктов и кормов. Государственные субсидии на строительство хранилищ.`,

    seeders: `Посевная техника и сеялки${cityText} — Agrosauda. Пневматические, механические и точные сеялки от Amazone, Väderstad, Horsch, Great Plains.\n\nТочный посев — основа высокого урожая. На Agrosauda вы найдёте сеялки для зерновых, пропашных и овощных культур. Государственные субсидии покрывают до 25% стоимости новой техники.`,

    harvesters: `Уборочная техника и опрыскиватели${cityText} — Agrosauda. Самоходные опрыскиватели, жатки, пресс-подборщики, косилки от проверенных поставщиков.\n\nСвоевременная уборка и защита растений — ключ к сохранению урожая. На платформе Agrosauda представлена техника для всех этапов уборки. Безопасная сделка и гарантия качества.`,
  };

  if (lang !== 'ru') {
    // For non-Russian, return a shorter generic text
    const catName = getCategoryTitle(categorySlug, lang);
    const cityName = citySlug ? getCityName(citySlug, lang) : '';
    const location = cityName || (lang === 'en' ? 'Kazakhstan' : lang === 'kz' ? 'Қазақстан' : '哈萨克斯坦');

    if (lang === 'en') {
      return `Buy ${catName} in ${location} on Agrosauda — Kazakhstan's largest agricultural marketplace. Wide selection from verified sellers, safe deals with money-back guarantee, government subsidies up to 50%. Delivery across all regions of Kazakhstan. Use our AI assistant for subsidy guidance.`;
    }
    if (lang === 'kz') {
      return `${catName} ${location} — Agrosauda-да сатып алыңыз. Қазақстанның ең ірі ауылшаруашылық маркетплейсі. Тексерілген сатушылардан кең таңдау, қауіпсіз мәміле, мемлекеттік субсидиялар 50%-ға дейін. Қазақстанның барлық аймақтарына жеткізу.`;
    }
    return `在${location}购买${catName} — Agrosauda哈萨克斯坦最大的农业市场。经过验证的卖家，安全交易，政府补贴高达50%。全哈萨克斯坦配送。`;
  }

  return texts[categorySlug] || `${cat}${cityText} — купить на Agrosauda. Широкий выбор от проверенных продавцов. Безопасная сделка, субсидии, доставка по всему Казахстану.`;
}
