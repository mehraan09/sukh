import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A.S. – A Love Story",
  description: "A heartfelt expression of Akash's love for Sukh – a story written in code and care.",
  openGraph: {
    title: "A.S. – Sukh ❤️ Akash",
    description:
      "In a digital world full of noise, one love stands out. A.S. is more than a website – it's a confession, a connection, and a journey of hearts.",
    url: "https://sukhlovesakash.vercel.app",
    siteName: "A.S. – Sukh ❤️ Akash",
    type: "website",
    images: [
      {
        url: "sukh.jpeg",
        width: 1200,
        height: 630,
        alt: "A romantic dedication from Akash to Sukh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A.S. – Sukh ❤️ Akash",
    description:
      "A special message wrapped in code, crafted for Sukh by Akash. Dive into this love-letter web experience.",
    images: ["sukh.jpeg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
