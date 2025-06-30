import type { Metadata } from "next";
import "./globals.css";
import "./chaos.css";

import MetaHead from '@/components/MetaHead';

export const metadata: Metadata = {
  title: "FINANCE",
  description: "TO THE FINANCIAL FREEDOM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <MetaHead />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className="font-mono min-h-screen perspective-1000 bg-background text-softWhite"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          transformOrigin: 'center center'
        }}
      >
        {children}
      </body>
    </html>
  );
}
