import type { Metadata } from "next";
import { Space_Mono, IBM_Plex_Mono, VT323 } from "next/font/google";
import "./globals.css";
import MetaHead from '@/components/MetaHead';

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '700'],
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
});

const vt323 = VT323({
  weight: ['400'],
  variable: "--font-vt323",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FINANCE",
  description: "TO THE FINANCIAL FREEDOM",
};

import { Noto_Sans_JP } from 'next/font/google';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={notoSansJP.className} suppressHydrationWarning>
      <head>
        <MetaHead />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${spaceMono.variable} ${ibmPlexMono.variable} ${vt323.variable} font-mono antialiased bg-background text-softWhite`}
      >
        {children}
      </body>
    </html>
  );
}
