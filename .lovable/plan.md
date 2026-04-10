

# Исправление отображения логотипа Agrosauda в Google

## Проблема
В результатах поиска Google рядом с agrosauda.kz не отображается логотип (favicon). Хотя `index.html` ссылается на `/logo1.png`, Google может игнорировать его по нескольким причинам:
1. Старый `favicon.ico` в `/public` конфликтует — браузеры и Google запрашивают `/favicon.ico` по умолчанию
2. Нет мета-тегов для разных размеров иконок (apple-touch-icon, 32x32, 16x16)
3. Нет `manifest.json` с иконками

## Решение

### 1. Удалить старый `favicon.ico`
Удалить `public/favicon.ico` чтобы он не перебивал `logo1.png`.

### 2. Обновить `index.html` — добавить полный набор favicon-тегов
```html
<link rel="icon" type="image/png" sizes="32x32" href="/logo1.png">
<link rel="icon" type="image/png" sizes="16x16" href="/logo1.png">
<link rel="apple-touch-icon" sizes="180x180" href="/logo1.png">
```

### 3. Добавить `public/site.webmanifest`
Создать файл манифеста с иконками — Google использует его для определения логотипа сайта:
```json
{
  "name": "Agrosauda",
  "short_name": "Agrosauda",
  "icons": [
    { "src": "/logo1.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/logo1.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#16a34a",
  "background_color": "#ffffff",
  "display": "standalone"
}
```
И подключить в `index.html`:
```html
<link rel="manifest" href="/site.webmanifest">
```

## Затрагиваемые файлы

| Файл | Действие |
|---|---|
| `public/favicon.ico` | Удалить |
| `public/site.webmanifest` | Создать |
| `index.html` | Обновить favicon теги + manifest |

## Важно
После деплоя Google переиндексирует favicon в течение нескольких дней/недель. Можно ускорить через Google Search Console, запросив повторную индексацию главной страницы.

