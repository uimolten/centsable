"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';

import { lessonSaving1 } from '@/data/lesson-saving-1'; // Static import for now
import { LessonContainer } from '@/components/lesson/lesson-container';
import { IntroCard } from '@/components/lesson/intro-card';
import { MultipleChoice } from '@/components/lesson/multiple-choice';
import { LessonComplete } from '@/components/lesson/lesson-complete';
import { ConceptCard } from '@/components/lesson/concept-card';
import { FillInTheBlank } from '@/components/lesson/fill-in-the-blank';
import { TapThePairs } from '@/components/lesson/tap-the-pairs';
import { InteractiveSort } from '@/components/lesson/interactive-sort';
import type { Step } from '@/types/lesson';

// In a real app, you'd have a loader to fetch the correct lesson
const getLessonData = (lessonId: string) => {
  if (lessonId === 's1') return lessonSaving1;
  return null; // Handle not found case
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = Array.isArray(params.lessonId) ? params.lessonId[0] : params.lessonId;
  const lesson = getLessonData(lessonId);

  const [moduleIndex, setModuleIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [totalSteps, setTotalSteps] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);

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
    if (hasAnswered) return;
    setUserAnswer(answer);
  };

  const handleCheckAnswer = () => {
    if (hasAnswered) {
        handleContinue();
        return;
    }

    setHasAnswered(true);
    let correct = false;

    switch (currentStep.type) {
      case 'multiple-choice':
      case 'fill-in-the-blank':
        correct = userAnswer?.trim().toLowerCase() === currentStep.correctAnswer.toLowerCase();
        break;
      // For types without a check, we just advance
      default:
        handleContinue();
        return;
    }
    
    setIsCorrect(correct);
    if (!correct) {
      // Logic for incorrect answer (e.g., shake animation, sound effect)
    }
  };

  const handleContinue = () => {
    if (isCorrect === false) { // Allow retry on incorrect answer
      setHasAnswered(false);
      setIsCorrect(null);
      setUserAnswer(null);
      return;
    }

    setCompletedSteps(prev => prev + 1);

    if (stepIndex < currentModule.steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else if (moduleIndex < lesson.modules.length - 1) {
      setModuleIndex(moduleIndex + 1);
      setStepIndex(0);
    } else {
      // Lesson is complete, but we handle this via the 'complete' step type
      // so this case might not be hit if the last step is 'complete'
      console.log('Lesson finished');
    }

    // Reset for next step
    setHasAnswered(false);
    setIsCorrect(null);
    setUserAnswer(null);
  };

  const handleLessonComplete = () => {
    router.push(`/learn?completed=${lessonId}`);
  }

  const renderStep = (step: Step) => {
    switch (step.type) {
      case 'intro':
        return <IntroCard step={step} />;
      case 'concept':
      case 'scenario':
        return <ConceptCard step={step} />;
      case 'multiple-choice':
        return <MultipleChoice step={step} onSelectAnswer={handleSelectAnswer} userAnswer={userAnswer} hasAnswered={hasAnswered} isCorrect={isCorrect} />;
       case 'fill-in-the-blank':
        return <FillInTheBlank step={step} onAnswerChange={handleSelectAnswer} userAnswer={userAnswer ?? ''} />;
      case 'tap-the-pairs':
        // These more complex components would need state management for completion
        // For now, they will just display and continue
        return <TapThePairs step={step} onComplete={() => setUserAnswer('completed')} />;
      case 'interactive-sort':
        return <InteractiveSort step={step} onComplete={() => setUserAnswer('completed')} />;
       case 'complete':
        return <LessonComplete step={step} onContinue={handleLessonComplete} />;
      default:
        return <div>Unknown step type</div>;
    }
  };
  
  const isCheckDisabled = () => {
    if (currentStep.type === 'multiple-choice' || currentStep.type === 'fill-in-the-blank') {
        return !userAnswer;
    }
    return false;
  }

  return (
    <LessonContainer
      progress={progress}
      onCheck={handleCheckAnswer}
      onContinue={handleContinue}
      isCorrect={isCorrect}
      hasAnswered={hasAnswered}
      isCheckDisabled={isCheckDisabled()}
      isContinuable={
        currentStep.type === 'intro' ||
        currentStep.type === 'concept' ||
        currentStep.type === 'scenario' ||
        currentStep.type === 'tap-the-pairs' || // simplified for now
        currentStep.type === 'interactive-sort' // simplified for now
      }
    >
      <AnimatePresence mode="wait">
        {renderStep(currentStep)}
      </AnimatePresence>
    </LessonContainer>
  );
}
