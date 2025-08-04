
"use client";

import { AuthProvider } from '@/context/auth-provider';
import { useAuth } from '@/hooks/use-auth';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { Logo } from '@/components/logo';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { updateQuestProgress } from '@/ai/flows/update-quest-progress-flow';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { user, authLoading } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!user || typeof window === 'undefined') return;

    const mainRoutes = new Set(['/learn', '/minigames', '/profile']);
    const visitedPagesKey = `visited_pages_${user.uid}`;
    
    try {
      const visitedRaw = sessionStorage.getItem(visitedPagesKey);
      const visited = visitedRaw ? new Set(JSON.parse(visitedRaw)) : new Set();
      
      const currentMainRoute = Array.from(mainRoutes).find(route => pathname.startsWith(route));

      if (currentMainRoute && !visited.has(currentMainRoute)) {
        visited.add(currentMainRoute);
        sessionStorage.setItem(visitedPagesKey, JSON.stringify(Array.from(visited)));
        
        if (visited.size >= 3) {
            updateQuestProgress({ userId: user.uid, actionType: 'visit_page' });
            // Once the quest is triggered, we can clear the storage for the next session/day
            // Or we can add a timestamp check here to only clear it daily
            // For now, let's keep it simple and not clear it automatically
        }
      }
    } catch (error) {
        console.error("Could not access session storage:", error);
    }
  }, [pathname, user]);

  const isAuthPage = pathname.startsWith('/auth');
  const isIndividualLessonPage = pathname.startsWith('/learn/') && pathname.split('/').length > 2;

  const showLayout = !isAuthPage && !isIndividualLessonPage;

  if (!isClient || authLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 animate-pulse">
            <Logo />
            <p className="text-muted-foreground">Loading your adventure...</p>
        </div>
      </div>
    );
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

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
    )
}
