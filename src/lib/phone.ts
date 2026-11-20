import { DIAL_CODES, TIMEZONE_COUNTRY } from "@/lib/phone-data";

export const DEFAULT_COUNTRY = "KE";

/** Guesses the visitor's country from their time zone, then browser language. */
export function detectCountry(): string {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const fromZone = timeZone ? TIMEZONE_COUNTRY[timeZone] : undefined;
    if (fromZone && DIAL_CODES[fromZone]) return fromZone;
  } catch {
    // ignore and fall through
  }

  try {
    for (const language of navigator.languages ?? [navigator.language]) {
      const region = new Intl.Locale(language).region;
      if (region && DIAL_CODES[region]) return region;
    }
  } catch {
    // ignore and fall through
  }

  return DEFAULT_COUNTRY;
}

export function flagEmoji(country: string) {
  return String.fromCodePoint(...[...country.toUpperCase()].map((c) => 0x1f1a5 + c.charCodeAt(0)));
}

export function countryName(country: string) {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(country) ?? country;
  } catch {
    return country;
  }
}

/** All selectable countries, sorted by name. Built once on the client. */
export function countryOptions() {
  return Object.keys(DIAL_CODES)
    .map((code) => ({ code, name: countryName(code), dial: DIAL_CODES[code] }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Turns what the visitor typed plus their selected country into an
 * international number such as "+254740570038", or null if it looks invalid.
 */
export function toInternationalNumber(dial: string, input: string): string | null {
  const raw = input.trim();
  const typedInternational = raw.startsWith("+") || raw.startsWith("00");
  let digits = raw.replace(/\D/g, "");

  if (raw.startsWith("00")) digits = digits.slice(2);

  if (!typedInternational) {
    digits = digits.replace(/^0+/, "");
    // Visitor typed the country code themselves without a "+", e.g. 254740570038.
    const alreadyHasCode = digits.startsWith(dial) && digits.length > 11;
    if (!alreadyHasCode) digits = dial + digits;
  }

  return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : null;
}
