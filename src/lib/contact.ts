export const WHATSAPP_NUMBER = "254740570038";
export const PHONE_DISPLAY = "+254 740570038";
export const PHONE_TEL = "+254740570038";
export const EMAIL = "info@nexusmobilityhq.com";
export const ADDRESS_LINES = ["Applewood Adams", "Kilimani, Nairobi"];
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Applewood+Adams+Kilimani+Nairobi";

export function buildWhatsAppUrl(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Opens a WhatsApp chat with NEXUS, with the message ready to send. */
export function openWhatsApp(message: string) {
  const url = buildWhatsAppUrl(message);
  const opened = window.open(url, "_blank");
  if (opened) {
    opened.opener = null;
  } else {
    // Pop-up blocked (common on iOS after an async step): use this tab instead.
    window.location.href = url;
  }
}

/** Builds a readable WhatsApp message from a form's fields, skipping empty ones. */
export function composeMessage(title: string, fields: Array<[label: string, value: string]>) {
  const lines = fields
    .filter(([, value]) => value.trim() !== "")
    .map(([label, value]) => `*${label}:* ${value.trim()}`);
  return [title, "", ...lines].join("\n");
}
