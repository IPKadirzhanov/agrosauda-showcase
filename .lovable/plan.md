

# Полная SEO-оптимизация Agrosauda

## Что уже сделано
- Компонент `SEOHead` (мета-теги, OG, Twitter Cards, hreflang, JSON-LD)
- Компонент `Breadcrumbs` со Schema.org
- `CategoryPage` с динамической маршрутизацией `/category/:slug/:city`
- SEO на: Главная, Товар, Субсидии, Образование, Новости, Объявления
- `sitemap.xml`, `robots.txt`, `llms.txt`

## Что нужно сделать

### Шаг 1 — SEO на оставшиеся страницы
Добавить `SEOHead` + `Breadcrumbs` на страницы, где их ещё нет:
- О нас, Контакты, Безопасная сделка, АгроШоп, АгроБрокер, АгроШортс, Продать, Избранное, ИИ-ассистенты

Каждая страница получит уникальный title, description, keywords, canonical URL и JSON-LD (WebPage).

### Шаг 2 — Русскоязычные SEO-маршруты
Создать ЧПУ-маршруты на русском для поисковиков:
- `/zerno`, `/pshenica`, `/kukuruza`, `/skot`, `/texnika`, `/udobreniya`, `/semena`
- Городские комбинации: `/pshenica-almaty`, `/pshenica-astana`, `/skot-almaty`, `/texnika-almaty` и т.д.

Каждый маршрут рендерит `CategoryPage` с нужными параметрами. Добавляем маппинг слагов в `seoData.ts`.

### Шаг 3 — Блог-система
Новые файлы:
- `src/data/blogData.ts` — 4 статьи по 800-1500 слов
- `src/pages/BlogPage.tsx` — список статей
- `src/pages/BlogArticlePage.tsx` — страница статьи с Article JSON-LD

Статьи:
1. «Цены на пшеницу в Казахстане 2026»
2. «Как продать зерно в Казахстане»
3. «Где купить сельхоз технику»
4. «Обзор агро рынка Казахстана»

Каждая с H1/H2 структурой, внутренними ссылками на категории.

### Шаг 4 — Аналитика
В `index.html` добавить закомментированные заглушки:
- Google Analytics (gtag.js)
- Яндекс.Метрика
- Google Search Console (мета-тег верификации)

### Шаг 5 — Ленивая загрузка изображений
Добавить `loading="lazy"` на `<img>` в `ProductCard`.

### Шаг 6 — Обновить sitemap.xml
Добавить все новые URL: блог, русские слаги, оставшиеся страницы.

### Шаг 7 — Переводы
Добавить пространство `blog` во все 4 языковых файла (ru, en, kz, cn).

## Затрагиваемые файлы

| Файл | Действие |
|---|---|
| `AboutPage`, `ContactPage`, `SafeDealPage`, `AgroShopPage`, `AgroBrokerPage`, `SellPage`, `FavoritesPage`, `AIAssistantsPage` | Добавить SEOHead + Breadcrumbs |
| `src/data/seoData.ts` | Русские слаги категорий |
| `src/data/blogData.ts` | **Новый** — 4 SEO-статьи |
| `src/pages/BlogPage.tsx` | **Новый** — список блога |
| `src/pages/BlogArticlePage.tsx` | **Новый** — страница статьи |
| `src/App.tsx` | Маршруты блога + русские слаги |
| `src/components/ProductCard.tsx` | `loading="lazy"` |
| `index.html` | Заглушки аналитики |
| `public/sitemap.xml` | Новые URL |
| Все 4 файла переводов | Пространство `blog` |

Дизайн, верстка и анимации не затрагиваются. Все изменения — невидимая SEO-инфраструктура и новые контентные страницы в существующем стиле.

