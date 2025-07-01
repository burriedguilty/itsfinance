import type { Metadata } from "next";
import './globals.css'
import '@/styles/global.css';
import '@/styles/pulse-glow.css';
import "./chaos.css";
import { Inter } from "next/font/google";
import { AppProvider } from '@/context/AppContext';
import ClientButtons from '../components/ClientButtons';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "IT'S FINANCE",
  description: "TO THE FINANCIAL FREEDOM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProvider>
          {children}
          <ClientButtons />
        </AppProvider>
      </body>
    </html>
  );
}
