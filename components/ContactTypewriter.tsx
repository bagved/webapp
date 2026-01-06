"use client";

import { useEffect, useMemo, useState } from "react";

export default function ContactTypewriter({
  phrases,
  startDelayMs = 0,
  typeMs = 85,
  deleteMs = 55,
  pauseMs = 2600,
}: {
  phrases: string[];
  startDelayMs?: number;
  typeMs?: number;
  deleteMs?: number;
  pauseMs?: number;
}) {
  const list = useMemo(() => phrases.filter(Boolean), [phrases]);
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [mode, setMode] = useState<"wait" | "type" | "pause" | "del">("wait");

  useEffect(() => {
    const t0 = window.setTimeout(() => setMode("type"), startDelayMs);
    return () => window.clearTimeout(t0);
  }, [startDelayMs]);

  useEffect(() => {
    if (!list.length) return;
    const current = list[i % list.length];

    if (mode === "type") {
      if (txt.length < current.length) {
        const id = window.setTimeout(() => setTxt(current.slice(0, txt.length + 1)), typeMs);
        return () => window.clearTimeout(id);
      }
      setMode("pause");
      return;
    }

    if (mode === "pause") {
      const id = window.setTimeout(() => setMode("del"), pauseMs);
      return () => window.clearTimeout(id);
    }

    if (mode === "del") {
      if (txt.length > 0) {
        const id = window.setTimeout(() => setTxt(txt.slice(0, -1)), deleteMs);
        return () => window.clearTimeout(id);
      }
      setI((x) => x + 1);
      setMode("type");
    }
  }, [mode, txt, i, list, typeMs, deleteMs, pauseMs]);

  return (
    <span style={{ whiteSpace: "nowrap" }}>
      {txt}
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: 10,
          transform: "translateY(1px)",
          opacity: 0.65,
          animation: "blink 1.05s step-end infinite",
        }}
      >
        |
      </span>
      <style jsx>{`
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
}
