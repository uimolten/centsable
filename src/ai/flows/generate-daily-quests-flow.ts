
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { db } from "@/lib/firebase";
import { collection, writeBatch, serverTimestamp, doc, getDocs } from "firebase/firestore";

// Helper function to get a random integer within a range
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const MASTER_QUEST_POOL = [
  // Learning & Knowledge Quests
  { id: 'quiz_whiz', description: 'Answer [X] quiz questions correctly.', goalRange: [3, 5], rewards: { xp: 20, cents: 0 }, enabled: true, actionType: 'complete_quiz_question' },
  { id: 'lesson_learner', description: 'Complete [X] new lesson steps.', goalRange: [5, 10], rewards: { xp: 25, cents: 0 }, enabled: true, actionType: 'complete_lesson_step' },
  { id: 'topic_starter', description: 'Start a new lesson in any unit.', goalRange: [1, 1], rewards: { xp: 10, cents: 0 }, enabled: true, actionType: 'start_new_lesson' },
  { id: 'unit_finisher', description: 'Complete any full lesson unit.', goalRange: [1, 1], rewards: { xp: 50, cents: 0 }, enabled: true, actionType: 'complete_unit' },
  { id: 'practice_perfect', description: 'Complete [X] practice sessions.', goalRange: [1, 2], rewards: { xp: 20, cents: 0 }, enabled: true, actionType: 'complete_practice_session' },

  // Minigame & Activity Quests
  { id: 'game_on', description: 'Play [X] rounds of any minigame.', goalRange: [2, 3], rewards: { xp: 15, cents: 0 }, enabled: true, actionType: 'play_minigame_round' },
  { id: 'budget_buster_champ', description: 'Successfully complete a round of Budget Busters.', goalRange: [1, 1], rewards: { xp: 20, cents: 0 }, enabled: true, actionType: 'play_minigame_round' },
  { id: 'high_scorer', description: 'Beat your high score in any minigame.', goalRange: [1, 1], rewards: { xp: 30, cents: 0 }, enabled: true, actionType: 'beat_high_score' },

  // General App Engagement Quests
  { id: 'login_streak', description: 'Log in today to keep your streak alive.', goalRange: [1, 1], rewards: { xp: 10, cents: 0 }, enabled: true, actionType: 'login' },
  { id: 'profile_updater', description: 'Update your username or avatar.', goalRange: [1, 1], rewards: { xp: 15, cents: 0 }, enabled: true, actionType: 'update_profile' },
  { id: 'explorer', description: 'Visit [X] different pages (Lessons, Minigames, Profile).', goalRange: [3, 3], rewards: { xp: 15, cents: 0 }, enabled: true, actionType: 'visit_page' },
  { id: 'goal_setter', description: 'Create a new SMART savings goal.', goalRange: [1, 1], rewards: { xp: 30, cents: 0 }, enabled: false, actionType: 'create_goal' }
];

const GenerateDailyQuestsInputSchema = z.object({
  userId: z.string(),
});
type GenerateDailyQuestsInput = z.infer<typeof GenerateDailyQuestsInputSchema>;

const GenerateDailyQuestsOutputSchema = z.object({
  success: z.boolean(),
  questsGenerated: z.number(),
});
type GenerateDailyQuestsOutput = z.infer<typeof GenerateDailyQuestsOutputSchema>;

export async function generateDailyQuests(input: GenerateDailyQuestsInput): Promise<GenerateDailyQuestsOutput> {
  return generateDailyQuestsFlow(input);
}

const generateDailyQuestsFlow = ai.defineFlow(
  {
    name: 'generateDailyQuestsFlow',
    inputSchema: GenerateDailyQuestsInputSchema,
    outputSchema: GenerateDailyQuestsOutputSchema,
  },
  async ({ userId }) => {
    try {
      const batch = writeBatch(db);
      const userDocRef = doc(db, "users", userId);
      const questsRef = collection(userDocRef, "daily_quests");

      // 1. Delete all existing quests for the user
      const existingQuestsSnapshot = await getDocs(questsRef);
      existingQuestsSnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });

      // 2. Filter, shuffle, and select 3 new quests
      const enabledQuests = MASTER_QUEST_POOL.filter(q => q.enabled);
      const shuffledQuests = shuffleArray(enabledQuests);
      const selectedQuests = shuffledQuests.slice(0, 3);
      
      // 3. Add new quests to the batch
      for (const quest of selectedQuests) {
        const newQuestRef = doc(questsRef);
        batch.set(newQuestRef, {
          questId: quest.id,
          description: quest.description,
          targetAmount: getRandomInt(quest.goalRange[0], quest.goalRange[1]),
          currentProgress: 0,
          isCompleted: false,
          rewardXP: quest.rewards.xp,
          rewardCents: quest.rewards.cents,
          assignedDate: serverTimestamp()
        });
      }

      // 4. Update the user's last generated timestamp and reset the completion flag
      batch.update(userDocRef, { 
        lastQuestGenerated: serverTimestamp(),
        dailyQuestsCompleted: false,
      });

      // 5. Commit the batch
      await batch.commit();

      return { success: true, questsGenerated: selectedQuests.length };
    } catch (error) {
      console.error("Error generating daily quests:", error);
      return { success: false, questsGenerated: 0 };
    }
  }
);
