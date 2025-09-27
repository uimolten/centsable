const functions = require("firebase-functions");
const admin = require("firebase-admin");

// CRITICAL: Initialize the Firebase Admin SDK ONCE at the top.
admin.initializeApp();
const db = admin.firestore();

// --- REUSABLE SECURITY HELPER ---
const verifyAdmin = async (context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be logged in.');
  }
  const userDoc = await db.collection('users').doc(context.auth.uid).get();
  if (!userDoc.exists || userDoc.data().role !== 'admin') {
    throw new functions.https.HttpsError('permission-denied', 'You must be an admin.');
  }
};

// --- ADMIN PANEL FUNCTIONS ---

exports.adminGetAllUsers = functions.https.onCall(async (data, context) => {
  await verifyAdmin(context);
  const userRecords = await admin.auth().listUsers();
  return userRecords.users.map(user => ({
    uid: user.uid,
    email: user.email,
  }));
});

exports.adminSetUserRole = functions.https.onCall(async (data, context) => {
  await verifyAdmin(context);
  const { targetUid, newRole } = data;
  if (!['admin', 'user'].includes(newRole)) {
    throw new functions.https.HttpsError('invalid-argument', 'Role must be "admin" or "user".');
  }
  return db.collection('users').doc(targetUid).update({ role: newRole });
});

exports.adminResetAllUsers = functions.https.onCall(async (data, context) => {
  await verifyAdmin(context);
  const usersSnapshot = await db.collection('users').get();
  const batch = db.batch();
  usersSnapshot.forEach(doc => {
    batch.update(doc.ref, {
      xp: 0,
      cents: 0,
      quests: [],
      completedLessons: [],
    });
  });
  await batch.commit();
  return { success: true, message: `${usersSnapshot.size} users have been reset.` };
});

// --- GAMEPLAY AND REWARDS FUNCTIONS ---

const ALL_POSSIBLE_QUESTS = [
    { id: 'q1', title: 'Complete 1 Lesson', progress: 0, goal: 1, reward: { xp: 20, cents: 5 } },
    { id: 'q2', title: 'Play 3 Minigames', progress: 0, goal: 3, reward: { xp: 30, cents: 10 } },
    // Add more possible quests here
];

exports.getOrGenerateDailyQuests = functions
  .runWith({ secrets: ["GEMINI_API_KEY"] })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'You must be logged in.');
    }
    const uid = context.auth.uid;
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();
    const userData = userDoc.data();

    const now = new Date();
    const lastReset = userData.questsLastGenerated?.toDate();
    const today5amPT = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0);

    if (!lastReset || lastReset.getTime() < today5amPT.getTime()) {
      const shuffled = [...ALL_POSSIBLE_QUESTS].sort(() => 0.5 - Math.random());
      const newQuests = shuffled.slice(0, 3);
      await userRef.update({
        quests: newQuests,
        questsLastGenerated: admin.firestore.FieldValue.serverTimestamp(),
      });
      return newQuests;
    }
    return userData.quests;
});

exports.claimMinigameReward = functions
  .runWith({ secrets: ["GEMINI_API_KEY"] })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'You must be logged in.');
    }
    const { gameId, score } = data;
    const uid = context.auth.uid;
    const userRef = db.collection('users').doc(uid);

    const REWARD_THRESHOLDS = {
      creditSwipe: 1250,
      budgetBusters: 1000,
      savingsSorter: 2000,
    };
    const REWARD_PAYLOAD = { xp: 50, cents: 10 };
    const DAILY_LIMIT = 2;

    if (score < REWARD_THRESHOLDS[gameId]) {
      throw new functions.https.HttpsError('failed-precondition', 'Score not high enough for a reward.');
    }

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const rewardRef = db.collection('users').doc(uid).collection('daily_rewards').doc(today);

    return db.runTransaction(async (transaction) => {
      const rewardDoc = await transaction.get(rewardRef);
      const claimsMade = rewardDoc.exists ? rewardDoc.data().claims : 0;

      if (claimsMade >= DAILY_LIMIT) {
        throw new functions.https.HttpsError('resource-exhausted', 'Daily reward limit reached.');
      }

      // Grant rewards and update claim count
      transaction.update(userRef, {
        xp: admin.firestore.FieldValue.increment(REWARD_PAYLOAD.xp),
        cents: admin.firestore.FieldValue.increment(REWARD_PAYLOAD.cents),
      });
      transaction.set(rewardRef, { claims: claimsMade + 1 }, { merge: true });

      return { success: true, message: 'Reward claimed!' };
    });
});

exports.completeLesson = functions
  .runWith({ secrets: ["GEMINI_API_KEY"] })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'You must be logged in.');
    }
    const { lessonId } = data;
    const uid = context.auth.uid;
    const userRef = db.collection('users').doc(uid);

    const userDoc = await userRef.get();
    if (userDoc.data().completedLessons?.includes(lessonId)) {
      return { success: false, message: 'Lesson already completed.' };
    }

    // Grant completion reward
    await userRef.update({
      completedLessons: admin.firestore.FieldValue.arrayUnion(lessonId),
      xp: admin.firestore.FieldValue.increment(50),
      cents: admin.firestore.FieldValue.increment(10),
    });

    // Check if this completion satisfies any quests
    const updatedUserDoc = await userRef.get();
    const currentQuests = updatedUserDoc.data().quests || [];
    const updatedQuests = currentQuests.map(quest => {
      if (quest.id === 'q1' && quest.progress < quest.goal) { // 'Complete 1 Lesson' quest
        quest.progress += 1;
      }
      return quest;
    });

    await userRef.update({ quests: updatedQuests });

    return { success: true, message: 'Lesson completion saved!' };
});
