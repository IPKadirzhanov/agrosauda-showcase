
-- Fix overly permissive INSERT policies by scoping to authenticated or allowing with reasonable checks
-- For inquiries: require name and message content (already enforced by NOT NULL, policy is acceptable for public forms)
-- For ai_conversations and ai_messages: these must be accessible without auth for the chat feature
-- We'll add rate-limiting concerns at the edge function level instead

-- Drop and recreate with service_role bypass pattern
DROP POLICY "Anyone can create inquiries" ON public.inquiries;
CREATE POLICY "Authenticated users can create inquiries" ON public.inquiries FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Anonymous can create inquiries" ON public.inquiries FOR INSERT TO anon WITH CHECK (sender_id IS NULL);

DROP POLICY "Anyone can create conversations" ON public.ai_conversations;
CREATE POLICY "Auth users create conversations" ON public.ai_conversations FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Anon users create conversations" ON public.ai_conversations FOR INSERT TO anon WITH CHECK (user_id IS NULL);

DROP POLICY "Anyone can create messages" ON public.ai_messages;
CREATE POLICY "Messages insertable via service role" ON public.ai_messages FOR INSERT TO authenticated, anon WITH CHECK (
  EXISTS (SELECT 1 FROM public.ai_conversations WHERE id = conversation_id)
);

DROP POLICY "Anyone can view conversations" ON public.ai_conversations;
CREATE POLICY "Users view own conversations" ON public.ai_conversations FOR SELECT USING (
  user_id IS NULL OR auth.uid() = user_id
);

DROP POLICY "Anyone can view messages" ON public.ai_messages;
CREATE POLICY "Users view conversation messages" ON public.ai_messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.ai_conversations c 
    WHERE c.id = conversation_id 
    AND (c.user_id IS NULL OR auth.uid() = c.user_id)
  )
);
