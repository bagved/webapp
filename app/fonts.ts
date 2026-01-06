import localFont from "next/font/local";

export const dolceVita = localFont({
  src: [
    {
      path: "../public/fonts/DolceVita.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-dolce",
  display: "swap",
});
