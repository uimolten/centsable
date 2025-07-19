
"use client";

import { useAuth } from '@/hooks/use-auth';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { Skeleton } from '@/components/ui/skeleton';
import { Logo } from '@/components/logo';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith('/auth');
  // A lesson page will have a path like /learn/s1, so more than 2 segments.
  // The main learn page is just /learn, which has 2 segments.
  const isIndividualLessonPage = pathname.startsWith('/learn/') && pathname.split('/').length > 2;

  const showLayout = !isAuthPage && !isIndividualLessonPage;

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
