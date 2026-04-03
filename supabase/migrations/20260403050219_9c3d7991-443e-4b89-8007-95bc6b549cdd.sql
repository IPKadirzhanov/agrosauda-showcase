
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'broker';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'business';

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS account_type text DEFAULT 'user';
