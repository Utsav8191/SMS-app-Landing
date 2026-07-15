import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Nunito } from 'next/font/google';
import './globals.css';

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
  title: 'Alpine grow | Modern School Management System',
  description: 'Streamline admissions, student information, automated fee payments, Smart RFID attendance, grading systems, and school operations in one premium cloud-based ERP.',
  keywords: 'school management system, school ERP, student tracking, attendance software, fee management, online admissions, Alpine grow, school software',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Alpine grow | Modern School Management System',
    description: 'Simplify institutional administration, increase transparent parent-teacher communications, and secure fee collections.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alpine grow | Modern School Management System',
    description: 'Transform your school administration with our premium, cloud-based ERP solution.',
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
      </body>
    </html>
  );
}
