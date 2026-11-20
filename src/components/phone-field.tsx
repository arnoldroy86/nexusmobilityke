import { useEffect, useMemo, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { DIAL_CODES } from "@/lib/phone-data";
import { DEFAULT_COUNTRY, countryOptions, detectCountry, flagEmoji } from "@/lib/phone";

type PhoneFieldProps = {
  id: string;
  name: string;
};

/**
 * Phone number input with a country-code picker. The country is detected
 * automatically from the visitor's time zone / language, and can be changed.
 * The selected country is submitted as `${name}-country` (ISO code).
 */
export function PhoneField({ id, name }: PhoneFieldProps) {
  const options = useMemo(() => countryOptions(), []);
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const changedByVisitor = useRef(false);

  useEffect(() => {
    if (!changedByVisitor.current) setCountry(detectCountry());
  }, []);

  return (
    <div className="phone-field">
      <select
        className="phone-country"
        name={`${name}-country`}
        aria-label="Country code"
        value={country}
        onChange={(event) => {
          changedByVisitor.current = true;
          setCountry(event.target.value);
        }}
      >
        {options.map(({ code, name: countryLabel, dial }) => (
          <option key={code} value={code}>
            {flagEmoji(code)} +{dial} {countryLabel}
          </option>
        ))}
      </select>
      <Input
        id={id}
        name={name}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder={DIAL_CODES[country] === "254" ? "7XX XXX XXX" : "Phone number"}
        required
      />
    </div>
  );
}
