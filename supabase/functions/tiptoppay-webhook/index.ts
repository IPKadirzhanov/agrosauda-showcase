import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // TipTopPay sends form-urlencoded or JSON
    const contentType = req.headers.get("content-type") || "";
    let body: Record<string, string>;

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await req.text();
      body = Object.fromEntries(new URLSearchParams(text));
    } else {
      body = await req.json();
    }

    const {
      InvoiceId,
      TransactionId,
      Status,
      Amount,
    } = body;

    // Status from TipTopPay: "Completed", "Declined", "Authorized"
    if (!InvoiceId) {
      return new Response(JSON.stringify({ code: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    if (Status === "Completed" || Status === "Authorized") {
      // Get payment record
      const { data: payment } = await supabaseAdmin
        .from("broker_payments")
        .select("*")
        .eq("id", InvoiceId)
        .single();

      if (!payment || payment.status === "completed") {
        return new Response(JSON.stringify({ code: 0 }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Update payment status
      await supabaseAdmin
        .from("broker_payments")
        .update({
          status: "completed",
          tiptoppay_transaction_id: TransactionId || null,
        })
        .eq("id", InvoiceId);

      // Claim the broker request
      await supabaseAdmin.rpc("claim_broker_request", {
        _request_id: payment.request_id,
        _broker_id: payment.broker_id,
      });
    } else if (Status === "Declined") {
      await supabaseAdmin
        .from("broker_payments")
        .update({ status: "failed", tiptoppay_transaction_id: TransactionId || null })
        .eq("id", InvoiceId);
    }

    // TipTopPay expects {"code": 0} for success
    return new Response(JSON.stringify({ code: 0 }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response(JSON.stringify({ code: 0 }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
