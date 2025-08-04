
"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import { shuffle } from 'lodash';
import { useAuth } from '@/hooks/use-auth';
import { awardGameRewards } from '@/ai/flows/award-game-rewards-flow';
import { updateQuestProgress } from '@/ai/flows/update-quest-progress-flow';
import { saveGameSummary } from '@/ai/flows/save-game-summary-flow';
import { playClickSound, playCorrectSound, playIncorrectSound } from '@/lib/audio-utils';

import { applicantDeck, ApplicantProfile, REWARD_LIMIT } from '@/data/minigame-credit-swipe-data';
import ApplicantCard from '@/components/minigames/credit-swipe/applicant-card';
import RejectionModal from '@/components/minigames/credit-swipe/rejection-modal';
import FeedbackBanner from '@/components/minigames/credit-swipe/feedback-banner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, ThumbsUp, ThumbsDown, ChevronLeft, ChevronRight, History, ShieldCheck, Timer } from 'lucide-react';
import Image from 'next/image';
import type { GameSummary } from '@/types/user';
import { Timestamp } from 'firebase/firestore';
import { intervalToDuration, formatDuration, isBefore, startOfDay, addDays } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { Progress } from '@/components/ui/progress';


type GameState = 'start' | 'playing' | 'awaiting-reason' | 'game-over';
type Feedback = { type: 'correct' | 'incorrect'; message: string } | null;
type SummaryViewType = 'last' | 'high' | null;

interface CreditSwipeSummary extends GameSummary {
    score: number;
    isNewHighScore: boolean;
    highScore: number;
}

const PACIFIC_TIMEZONE = 'America/Los_Angeles';

const RewardStatus = () => {
    const { userData } = useAuth();
    const [cooldown, setCooldown] = useState('');
    const [rewardsLeft, setRewardsLeft] = useState(REWARD_LIMIT);

    useEffect(() => {
        if (!userData?.gameSummaries?.['credit-swipe']) {
            setRewardsLeft(REWARD_LIMIT);
            setCooldown('');
            return;
        }

        const gameData = userData.gameSummaries['credit-swipe'];
        const rewardHistory = (gameData.rewardHistory ?? []).map(t => (t as Timestamp).toDate());
        
        const nowInPacific = toZonedTime(new Date(), PACIFIC_TIMEZONE);
        let fiveAmTodayPacific = startOfDay(nowInPacific);
        fiveAmTodayPacific.setHours(5);

        if (isBefore(nowInPacific, fiveAmTodayPacific)) {
            fiveAmTodayPacific.setDate(fiveAmTodayPacific.getDate() - 1);
        }
        
        const recentRewards = rewardHistory.filter(ts => isBefore(fiveAmTodayPacific, toZonedTime(ts, PACIFIC_TIMEZONE)));
        setRewardsLeft(REWARD_LIMIT - recentRewards.length);

        if (recentRewards.length >= REWARD_LIMIT) {
            let nextResetTime = startOfDay(nowInPacific);
            nextResetTime.setHours(5);
            if (isBefore(nextResetTime, nowInPacific)) {
              nextResetTime = addDays(nextResetTime, 1);
            }
            
            const updateCooldown = () => {
                const now = new Date();
                const zonedNow = toZonedTime(now, PACIFIC_TIMEZONE);
                if (isBefore(zonedNow, nextResetTime)) {
                    const duration = intervalToDuration({ start: zonedNow, end: nextResetTime });
                    setCooldown(formatDuration(duration, { format: ['hours', 'minutes', 'seconds'] }));
                } else {
                    setCooldown('');
                    setRewardsLeft(REWARD_LIMIT);
                }
            };
            
            updateCooldown();
            const intervalId = setInterval(updateCooldown, 1000);
            return () => clearInterval(intervalId);
        } else {
            setCooldown('');
        }
    }, [userData]);

    if (rewardsLeft > 0) {
        return (
            <div className="flex items-center gap-3 text-green-400"><ShieldCheck className="w-6 h-6" /><p><b>Rewards Active:</b> {rewardsLeft}/{REWARD_LIMIT} available</p></div>
        );
    }
    
    return (
         <div className="flex items-center gap-3 text-yellow-400"><Timer className="w-6 h-6" /><p><b>Next Reward In:</b> {cooldown}</p></div>
    );
}

