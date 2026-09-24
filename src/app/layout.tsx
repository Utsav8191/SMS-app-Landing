import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Nunito } from 'next/font/google';
import './globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { PostHogProvider } from '@/components/analytics/PostHogProvider';

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
  title: 'School Management Software & ERP Platform | Alpine Grow',
  description: 'All-in-one school management software. Automate fee collection, student attendance, payroll, and ID cards with built-in AI Copilot. Request early access today.',
  robots: {
    index: true,
    follow: true,
  },
  keywords: 'school management software, school ERP platform, student attendance software, fee management, staff payroll, student ID card generator, online admissions, Alpine Grow, school software, edtech',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    title: 'Alpine Grow | Modern School Management Software',
    description: 'Streamline school fees, student data, payroll, and attendance with our AI-powered ERP platform.',
    url: 'https://alpinegrow.in/',
    siteName: 'Alpine Grow',
    images: [
      {
        url: 'https://alpinegrow.in/assets/og-preview.png',
        width: 1200,
        height: 630,
        alt: 'Alpine Grow | Modern School Management Software',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alpine Grow | Modern School Management Software',
    description: 'Streamline school fees, student data, payroll, and attendance with our AI-powered ERP platform.',
    images: ['https://alpinegrow.in/assets/og-preview.png'],
  },
  verification: {
    google: 'Hz94W5iZhSk3RBqcYA2a7JwKmTzGUZnIhaCyJuaIIYc',
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Alpine Grow',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web, Mobile',
  description: 'Comprehensive school management software with AI copilot for fee management, attendance tracking, staff payroll, and student ID card generation.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
    availability: 'https://schema.org/PreOrder',
  },
  url: 'https://alpinegrow.in/',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${nunito.variable} scroll-smooth`}>
      <head>
        <link rel="canonical" href="https://alpinegrow.in/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased text-on-surface bg-background">
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  );
}
