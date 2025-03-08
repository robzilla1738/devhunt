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
  metadataBase: new URL(process.env.APP_URL || 'https://devhunt.vercel.app'),
  openGraph: {
    title: 'DevHunt - Discover Developer Projects in Progress',
    description: 'A platform for developers to share and discover projects that are still in development.',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DevHunt - Discover Developer Tools & Projects',
      }
    ],
    siteName: 'DevHunt',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevHunt',
    description: 'Discover developer projects in progress',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/apple-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  applicationName: 'DevHunt',
  robots: {
    index: true,
    follow: true,
  },
  keywords: ['developer', 'projects', 'tools', 'showcase', 'dev tools', 'community', 'developer tools'],
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
        {/* Add Google Analytics or your preferred analytics script here */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <script 
              async 
              src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} 
            />
            <script 
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-XXXXXXXXXX');
                `,
              }}
            />
          </>
        )}
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