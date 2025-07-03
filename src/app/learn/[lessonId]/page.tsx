
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { isEqual } from 'lodash';

import { lessonSaving1 } from '@/data/lesson-saving-1';
import { LessonContainer } from '@/components/lesson/lesson-container';
import { IntroCard } from '@/components/lesson/intro-card';
import { MultipleChoice } from '@/components/lesson/multiple-choice';
import { LessonComplete } from '@/components/lesson/lesson-complete';
import { ConceptCard } from '@/components/lesson/concept-card';
import { FillInTheBlank } from '@/components/lesson/fill-in-the-blank';
import { TapThePairs } from '@/components/lesson/tap-the-pairs';
import { InteractiveSort } from '@/components/lesson/interactive-sort';
import type { Step, MultipleChoiceStep, FillInTheBlankStep } from '@/types/lesson';

const getLessonData = (lessonId: string) => {
  if (lessonId === 's1') return lessonSaving1;
  return null;
};

const isAnswerSimilar = (userAnswer: string, correctAnswer: string): boolean => {
  const formattedUserAnswer = userAnswer.trim().toLowerCase();
  const formattedCorrectAnswer = correctAnswer.trim().toLowerCase();

  // 1. Exact match
  if (formattedUserAnswer === formattedCorrectAnswer) {
    return true;
  }

  // 2. Check for plural/singular forms (simple version)
  if (
    formattedUserAnswer === `${formattedCorrectAnswer}s` || 
    formattedCorrectAnswer === `${formattedUserAnswer}s`
  ) {
    return true;
  }
  
  // 3. Levenshtein distance for typos
  const levenshtein = (a: string, b: string): number => {
    const an = a.length;
    const bn = b.length;
    if (an === 0) return bn;
    if (bn === 0) return an;
    const matrix = new Array(bn + 1);
    for (let i = 0; i <= bn; ++i) {
      matrix[i] = new Array(an + 1);
    }
    for (let i = 0; i <= bn; ++i) {
      matrix[i][0] = i;
    }
    for (let j = 0; j <= an; ++j) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= bn; ++i) {
      for (let j = 1; j <= an; ++j) {
        const cost = a[j - 1] === b[i - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // deletion
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j - 1] + cost // substitution
        );
      }
    }
    return matrix[bn][an];
  };

  const distance = levenshtein(formattedUserAnswer, formattedCorrectAnswer);

  // Allow 1 error for words up to 7 chars, 2 for longer ones.
  const threshold = formattedCorrectAnswer.length > 7 ? 2 : 1;

  return distance <= threshold;
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
    const isStepWithoutCheck = currentStep.type === 'intro' || currentStep.type === 'concept' || currentStep.type === 'scenario' || currentStep.type === 'complete';
    
    // Replicate button disabled logic to prevent Enter key from acting when button is disabled
    const isCheckButton = !(isStepWithoutCheck || (hasAnswered && isCorrect) || (hasAnswered && isCorrect === false));
    const isAnswerEmpty = (currentStep.type === 'multiple-choice' || currentStep.type === 'fill-in-the-blank') && (userAnswers.length === 0 || (userAnswers.length > 0 && userAnswers[0] === ''));

    if (isCheckButton && isAnswerEmpty) {
      return;
    }
    
    const isInteractiveCorrect = (currentStep.type === 'tap-the-pairs' || currentStep.type === 'interactive-sort') && hasAnswered && isCorrect;

    // Case 1: Continue button is displayed (answer correct, or step doesn't need checking)
    if (isStepWithoutCheck || (hasAnswered && isCorrect) || isInteractiveCorrect) {
      if (currentStep.type === 'complete') {
        handleLessonComplete();
      } else {
        goToNextStep();
      }
      return;
    }

    // Case 2: Try Again button is displayed
    if (hasAnswered && isCorrect === false) {
        setIncorrectAttempts(prev => prev + 1);
        
        if (currentStep.type === 'fill-in-the-blank') {
            // Re-check the current answer. The input is not disabled, so user can edit.
            const correct = isAnswerSimilar(userAnswers[0] ?? '', (currentStep as FillInTheBlankStep).correctAnswer);
            setIsCorrect(correct);
        } else {
            // For other types, reset the state to allow a new attempt.
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
      if (event.key === 'Enter') {
        event.preventDefault(); // Stop default behavior like form submission
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
