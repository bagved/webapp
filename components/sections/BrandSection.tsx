"use client";

/**
 * Brand section:
 * - blank background (uses global)
 * - huge vertical BAGVED (color 1) under header
 * - three points with slow typewriter
 * - professional transparent hard-corner sheets using all five colors
 *
 * Update now:
 * - Points ≈ 2x bigger (icon + type + spacing)
 * - No box/border around each point
 * - Stagger: middle point slightly more to the right
 * - “Across the room” spacing
 */

import { useEffect, useState } from "react";
import Typewriter from "../Typewriter";

export default function BrandSection() {
  return (
    <section
      id="brand"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "transparent",
        overflow: "hidden",
        padding: "128px 0 110px",
      }}
    >
      <BackdropSheets />
      <LeftVerticalBrandWord />

      <div
        className="container"
        style={{
          paddingLeft: "clamp(160px, 19vw, 290px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            // use space nicely (not cramped to the right)
            maxWidth: 1120,
            marginLeft: 0,
            display: "grid",
            // much more vertical air
            gap: 96,
            paddingTop: 8,
          }}
        >
          <PointRow
            offset="left"
            imgSrc="/1.png"
            iconFallback="★"
            phrases={["Livestream", "Broadcast", "StorSkærms arrangement"]}
            startDelayMs={0}
            subtitle="(Underoverskrift – skriv din egen)"
            body="Brødtekst. Kort forklaring i sort. Stramt og lækkert."
          />

          <PointRow
            offset="midRight"
            imgSrc="/2.png"
            iconFallback="★"
            phrases={["Reklamefilm", "Content", "Kampagne"]}
            startDelayMs={900}
            subtitle="(Underoverskrift – skriv din egen)"
            body="Brødtekst. Ren typografi, ingen støj."
          />

          <PointRow
            offset="left"
            imgSrc="/3.png"
            iconFallback="★"
            phrases={["Lyd og Lys", "Eventplanlægning", "Dine drømme"]}
            startDelayMs={1800}
            subtitle="(Underoverskrift – skriv din egen)"
            body="Brødtekst. Sort tekst. God luft. Professionelt."
          />
        </div>
      </div>
    </section>
  );
}

function LeftVerticalBrandWord() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        left: "clamp(10px, 1.8vw, 22px)",
        top: "calc(8px + 6px)",
        bottom: 0,
        display: "grid",
        alignItems: "start",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <div
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",

          // keep your current sizing behavior
          fontSize: "clamp(1px, 32vh, 270px)",

          fontFamily: "var(--font-heading)",
          fontWeight: 300,
          letterSpacing: "0.06em",
          lineHeight: 0.95,
          color: "var(--c1)",
          opacity: 0.96,
          filter: "drop-shadow(0px 18px 34px rgba(0,0,0,0.10))",
          userSelect: "none",
        }}
      >
        BAGVED
      </div>
    </div>
  );
}

function BackdropSheets() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Sheet
        style={{
          left: "clamp(140px, 20vw, 300px)",
          top: "clamp(130px, 18vh, 230px)",
          width: "clamp(360px, 48vw, 720px)",
          height: "clamp(240px, 32vh, 420px)",
          transform: "rotate(-6deg)",
          background:
            "linear-gradient(135deg," +
            "color-mix(in srgb, var(--c4) 24%, transparent)," +
            "color-mix(in srgb, var(--c4) 12%, transparent))",
          opacity: 0.66,
        }}
      />

      <Sheet
        style={{
          right: "clamp(-60px, -3vw, -10px)",
          top: "clamp(150px, 22vh, 280px)",
          width: "clamp(340px, 44vw, 640px)",
          height: "clamp(260px, 34vh, 460px)",
          transform: "rotate(7deg)",
          background:
            "linear-gradient(135deg," +
            "color-mix(in srgb, var(--c1) 18%, transparent)," +
            "color-mix(in srgb, var(--c5) 16%, transparent))",
          opacity: 0.60,
        }}
      />

      <Sheet
        style={{
          left: "clamp(220px, 28vw, 470px)",
          bottom: "clamp(40px, 10vh, 140px)",
          width: "clamp(360px, 52vw, 860px)",
          height: "clamp(260px, 36vh, 500px)",
          transform: "rotate(-2deg)",
          background:
            "linear-gradient(135deg," +
            "color-mix(in srgb, var(--c2) 16%, transparent)," +
            "color-mix(in srgb, var(--c4) 14%, transparent))",
          opacity: 0.56,
        }}
      />

      <Sheet
        style={{
          left: "clamp(170px, 24vw, 360px)",
          top: "clamp(90px, 12vh, 170px)",
          width: "clamp(220px, 26vw, 380px)",
          height: "clamp(110px, 14vh, 170px)",
          transform: "rotate(14deg)",
          background:
            "linear-gradient(135deg," +
            "color-mix(in srgb, var(--c3) 18%, transparent)," +
            "color-mix(in srgb, var(--c1) 12%, transparent))",
          opacity: 0.62,
        }}
      />

      <Sheet
        style={{
          right: "clamp(40px, 6vw, 120px)",
          bottom: "clamp(120px, 18vh, 260px)",
          width: "clamp(180px, 22vw, 320px)",
          height: "clamp(90px, 12vh, 150px)",
          transform: "rotate(-10deg)",
          background:
            "linear-gradient(135deg," +
            "color-mix(in srgb, var(--c5) 16%, transparent)," +
            "color-mix(in srgb, var(--c3) 14%, transparent))",
          opacity: 0.58,
        }}
      />
    </div>
  );
}

