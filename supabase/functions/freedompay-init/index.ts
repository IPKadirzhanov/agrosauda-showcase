import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import {
  FREEDOMPAY_INIT_URL,
  makeSignature,
  parseXmlValue,
  PROMO_PLANS,
  randomSalt,
} from "../_shared/freedompay.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Требуется авторизация" }, 401);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return json({ error: "Требуется авторизация" }, 401);

    const { product_id, plan, return_url } = await req.json().catch(() => ({}));
    if (typeof product_id !== "string" || !product_id) return json({ error: "Не указано объявление" }, 400);
    const planCfg = PROMO_PLANS[plan as string];
    if (!planCfg) return json({ error: "Неверный тариф" }, 400);

    const merchantId = Deno.env.get("FREEDOMPAY_MERCHANT_ID");
    const secretKey = Deno.env.get("FREEDOMPAY_SECRET_KEY");
    if (!merchantId || !secretKey) return json({ error: "Платёжная система не настроена" }, 500);

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Проверяем, что объявление принадлежит пользователю
    const { data: product } = await admin
      .from("products")
      .select("id, title, seller_user_id")
      .eq("id", product_id)
      .maybeSingle();
    if (!product) return json({ error: "Объявление не найдено" }, 404);
    if (product.seller_user_id !== user.id) return json({ error: "Это не ваше объявление" }, 403);

    const { data: promo, error: insertError } = await admin
      .from("listing_promotions")
      .insert({
        user_id: user.id,
        product_id,
        plan,
        days: planCfg.days,
        amount: planCfg.amount,
        status: "pending",
      })
      .select("id")
      .single();
    if (insertError || !promo) return json({ error: insertError?.message || "Ошибка создания платежа" }, 500);

    const base = Deno.env.get("SUPABASE_URL")!;
    const site = typeof return_url === "string" && return_url.startsWith("http")
      ? return_url
      : "https://agrosauda.kz/dashboard";

    const params: Record<string, string> = {
      pg_merchant_id: merchantId,
      pg_order_id: promo.id,
      pg_amount: String(planCfg.amount),
      pg_currency: "KZT",
      pg_description: `Продвижение объявления: ${product.title} (${planCfg.label})`,
      pg_salt: randomSalt(),
      pg_result_url: `${base}/functions/v1/freedompay-result`,
      pg_success_url: site,
      pg_failure_url: site,
      pg_request_method: "POST",
      pg_success_url_method: "GET",
      pg_failure_url_method: "GET",
      pg_user_id: user.id,
    };
    params.pg_sig = await makeSignature("init_payment.php", params, secretKey);

    const form = new URLSearchParams(params);
    const res = await fetch(FREEDOMPAY_INIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
    });
    const xml = await res.text();
    const status = parseXmlValue(xml, "pg_status");
    const redirectUrl = parseXmlValue(xml, "pg_redirect_url");
    const paymentId = parseXmlValue(xml, "pg_payment_id");

    if (status !== "ok" || !redirectUrl) {
      const errText = parseXmlValue(xml, "pg_error_description") || "Ошибка платёжной системы";
      await admin.from("listing_promotions").update({ status: "failed" }).eq("id", promo.id);
      console.error("FreedomPay init failed:", xml);
      return json({ error: errText }, 400);
    }

    if (paymentId) {
      await admin.from("listing_promotions").update({ provider_payment_id: paymentId }).eq("id", promo.id);
    }

    return json({ redirect_url: redirectUrl, promotion_id: promo.id });
  } catch (err) {
    console.error("freedompay-init error:", err);
    return json({ error: "Внутренняя ошибка сервера" }, 500);
  }
});