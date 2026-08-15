import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { makeSignature, randomSalt } from "../_shared/freedompay.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
};

const SCRIPT_NAME = "freedompay-result";

async function xmlResponse(
  status: "ok" | "error" | "rejected",
  description: string,
  salt: string,
  secretKey: string,
) {
  const body: Record<string, string> = {
    pg_salt: salt,
    pg_status: status,
    pg_description: description,
  };
  const sig = await makeSignature(SCRIPT_NAME, body, secretKey);
  const xml =
    `<?xml version="1.0" encoding="utf-8"?><response><pg_salt>${salt}</pg_salt>` +
    `<pg_status>${status}</pg_status><pg_description>${description}</pg_description>` +
    `<pg_sig>${sig}</pg_sig></response>`;
  return new Response(xml, { headers: { ...corsHeaders, "Content-Type": "text/xml" } });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const secretKey = Deno.env.get("FREEDOMPAY_SECRET_KEY") || "";

  try {
    const contentType = req.headers.get("content-type") || "";
    let body: Record<string, string>;
    if (contentType.includes("application/json")) {
      body = await req.json();
    } else {
      body = Object.fromEntries(new URLSearchParams(await req.text()));
    }

    const salt = body.pg_salt || randomSalt();
    const incomingSig = body.pg_sig;
    const expectedSig = await makeSignature(SCRIPT_NAME, body, secretKey);
    if (!incomingSig || incomingSig !== expectedSig) {
      console.error("FreedomPay: неверная подпись");
      return await xmlResponse("error", "Invalid signature", salt, secretKey);
    }

    const orderId = body.pg_order_id;
    if (!orderId) return await xmlResponse("error", "No order id", salt, secretKey);

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: promo } = await admin
      .from("listing_promotions")
      .select("*")
      .eq("id", orderId)
      .maybeSingle();
    if (!promo) return await xmlResponse("error", "Order not found", salt, secretKey);
    if (promo.status === "paid") return await xmlResponse("ok", "Already processed", salt, secretKey);

    const paid = body.pg_result === "1";

    if (paid) {
      await admin
        .from("listing_promotions")
        .update({ status: "paid", provider_payment_id: body.pg_payment_id || promo.provider_payment_id })
        .eq("id", promo.id);

      const { data: product } = await admin
        .from("products")
        .select("promoted_until")
        .eq("id", promo.product_id)
        .maybeSingle();

      const now = Date.now();
      const current = product?.promoted_until ? new Date(product.promoted_until).getTime() : 0;
      const from = current > now ? current : now;
      const until = new Date(from + promo.days * 24 * 60 * 60 * 1000).toISOString();

      await admin
        .from("products")
        .update({ promoted_until: until, promotion_plan: promo.plan, featured: true })
        .eq("id", promo.product_id);
    } else {
      await admin
        .from("listing_promotions")
        .update({ status: "failed", provider_payment_id: body.pg_payment_id || promo.provider_payment_id })
        .eq("id", promo.id);
    }

    return await xmlResponse("ok", "Accepted", salt, secretKey);
  } catch (err) {
    console.error("freedompay-result error:", err);
    return await xmlResponse("error", "Server error", randomSalt(), secretKey);
  }
});