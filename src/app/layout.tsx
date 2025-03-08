import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from '@/app/providers';
import MainLayout from '@/components/layout/MainLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'DevHunt - Discover Developer Projects in Progress',
    template: '%s | DevHunt',
  },
  description: 'A platform for developers to share and discover projects that are still in development.',
  metadataBase: new URL(process.env.APP_URL || 'https://yourdomain.com'),
  openGraph: {
    title: 'DevHunt - Discover Developer Projects in Progress',
    description: 'A platform for developers to share and discover projects that are still in development.',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevHunt',
    description: 'Discover developer projects in progress',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/apple-icon.png',
  },
  manifest: '/manifest.json',
  applicationName: 'DevHunt',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#4f46e5" />
      </head>
      <body className={inter.className}>
        <Providers>
          <MainLayout>
            {children}
          </MainLayout>
        </Providers>
      </body>
    </html>
  );
} 