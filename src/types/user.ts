
import type { Timestamp } from "firebase/firestore";
import type { Quest } from './quests';

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
}
