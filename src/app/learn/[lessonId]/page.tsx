
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { isEqual } from 'lodash';

import { lessonSaving1 } from '@/data/lesson-saving-1';
import { lessonSaving2 } from '@/data/lesson-saving-2';
import { LessonContainer } from '@/components/lesson/lesson-container';
import { IntroCard } from '@/components/lesson/intro-card';
import { MultipleChoice } from '@/components/lesson/multiple-choice';
import { LessonComplete } from '@/components/lesson/lesson-complete';
import { ConceptCard } from '@/components/lesson/concept-card';
import { FillInTheBlank } from '@/components/lesson/fill-in-the-blank';
import { TapThePairs } from '@/components/lesson/tap-the-pairs';
import { InteractiveSort } from '@/components/lesson/interactive-sort';
import { GoalBuilderStep as GoalBuilderComponent } from '@/components/lesson/goal-builder-step';
import { GoalSummary } from '@/components/lesson/goal-summary';

import type { Step, MultipleChoiceStep, FillInTheBlankStep, GoalBuilderStep } from '@/types/lesson';

const getLessonData = (lessonId: string) => {
  if (lessonId === 's1') return lessonSaving1;
  if (lessonId === 's2') return lessonSaving2;
  return null;
};

const isAnswerSimilar = (userAnswer: string, correctAnswer: string): boolean => {
  const formattedUserAnswer = userAnswer.trim().toLowerCase();
  
  // Split correct answer by potential separators and trim
  const correctAnswers = correctAnswer.toLowerCase().split(/(\/|,| or )/).map(s => s.trim()).filter(Boolean);

  // 1. Exact match with any of the possibilities
  if (correctAnswers.includes(formattedUserAnswer)) {
      return true;
  }
  
  // Check for plural/singular forms and small typos against each correct answer
  return correctAnswers.some(correct => {
    if (
        formattedUserAnswer === `${correct}s` ||
        correct === `${formattedUserAnswer}s`
    ) {
        return true;
    }
    
    const levenshtein = (a: string, b: string): number => {
      if (a.length === 0) return b.length;
      if (b.length === 0) return a.length;
      const matrix = Array.from(Array(a.length + 1), () => Array(b.length + 1).fill(0));
      for (let i = 0; i <= a.length; i++) { matrix[i][0] = i; }
      for (let j = 0; j <= b.length; j++) { matrix[0][j] = j; }
      for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
          const cost = a[i - 1] === b[j - 1] ? 0 : 1;
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j - 1] + cost
          );
        }
      }
      return matrix[a.length][b.length];
    };

    const distance = levenshtein(formattedUserAnswer, correct);
    const threshold = correct.length > 7 ? 2 : 1;
    return distance <= threshold;
  });
};


