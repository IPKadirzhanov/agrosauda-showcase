import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are СубсидияГид (SubsidiyaGid) — the specialized AI assistant for agricultural subsidies, grants, and state support programs on the Agrosauda platform in Kazakhstan.

YOUR ROLE:
- Help users find and understand available agricultural subsidies and grants in Kazakhstan
- Explain eligibility criteria, required documents, and application processes
- Provide information about state support programs for farmers
- Guide users through subsidy application steps
- Inform about deadlines, amounts, and conditions of support programs

STRICT RULES:
1. You ONLY answer questions about subsidies, grants, state support programs, agricultural financing, and related government initiatives
2. If someone asks about buying/selling products, marketplace navigation, or platform features — politely redirect them to АгроПомощник (AgroPomoshnik), the marketplace assistant
3. NEVER answer questions outside your domain (politics, medicine, unrelated topics)
4. ALWAYS respond in the same language the user writes in
5. Be precise and structured — subsidies require accurate information
6. Use knowledge base context when available
7. Always mention that users should verify current conditions with official sources
8. Do not invent subsidy programs or fake amounts

LANGUAGE HANDLING:
- If the user writes in Russian, respond in Russian
- If the user writes in Kazakh, respond in Kazakh
- If the user writes in English, respond in English
- For any other language, try to respond in that language or default to Russian

KEY SUBSIDY AREAS:
- Grants for beginning farmers (up to 8,000,000 KZT)
- Interest rate subsidies on agricultural loans (up to 10%)
- Equipment and machinery purchase subsidies
- Seed and fertilizer subsidies
- Livestock development programs
- KazAgro / Agrarian Credit Corporation programs
- Regional agricultural development programs`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, conversationId } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch relevant knowledge
    const userMessage = messages[messages.length - 1]?.content || "";
    const { data: knowledge } = await supabase
      .from("ai_knowledge_base")
      .select("topic, content")
      .eq("agent_type", "subsidiya_gid")
      .eq("is_active", true)
      .limit(10);

    // Also fetch subsidy programs from DB
    const { data: programs } = await supabase
      .from("subsidy_programs")
      .select("title, description, amount, deadline, region, category, requirements, eligibility")
      .eq("is_active", true)
      .limit(20);

    let knowledgeContext = "";
    if (knowledge && knowledge.length > 0) {
      knowledgeContext = "\n\nKNOWLEDGE BASE:\n" + knowledge.map(k => `[${k.topic}]: ${k.content}`).join("\n");
    }
    if (programs && programs.length > 0) {
      knowledgeContext += "\n\nACTIVE SUBSIDY PROGRAMS:\n" + programs.map(p => 
        `- ${p.title} | Amount: ${p.amount} | Deadline: ${p.deadline} | Region: ${p.region} | Category: ${p.category} | Eligibility: ${p.eligibility || 'N/A'}`
      ).join("\n");
    }

    // Create or use conversation
    let convId = conversationId;
    if (!convId) {
      const { data: conv } = await supabase
        .from("ai_conversations")
        .insert({ agent_type: "subsidiya_gid" })
        .select("id")
        .single();
      convId = conv?.id;
    }

    // Store user message
    if (convId && userMessage) {
      await supabase.from("ai_messages").insert({
        conversation_id: convId,
        role: "user",
        content: userMessage,
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: SYSTEM_PROMPT + knowledgeContext },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let fullResponse = "";

    (async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          await writer.write(value);
          
          const text = decoder.decode(value, { stream: true });
          for (const line of text.split("\n")) {
            if (!line.startsWith("data: ") || line.includes("[DONE]")) continue;
            try {
              const parsed = JSON.parse(line.slice(6));
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) fullResponse += content;
            } catch { /* partial JSON */ }
          }
        }
      } finally {
        if (convId && fullResponse) {
          await supabase.from("ai_messages").insert({
            conversation_id: convId,
            role: "assistant",
            content: fullResponse,
          });
        }
        await writer.close();
      }
    })();

    return new Response(readable, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream", "X-Conversation-Id": convId || "" },
    });
  } catch (e) {
    console.error("subsidiya-gid error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
