import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Nunito } from 'next/font/google';
import './globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://alpinegrow.in'),
  title: 'Alpine grow | Modern School Management System',
  description: 'Simplify institutional administration, increase transparent parent-teacher communications, and secure fee collections.',
  keywords: 'school management system, school ERP, student tracking, attendance software, fee management, online admissions, Alpine grow, school software',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Alpine grow | Modern School Management System',
    description: 'Simplify institutional administration, increase transparent parent-teacher communications, and secure fee collections.',
    url: 'https://alpinegrow.in',
    siteName: 'Alpine grow',
    images: [
      {
        url: '/preview-product.png',
        width: 1200,
        height: 630,
        alt: 'Alpine grow - Modern School Management System',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alpine grow | Modern School Management System',
    description: 'Simplify institutional administration, increase transparent parent-teacher communications, and secure fee collections.',
    images: ['/preview-product.png'],
  },
  verification: {
    google: 'Hz94W5iZhSk3RBqcYA2a7JwKmTzGUZnIhaCyJuaIIYc',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${nunito.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-on-surface bg-background">
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  );
}
