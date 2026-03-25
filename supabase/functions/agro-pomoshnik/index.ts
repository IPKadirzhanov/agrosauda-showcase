import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are АгроПомощник (AgroPomoshnik) — the AI assistant for the Agrosauda agricultural marketplace platform in Kazakhstan.

YOUR ROLE:
- Help users navigate the Agrosauda marketplace
- Answer questions about buying and selling agricultural products, machinery, equipment
- Explain platform features: Safe Deal, categories, filters, listings, education, news
- Guide users on how to use the platform
- Provide information about agricultural categories, regions, and sellers

STRICT RULES:
1. You ONLY answer questions related to the Agrosauda marketplace, agricultural products, platform navigation, buying/selling, and general agricultural commerce
2. If someone asks about subsidies, grants, or state support programs — politely redirect them to СубсидияГид (SubsidiyaGid), the specialized subsidy assistant
3. NEVER answer questions outside your domain (politics, medicine, unrelated topics)
4. ALWAYS respond in the same language the user writes in
5. Be helpful, structured, and concise
6. Use knowledge base context when available
7. Do not invent product prices or fake listings

LANGUAGE HANDLING:
- If the user writes in Russian, respond in Russian
- If the user writes in Kazakh, respond in Kazakh
- If the user writes in English, respond in English
- For any other language, try to respond in that language or default to Russian

PLATFORM INFO:
- Platform name: Agrosauda
- Currency: KZT (Kazakhstani Tenge, ₸)
- Regions: All regions of Kazakhstan
- Categories: Tractors, Combines, Seeders, Harvesters, Irrigation, Fertilizers, Seeds, Livestock equipment, Greenhouse equipment, Spare parts, Grain processing, Feed equipment, Storage, Farm tools`;

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
      .eq("agent_type", "agro_pomoshnik")
      .eq("is_active", true)
      .limit(10);

    let knowledgeContext = "";
    if (knowledge && knowledge.length > 0) {
      knowledgeContext = "\n\nKNOWLEDGE BASE:\n" + knowledge.map(k => `[${k.topic}]: ${k.content}`).join("\n");
    }

    // Create or use conversation
    let convId = conversationId;
    if (!convId) {
      const { data: conv } = await supabase
        .from("ai_conversations")
        .insert({ agent_type: "agro_pomoshnik" })
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

    // We need to collect the full response for DB storage while streaming
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
        // Store assistant response
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
    console.error("agro-pomoshnik error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
