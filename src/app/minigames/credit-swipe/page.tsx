
"use client";

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { shuffle } from 'lodash';
import { useAuth } from '@/hooks/use-auth';
import { awardGameRewards } from '@/ai/flows/award-game-rewards-flow';
import { updateQuestProgress } from '@/ai/flows/update-quest-progress-flow';
import { saveGameSummary } from '@/ai/flows/save-game-summary-flow';
import { playCorrectSound, playIncorrectSound, playClickSound } from '@/lib/audio-utils';

import { applicantDeck, ApplicantProfile } from '@/data/minigame-credit-swipe-data';
import ApplicantCard from '@/components/minigames/credit-swipe/applicant-card';
import RejectionModal from '@/components/minigames/credit-swipe/rejection-modal';
import FeedbackBanner from '@/components/minigames/credit-swipe/feedback-banner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, ThumbsUp, ThumbsDown, ArrowLeft, ArrowRight, History } from 'lucide-react';
import Image from 'next/image';
import type { GameSummary } from '@/types/user';

type GameState = 'start' | 'playing' | 'awaiting-reason' | 'game-over';
type Feedback = { type: 'correct' | 'incorrect'; message: string } | null;
type SummaryViewType = 'last' | 'high' | null;

interface CreditSwipeSummary extends GameSummary {
    score: number;
    isNewHighScore: boolean;
    highScore: number;
}


export default function CreditSwipeGame() {
    const { user, userData, refreshUserData, triggerLevelUp } = useAuth();
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
        setDeck(shuffle(applicantDeck));
        setCurrentCardIndex(0);
        setScore(0);
        setFeedback(null);
        setGameState('playing');
        setViewingSummary(null);
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
           await awardGameRewards({ userId: user.uid, gameId: 'credit-swipe', score });
           
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
    }, [score, highScore, user, refreshUserData, triggerLevelUp]);
    
    const nextCard = useCallback(() => {
        if (currentCardIndex < deck.length - 1) {
            setCurrentCardIndex(prev => prev + 1);
        } else {
            handleGameEnd();
        }
    }, [currentCardIndex, deck.length, handleGameEnd]);
    
    const processResult = (isCorrect: boolean, message: string, scoreChange: number) => {
        setScore(prev => prev + scoreChange);
        setFeedback({ type: isCorrect ? 'correct' : 'incorrect', message });
        
        if (isCorrect) {
            playCorrectSound();
        } else {
            playIncorrectSound();
        }

        setTimeout(() => {
            setFeedback(null);
        }, 2000);
    };

    const handleSwipe = useCallback((direction: 'left' | 'right') => {
        if (gameState !== 'playing') return;

        const card = deck[currentCardIndex];
        
        // Immediately move to the next logical card index or end the game
        nextCard(); 
        
        if (direction === 'right') { // Approve
            if (card.decision === 'Approve') {
                processResult(true, 'Correct! This applicant is a good risk.', 100);
            } else {
                processResult(false, 'Incorrect. This applicant has too many red flags.', -75);
            }
        } else { // Deny
            setDeniedCard(card);
            setGameState('awaiting-reason');
        }
    }, [gameState, deck, currentCardIndex, nextCard]);
    
    const handleReasonSelection = (reason: string) => {
        if (!deniedCard) return;

        // The call to nextCard() is now immediate in handleSwipe, so we don't call it here.
        if (deniedCard.decision === 'Deny') {
            if (reason === deniedCard.correctRejectionReason) {
                processResult(true, 'Correct! You spotted the main issue.', 150);
            } else {
                processResult(false, `Good instinct, but the bigger issue was ${deniedCard.correctRejectionReason.toLowerCase()}.`, 25);
            }
        } else {
            processResult(false, 'Incorrect. This was a strong applicant who should have been approved.', -50);
        }

        setDeniedCard(null);
        setGameState('playing');
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
    
    if (viewingSummary) {
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
                        <div className="flex items-start gap-3"><ThumbsUp className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" /><p><b>Approve Correctly:</b> +100 points</p></div>
                        <div className="flex items-start gap-3"><ThumbsDown className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" /><p><b>Deny Correctly (with right reason):</b> +150 points</p></div>
                        <div className="flex items-start gap-3"><Star className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" /><p><b>High Score:</b> {highScore} points</p></div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="w-full text-xl font-bold shadow-glow" onClick={startGame}>Start Game</Button>
                        {lastSummary && (
                            <Button size="lg" variant="secondary" className="w-full text-xl font-bold" onClick={() => { setViewingSummary(lastSummary); setSummaryViewType('last'); }}>
                                <History className="mr-2" /> View Last Report
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="w-full h-[650px] flex flex-col items-center justify-center relative">
             <div className="w-full h-[550px] flex items-center justify-center relative">
                <AnimatePresence>
                    {deck.map((applicant, index) => {
                        if (index < currentCardIndex) return null;
                        return (
                            <ApplicantCard 
                                key={applicant.id}
                                applicant={applicant}
                                onSwipe={handleSwipe}
                                isActive={index === currentCardIndex}
                            />
                        )
                    })}
                </AnimatePresence>
            </div>

            <div className="relative w-full max-w-sm h-24 bg-card/50 rounded-full flex items-center justify-between px-6 border border-border/20 shadow-inner">
                <div className="flex items-center gap-2 text-red-400 font-bold">
                    <ArrowLeft className="w-6 h-6"/>
                    <span>DENY</span>
                </div>
                 <div className="flex items-center gap-2 text-green-400 font-bold">
                    <span>APPROVE</span>
                    <ArrowRight className="w-6 h-6"/>
                </div>
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
                        // No need to call nextCard here anymore as it's handled in swipe
                    }}
                />
            )}
        </div>
    );
}
