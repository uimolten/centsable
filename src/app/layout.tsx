
import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/context/auth-provider';
import './globals.css';
import ClientLayout from './client-layout';
import { LevelUpManager } from '@/components/level-up-manager';
import { RewardNotifier } from '@/components/reward-notifier';
import { Analytics } from '@vercel/analytics/next';

import { Sora } from 'next/font/google';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://centsable.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Centsable | Your Adventure in Financial Mastery',
    template: '%s | Centsable',
  },
  applicationName: 'Centsable',
  description: 'Master your money with Centsable. Learn budgeting, investing, and credit through interactive games and quests. The fun way to financial freedom.',
  keywords: ['financial literacy', 'budgeting game', 'finance for students', 'money management', 'investing simulator', 'credit score', 'gamified finance'],
  authors: [{ name: 'Centsable Team' }],
  creator: 'Centsable',
  publisher: 'Centsable',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: 'Centsable | Gamified Financial Literacy',
    description: 'Stop guessing, start growing. Learn to budget and invest by playing.',
    siteName: 'Centsable',
    images: [
      {
        url: '/images/HeroSection.webp', // We'll use your existing hero image as the social preview
        width: 1200,
        height: 630,
        alt: 'Centsable Hero Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Centsable | Gamified Financial Literacy',
    description: 'Master your money with interactive quests and games.',
    images: ['/images/HeroSection.webp'],
    creator: '@centsable', // Update if you have a handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'tOQpyc9Ts06hvixRNeC0gamAeZ1E3OIUm5CWtmTlmY0',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${sora.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Centsable",
              "url": baseUrl,
            }),
          }}
        />
      </head>
      <body className="font-body">
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
          <LevelUpManager />
          <RewardNotifier />
          <Toaster />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
