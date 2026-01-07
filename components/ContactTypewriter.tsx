"use client";

import { useEffect, useMemo, useState } from "react";

export default function ContactTypewriter({
  phrases,
  startDelayMs = 0,
  typeMs = 85,
  deleteMs = 55,
  pauseMs = 2600,
  showCursor = true,
}: {
  phrases: string[];
  startDelayMs?: number;
  typeMs?: number;
  deleteMs?: number;
  pauseMs?: number;
  showCursor?: boolean;
}) {
  const list = useMemo(() => phrases.filter(Boolean), [phrases]);
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [mode, setMode] = useState<"wait" | "type" | "pause" | "del">("wait");

  // Initial delay
  useEffect(() => {
    const t0 = window.setTimeout(() => setMode("type"), startDelayMs);
    return () => window.clearTimeout(t0);
  }, [startDelayMs]);

  // Typing logic
  useEffect(() => {
    if (!list.length) return;
    const current = list[i % list.length];

    if (mode === "type") {
      if (txt.length < current.length) {
        const id = window.setTimeout(
          () => setTxt(current.slice(0, txt.length + 1)),
          typeMs
        );
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
        const id = window.setTimeout(
          () => setTxt(txt.slice(0, -1)),
          deleteMs
        );
        return () => window.clearTimeout(id);
      }
      setI((x) => x + 1);
      setMode("type");
    }
  }, [mode, txt, i, list, typeMs, deleteMs, pauseMs]);

  return (
    <span
      style={{
        whiteSpace: "nowrap",
        display: "inline-flex",
        alignItems: "baseline",
      }}
    >
      <span>{txt}</span>

      {showCursor && (
<span
  aria-hidden
  style={{
    marginLeft: 2,
    fontWeight: 900,
    color: "#000", // or try "#fff" depending on background
    fontSize: "1.1em",
    opacity: 1,
    animation: "caretBlink 1s steps(1) infinite",
  }}
>
  |
</span>

      )}

      <style jsx>{`
        @keyframes caretBlink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </span>
  );
}
