
import type { Timestamp } from "firebase/firestore";
import type { Quest } from './quests';

export interface GameSummary {
  score: number;
  highScore: number;
  budget?: number;
  spentOnNeeds?: number;
  spentOnWants?: number;
  incurredConsequences?: string[];
  isNewHighScore: boolean;
  spentTooLittleOnWants?: boolean;
  missedSavingsGoal?: boolean;
  scorePenalty?: number;
  initialBudget?: number;
}

export interface UserData {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: 'user' | 'admin';
  xp: number;
  level: number;
  cents: number;
  streak: number;
  lessonsCompleted: number;
  achievements: string[];
  completedLessons: string[];
  lastQuestGenerated?: Timestamp;
  createdAt: Timestamp;
  dailyQuests?: Quest[];
  dailyQuestsCompleted?: boolean;
  gameSummaries?: {
    [gameId: string]: {
      lastAttempt?: GameSummary;
      bestAttempt?: GameSummary;
      rewardHistory?: Timestamp[];
    };
  };
}

    
