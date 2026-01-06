import "./globals.css";
import type { ReactNode } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Inter } from "next/font/google";
import { dolceVita } from "./fonts";

// Body font (keep something super readable)
const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "Bagved",
  description: "Production / Event / Video",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="da" className={`${bodyFont.variable} ${dolceVita.variable}`}>
      <body>
        <Header />
        <main className="pageMain">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
