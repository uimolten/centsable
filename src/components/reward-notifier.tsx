
"use client";

import { useAuth } from '@/hooks/use-auth';
import { motion, AnimatePresence } from 'framer-motion';
import { Gem, Coins } from 'lucide-react';
import { useEffect, useState } from 'react';

const RewardItem = ({ icon: Icon, amount, color, targetId }: { icon: React.ElementType, amount: number, color: string, targetId: string }) => {
    const [isFlying, setIsFlying] = useState(false);
    const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            setTargetPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        }

        const timer = setTimeout(() => {
            setIsFlying(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, [targetId]);

    const variants = {
        initial: { opacity: 0, y: 50, scale: 0.5 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 15 } },
        fly: { 
            x: targetPos.x - (window.innerWidth / 2),
            y: targetPos.y - (window.innerHeight / 2),
            scale: 0.2, 
            opacity: 0,
            transition: { duration: 0.8, ease: 'easeInOut' }
        }
    };

    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate={isFlying ? 'fly' : 'animate'}
            className="flex items-center gap-2 p-3 bg-card/80 backdrop-blur-md rounded-xl shadow-lg border border-border/20"
        >
            <Icon className={`w-6 h-6 ${color}`} />
            <span className={`font-bold text-lg ${color}`}>+{amount}</span>
        </motion.div>
    );
};


export function RewardNotifier() {
  const { rewardAnimationData } = useAuth();
  
  return (
    <AnimatePresence>
      {rewardAnimationData && (rewardAnimationData.xp > 0 || rewardAnimationData.cents > 0) && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-4">
            {rewardAnimationData.xp > 0 && (
                <RewardItem icon={Gem} amount={rewardAnimationData.xp} color="text-primary" targetId="xp-display" />
            )}
            {rewardAnimationData.cents > 0 && (
                <RewardItem icon={Coins} amount={rewardAnimationData.cents} color="text-yellow-400" targetId="cents-display" />
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
