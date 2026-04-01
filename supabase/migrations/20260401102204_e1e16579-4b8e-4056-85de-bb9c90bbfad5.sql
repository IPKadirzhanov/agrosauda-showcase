
-- Create broker request types enum
CREATE TYPE public.broker_request_type AS ENUM ('sell', 'buy');
CREATE TYPE public.broker_request_status AS ENUM ('active', 'in_negotiation', 'completed', 'cancelled');
CREATE TYPE public.broker_deal_status AS ENUM ('pending', 'in_negotiation', 'agreed', 'completed', 'cancelled');
CREATE TYPE public.logistics_status AS ENUM ('not_needed', 'planned', 'in_progress', 'delivered');
CREATE TYPE public.trust_level AS ENUM ('new', 'active', 'verified');

-- Broker requests table
CREATE TABLE public.broker_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  request_type public.broker_request_type NOT NULL,
  product_type TEXT NOT NULL,
  quantity TEXT NOT NULL,
  price_expectation TEXT,
  location TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_phone TEXT,
  contact_email TEXT,
  description TEXT,
  needs_delivery BOOLEAN DEFAULT false,
  delivery_notes TEXT,
  status public.broker_request_status DEFAULT 'active',
  trust_level public.trust_level DEFAULT 'new',
  is_flagged BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Broker deals table
CREATE TABLE public.broker_deals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_request_id UUID REFERENCES public.broker_requests(id) ON DELETE SET NULL,
  buyer_request_id UUID REFERENCES public.broker_requests(id) ON DELETE SET NULL,
  status public.broker_deal_status DEFAULT 'pending',
  logistics_status public.logistics_status DEFAULT 'not_needed',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.broker_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.broker_deals ENABLE ROW LEVEL SECURITY;

-- RLS for broker_requests
CREATE POLICY "Anyone can view active requests" ON public.broker_requests FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create requests" ON public.broker_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own requests" ON public.broker_requests FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own requests" ON public.broker_requests FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- RLS for broker_deals
CREATE POLICY "Deal participants can view deals" ON public.broker_deals FOR SELECT USING (true);
CREATE POLICY "Authenticated can create deals" ON public.broker_deals FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Participants can update deals" ON public.broker_deals FOR UPDATE TO authenticated USING (true);

-- Triggers for updated_at
CREATE TRIGGER update_broker_requests_updated_at BEFORE UPDATE ON public.broker_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_broker_deals_updated_at BEFORE UPDATE ON public.broker_deals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
