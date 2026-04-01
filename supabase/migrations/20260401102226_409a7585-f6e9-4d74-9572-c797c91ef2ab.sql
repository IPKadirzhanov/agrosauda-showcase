
-- Drop overly permissive policies
DROP POLICY "Authenticated can create deals" ON public.broker_deals;
DROP POLICY "Participants can update deals" ON public.broker_deals;

-- Create proper policies
CREATE POLICY "Authenticated can create deals" ON public.broker_deals FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (SELECT 1 FROM public.broker_requests WHERE id = seller_request_id AND user_id = auth.uid())
  OR EXISTS (SELECT 1 FROM public.broker_requests WHERE id = buyer_request_id AND user_id = auth.uid())
);

CREATE POLICY "Participants can update deals" ON public.broker_deals FOR UPDATE TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.broker_requests WHERE id = seller_request_id AND user_id = auth.uid())
  OR EXISTS (SELECT 1 FROM public.broker_requests WHERE id = buyer_request_id AND user_id = auth.uid())
);
