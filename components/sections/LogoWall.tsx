type Logo = { src: string; top: string; left?: string; right?: string; size: number; opacity: number; rotate: number };

const logos: Logo[] = [
  { src: "/png/bagved_logo_brun_trans@300x.png", top: "5%",  left: "-5%",  size: 220, opacity: 0.12, rotate: -12 },
  { src: "/png/bagved_logo_roed@300x.png",        top: "30%", right: "-4%", size: 180, opacity: 0.09, rotate: 8  },
  { src: "/png/bagved_logo_sort_trans@300x.png",  top: "60%", left: "2%",   size: 155, opacity: 0.07, rotate: -7 },
  { src: "/png/bagved_logo_graa_trans@300x.png",  top: "80%", right: "1%",  size: 190, opacity: 0.08, rotate: 13 },
];

export default function LogoWall() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }} aria-hidden>
      {logos.map((l, i) => (
        <img
          key={i}
          src={l.src}
          alt=""
          style={{
            position: "absolute",
            top:     l.top,
            left:    l.left,
            right:   l.right,
            width:   l.size,
            height:  "auto",
            opacity: l.opacity,
            transform: `rotate(${l.rotate}deg)`,
            userSelect: "none",
          }}
        />
      ))}
    </div>
  );
}
