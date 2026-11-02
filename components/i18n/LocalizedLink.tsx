"use client";
import NextLink from "next/link";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { useI18n } from "./LanguageProvider";

// Preserve the language along with existing planner parameters and anchors,
// including browsers that block local storage. External links remain untouched.
const LocalizedLink = forwardRef<HTMLAnchorElement, ComponentPropsWithoutRef<typeof NextLink>>(function LocalizedLink({ href, ...props }, ref) {
  const { locale } = useI18n();
  if (typeof href === "string" && href.startsWith("/") && !href.startsWith("//") && locale !== "da") {
    const url = new URL(href, "https://bagved.com");
    url.searchParams.set("lang", locale);
    href = `${url.pathname}${url.search}${url.hash}`;
  }
  return <NextLink ref={ref} href={href} {...props} />;
});
export default LocalizedLink;
