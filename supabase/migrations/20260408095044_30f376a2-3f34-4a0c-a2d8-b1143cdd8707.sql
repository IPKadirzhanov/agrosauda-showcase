
CREATE TABLE public.broker_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  broker_id uuid NOT NULL,
  request_id uuid NOT NULL REFERENCES public.broker_requests(id) ON DELETE CASCADE,
  amount bigint NOT NULL,
  currency text NOT NULL DEFAULT 'KZT',
  status text NOT NULL DEFAULT 'pending',
  tiptoppay_transaction_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.broker_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Brokers view own payments"
ON public.broker_payments FOR SELECT TO authenticated
USING (auth.uid() = broker_id);

CREATE POLICY "Admins view all payments"
ON public.broker_payments FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can insert payments"
ON public.broker_payments FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Service role can update payments"
ON public.broker_payments FOR UPDATE TO anon, authenticated
USING (true);

CREATE TRIGGER update_broker_payments_updated_at
BEFORE UPDATE ON public.broker_payments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
