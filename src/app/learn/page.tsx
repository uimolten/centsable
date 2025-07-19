
"use client";

import { useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AnimatePresence, motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { LeftSidebar } from '@/components/learn/left-sidebar';

export default function LearnPage() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 sm:px-6 lg:px-8 py-8">
      {/* --- Daily Quests Side Panel (Desktop) --- */}
      <aside className="hidden lg:block lg:col-span-3">
        <div className="sticky top-24">
          <LeftSidebar />
        </div>
      </aside>

      {/* --- Main Lessons Column --- */}
      <main className="lg:col-span-9">
        <div className="w-full bg-card/50 backdrop-blur-lg border border-border/10 rounded-2xl p-8 text-center min-h-[400px]">
          <h1 className="text-3xl font-bold font-headline">Lessons & Units</h1>
          <p className="mt-4 text-muted-foreground">The main learning pathway content will go here.</p>
        </div>
      </main>

      {/* --- Floating Action Button (Mobile) --- */}
      {!isDesktop && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <motion.div
              initial={{ scale: 0, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              className="fixed bottom-6 right-6 z-40"
            >
              <Button size="icon" className="w-16 h-16 rounded-full shadow-glow">
                <Target className="w-8 h-8" />
              </Button>
            </motion.div>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full max-w-md p-0 border-none"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <LeftSidebar isSheet={true} />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
