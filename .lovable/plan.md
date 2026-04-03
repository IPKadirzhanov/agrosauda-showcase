

# AgroShorts — Short-Form Video System

## Overview
Add a TikTok-style vertical video feed to Agrosauda with upload, likes, comments, product linking, and admin moderation. Dark-themed, mobile-first, performance-optimized.

---

## Phase 1: Database

### New tables via migration

**`agro_shorts`** — core video table
- `id` uuid PK, `user_id` uuid (ref profiles), `product_id` uuid nullable (ref products)
- `video_url` text, `thumbnail_url` text nullable
- `title` text, `description` text nullable, `category` text nullable
- `likes_count` int default 0, `views_count` int default 0, `comments_count` int default 0
- `status` text default 'active' (active/moderation/blocked)
- `is_promoted` boolean default false, `created_at`, `updated_at`
- RLS: SELECT for everyone, INSERT/UPDATE/DELETE for owner

**`agro_shorts_likes`** — one like per user per video
- `id` uuid PK, `user_id` uuid, `short_id` uuid (ref agro_shorts)
- unique(user_id, short_id), RLS: authenticated insert/delete own

**`agro_shorts_comments`** — basic comments
- `id` uuid PK, `user_id` uuid, `short_id` uuid (ref agro_shorts)
- `content` text, `created_at`
- RLS: SELECT all, INSERT authenticated, DELETE own

**Storage bucket**: `agro-shorts` (public, 50MB max, video/* only)

**Triggers**: increment/decrement `likes_count` and `comments_count` on agro_shorts via triggers.

---

## Phase 2: Frontend Pages & Components

### New files to create

1. **`src/pages/AgroShortsPage.tsx`** — Main feed page
   - Full-screen dark background, snap-scroll container (`scroll-snap-type: y mandatory`)
   - Each video card takes full viewport height with `scroll-snap-align: start`
   - Uses `IntersectionObserver` for autoplay/pause and lazy loading
   - Preloads next video via hidden `<video>` element
   - Overlay UI: right-side action buttons (like/comment/share), bottom info bar (author, description, product link)

2. **`src/components/shorts/ShortVideoCard.tsx`** — Single video card
   - `<video>` element: autoplay, loop, muted initially, playsInline
   - Tap to pause/play, double-tap to like
   - Right side floating buttons: Like (heart + count), Comment (icon + count), Share (copy link)
   - Bottom overlay: author avatar + name, description, product tag with "View Product" CTA
   - Progress bar at bottom

3. **`src/components/shorts/ShortsUploadModal.tsx`** — Upload dialog
   - File input with drag-and-drop, validation (mp4/webm, max 50MB, 5-60s)
   - Title, description fields
   - Product selector dropdown (fetches user's products)
   - Category selector (optional)
   - Upload progress bar using Supabase Storage
   - Available from dashboard for sellers/brokers/business accounts

4. **`src/components/shorts/ShortsCommentSheet.tsx`** — Comments bottom sheet
   - Slide-up panel showing comments list
   - Input field to add comment
   - Author name + timestamp per comment

5. **`src/components/shorts/ShortsProductOverlay.tsx`** — Product info overlay
   - Shows linked product mini-card (image, title, price)
   - "View Product" button → navigates to `/product/:id`

### Navigation integration

- Add "AgroShorts" to `navLinks` in `Header.tsx` (path: `/agroshorts`)
- Add route in `App.tsx`
- Add translations for all 4 languages (`nav.agroShorts` already exists as `Agro Shop` — we add `nav.agroShorts` as new key `agroShorts`)

### Homepage preview (optional)
- Add a horizontal scroll section on HomePage showing 4-6 thumbnail previews of popular shorts with view counts

---

## Phase 3: Admin Panel

1. **`src/pages/admin/AdminShortsPage.tsx`**
   - Table of all videos: thumbnail, title, author, views, likes, status
   - Actions: view, block/unblock, delete
   - Stats summary cards (total videos, total views, total likes)

2. Add sidebar link in `AdminLayout.tsx` with Video icon

---

## Phase 4: i18n

Add `agroShorts` section to all 4 translation files (ru, en, kz, cn):
- nav item, page titles, button labels (like, comment, share, upload, viewProduct, buyNow)
- Upload form labels, validation messages
- Admin section labels

---

## Performance Strategy

- **Snap scroll** with CSS `scroll-snap-type` — native smooth scrolling
- **IntersectionObserver** — only play visible video, pause others
- **Preload** — load next video's source when current is 50% watched
- **Lazy mount** — only render 3 video cards at a time (current ± 1)
- **Muted autoplay** — browsers allow muted autoplay, user taps to unmute
- Videos served from Supabase Storage (public bucket with CDN)

---

## Design

- Feed page: `bg-black` full-screen, no header/footer visible during scroll
- Overlay text: white with text-shadow for readability
- Action buttons: semi-transparent white circles with icons
- Like animation: scale spring on tap
- Smooth gradient overlay at bottom for text readability
- Premium glassmorphism on comment sheet

---

## Technical Details

### Files to create
| File | Purpose |
|------|---------|
| `src/pages/AgroShortsPage.tsx` | Main feed with snap-scroll |
| `src/components/shorts/ShortVideoCard.tsx` | Individual video card |
| `src/components/shorts/ShortsUploadModal.tsx` | Upload form/modal |
| `src/components/shorts/ShortsCommentSheet.tsx` | Comments panel |
| `src/components/shorts/ShortsProductOverlay.tsx` | Product overlay |
| `src/pages/admin/AdminShortsPage.tsx` | Admin moderation |

### Files to modify
| File | Change |
|------|--------|
| `src/App.tsx` | Add `/agroshorts` route |
| `src/components/layout/Header.tsx` | Add nav link |
| `src/pages/admin/AdminLayout.tsx` | Add sidebar link |
| `src/i18n/translations/ru.ts` | Add agroShorts translations |
| `src/i18n/translations/en.ts` | Add agroShorts translations |
| `src/i18n/translations/kz.ts` | Add agroShorts translations |
| `src/i18n/translations/cn.ts` | Add agroShorts translations |
| `src/pages/DashboardPage.tsx` | Add upload button for sellers |

### Database migration
- 1 migration: creates 3 tables, storage bucket, RLS policies, triggers for counters

