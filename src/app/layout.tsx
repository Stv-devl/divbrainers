import type { Metadata } from 'next';
import { Outfit, Instrument_Sans } from 'next/font/google';
import SessionContext from '@/context/sessionsContext';
import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

const instrumentSans = Instrument_Sans({
  variable: '--font-instrument-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Secure Dashboard',
  description: 'Secure Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${instrumentSans.variable} antialiased flex flex-col justify-betweenbg-white sm:bg-gray-100 `}
      >
        <SessionContext>{children}</SessionContext>
      </body>
    </html>
  );
}
