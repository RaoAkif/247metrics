import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "247Metrics - LLM Evaluation Platform",
  description: "247Metrics is an advanced platform for evaluating and benchmarking large language models (LLMs).",
  keywords: ["LLM", "AI Evaluation", "Machine Learning", "Next.js"],
  authors: [{ name: "Rao Akif" }],
  openGraph: {
    title: "247Metrics - LLM Evaluation Platform",
    description: "Advanced benchmarking for large language models.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
