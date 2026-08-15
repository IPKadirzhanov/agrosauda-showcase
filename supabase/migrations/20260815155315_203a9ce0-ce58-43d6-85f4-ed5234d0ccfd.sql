ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS promoted_until timestamptz,
  ADD COLUMN IF NOT EXISTS promotion_plan text;

CREATE TABLE IF NOT EXISTS public.listing_promotions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  plan text NOT NULL,
  days integer NOT NULL,
  amount bigint NOT NULL,
  currency text NOT NULL DEFAULT 'KZT',
  status text NOT NULL DEFAULT 'pending',
  provider text NOT NULL DEFAULT 'freedompay',
  provider_payment_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.listing_promotions TO authenticated;
GRANT ALL ON public.listing_promotions TO service_role;

ALTER TABLE public.listing_promotions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own promotions"
  ON public.listing_promotions FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_listing_promotions_updated_at
  BEFORE UPDATE ON public.listing_promotions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_listing_promotions_product ON public.listing_promotions(product_id);
CREATE INDEX IF NOT EXISTS idx_products_promoted_until ON public.products(promoted_until);