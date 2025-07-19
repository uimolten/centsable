
"use client";

import { useAuth } from '@/hooks/use-auth';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { Logo } from '@/components/logo';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isAuthPage = pathname.startsWith('/auth');
  const isIndividualLessonPage = pathname.startsWith('/learn/') && pathname.split('/').length > 2;

  const showLayout = !isAuthPage && !isIndividualLessonPage;

  if (!isClient) {
    // Render a static loading shell on the server to prevent hydration mismatch
    return (
      <div className="w-full h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 animate-pulse">
            <Logo />
            <p className="text-muted-foreground">Loading your adventure...</p>
        </div>
      </div>
    );
  }

  if (loading && showLayout) {
     return (
        <div className="w-full h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4 animate-pulse">
                <Logo />
                <p className="text-muted-foreground">Loading your adventure...</p>
            </div>
        </div>
      )
  }

  if (!showLayout) {
    return <>{children}</>;
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
