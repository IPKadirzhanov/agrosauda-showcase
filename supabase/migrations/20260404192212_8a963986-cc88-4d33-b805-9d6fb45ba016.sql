
-- Drop old SELECT policy
DROP POLICY IF EXISTS "Users view own conversations" ON public.ai_conversations;

-- Only authenticated users see their own conversations
CREATE POLICY "Users view own conversations"
ON public.ai_conversations FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Also update ai_messages SELECT to match
DROP POLICY IF EXISTS "Users view conversation messages" ON public.ai_messages;

CREATE POLICY "Users view conversation messages"
ON public.ai_messages FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM ai_conversations c
  WHERE c.id = ai_messages.conversation_id
    AND auth.uid() = c.user_id
));
