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

const DEFAULT_CLAIM_FEE = 5000;

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

    const body = await req.json().catch(() => ({}));
    const purpose: string = typeof body.purpose === "string" ? body.purpose : "promotion";
    const return_url: unknown = body.return_url;

    const merchantId = Deno.env.get("FREEDOMPAY_MERCHANT_ID");
    const secretKey = Deno.env.get("FREEDOMPAY_SECRET_KEY");
    if (!merchantId || !secretKey) return json({ error: "Платёжная система не настроена" }, 500);

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    let orderId = "";
    let amount = 0;
    let description = "";

    if (purpose === "promotion") {
      const product_id = body.product_id;
      if (typeof product_id !== "string" || !product_id) return json({ error: "Не указано объявление" }, 400);
      const planCfg = PROMO_PLANS[body.plan as string];
      if (!planCfg) return json({ error: "Неверный тариф" }, 400);

      const { data: product } = await admin
        .from("products").select("id, title, seller_user_id").eq("id", product_id).maybeSingle();
      if (!product) return json({ error: "Объявление не найдено" }, 404);
      if (product.seller_user_id !== user.id) return json({ error: "Это не ваше объявление" }, 403);

      const { data: promo, error: insertError } = await admin
        .from("listing_promotions")
        .insert({
          user_id: user.id,
          product_id,
          plan: body.plan,
          days: planCfg.days,
          amount: planCfg.amount,
          status: "pending",
        })
        .select("id").single();
      if (insertError || !promo) return json({ error: insertError?.message || "Ошибка создания платежа" }, 500);

      orderId = promo.id;
      amount = planCfg.amount;
      description = `Продвижение объявления: ${product.title} (${planCfg.label})`;
    } else if (purpose === "broker_claim") {
      const request_id = body.request_id;
      if (typeof request_id !== "string" || !request_id) return json({ error: "Не указана заявка" }, 400);

      const { data: isBroker } = await admin.rpc("has_role", { _user_id: user.id, _role: "broker" });
      const { data: isAdmin } = await admin.rpc("has_role", { _user_id: user.id, _role: "admin" });
      if (!isBroker && !isAdmin) return json({ error: "Доступно только брокерам" }, 403);

      const { data: request } = await admin
        .from("broker_requests")
        .select("id, product_type, status, claimed_by, claim_fee")
        .eq("id", request_id).maybeSingle();
      if (!request) return json({ error: "Заявка не найдена" }, 404);
      if (request.claimed_by) return json({ error: "Заявка уже взята" }, 409);
      if (request.status !== "active") return json({ error: "Заявка неактивна" }, 409);

      const fee = Number(request.claim_fee) || DEFAULT_CLAIM_FEE;
      const { data: payment, error: payErr } = await admin
        .from("broker_payments")
        .insert({
          broker_id: user.id,
          request_id,
          amount: fee,
          currency: "KZT",
          status: "pending",
        })
        .select("id").single();
      if (payErr || !payment) return json({ error: payErr?.message || "Ошибка создания платежа" }, 500);

      orderId = payment.id;
      amount = fee;
      description = `Комиссия брокера за заявку: ${request.product_type}`;
    } else if (purpose === "safe_deal") {
      const product_id = body.product_id;
      if (typeof product_id !== "string" || !product_id) return json({ error: "Не указан товар" }, 400);

      const { data: product } = await admin
        .from("products").select("id, title, price, seller_user_id, status").eq("id", product_id).maybeSingle();
      if (!product) return json({ error: "Товар не найден" }, 404);
      if (product.seller_user_id === user.id) return json({ error: "Нельзя купить свой товар" }, 400);

      const { data: order, error: orderErr } = await admin
        .from("safe_deal_orders")
        .insert({
          buyer_id: user.id,
          seller_id: product.seller_user_id,
          product_id,
          amount: product.price,
          status: "pending",
        })
        .select("id").single();
      if (orderErr || !order) return json({ error: orderErr?.message || "Ошибка создания заказа" }, 500);

      orderId = order.id;
      amount = Number(product.price);
      description = `Безопасная сделка: ${product.title}`;
    } else {
      return json({ error: "Неизвестный тип платежа" }, 400);
    }

    if (!amount || amount <= 0) return json({ error: "Некорректная сумма" }, 400);

    const base = Deno.env.get("SUPABASE_URL")!;
    const site = typeof return_url === "string" && return_url.startsWith("http")
      ? return_url
      : "https://agrosauda.kz/dashboard";

    const params: Record<string, string> = {
      pg_merchant_id: merchantId,
      pg_order_id: orderId,
      pg_amount: String(amount),
      pg_currency: "KZT",
      pg_description: description,
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

    const res = await fetch(FREEDOMPAY_INIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(params).toString(),
    });
    const xml = await res.text();
    const status = parseXmlValue(xml, "pg_status");
    const redirectUrl = parseXmlValue(xml, "pg_redirect_url");
    const paymentId = parseXmlValue(xml, "pg_payment_id");

    const table = purpose === "promotion"
      ? "listing_promotions"
      : purpose === "broker_claim"
      ? "broker_payments"
      : "safe_deal_orders";

    if (status !== "ok" || !redirectUrl) {
      const errText = parseXmlValue(xml, "pg_error_description") || "Ошибка платёжной системы";
      await admin.from(table).update({ status: "failed" }).eq("id", orderId);
      console.error("FreedomPay init failed:", xml);
      return json({ error: errText }, 400);
    }

    if (paymentId) {
      if (table === "listing_promotions") {
        await admin.from(table).update({ provider_payment_id: paymentId }).eq("id", orderId);
      } else if (table === "broker_payments") {
        await admin.from(table).update({ tiptoppay_transaction_id: paymentId }).eq("id", orderId);
      }
    }

    return json({ redirect_url: redirectUrl, order_id: orderId, promotion_id: orderId });
  } catch (err) {
    console.error("freedompay-init error:", err);
    return json({ error: "Внутренняя ошибка сервера" }, 500);
  }
});
