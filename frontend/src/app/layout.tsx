import type { Metadata } from "next";
import { Newsreader, Instrument_Sans } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "VoteAgent — Voter Assistant",
  description:
    "A RAG-powered election guide with verified information. Get accurate, instant answers about voting registration, eligibility, and procedures from your personal Voter Assistant.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${instrumentSans.variable}`}>
      <body className="font-sans antialiased bg-stone-black text-stone">
        {children}
      </body>
    </html>
  );
}