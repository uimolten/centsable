
import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/context/auth-provider';
import './globals.css';
import ClientLayout from './client-layout';

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
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body">
        <ClientLayout>{children}</ClientLayout>
        <Toaster />
      </body>
    </html>
  );
}
