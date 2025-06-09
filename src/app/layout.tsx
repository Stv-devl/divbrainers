import type { Metadata } from 'next';
import { Outfit, Instrument_Sans } from 'next/font/google';
import SessionContext from '@/context/sessionsContext';
import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
});

const instrumentSans = Instrument_Sans({
  variable: '--font-instrument-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DivBrainers — Practice for Developer Interviews',

  description:
    'DivBrainers is an open-source platform that helps developers prepare for technical job interviews. It combines AI-driven interviews, a secure dashboard, and upcoming tools like coding challenges, quizzes, and ATS resume analysis to offer a complete preparation kit',
  keywords: [
    'coding interviews',
    'frontend practice',
    'react quiz',
    'live coding',
    'developer tools',
    'resume feedback',
    'scan ats',
    'DivBrainers',
    'AI interview',
    'mock interview',
    'open-source',
  ],
  metadataBase: new URL('https://divbrainers.com'),
  authors: [{ name: 'Stevan Dev', url: 'https://divbrainers.com' }],
  creator: 'DivBrainers',
  icons: {
    icon: '/favicon-education.svg',
  },
  openGraph: {
    title: 'DivBrainers — AI Tools for Developer Interviews',
    description:
      'Master coding interviews with quizzes, mock interviews, and AI-generated feedback on your resume — all in one place with DivBrainers.',
    url: 'https://divbrainers.com',
    siteName: 'DivBrainers',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DivBrainers platform preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
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
        className={`${outfit.variable} ${instrumentSans.variable} antialiased bg-white sm:bg-gray-100  flex h-screen w-screen flex-col p-0 sm:p-5`}
      >
        <SessionContext>{children}</SessionContext>
      </body>
    </html>
  );
}
