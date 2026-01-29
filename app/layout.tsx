// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

export const metadata = {
  title: "BAGVED",
  description: "BAGVED",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="da" className={inter.variable}>
      <body className={inter.className}>
        <Header />
        <main className="pageMain">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