export default function CreditSwipeGame() {
    const { user, userData, refreshUserData, triggerLevelUp, triggerRewardAnimation } = useAuth();
    const [gameState, setGameState] = useState<GameState>('start');
    const [deck, setDeck] = useState<ApplicantProfile[]>([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [deniedCard, setDeniedCard] = useState<ApplicantProfile | null>(null);

    const [lastSummary, setLastSummary] = useState<CreditSwipeSummary | null>(null);
    const [highScoreSummary, setHighScoreSummary] = useState<CreditSwipeSummary | null>(null);
    const [viewingSummary, setViewingSummary] = useState<CreditSwipeSummary | null>(null);
    const [summaryViewType, setSummaryViewType] = useState<SummaryViewType>(null);
    
    const cardStartTime = useRef<number | null>(null);
    const x = useMotionValue(0);

    useEffect(() => {
        const gameData = userData?.gameSummaries?.['credit-swipe'];
        if (gameData) {
            setHighScore(gameData.bestAttempt?.score ?? 0);
            setLastSummary(gameData.lastAttempt as CreditSwipeSummary ?? null);
            setHighScoreSummary(gameData.bestAttempt as CreditSwipeSummary ?? null);
        }
    }, [userData]);
    
    const startGame = () => {
        playClickSound();
        setDeck(shuffle(applicantDeck).slice(0, 9));
        setCurrentCardIndex(0);
        setScore(0);
        setFeedback(null);
        setGameState('playing');
        setViewingSummary(null);
        cardStartTime.current = Date.now();
    };
    
    const handleGameEnd = useCallback(async () => {
        setGameState('game-over');
        const isNewHighScore = score > highScore;
        if (isNewHighScore) {
            setHighScore(score);
        }

        const summaryData: CreditSwipeSummary = {
            score: score,
            isNewHighScore: isNewHighScore,
            highScore: isNewHighScore ? score : highScore,
        };

        setLastSummary(summaryData);
        setViewingSummary(summaryData);
        setSummaryViewType('last');

        if (user?.uid) {
           await saveGameSummary({ userId: user.uid, gameId: 'credit-swipe', summaryData });
           const rewardResult = await awardGameRewards({ userId: user.uid, gameId: 'credit-swipe', score });
           
           if (rewardResult.xpAwarded > 0 || rewardResult.centsAwarded > 0) {
             triggerRewardAnimation({ xp: rewardResult.xpAwarded, cents: rewardResult.centsAwarded });
           }
           
           const questUpdates = [updateQuestProgress({ userId: user.uid, actionType: 'play_minigame_round'})];
           if(isNewHighScore) {
                questUpdates.push(updateQuestProgress({ userId: user.uid, actionType: 'beat_high_score'}));
           }
           await Promise.all(questUpdates);

           const xpResult = await refreshUserData?.();
           if (xpResult?.leveledUp && xpResult.newLevel && xpResult.rewardCents) {
                triggerLevelUp({ newLevel: xpResult.newLevel, reward: xpResult.rewardCents });
           }
        }
    }, [score, highScore, user, refreshUserData, triggerLevelUp, triggerRewardAnimation]);
    
    const nextCard = useCallback(() => {
        x.set(0); // Reset position for next card
        if (currentCardIndex < deck.length - 1) {
            setCurrentCardIndex(prev => prev + 1);
            cardStartTime.current = Date.now();
        } else {
            handleGameEnd();
        }
    }, [currentCardIndex, deck.length, handleGameEnd, x]);
    
    const processResult = (isCorrect: boolean, baseMessage: string, scoreChange: number) => {
        let finalScoreChange = scoreChange;
        let finalMessage = baseMessage;
        const decisionTime = (Date.now() - (cardStartTime.current ?? Date.now())) / 1000;

        if (isCorrect && decisionTime < 5) {
            finalScoreChange += 25;
            finalMessage += " Speed Bonus! +25";
        }

        setScore(prev => prev + finalScoreChange);
        setFeedback({ type: isCorrect ? 'correct' : 'incorrect', message: finalMessage });
        
        if (isCorrect) {
            playCorrectSound();
        } else {
            playIncorrectSound();
        }
        
        // Use a timeout to show feedback before advancing
        setTimeout(() => {
            setFeedback(null);
            nextCard();
        }, 1500);
    };

    const handleSwipe = useCallback((direction: 'left' | 'right') => {
        if (gameState !== 'playing' || feedback) return;

        const card = deck[currentCardIndex];
        
        if (direction === 'right') { // Approve
            if (card.decision === 'Approve') {
                processResult(true, 'Correct! This applicant is a good risk.', 150);
            } else {
                processResult(false, 'Incorrect. This applicant has too many red flags.', -75);
            }
        } else { // Deny
            setDeniedCard(card);
            setGameState('awaiting-reason');
        }
    }, [gameState, deck, currentCardIndex, processResult, feedback]);
    
    const handleReasonSelection = (reason: string) => {
        if (!deniedCard) return;

        let isCorrectDecision = false;
        let message = '';
        let scoreChange = 0;

        if (deniedCard.decision === 'Deny') {
            if (reason === deniedCard.correctRejectionReason) {
                isCorrectDecision = true;
                message = 'Correct! You spotted the main issue.';
                scoreChange = 150;
            } else {
                isCorrectDecision = true; // Still correct to deny
                message = `Good instinct, but the bigger issue was ${deniedCard.correctRejectionReason.toLowerCase()}.`;
                scoreChange = 25;
            }
        } else { // User denied a card that should have been approved
            isCorrectDecision = false;
            message = 'Incorrect. This was a strong applicant who should have been approved.';
            scoreChange = -50;
        }
        
        setGameState('playing');
        setDeniedCard(null);
        processResult(isCorrectDecision, message, scoreChange);
    };


    const renderSummaryCard = (summary: CreditSwipeSummary) => {
        return (
            <Card className="bg-card/50 backdrop-blur-lg border-border/20 text-center">
                <CardHeader>
                <CardTitle className="text-3xl font-bold">Game Over!</CardTitle>
                <CardDescription className="text-lg">Here's your final score:</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                 {summary.isNewHighScore && summaryViewType === 'last' && (
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-2xl font-bold text-yellow-400 p-3 bg-yellow-400/10 rounded-lg">
                        🎉 New High Score! 🎉
                    </motion.div>
                )}
                <div className="text-6xl font-black text-primary">{summary.score}</div>
                <p className="text-muted-foreground">Your previous high score was {highScore}.</p>
                 <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" className="text-lg shadow-glow" onClick={startGame}>
                        Play Again
                    </Button>
                     <Button size="lg" variant="outline" className="text-lg" onClick={() => { setGameState('start'); setViewingSummary(null); setSummaryViewType(null); }}>
                        Close Report
                    </Button>
                 </div>
                </CardContent>
            </Card>
        );
    }
    
    if (gameState === 'game-over' && viewingSummary) {
        return renderSummaryCard(viewingSummary);
    }


    if (gameState === 'start') {
        return (
            <Card className="bg-card/50 backdrop-blur-lg border-border/20 text-center">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">Credit Swipe</CardTitle>
                    <CardDescription className="text-lg">Can you make the right call? Swipe left to deny, right to approve.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4 text-left p-4 bg-background/50 rounded-lg">
                        <div className="flex items-start gap-3"><ThumbsUp className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" /><p><b>Approve Correctly:</b> +150 points</p></div>
                        <div className="flex items-start gap-3"><ThumbsDown className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" /><p><b>Deny Correctly (with right reason):</b> +150 points</p></div>
                        <div className="flex items-start gap-3"><Timer className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b>Speed Bonus:</b> +25 points (correct decision in under 5s)</p></div>
                        <div className="flex items-start gap-3"><Star className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" /><p><b>High Score:</b> {highScore} points</p></div>
                        <RewardStatus />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="w-full text-xl font-bold shadow-glow" onClick={startGame}>Start Game</Button>
                        {lastSummary && (
                            <Button size="lg" variant="secondary" className="w-full text-xl font-bold" onClick={() => { if(lastSummary) {setViewingSummary(lastSummary); setGameState('game-over'); setSummaryViewType('last');} }}>
                                <History className="mr-2" /> View Last Report
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    }

    const chevronVariants = {
        initial: { opacity: 0, x: 0 },
        animate: (i: number) => ({
            opacity: [0, 0.7, 0],
            x: [0, i * 5, i * 10],
            transition: {
                delay: i * 0.1,
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut'
            }
        })
    };
    
    const progressPercentage = deck.length > 0 ? ((currentCardIndex + 1) / deck.length) * 100 : 0;

    return (
        <div className="w-full h-[700px] flex flex-col items-center justify-center relative">
             <div className="w-full max-w-sm mb-4">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-muted-foreground">Progress</span>
                    <span className="text-sm font-bold text-foreground">Applicant {currentCardIndex + 1} of {deck.length}</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
            </div>

             <div className="w-full h-[550px] flex items-center justify-center relative">
                <div className="absolute left-0 flex items-center h-full pr-4 text-red-500/80">
                    {[0, 1, 2].map(i => <motion.div key={i} custom={-1} variants={chevronVariants} initial="initial" animate="animate"><ChevronLeft className="w-12 h-12" /></motion.div>)}
                </div>
                <div className="absolute right-0 flex items-center h-full pl-4 text-green-500/80">
                    {[0, 1, 2].map(i => <motion.div key={i} custom={1} variants={chevronVariants} initial="initial" animate="animate"><ChevronRight className="w-12 h-12" /></motion.div>)}
                </div>

                <AnimatePresence>
                    {deck.length > 0 && currentCardIndex < deck.length && (
                        <ApplicantCard 
                            key={deck[currentCardIndex].id}
                            applicant={deck[currentCardIndex]}
                            onSwipe={handleSwipe}
                            x={x}
                        />
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {feedback && (
                    <FeedbackBanner type={feedback.type} message={feedback.message} />
                )}
            </AnimatePresence>
            
            {deniedCard && (
                 <RejectionModal
                    isOpen={gameState === 'awaiting-reason'}
                    reasons={deniedCard.rejectionReasons}
                    onSelectReason={handleReasonSelection}
                    onClose={() => {
                        setGameState('playing');
                        setDeniedCard(null);
                        nextCard();
                    }}
                />
            )}
        </div>
    );
}
