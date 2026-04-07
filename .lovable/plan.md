

# Интеграция TipTopPay KZ для оплаты комиссии брокеров

## Как работает TipTopPay

TipTopPay KZ — казахстанский платёжный шлюз. Для веб-интеграции используется **виджет** (скрипт `widget.js`), который открывает платёжную форму прямо на сайте. Поток:

1. Фронтенд открывает виджет TipTopPay с суммой и данными заказа
2. Пользователь вводит данные карты в защищённом iframe TipTopPay
3. TipTopPay обрабатывает платёж и отправляет результат
4. Наш бэкенд (Edge Function) получает webhook-уведомление и подтверждает оплату
5. После подтверждения — заявка присваивается брокеру

## Что нужно от вас

- **Public ID** терминала из личного кабинета TipTopPay (merchant.tiptoppay.kz)
- **API Password** (секретный ключ) для проверки webhook-подписей

## План реализации

### Шаг 1 — Сохранить секреты
Запросить у пользователя два секрета:
- `TIPTOPPAY_PUBLIC_ID` — публичный ID терминала
- `TIPTOPPAY_API_SECRET` — API Password для webhook-верификации

### Шаг 2 — Таблица платежей (миграция)
Создать таблицу `broker_payments`:
- `id`, `broker_id` (uuid), `request_id` (uuid), `amount` (bigint), `currency` (text, default 'KZT')
- `status` (pending/completed/failed), `tiptoppay_transaction_id` (text)
- `created_at`, `updated_at`
- RLS: брокер видит только свои платежи, админ — все

### Шаг 3 — Edge Function `tiptoppay-webhook`
Принимает POST от TipTopPay:
- Проверяет подпись (HMAC с API Secret)
- При успешном платеже: обновляет `broker_payments.status = 'completed'`
- Вызывает `claim_broker_request` для присвоения заявки брокеру
- Возвращает `{"code": 0}` для подтверждения

### Шаг 4 — Edge Function `create-payment`
Фронтенд вызывает перед открытием виджета:
- Создаёт запись в `broker_payments` со статусом `pending`
- Возвращает `payment_id` для привязки к виджету через `InvoiceId`

### Шаг 5 — Фронтенд: интеграция виджета
В `AgroBrokerPage.tsx`:
- Подключить скрипт `https://widget.tiptoppay.kz/bundles/widget.js` в `index.html`
- При нажатии "Оплатить и взять":
  1. Вызвать `create-payment` (получить payment_id)
  2. Открыть виджет TipTopPay с параметрами: `publicId`, `amount`, `currency: 'KZT'`, `invoiceId: payment_id`
  3. При `onSuccess` — показать toast "Оплата прошла, заявка взята"
  4. При `onFail` — показать ошибку

### Шаг 6 — Изменить логику claim
Убрать прямой вызов `claim_broker_request` из кнопки. Теперь claim происходит только через webhook после подтверждения оплаты.

## Затрагиваемые файлы

| Файл | Действие |
|---|---|
| `index.html` | Добавить скрипт виджета TipTopPay |
| `src/pages/AgroBrokerPage.tsx` | Интеграция виджета вместо прямого claim |
| `supabase/functions/create-payment/index.ts` | **Новый** — создание платежа |
| `supabase/functions/tiptoppay-webhook/index.ts` | **Новый** — обработка webhook |
| Миграция БД | Таблица `broker_payments` |

Дизайн и UI не меняются — виджет TipTopPay открывается как модальное окно поверх страницы.

