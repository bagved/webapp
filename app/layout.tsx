// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export const metadata = {
  title: "Bagved",
  description: "Bagved",
  icons: {
    icon: '/Favicon Transparent.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="da">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Genos:ital,wght@0,100;0,300;0,400;0,700;0,900;1,400&family=Rubik:ital,wght@0,300;0,400;0,500;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main className="pageMain">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

