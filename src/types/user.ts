
import type { Timestamp } from "firebase/firestore";

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
  createdAt: Timestamp;
}
