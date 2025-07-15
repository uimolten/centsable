
"use client";

import { useParams } from 'next/navigation';
import { SavingsSorterGame } from '@/components/minigames/savings-sorter-game';
import { BudgetBustersGame } from '@/components/minigames/budget-busters-game';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function MinigamePage() {
  const params = useParams();
  const gameId = params.gameId;

  const renderGame = () => {
    switch (gameId) {
      case 'savings-sorter':
        return <SavingsSorterGame />;
      case 'budget-busters':
        return <BudgetBustersGame />;
      default:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold">Game Not Found</h2>
            <p className="mt-2 text-muted-foreground">This game is either under construction or does not exist.</p>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/minigames"><ArrowLeft className="mr-2" /> Back to Arcade</Link>
        </Button>
        {renderGame()}
      </div>
    </div>
  );
}
