const maxAge = process.env.VUE_APP_MAX_AGE ?? 5;
const apiKey = process.env.VUE_APP_API_KEY;
const apiSecret = process.env.VUE_APP_API_SECRET;

const getUtf8Bytes = (str) =>
  new Uint8Array(
    [...unescape(encodeURIComponent(str))].map((c) => c.charCodeAt(0))
  );

const keyBytes = getUtf8Bytes(apiSecret);

export async function headersCalculation(verb, path, data) {
  const expires = Math.floor(Date.now() / 1000) + maxAge;
  const message =
    verb.toUpperCase() + path + expires + (data ? JSON.stringify(data) : "");
  const messageBytes = getUtf8Bytes(message);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, messageBytes);

  // to lowercase hexits
  const hexits = [...new Uint8Array(sig)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // to base64
  // const base64 = btoa(String.fromCharCode(...new Uint8Array(sig)));

  return {
    ["api-expires"]: expires,
    ["api-key"]: apiKey,
    ["api-signature"]: hexits,
  };
}
