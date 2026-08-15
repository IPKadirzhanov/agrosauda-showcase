// Общие утилиты для подписи запросов FreedomPay (PayBox)

export const FREEDOMPAY_INIT_URL = "https://api.freedompay.kz/init_payment.php";

async function md5(input: string): Promise<string> {
  // Deno std md5 через WebCrypto недоступен, используем чистую реализацию
  const { crypto } = await import("https://deno.land/std@0.224.0/crypto/mod.ts");
  const buf = await crypto.subtle.digest("MD5", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Подпись FreedomPay: md5(script_name;значения параметров по алфавиту ключей;secret_key) */
export async function makeSignature(
  scriptName: string,
  params: Record<string, string>,
  secretKey: string,
): Promise<string> {
  const entries = Object.entries(params)
    .filter(([k]) => k !== "pg_sig")
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([, v]) => String(v));
  return await md5([scriptName, ...entries, secretKey].join(";"));
}

export function randomSalt(len = 16): string {
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function parseXmlValue(xml: string, tag: string): string | null {
  const m = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return m ? m[1].trim() : null;
}

export const PROMO_PLANS: Record<string, { days: number; amount: number; label: string }> = {
  top7: { days: 7, amount: 2000, label: "ТОП на 7 дней" },
  top14: { days: 14, amount: 3500, label: "ТОП на 14 дней" },
  top30: { days: 30, amount: 6000, label: "ТОП на 30 дней" },
};