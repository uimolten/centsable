
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CreditCard, Star, AlertTriangle, ShieldCheck, History } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { updateQuestProgress } from '@/ai/flows/update-quest-progress-flow';
import { saveGameSummary } from '@/ai/flows/save-game-summary-flow';
import { gameConfig, gameElementsConfig, GameElementConfig } from '@/data/minigame-credit-climber-data';
import { cn } from '@/lib/utils';
import { playCorrectSound, playIncorrectSound } from '@/lib/audio-utils';

type GameState = 'start-screen' | 'playing' | 'game-over';

const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;
const ELEMENT_WIDTH = 60;
const ELEMENT_HEIGHT = 60;

interface PlayerState {
  y: number;
  vy: number;
}

interface GameElement {
  id: number;
  x: number;
  y: number;
  config: GameElementConfig;
}

const CoinBot = React.memo(({ y, isHit }: { y: number; isHit: boolean }) => (
  <motion.div
    style={{
      y,
      position: 'absolute',
      left: '20%',
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      backgroundImage: `url('/images/mascot-idle.png')`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      filter: isHit ? 'brightness(1.5) saturate(2)' : 'brightness(1)',
      transition: 'filter 0.1s ease-out',
    }}
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
  />
));

const ScoreFloater = ({ text, x, y }: { text: string; x: number; y: number }) => (
    <motion.div
      initial={{ opacity: 1, y: y, x: x, scale: 0 }}
      animate={{ opacity: 0, y: y - 50, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={cn("absolute text-2xl font-black", text.startsWith('+') ? 'text-primary' : 'text-destructive')}
      style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
    >
      {text}
    </motion.div>
  );

export function CreditClimberGame({ userId }: { userId: string }) {
  const { userData, refreshUserData } = useAuth();
  const [gameState, setGameState] = useState<GameState>('start-screen');
  const [playerState, setPlayerState] = useState<PlayerState>({ y: 300, vy: 0 });
  const [gameElements, setGameElements] = useState<GameElement[]>([]);
  const [finalScore, setFinalScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isHit, setIsHit] = useState(false);
  const [scoreFloaters, setScoreFloaters] = useState<{ id: number; text: string; x: number; y: number }[]>([]);

  const gameLoopRef = useRef<number>();
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const nextElementId = useRef(0);
  const spawnTimer = useRef(0);

  const score = Math.floor(850 - (playerState.y / 600) * 550);

  useEffect(() => {
    const savedHighScore = userData?.gameSummaries?.['credit-climber']?.highScore;
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore.toString(), 10));
    }
  }, [userData]);


  const startGame = useCallback(() => {
    setPlayerState({ y: 300, vy: 0 });
    setGameElements([]);
    setGameState('playing');
    spawnTimer.current = 0;
    nextElementId.current = 0;
    setScoreFloaters([]);
  }, []);

  const endGame = useCallback(async (currentScore: number) => {
    if (gameState === 'game-over') return;
    setGameState('game-over');
    setFinalScore(currentScore);
    const isNewHighScore = currentScore > highScore;
    if (isNewHighScore) {
        setHighScore(currentScore);
    }
    
    if (userId) {
        const summaryData = { score: currentScore, highScore: isNewHighScore ? currentScore : highScore };
        await saveGameSummary({ userId, gameId: 'credit-climber', summaryData });
        const updates = [updateQuestProgress({ userId: userId, actionType: 'play_minigame_round' })];
        if (isNewHighScore) {
            updates.push(updateQuestProgress({ userId: userId, actionType: 'beat_high_score' }));
        }
        await Promise.all(updates);
        await refreshUserData?.();
    }
  }, [highScore, userId, refreshUserData, gameState]);

  const handlePlayerJump = useCallback(() => {
    if (gameState === 'playing') {
      setPlayerState(prevState => ({ ...prevState, vy: gameConfig.jumpVelocity }));
    }
  }, [gameState]);

  const gameLoop = useCallback(() => {
    if (!gameAreaRef.current) {
        gameLoopRef.current = requestAnimationFrame(gameLoop);
        return;
    };
    
    const gameHeight = gameAreaRef.current.offsetHeight;

    // Update player
    setPlayerState(prevState => {
      const newVy = prevState.vy + gameConfig.gravity;
      let newY = prevState.y + newVy;

      if (newY >= gameHeight - PLAYER_HEIGHT) {
        newY = gameHeight - PLAYER_HEIGHT;
      }
       if (newY <= 0) {
        newY = 0;
        // Optional: stop upward movement if they hit the ceiling
        // return { y: newY, vy: 0 };
      }
      return { y: newY, vy: newVy };
    });

    if (playerState.y >= gameHeight - PLAYER_HEIGHT) {
      endGame(score);
      return;
    }

    // Spawn elements
    spawnTimer.current += 1;
    if (spawnTimer.current >= gameConfig.spawnRate) {
        spawnTimer.current = 0;
        const randomConfig = gameElementsConfig[Math.floor(Math.random() * gameElementsConfig.length)];
        const newElement: GameElement = {
            id: nextElementId.current++,
            x: gameAreaRef.current.offsetWidth,
            y: Math.random() * (gameHeight - ELEMENT_HEIGHT),
            config: randomConfig,
        };
        setGameElements(prev => [...prev, newElement]);
    }
    
    // Move and check collisions
    const playerRect = {
      x: gameAreaRef.current.offsetWidth * 0.2,
      y: playerState.y,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
    };
    
    setGameElements(prevElements => {
        const nextElements: GameElement[] = [];
        for (const el of prevElements) {
          const newX = el.x - gameConfig.scrollSpeed;
          const elRect = { x: newX, y: el.y, width: ELEMENT_WIDTH, height: ELEMENT_HEIGHT };
          
          let collided = false;
          if (
            playerRect.x < elRect.x + elRect.width &&
            playerRect.x + playerRect.width > elRect.x &&
            playerRect.y < elRect.y + elRect.height &&
            playerRect.y + playerRect.height > elRect.y
          ) {
            collided = true;
            if (el.config.type === 'good') {
              playCorrectSound();
              setPlayerState(p => ({...p, y: p.y + el.config.boost})); // Use Y for boost
            } else {
              playIncorrectSound();
              setPlayerState(p => ({...p, y: p.y + el.config.boost})); // Use Y for boost
              setIsHit(true);
              setTimeout(() => setIsHit(false), 200);
            }
            const floaterText = el.config.scoreChange > 0 ? `+${el.config.scoreChange}` : `${el.config.scoreChange}`;
            setScoreFloaters(f => [...f, { id: nextElementId.current++, text: floaterText, x: playerRect.x, y: playerRect.y}]);
          }

          if (newX > -ELEMENT_WIDTH && !collided) {
            nextElements.push({ ...el, x: newX });
          }
        }
        return nextElements;
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [playerState.y, endGame, score]);
  
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, gameLoop]);

  const getBackgroundColor = () => {
    if (score >= 700) return 'from-blue-900 to-indigo-900'; // Celestial
    if (score >= 500) return 'from-sky-700 to-blue-800'; // Cityscape
    return 'from-slate-800 to-gray-900'; // Rocky
  };

  return (
    <Card
      className="w-full max-w-lg mx-auto bg-card/50 backdrop-blur-lg border-border/20"
      onClick={handlePlayerJump}
    >
        {gameState === 'start-screen' && (
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
                    <CreditCard className="w-8 h-8 text-primary" /> Credit Climber
                </CardTitle>
                <CardDescription className="text-lg">Tap to climb your credit score. Avoid the red flags!</CardDescription>
                <CardContent className="space-y-6 pt-6">
                    <div className="space-y-4 text-left p-4 bg-background/50 rounded-lg">
                        <div className="flex items-start gap-3"><ShieldCheck className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b>Good Items:</b> Collect green items like on-time payments to climb higher.</p></div>
                        <div className="flex items-start gap-3"><AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" /><p><b>Bad Items:</b> Avoid red items like missed payments that make you fall.</p></div>
                        <div className="flex items-start gap-3"><Star className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b>Goal:</b> Climb as high as you can! Your altitude is your score.</p></div>
                        {highScore > 0 && <div className="flex items-start gap-3"><History className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b>High Score:</b> {highScore}</p></div>}
                    </div>
                    <Button size="lg" className="w-full text-xl font-bold shadow-glow" onClick={startGame}>Start Climbing</Button>
                </CardContent>
            </CardHeader>
        )}

        {gameState === 'playing' && (
            <div ref={gameAreaRef} className={cn("relative w-full h-[600px] overflow-hidden cursor-pointer", `bg-gradient-to-b ${getBackgroundColor()}`)}>
                <div className="absolute top-2 right-2 p-2 bg-black/50 rounded-lg text-white font-bold text-2xl z-10">
                    Score: <span className="text-primary">{score}</span>
                </div>
                <CoinBot y={playerState.y} isHit={isHit} />
                {gameElements.map(el => (
                    <div key={el.id} style={{ position: 'absolute', left: el.x, top: el.y, width: ELEMENT_WIDTH, height: ELEMENT_HEIGHT }}>
                        <el.config.icon className={cn("w-full h-full p-2 rounded-full", el.config.type === 'good' ? 'bg-green-500/30 text-green-300' : 'bg-red-500/30 text-red-300')} />
                    </div>
                ))}
                {scoreFloaters.map(f => <ScoreFloater key={f.id} {...f} />)}
            </div>
        )}

        {gameState === 'game-over' && (
             <CardContent className="p-8 text-center space-y-4">
                <CardTitle className="text-4xl font-black">Game Over</CardTitle>
                <CardDescription className="text-lg">Your final credit score:</CardDescription>
                <p className="text-7xl font-black text-primary">{finalScore}</p>
                {finalScore > highScore && <p className="text-xl font-bold text-yellow-400">🎉 New High Score! 🎉</p>}
                <p className="text-muted-foreground">Previous High Score: {highScore}</p>
                 <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                    <Button size="lg" className="text-lg shadow-glow" onClick={startGame}>
                        Play Again
                    </Button>
                 </div>
            </CardContent>
        )}
    </Card>
  );
}
