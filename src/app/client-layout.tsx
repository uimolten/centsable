
"use client";

import { useAuth } from '@/hooks/use-auth';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { Skeleton } from '@/components/ui/skeleton';
import { Logo } from '@/components/logo';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  if (loading) {
     return (
        <div className="w-full h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4 animate-pulse">
                <Logo />
                <p className="text-muted-foreground">Loading your adventure...</p>
            </div>
        </div>
      )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <Toaster />
    </div>
  );
}
