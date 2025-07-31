
"use client";

import { useParams, useRouter } from 'next/navigation';
import { SavingsSorterGame } from '@/components/minigames/savings-sorter-game';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import React, { useEffect, useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { BudgetBustersGame } from '@/app/minigames/budget-busters-game';

// Memoize the game components to prevent re-renders on auth state changes
const MemoizedBudgetBusters = React.memo(BudgetBustersGame);
const MemoizedSavingsSorter = React.memo(SavingsSorterGame);

export default function MinigamePage() {
  const params = useParams();
  const gameId = params.gameId;
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  const gameComponent = useMemo(() => {
    if (loading || !user) {
        return (
             <div className="text-center">
                <Skeleton className="h-64 w-full" />
             </div>
        );
    }

    switch (gameId) {
      case 'savings-sorter':
        return <MemoizedSavingsSorter />;
      case 'budget-busters':
        return <MemoizedBudgetBusters />;
      default:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold">Game Not Found</h2>
            <p className="mt-2 text-muted-foreground">This game is either under construction or does not exist.</p>
          </div>
        );
    }
  }, [gameId, loading, user]);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/minigames"><ArrowLeft className="mr-2" /> Back to Arcade</Link>
        </Button>
        {gameComponent}
      </div>
    </div>
  );
}
