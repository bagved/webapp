"use client";

import Link from "next/link";
import Script from "next/script";

export default function VideoSection() {
  return (
    <section
      id="video"
      style={{
        padding: "96px 0 96px",
        background: "transparent",
      }}
    >
      <div className="container">
        {/* Vimeo embed */}
        <section className="mt-10 w-full">
          <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
            <iframe
              src="https://player.vimeo.com/video/1150126676?h=2b9851b0d2&badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder={0}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              title="IS Nordic_vs1"
            ></iframe>
          </div>
          <Script src="https://player.vimeo.com/api/player.js" strategy="afterInteractive" />
        </section>

        {/* Only text underneath */}
        <div style={{ marginTop: 18 }}>
          <Link href="/cases" className="videoCasesLink">
            Se og læs om vores cases her
          </Link>
        </div>

        <style jsx>{`
          .videoCasesLink {
            font-size: 12px;
            font-weight: 900;
            letter-spacing: -0.01em;
            color: var(--c1);
            transition: color 160ms ease, transform 160ms ease, opacity 160ms ease;
            opacity: 0.95;
            display: inline-block;
          }
          .videoCasesLink:hover {
            color: var(--c3);
            transform: translateY(-1px);
            opacity: 1;
          }
        `}</style>
      </div>
    </section>
  );
}
