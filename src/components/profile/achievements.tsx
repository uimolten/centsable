
"use client";

import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Lock, Star, Trophy, Award, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const allAchievements = [
  { id: 'savings-starter', name: 'Savings Starter', description: 'Awarded for completing the Savings Unit.', icon: Star },
  { id: 'investing-novice', name: 'Investing Novice', description: 'Awarded for completing the Investing Unit.', icon: Trophy },
  { id: 'streak-7', name: '7-Day Streak', description: 'Awarded for logging in for 7 consecutive days.', icon: Calendar },
  { id: 'first-investment', name: 'First Investment', description: 'Awarded after making your first simulated investment.', icon: Award },
  // Add more potential achievements here
];

interface AchievementsProps {
  earnedAchievements: string[];
}

export function Achievements({ earnedAchievements }: AchievementsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-3xl font-bold font-headline mb-6">Your Achievements</h2>
      <TooltipProvider>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {allAchievements.map(achievement => {
            const isEarned = earnedAchievements.includes(achievement.id);
            const Icon = achievement.icon;
            
            return (
              <motion.div key={achievement.id} variants={itemVariants}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center gap-2">
                      <div className={cn(
                        "flex items-center justify-center w-24 h-24 rounded-full border-4 transition-all duration-300",
                        isEarned 
                          ? "bg-yellow-400/20 border-yellow-400 text-yellow-300 shadow-glow"
                          : "bg-muted/30 border-border/20 text-muted-foreground"
                      )}>
                        {isEarned ? <Icon className="h-12 w-12" /> : <Lock className="h-12 w-12" />}
                      </div>
                      <p className={cn("font-semibold text-center", !isEarned && "text-muted-foreground")}>
                        {achievement.name}
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-card/80 backdrop-blur-md border-border/20">
                    <p>{achievement.description}</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            );
          })}
        </div>
      </TooltipProvider>
    </motion.div>
  );
}
