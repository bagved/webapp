// app/layout.tsx
//
// HVAD DET ER: Den yderste skabelon der omgiver alle sider.
// Alt herinde vises på ALLE sider (header, footer, fonte).
//
// HVAD DU KAN ÆNDRE HER:
//   title       — det der vises i fanen i browseren
//   description — bruges af søgemaskiner (SEO)
//   icon        — favicon-filen i /public-mappen
//   <link> tags — skifter Google Fonts (opdater også styles/theme.css)

import "./globals.css";
import type { ReactNode } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export const metadata = {
  title: "Bagved",
  description: "Bagved",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
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

