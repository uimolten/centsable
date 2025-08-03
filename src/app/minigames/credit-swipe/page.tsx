
"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { shuffle } from 'lodash';
import { useAuth } from '@/hooks/use-auth';
import { awardGameRewards } from '@/ai/flows/award-game-rewards-flow';
import { updateQuestProgress } from '@/ai/flows/update-quest-progress-flow';
import { playCorrectSound, playIncorrectSound, playClickSound } from '@/lib/audio-utils';

import { applicantDeck, ApplicantProfile } from '@/data/minigame-credit-swipe-data';
import ApplicantCard from '@/components/minigames/credit-swipe/applicant-card';
import RejectionModal from '@/components/minigames/credit-swipe/rejection-modal';
import FeedbackBanner from '@/components/minigames/credit-swipe/feedback-banner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, ThumbsUp, ThumbsDown, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';

type GameState = 'start' | 'playing' | 'awaiting-reason' | 'game-over';
type Feedback = { type: 'correct' | 'incorrect'; message: string } | null;

export default function CreditSwipeGame() {
    const { user } = useAuth();
    const [gameState, setGameState] = useState<GameState>('start');
    const [deck, setDeck] = useState<ApplicantProfile[]>([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [deniedCard, setDeniedCard] = useState<ApplicantProfile | null>(null);

    useEffect(() => {
        const savedHighScore = localStorage.getItem('creditSwipeHighScore');
        if (savedHighScore) {
            setHighScore(parseInt(savedHighScore, 10));
        }
    }, []);
    
    const startGame = () => {
        playClickSound();
        setDeck(shuffle(applicantDeck));
        setCurrentCardIndex(0);
        setScore(0);
        setFeedback(null);
        setGameState('playing');
    };
    
    const nextCard = () => {
        if (currentCardIndex < deck.length - 1) {
            setCurrentCardIndex(prev => prev + 1);
        } else {
            handleGameEnd();
        }
    };
    
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
            nextCard();
        }, 2000);
    };

    const handleSwipe = (direction: 'left' | 'right') => {
        const card = deck[currentCardIndex];
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
    };
    
    const handleReasonSelection = (reason: string) => {
        if (!deniedCard) return;

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

    const handleGameEnd = async () => {
        setGameState('game-over');
        const isNewHighScore = score > highScore;
        if (isNewHighScore) {
            setHighScore(score);
            localStorage.setItem('creditSwipeHighScore', score.toString());
        }

        if (user?.uid) {
            await awardGameRewards({ userId: user.uid, gameId: 'credit-swipe', score });
            await updateQuestProgress({ userId: user.uid, actionType: 'play_minigame_round'});
            if(isNewHighScore) {
                 await updateQuestProgress({ userId: user.uid, actionType: 'beat_high_score'});
            }
        }
    };

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
                    <Button size="lg" className="w-full text-xl font-bold shadow-glow" onClick={startGame}>Start Game</Button>
                </CardContent>
            </Card>
        );
    }
    
    if (gameState === 'game-over') {
         return (
            <Card className="bg-card/50 backdrop-blur-lg border-border/20 text-center">
                <CardHeader>
                <CardTitle className="text-3xl font-bold">Game Over!</CardTitle>
                <CardDescription className="text-lg">Here's your final score:</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                 {score > highScore && (
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-2xl font-bold text-yellow-400 p-3 bg-yellow-400/10 rounded-lg">
                        🎉 New High Score! 🎉
                    </motion.div>
                )}
                <div className="text-6xl font-black text-primary">{score}</div>
                <p className="text-muted-foreground">Your previous high score was {highScore}.</p>
                <Button size="lg" className="w-full text-xl font-bold shadow-glow" onClick={startGame}>Play Again</Button>
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
                        nextCard();
                    }}
                />
            )}
        </div>
    );
}
