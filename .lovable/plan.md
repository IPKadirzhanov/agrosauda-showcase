

# Аудит и исправление размеров и багов на всём сайте

## Найденные проблемы

### 1. Несогласованные размеры карточек (главная проблема из скриншотов)

**Карточки товаров (ProductCard)** — на главной в grid `lg:grid-cols-4` карточки с разной длиной заголовков и описаний получают разную высоту. Нужно:
- Добавить `h-full flex flex-col` к корневому div карточки
- Добавить `flex-1` к блоку контента `p-5`
- Зафиксировать кнопку "Подробнее" внизу через `mt-auto`

**Карточки сервисов (HomePage services grid)** — 6 карточек в `lg:grid-cols-3`, текст описания разной длины → разная высота. Нужно добавить `h-full` к Link-обёртке.

**Карточки категорий (HomePage categories)** — grid `lg:grid-cols-7` на 14 категорий, вторая строка может выглядеть неровно. Нужно `h-full` на каждую карточку.

**Classifieds: sampleListings** — grid `lg:grid-cols-3` без единой высоты. Добавить `h-full flex flex-col` + `flex-1` для контента.

**Classifieds: popularCategories** — 6 карточек, одинаковый паттерн, нужно `h-full`.

**Education: course cards** — нужно `h-full flex flex-col` + `flex-1` для контента, чтобы кнопка "Начать обучение" была на одном уровне.

**News: article cards** — нужно `h-full flex flex-col` для premium-card.

**Subsidies: program cards** — `md:grid-cols-2`, разная высота из-за описаний. Нужно `h-full flex flex-col`.

### 2. Баги и мелкие ошибки

- **ProductCard: hardcoded text** — кнопка "Подробнее" не использует i18n (hardcoded на русском)
- **AgroShopPage + `/marketplace` дублирование** — оба маршрута ведут на `AgroShopPage`, это нормально, но навигация может запутать
- **Broken image on product #3** (`photo-1605338198618-558e7661cf1e`) — на скриншоте видно сломанное изображение трактора МТЗ. Unsplash URL может быть невалидным → нужно заменить на рабочий
- **Footer: ссылки на `#`** — Privacy и Terms ведут на `#`, что выглядит как баг
- **FavoritesPage: fake state** — `isEmpty` всегда `false`, `favorites` всегда 3 товара из mock — нет реальной интеграции с БД (уже есть в Dashboard)

### 3. Детали плана исправлений

**Файлы для изменения:**

| Файл | Что меняем |
|---|---|
| `src/components/ProductCard.tsx` | `h-full flex flex-col` на корень, `flex-1` + `mt-auto` на кнопку, i18n для "Подробнее" |
| `src/pages/HomePage.tsx` | `h-full` на карточки сервисов, категорий |
| `src/pages/ClassifiedsPage.tsx` | `h-full flex flex-col` на sampleListings и popularCategories |
| `src/pages/EducationPage.tsx` | `h-full flex flex-col` на course cards, `mt-auto` на кнопку |
| `src/pages/NewsPage.tsx` | `h-full flex flex-col` на article cards |
| `src/pages/SubsidiesPage.tsx` | `h-full flex flex-col` на program cards, `mt-auto` на кнопку |
| `src/data/mockData.ts` | Заменить сломанный image URL для product #7 (МТЗ Беларус) |

**Подход:** Везде применяем один паттерн — `h-full flex flex-col` на корневой элемент карточки + `flex-1` на контентный блок + `mt-auto` на нижний элемент (кнопку/цену). Это гарантирует, что все карточки в одном ряду одинаковой высоты, а кнопки/цены выровнены по нижнему краю.

