import type { ReactNode } from "react";
import ScrollBackground from "@/components/ui/ScrollBackground";

export default function HomeExperience({ children }: { children: ReactNode }) {
  return <ScrollBackground page="home">{children}</ScrollBackground>;
}
