"use client";
import { useI18n } from "@/components/i18n/LanguageProvider";

import { useEffect, useMemo, useState } from "react";

export default function ContactTypeLine({ phrases }: { phrases: string[] }) {
  const { t } = useI18n();
  const parts = useMemo(() => phrases.map(phrase => t(phrase)), [phrases, t]);
  const [p, setP] = useState(0);
  const [i, setI] = useState(0);

  useEffect(() => {
    const s = parts[p] ?? "";
    let t: any;

    if (i < s.length) t = setTimeout(() => setI(v => v + 1), 22);
    else t = setTimeout(() => { setI(0); setP(v => (v + 1) % parts.length); }, 1400);

    return () => clearTimeout(t);
  }, [i, p, parts]);

  const current = parts[p] ?? "";
  return (
    <span style={{ whiteSpace: "nowrap" }}>
      {t(current.slice(0, i))}
      <span style={{ display: "inline-block", width: 10, opacity: 0.6 }}>|</span>
    </span>
  );
}
