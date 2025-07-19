
import type { Timestamp } from 'firebase/firestore';

export interface Quest {
  id: string; // Document ID
  questId: string; // e.g., 'quiz_whiz'
  description: string;
  targetAmount: number;
  currentProgress: number;
  isCompleted: boolean;
  rewardXP: number;
  rewardCents: number;
  assignedDate: Timestamp;
}

export type QuestActionType = 
  | 'complete_quiz_question'
  | 'complete_lesson_step'
  | 'start_new_lesson'
  | 'complete_unit'
  | 'complete_practice_session'
  | 'play_minigame_round'
  | 'beat_high_score'
  | 'login'
  | 'update_profile'
  | 'visit_page';
