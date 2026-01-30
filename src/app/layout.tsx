
import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/context/auth-provider';
import './globals.css';
import ClientLayout from './client-layout';
import { LevelUpManager } from '@/components/level-up-manager';
import { RewardNotifier } from '@/components/reward-notifier';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Sora } from 'next/font/google';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Centsable | Your Adventure in Financial Mastery',
  description: 'Learn budgeting, investing, and more through fun games and interactive challenges. Stop guessing, start growing.',
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
      </head>
      <body className="font-body">
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
          <LevelUpManager />
          <RewardNotifier />
          <Toaster />
        </AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
