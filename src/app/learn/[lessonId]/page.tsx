
"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { isEqual, shuffle } from 'lodash';

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
  
  const handleLessonComplete = () => {
    router.push(`/learn?completed=${lessonId}`);
  };

  const handleInteractiveComplete = (correct: boolean) => {
    setHasAnswered(true);
    setIsCorrect(correct);
    if (!correct) {
      setIncorrectAttempts(prev => prev + 1);
    }
  };
  
  const goToNextStep = () => {
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
  }

  const handleFooterAction = () => {
    const isStepWithoutCheck = currentStep.type === 'intro' || currentStep.type === 'concept' || currentStep.type === 'scenario' || currentStep.type === 'complete';
    
    // Case 1: Continue button is displayed (answer correct, or step doesn't need checking)
    if (isStepWithoutCheck || (hasAnswered && isCorrect)) {
      if (currentStep.type === 'complete') {
        handleLessonComplete();
      } else {
        goToNextStep();
      }
      return;
    }

    // Case 2: Try Again button is displayed
    if (hasAnswered && isCorrect === false) {
      setHasAnswered(false);
      setIsCorrect(null);
      
      // For fill-in-the-blank, we don't clear the answer so user can edit.
      // For others, we reset.
      if (currentStep.type !== 'fill-in-the-blank') {
          setUserAnswers([]);
      }
      // Re-render interactive components to reset their internal state
      if (currentStep.type === 'tap-the-pairs' || currentStep.type === 'interactive-sort') {
          setTryAgainCounter(count => count + 1);
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
          correct = userAnswers[0]?.trim().toLowerCase() === (currentStep as FillInTheBlankStep).correctAnswer.toLowerCase();
          break;
      }
      setIsCorrect(correct);
      if (!correct) {
        setIncorrectAttempts(prev => prev + 1);
      }
    }
  };

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
        return <TapThePairs key={uniqueKey} step={step} onComplete={handleInteractiveComplete} incorrectAttempts={incorrectAttempts} />;
      case 'interactive-sort':
        return <InteractiveSort key={uniqueKey} step={step} onComplete={handleInteractiveComplete} incorrectAttempts={incorrectAttempts} />;
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
