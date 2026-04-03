
-- Add claim columns to broker_requests
ALTER TABLE public.broker_requests
  ADD COLUMN IF NOT EXISTS claimed_by uuid DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS claimed_at timestamptz DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS claim_fee bigint DEFAULT 5000;

-- Add 'in_progress' to broker_request_status enum
ALTER TYPE public.broker_request_status ADD VALUE IF NOT EXISTS 'in_progress';

-- Drop existing SELECT policy
DROP POLICY IF EXISTS "Anyone can view active requests" ON public.broker_requests;

-- Brokers and admins can see all requests, request owners can see their own
CREATE POLICY "Brokers can view all requests"
ON public.broker_requests
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'broker')
  OR public.has_role(auth.uid(), 'admin')
  OR user_id = auth.uid()
);

-- Allow anon to see nothing (override the old public policy)
CREATE POLICY "Anon cannot view requests"
ON public.broker_requests
FOR SELECT
TO anon
USING (false);

-- Function to claim a request atomically
CREATE OR REPLACE FUNCTION public.claim_broker_request(
  _request_id uuid,
  _broker_id uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _result jsonb;
  _req record;
BEGIN
  -- Verify broker role
  IF NOT public.has_role(_broker_id, 'broker') AND NOT public.has_role(_broker_id, 'admin') THEN
    RETURN jsonb_build_object('success', false, 'error', 'Not a broker');
  END IF;

  -- Lock and check the request
  SELECT * INTO _req FROM public.broker_requests
  WHERE id = _request_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Request not found');
  END IF;

  IF _req.status != 'active' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Request is not active');
  END IF;

  IF _req.claimed_by IS NOT NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Already claimed');
  END IF;

  -- Claim the request
  UPDATE public.broker_requests
  SET claimed_by = _broker_id,
      claimed_at = now(),
      status = 'in_progress'
  WHERE id = _request_id;

  RETURN jsonb_build_object('success', true, 'fee', _req.claim_fee);
END;
$$;
