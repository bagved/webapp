"use client";

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
        overflow: "visible",
        padding: "128px 0 110px",
      }}
    >
      <BackdropSheets />
      <LeftVerticalBrandWord />

      <div
        className="container"
        style={{
          paddingLeft: "clamp(60px, 8vw, 120px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            maxWidth: 880,
            display: "grid",
            gap: 96,
            paddingTop: 24,
          }}
        >
          <PointRow
            imgSrc="/1.png"
            iconFallback="★"
            phrases={["Livestream", "Broadcast", "StorSkærms arrangement"]}
            startDelayMs={0}
            subtitle="(Underoverskrift – skriv din egen)"
            body="Brødtekst. Kort forklaring i sort. Stramt og lækkert."
          />

          <PointRow
            imgSrc="/2.png"
            iconFallback="★"
            phrases={["Reklamefilm", "Content", "Kampagne"]}
            startDelayMs={900}
            subtitle="(Underoverskrift – skriv din egen)"
            body="Brødtekst. Ren typografi, ingen støj."
          />

          <PointRow
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
  const [overlapping, setOverlapping] = useState(false);

  useEffect(() => {
    const brandEl = document.getElementById("brand-word");
    const pointEls = document.querySelectorAll(".point-row");

    if (!brandEl || pointEls.length === 0) return;

    const checkOverlap = () => {
      const brandRect = brandEl.getBoundingClientRect();
      let isOverlapping = false;

      pointEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        const overlap =
          r.left < brandRect.right &&
          r.right > brandRect.left &&
          r.top < brandRect.bottom &&
          r.bottom > brandRect.top;

        if (overlap) isOverlapping = true;
      });

      setOverlapping(isOverlapping);
    };

    checkOverlap();
    window.addEventListener("scroll", checkOverlap);
    window.addEventListener("resize", checkOverlap);

    return () => {
      window.removeEventListener("scroll", checkOverlap);
      window.removeEventListener("resize", checkOverlap);
    };
  }, []);

  return (
    <div
      id="brand-word"
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
        opacity: overlapping ? 0.12 : 0.96, // ✅ FIXED
        transition: "opacity 0.35s ease",
      }}
    >
      <div
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          fontSize: "clamp(1px, 32vh, 270px)",
          fontFamily: "var(--font-heading)",
          fontWeight: 300,
          letterSpacing: "0.06em",
          lineHeight: 0.95,
          color: "var(--c1)",
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
          opacity: 0.6,
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
  imgSrc,
  iconFallback,
  phrases,
  startDelayMs,
  subtitle,
  body,
}: any) {
  return (
    <div
      className="point-row"
      style={{
        display: "grid",
        gridTemplateColumns: "56px 1fr",
        gap: 22,
        alignItems: "start",
      }}
    >
      <IconMark imgSrc={imgSrc} fallback={iconFallback} />

      <div style={{ display: "grid", gap: 14 }}>
        <div
          style={{
            fontSize: 28,
            fontWeight: 900,
            color: "var(--c1)",
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
            color: "var(--c1)",
          }}
        >
          {subtitle}
        </div>

        <div
          style={{
            fontSize: 20,
            color: "var(--text)",
            maxWidth: 720,
          }}
        >
          {body}
        </div>
      </div>
    </div>
  );
}

function IconMark({ imgSrc, fallback }: any) {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(imgSrc, { method: "HEAD" })
      .then((r) => setOk(r.ok))
      .catch(() => setOk(false));
  }, [imgSrc]);

  if (ok) {
    return <img src={imgSrc} width={56} height={56} alt="" />;
  }

  return (
    <div
      style={{
        width: 56,
        height: 56,
        display: "grid",
        placeItems: "center",
        color: "var(--c1)",
      }}
    >
      <span style={{ fontSize: 46 }}>{fallback}</span>
    </div>
  );
}
