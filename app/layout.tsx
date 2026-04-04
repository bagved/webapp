// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export const metadata = {
  title: "BAGVED",
  description: "BAGVED",
  icons: {
    icon: '/Favicon Transparent.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="da">
      <body>
        <Header />
        <main className="pageMain">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