function Sheet({ style }: { style: React.CSSProperties }) {
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: 0,
        border: "1px solid rgba(11,11,12,0.08)",
        boxShadow: "0 28px 90px rgba(0,0,0,0.08)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        ...style,
      }}
    />
  );
}

function PointRow({
  offset,
  imgSrc,
  iconFallback,
  phrases,
  startDelayMs,
  subtitle,
  body,
}: {
  offset: "left" | "midRight";
  imgSrc: string;
  iconFallback: string;
  phrases: string[];
  startDelayMs: number;
  subtitle: string;
  body: string;
}) {
  const marginLeft =
    offset === "midRight"
      ? "clamp(48px, 8vw, 140px)" // middle goes a bit further right
      : "clamp(0px, 2vw, 24px)";

  return (
    <div
      style={{
        marginLeft,
        maxWidth: "min(920px, 100%)",
        display: "grid",
        gridTemplateColumns: "96px 1fr",
        gap: 26,
        alignItems: "start",
      }}
    >
      <IconMark imgSrc={imgSrc} fallback={iconFallback} />

      <div style={{ display: "grid", gap: 14 }}>
        {/* ~2x bigger typography */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 900,
            color: "var(--c2)",
            letterSpacing: "-0.02em",
            lineHeight: 1.08,
          }}
        >
          <Typewriter
            phrases={phrases}
            startDelayMs={startDelayMs}
            typeMs={105}
            deleteMs={70}
            pauseMs={2400}
          />
        </div>

        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "var(--c2)",
            opacity: 0.95,
            lineHeight: 1.15,
          }}
        >
          {subtitle}
        </div>

        <div
          style={{
            fontSize: 20,
            color: "var(--text)",
            opacity: 0.95,
            lineHeight: 1.45,
            maxWidth: 760,
          }}
        >
          {body}
        </div>
      </div>
    </div>
  );
}

/**
 * No box around the icon — just the mark itself.
 * Tries /1.png /2.png /3.png, otherwise star.
 */
function IconMark({ imgSrc, fallback }: { imgSrc: string; fallback: string }) {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(imgSrc, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        setOk(res.ok);
      })
      .catch(() => {
        if (cancelled) return;
        setOk(false);
      });

    return () => {
      cancelled = true;
    };
  }, [imgSrc]);

  if (ok) {
    return (
      <img
        src={imgSrc}
        alt=""
        width={56}
        height={56}
        style={{
          display: "block",
          marginTop: 6,
          filter: "drop-shadow(0px 18px 34px rgba(0,0,0,0.10))",
        }}
        onError={() => setOk(false)}
      />
    );
  }

  return (
    <div
      style={{
        width: 56,
        height: 56,
        marginTop: 6,
        display: "grid",
        placeItems: "center",
        color: "var(--c2)",
        filter: "drop-shadow(0px 18px 34px rgba(0,0,0,0.10))",
      }}
    >
      <span style={{ fontSize: 46, lineHeight: 1 }}>{fallback}</span>
    </div>
  );
}
