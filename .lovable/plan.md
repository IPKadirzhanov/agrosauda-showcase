

# Agrosauda Major Upgrade Plan

## Phase 1: Auth + Roles + Dashboards + Favicon (this implementation)

### 1. Database Changes

**Extend `app_role` enum** to add `broker` and `business` roles:
```sql
ALTER TYPE public.app_role ADD VALUE 'broker';
ALTER TYPE public.app_role ADD VALUE 'business';
```

**Add `role` and `phone` columns to `profiles`** (if not already there — phone exists, add `account_type`):
```sql
ALTER TABLE public.profiles ADD COLUMN account_type text DEFAULT 'user';
```

This tracks whether someone registered as user/broker/business, while `user_roles` handles actual role-based access.

### 2. Google OAuth Login

- Use Lovable Cloud managed Google OAuth (already supported natively)
- Call the Configure Social Auth tool to generate the `lovable` integration module
- Add Google sign-in button on the main auth page using `lovable.auth.signInWithOAuth("google")`

### 3. Split Authentication System

**A. Main Auth Page (`/auth`)** — for regular users:
- Keep existing email/password login & registration
- Add Google OAuth button
- Add phone number input field (collected but no SMS verification)
- At bottom: grey text link "Авторизация для ИП/ТОО и брокеров" → navigates to `/auth/business`

**B. Business Auth Page (`/auth/business`)** — new page:
- Separate login/register page for brokers and businesses
- Registration form includes: company name, BIN/IIN, contact person, phone, email, password
- Role selector: "Брокер" or "ИП/ТОО"
- On registration, assigns `broker` or `business` role in `user_roles` table
- Same glass-morphism premium design

### 4. Role-Based Dashboard Routing

**Modify `DashboardPage.tsx`** to check user role and redirect:
- `user` role → current dashboard (profile, favorites, messages, deals, activity)
- `broker` role → new `BrokerDashboardPage` at `/dashboard/broker`
- `business` role → new `BusinessDashboardPage` at `/dashboard/business`

**Create `BrokerDashboardPage.tsx`:**
- Sidebar: Заявки на продажу, Заявки на покупку, Мэтчинг, Сделки, Профиль
- Full access to broker_requests table (filtered views)
- Deal matching interface
- Deal status management

**Create `BusinessDashboardPage.tsx`:**
- Sidebar: Мои товары, Создать товар, Аналитика, Профиль магазина
- Product listing management (CRUD via `products` table)
- Store profile editing

### 5. Favicon

- Add `<link rel="icon" href="/logo1.png" type="image/png">` to `index.html`
- Remove any existing favicon references

### 6. Full Multilingual System (i18n)

**Create translation infrastructure:**
- `src/i18n/translations/ru.ts` — Russian (default, all strings)
- `src/i18n/translations/kz.ts` — Kazakh
- `src/i18n/translations/en.ts` — English
- `src/i18n/translations/cn.ts` — Chinese
- `src/i18n/LanguageContext.tsx` — React context with `useLanguage()` hook
- `src/i18n/index.ts` — language registry and helper `t()` function

**Language switcher** — add to Header (globe icon dropdown with 4 languages). Store selected language in localStorage and profile.preferred_language.

**Translate all pages:** Header, Footer, Auth, Dashboard, AgroBroker, AgroShop, Classifieds, AI Assistants, Education, News, About, Home, Safe Deal, Sell, Favorites, 404.

### 7. Updated Routes in App.tsx

```
/auth              — Main user auth
/auth/business     — Business/broker auth
/dashboard         — Auto-redirect based on role
/dashboard/broker  — Broker dashboard
/dashboard/business — Business dashboard
```

### Files to Create/Modify

| File | Action |
|------|--------|
| DB migration | Add `broker`/`business` to `app_role`, add `account_type` to profiles |
| `src/i18n/*` | New — full translation system (5+ files) |
| `src/pages/AuthPage.tsx` | Modify — add Google button, phone field, business link |
| `src/pages/BusinessAuthPage.tsx` | New — business/broker auth page |
| `src/pages/BrokerDashboardPage.tsx` | New — broker dashboard |
| `src/pages/BusinessDashboardPage.tsx` | New — business dashboard |
| `src/pages/DashboardPage.tsx` | Modify — role-based redirect |
| `src/components/layout/Header.tsx` | Modify — add language switcher |
| `src/components/layout/Footer.tsx` | Modify — use translations |
| `src/hooks/useAuth.tsx` | Modify — add role fetching |
| `src/App.tsx` | Modify — add new routes, wrap with LanguageProvider |
| `index.html` | Modify — add favicon |
| All page files | Modify — wrap text in `t()` calls |

### Technical Notes

- Google OAuth uses Lovable Cloud managed credentials (no setup needed)
- Phone field is collected during registration but not verified via SMS
- Role is stored in `user_roles` table (security best practice)
- `useAuth` hook will be extended to expose current user role
- Language preference persists in localStorage + profiles table
- All translations use a typed dictionary pattern for compile-time safety

