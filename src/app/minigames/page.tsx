"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { minigames, Minigame } from '@/data/minigames-data';
import { units as allUnits, Unit } from '@/data/learn-data';
import { isUnitCompleted } from '@/lib/lesson-utils';
import { Lock, Gamepad2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export default function MinigamesPage() {
  const [units, setUnits] = useState<Unit[]>(allUnits);

  // In a real app, you might get this from a user's progress state
  // For now, we use the static data which can be modified for testing
  const completedUnitIds = new Set(
    units.filter(unit => isUnitCompleted(unit)).map(unit => unit.id)
  );

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Minigames Arcade</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Test your skills and earn rewards! New games unlock as you complete learning units.
        </p>
      </div>

      <AnimatePresence>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {minigames.map((game, index) => {
            const isUnlocked = completedUnitIds.has(game.requiredUnitId);
            const requiredUnit = units.find(u => u.id === game.requiredUnitId);

            return (
              <motion.div
                key={game.id}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
              >
                <Card className={cn(
                  "h-full flex flex-col transition-all duration-300 border-2",
                  isUnlocked 
                    ? "bg-card/50 backdrop-blur-lg border-border/20 hover:border-primary/50 hover:shadow-glow" 
                    : "bg-muted/30 border-transparent"
                )}>
                  <CardHeader className="flex-row items-start gap-4 space-y-0">
                    <div className={cn(
                      "p-3 rounded-lg",
                      isUnlocked ? "bg-primary/20 text-primary" : "bg-muted-foreground/20 text-muted-foreground"
                    )}>
                      <game.icon className="w-8 h-8" />
                    </div>
                    <div className="flex-grow">
                      <CardTitle className={cn(!isUnlocked && "text-muted-foreground")}>{game.title}</CardTitle>
                      <CardDescription className={cn(isUnlocked ? "text-muted-foreground" : "text-muted-foreground/80")}>
                        {game.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-end">
                    {isUnlocked ? (
                       <Button className="w-full shadow-lg">
                         <Gamepad2 className="mr-2 h-4 w-4" />
                         Play Now
                       </Button>
                    ) : (
                      <div className="text-center text-sm text-muted-foreground p-3 rounded-md bg-background/30">
                        <p className="font-semibold flex items-center justify-center gap-2">
                          <Lock className="h-4 w-4" /> Locked
                        </p>
                        <p>Complete the "{requiredUnit?.title}" unit to unlock.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
