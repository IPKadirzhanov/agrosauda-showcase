

# Исправление 4 багов: роль брокера, выход, карточки, навигация

## Проблема 1: Роль брокера пропадает при перезагрузке

**Причина:** В `useAuth.tsx` строки 132-135 — race condition. `getSession()` возвращает промис, и сразу после `++authRequestVersionRef.current` проверяется `if (requestVersion !== authRequestVersionRef.current)` — но к этому моменту `onAuthStateChange` уже мог увеличить счётчик, и `getSession` ветка отбрасывается. В результате `fetchRole` не вызывается и `userRole` остаётся `null`.

**Решение:** Переписать инициализацию в `useEffect` — сначала подписаться на `onAuthStateChange`, затем вызвать `getSession` только для начального состояния. Убрать дублирующий вызов `getSession` и доверить восстановление сессии событию `INITIAL_SESSION` от `onAuthStateChange`. Убрать проверку `requestVersion` сразу после инкремента.

## Проблема 2: Зависание при выходе из аккаунта

**Причина:** В `signOut` устанавливается `setLoading(true)`, но `DashboardPage` в `useEffect` при `!user` делает `navigate('/auth')`. При этом `loading` всё ещё true, и компонент рендерит спиннер, а навигация не происходит корректно.

**Решение:** В `signOut` — не ставить `setLoading(true)`. Сразу сбросить состояние и вызвать `signOut`. Навигацию после выхода делать в компоненте, который вызывает `signOut`, а не через `useEffect`.

## Проблема 3: В карточках АгроБрокера видны контактные данные

**Причина:** Строки 450 в `AgroBrokerPage.tsx` — `contact_name`, `contact_phone`, `contact_email` отображаются всем брокерам до покупки.

**Решение:** Скрыть из карточек `contact_name`, `contact_phone`, `contact_email`. Показывать только: товар, количество, цену, регион, доставку. Контактные данные показывать только в личном кабинете брокера после оплаты (уже реализовано на `BrokerDashboardPage`).

## Проблема 4: Кнопка «Кабинет» ведёт на общий дашборд

**Причина:** В `Header.tsx` строка 172 — ссылка всегда `/dashboard`. Для брокера `DashboardPage` делает редирект на `/dashboard/broker`, но это лишний переход и мерцание.

**Решение:** В `Header.tsx` использовать `userRole` из `useAuth()` для определения URL:
- `broker` → `/dashboard/broker`
- `business` → `/dashboard/business`
- остальные → `/dashboard`

## Затрагиваемые файлы

| Файл | Изменение |
|---|---|
| `src/hooks/useAuth.tsx` | Исправить race condition в инициализации, убрать `setLoading(true)` из `signOut` |
| `src/pages/AgroBrokerPage.tsx` | Скрыть contact_name/phone/email из карточек |
| `src/components/layout/Header.tsx` | Динамический URL для кнопки «Кабинет» на основе `userRole` |

