
'use server';
/**
 * @fileOverview A server-side flow for generating daily quests for a user.
 * This flow acts as a "cron job" that can be called to refresh a user's quests for the day.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { collection, doc, getDocs, writeBatch, Timestamp, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { GenerateDailyQuestsInputSchema, GenerateDailyQuestsOutputSchema, type GenerateDailyQuestsInput, type GenerateDailyQuestsOutput, type Quest, type QuestId } from '@/types/quests';

const ALL_QUESTS: Quest[] = [
  { id: 'quiz_whiz', descriptionTemplate: 'Answer [X] quiz questions correctly.', actionType: 'answer_quiz_question_correctly', targetRange: [3, 5], reward: { xp: 20, cents: 5 } },
  { id: 'lesson_learner', descriptionTemplate: 'Complete [X] new lesson steps.', actionType: 'complete_lesson_step', targetRange: [5, 10], reward: { xp: 25, cents: 5 } },
  { id: 'game_on', descriptionTemplate: 'Play [X] rounds of any minigame.', actionType: 'play_minigame_round', targetRange: [2, 3], reward: { xp: 15, cents: 10 } },
  { id: 'goal_setter', descriptionTemplate: 'Create a new SMART savings goal.', actionType: 'create_savings_goal', targetRange: [1, 1], reward: { xp: 30, cents: 0 } },
  // { id: 'knowledge_seeker', descriptionTemplate: 'Review [X] flashcards.', actionType: 'review_flashcard', targetRange: [3, 5], reward: { xp: 15, cents: 5 } },
  { id: 'login_streak', descriptionTemplate: 'Log in today to keep your streak alive.', actionType: 'login', targetRange: [1, 1], reward: { xp: 10, cents: 0 } },
];

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

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
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        return { success: false, message: 'User not found.' };
      }

      // Clear existing quests
      const questsCollectionRef = collection(db, 'users', userId, 'daily_quests');
      const existingQuestsSnapshot = await getDocs(questsCollectionRef);
      const batch = writeBatch(db);

      existingQuestsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Select 3 unique quests
      const selectedQuests = shuffleArray(ALL_QUESTS).slice(0, 3);
      
      // Add new quests
      for (const quest of selectedQuests) {
        const targetAmount = getRandomInt(quest.targetRange[0], quest.targetRange[1]);
        const description = quest.descriptionTemplate.replace('[X]', targetAmount.toString());

        const newQuestDocRef = doc(questsCollectionRef); // Auto-generates ID
        batch.set(newQuestDocRef, {
          questId: quest.id,
          description,
          targetAmount,
          currentProgress: 0,
          isCompleted: false,
          rewardXP: quest.reward.xp,
          rewardCents: quest.reward.cents,
        });
      }
      
      // Update the user's last generated timestamp
      batch.update(userDocRef, {
          lastQuestGenerated: serverTimestamp()
      });

      await batch.commit();

      return { success: true, message: 'Daily quests generated successfully.' };
    } catch (error) {
      console.error("Error generating daily quests:", error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      return { success: false, message: `Failed to generate quests: ${errorMessage}` };
    }
  }
);
