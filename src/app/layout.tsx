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
  title: 'DivBrainers',
  description: 'Divbrainers is a platform for learning and practicing coding',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${instrumentSans.variable} antialiased bg-white sm:bg-gray-100  flex h-screen w-screen flex-col p-0 sm:p-5`}
      >
        <SessionContext>{children}</SessionContext>
      </body>
    </html>
  );
}
