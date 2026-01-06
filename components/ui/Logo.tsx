"use client";

import { useEffect, useState } from "react";

export default function Logo({
  size = 34,
  text = "BAGVED",
}: {
  size?: number;
  text?: string;
}) {
  const [showImg, setShowImg] = useState(false);

  // Try to detect if /logo.png exists, without triggering next/image decode errors
  useEffect(() => {
    let cancelled = false;

    fetch("/logo.png", { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        setShowImg(res.ok);
      })
      .catch(() => {
        if (cancelled) return;
        setShowImg(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!showImg) {
    return (
      <span
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          fontSize: 18,
          lineHeight: 1,
        }}
      >
        {text}
      </span>
    );
  }

  return (
    <img
      src="/logo.png"
      alt={text}
      width={size}
      height={size}
      style={{ display: "block" }}
      onError={() => setShowImg(false)}
    />
  );
}