export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = Array.isArray(params.lessonId) ? params.lessonId[0] : params.lessonId;
  const lesson = getLessonData(lessonId);

  const [moduleIndex, setModuleIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [totalSteps, setTotalSteps] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [tryAgainCounter, setTryAgainCounter] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [goalData, setGoalData] = useState<Record<string, string | number>>({});


  useEffect(() => {
    if (lesson) {
      setTotalSteps(lesson.modules.reduce((acc, module) => acc + module.steps.length, 0));
    }
  }, [lesson]);

  if (!lesson) {
    return <div>Lesson not found!</div>;
  }

  const currentModule = lesson.modules[moduleIndex];
  const currentStep = currentModule.steps[stepIndex];
  
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  const handleSelectAnswer = (answer: string) => {
     if (hasAnswered && isCorrect) {
      return;
    }

    if (currentStep.type === 'multiple-choice') {
      const step = currentStep as MultipleChoiceStep;
      const isMultiSelect = Array.isArray(step.correctAnswer);
      
      if (isMultiSelect) {
        setUserAnswers(prev => 
          prev.includes(answer) 
            ? prev.filter(a => a !== answer) 
            : [...prev, answer]
        );
      } else {
        setUserAnswers([answer]);
      }
    } else {
      setUserAnswers([answer]);
    }
  };
  
  const handleInteractiveComplete = (correct: boolean) => {
    if (hasAnswered && isCorrect) return;

    setHasAnswered(true);
    setIsCorrect(correct);
    if (!correct) {
      setIncorrectAttempts(prev => prev + 1);
    }
  };
  
  const goToNextStep = useCallback(() => {
     setCompletedSteps(prev => prev + 1);

      if (stepIndex < currentModule.steps.length - 1) {
        setStepIndex(stepIndex + 1);
      } else if (moduleIndex < lesson.modules.length - 1) {
        setModuleIndex(moduleIndex + 1);
        setStepIndex(0);
      }
      
      setHasAnswered(false);
      setIsCorrect(null);
      setUserAnswers([]);
      setTryAgainCounter(0);
      setIncorrectAttempts(0);
  }, [currentModule?.steps.length, lesson?.modules.length, moduleIndex, stepIndex]);

  const handleLessonComplete = useCallback(() => {
    router.push(`/learn?completed=${lessonId}`);
  }, [lessonId, router]);

  const handleFooterAction = useCallback(() => {
    const isStepWithoutCheck = ['intro', 'concept', 'scenario', 'complete', 'goal-summary'].includes(currentStep.type);
    
    const isGoalBuilderStep = currentStep.type === 'goal-builder';

    const isCheckButton = !(isStepWithoutCheck || isGoalBuilderStep || (hasAnswered && isCorrect) || (hasAnswered && isCorrect === false));
    const isAnswerEmpty = (currentStep.type === 'multiple-choice' || currentStep.type === 'fill-in-the-blank' || currentStep.type === 'goal-builder') && (userAnswers.length === 0 || (userAnswers.length > 0 && String(userAnswers[0]).trim() === ''));
    
    if (isCheckButton && isAnswerEmpty) {
      return;
    }
    
    const isInteractiveCorrect = (currentStep.type === 'tap-the-pairs' || currentStep.type === 'interactive-sort') && hasAnswered && isCorrect;

    // Case 1: Continue button is displayed (answer correct, or step doesn't need checking)
    if (isStepWithoutCheck || isGoalBuilderStep || (hasAnswered && isCorrect) || isInteractiveCorrect) {
      if (currentStep.type === 'complete') {
        handleLessonComplete();
      } else {
        if(isGoalBuilderStep) {
            const step = currentStep as GoalBuilderStep;
            setGoalData(prev => ({...prev, [step.storageKey]: userAnswers[0]}));
        }
        goToNextStep();
      }
      return;
    }

    // Case 2: Try Again button is displayed
    if (hasAnswered && isCorrect === false) {
        setIncorrectAttempts(prev => prev + 1);
        
        if (currentStep.type === 'fill-in-the-blank') {
            const correct = isAnswerSimilar(userAnswers[0] ?? '', (currentStep as FillInTheBlankStep).correctAnswer);
            setIsCorrect(correct);
            if(correct) setIncorrectAttempts(0);
        } else {
            setHasAnswered(false);
            setIsCorrect(null);
            setUserAnswers([]);
            if (currentStep.type === 'tap-the-pairs' || currentStep.type === 'interactive-sort') {
                setTryAgainCounter(count => count + 1);
            }
        }
        return;
    }
    
    // Case 3: Check button is displayed, and we need to validate the answer.
    if (!hasAnswered) {
      setHasAnswered(true);
      let correct = false;
      
      switch (currentStep.type) {
        case 'multiple-choice':
          const mcStep = currentStep as MultipleChoiceStep;
          if (Array.isArray(mcStep.correctAnswer)) {
            correct = isEqual(userAnswers.sort(), mcStep.correctAnswer.sort());
          } else {
            correct = userAnswers.length === 1 && userAnswers[0] === mcStep.correctAnswer;
          }
          break;
        case 'fill-in-the-blank':
          correct = isAnswerSimilar(userAnswers[0] ?? '', (currentStep as FillInTheBlankStep).correctAnswer);
          break;
      }
      setIsCorrect(correct);
      if (!correct) {
        setIncorrectAttempts(prev => prev + 1);
      }
    }
  }, [currentStep, hasAnswered, isCorrect, userAnswers, goToNextStep, handleLessonComplete]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && (event.target as HTMLElement).tagName !== 'TEXTAREA') {
        event.preventDefault(); 
        handleFooterAction();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleFooterAction]);


  const renderStep = (step: Step) => {
    const uniqueKey = `${moduleIndex}-${stepIndex}-${tryAgainCounter}`;
    switch (step.type) {
      case 'intro':
        return <IntroCard key={uniqueKey} step={step} />;
      case 'concept':
      case 'scenario':
        return <ConceptCard key={uniqueKey} step={step} />;
      case 'multiple-choice':
        return <MultipleChoice key={uniqueKey} step={step} onSelectAnswer={handleSelectAnswer} userAnswers={userAnswers} hasAnswered={hasAnswered} isCorrect={isCorrect} incorrectAttempts={incorrectAttempts} />;
       case 'fill-in-the-blank':
        return <FillInTheBlank key={uniqueKey} step={step} onAnswerChange={handleSelectAnswer} userAnswer={userAnswers[0] ?? ''} hasAnswered={hasAnswered} isCorrect={isCorrect} incorrectAttempts={incorrectAttempts} />;
      case 'tap-the-pairs':
        return <TapThePairs key={uniqueKey} step={step} onComplete={handleInteractiveComplete} incorrectAttempts={incorrectAttempts} hasAnswered={hasAnswered} isCorrect={isCorrect} />;
      case 'interactive-sort':
        return <InteractiveSort key={uniqueKey} step={step} onComplete={handleInteractiveComplete} incorrectAttempts={incorrectAttempts} hasAnswered={hasAnswered} isCorrect={isCorrect} />;
      case 'goal-builder':
        return <GoalBuilderComponent key={uniqueKey} step={step} onAnswerChange={handleSelectAnswer} userAnswer={userAnswers[0] ?? ''} />;
      case 'goal-summary':
        return <GoalSummary key={uniqueKey} step={step} goalData={goalData} />;
       case 'complete':
        return <LessonComplete key={uniqueKey} step={step} onContinue={handleLessonComplete} />;
      default:
        return <div>Unknown step type</div>;
    }
  };
  
  return (
    <LessonContainer
      progress={progress}
      onAction={handleFooterAction}
      currentStep={currentStep}
      isCorrect={isCorrect}
      hasAnswered={hasAnswered}
      userAnswers={userAnswers}
    >
      <AnimatePresence mode="wait">
        {renderStep(currentStep)}
      </AnimatePresence>
    </LessonContainer>
  );
}
