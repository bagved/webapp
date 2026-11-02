"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import ScrollBackground from "./ScrollBackground";

export default function PageBackground({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <ScrollBackground key={pathname} page={pathname === "/" ? "home" : pathname.slice(1)}>{children}</ScrollBackground>;
}
