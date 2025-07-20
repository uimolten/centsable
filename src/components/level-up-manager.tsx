
"use client";

import { useAuth } from '@/hooks/use-auth';
import { LevelUpModal } from '@/components/ui/level-up-modal';

/**
 * This component listens to the global auth context and displays the
 * LevelUpModal when the levelUpData state is populated.
 */
export function LevelUpManager() {
  const { levelUpData, closeLevelUpModal } = useAuth();

  return (
    <LevelUpModal
      isOpen={!!levelUpData}
      onClose={closeLevelUpModal}
      newLevel={levelUpData?.newLevel ?? 0}
      reward={levelUpData?.reward ?? 0}
    />
  );
}

    