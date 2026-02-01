
export interface LevelThreshold {
  level: number;
  totalXPNeeded: number;
  rewardCents: number;
}

const MAX_LEVEL = 50;
const BASE_XP = 250;
const XP_MULTIPLIER = 1.15;
const BASE_REWARD = 50;
const REWARD_INCREMENT = 10;

const generateLevelThresholds = (): LevelThreshold[] => {
  const levels: LevelThreshold[] = [{ level: 1, totalXPNeeded: 0, rewardCents: 0 }];
  
  let lastLevelXP = 0;
  let xpForNextLevel = BASE_XP;
  let lastReward = 0;

  for (let level = 2; level <= MAX_LEVEL; level++) {
    const totalXPNeeded = lastLevelXP + xpForNextLevel;
    const rewardCents = level === 2 ? BASE_REWARD : lastReward + REWARD_INCREMENT;

    levels.push({
      level: level,
      totalXPNeeded: Math.floor(totalXPNeeded),
      rewardCents: rewardCents,
    });
    
    lastLevelXP = totalXPNeeded;
    xpForNextLevel *= XP_MULTIPLIER;
    lastReward = rewardCents;
  }
  
  return levels;
};

export const LEVEL_THRESHOLDS: LevelThreshold[] = generateLevelThresholds();

export const getLevelFromXP = (xp: number): number => {
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
        if (xp >= LEVEL_THRESHOLDS[i].totalXPNeeded) {
            return LEVEL_THRESHOLDS[i].level;
        }
    }
    return 1;
};

    
