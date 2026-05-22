// export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Main from '@/components/Main';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'VerenPaine App',
  description: 'Save and track your blood pressure readings.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
          <Header />
          <Main>{children}</Main>
          <Footer />
      </body>
    </html>
  );
}
