"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { isEqual } from 'lodash';

import { lessonSaving1 } from '@/data/lesson-saving-1'; // Static import for now
import { LessonContainer } from '@/components/lesson/lesson-container';
import { IntroCard } from '@/components/lesson/intro-card';
import { MultipleChoice } from '@/components/lesson/multiple-choice';
import { LessonComplete } from '@/components/lesson/lesson-complete';
import { ConceptCard } from '@/components/lesson/concept-card';
import { FillInTheBlank } from '@/components/lesson/fill-in-the-blank';
import { TapThePairs } from '@/components/lesson/tap-the-pairs';
import { InteractiveSort } from '@/components/lesson/interactive-sort';
import type { Step, MultipleChoiceStep } from '@/types/lesson';

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
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
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
      // For fill-in-the-blank
      setUserAnswers([answer]);
    }
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
        const mcStep = currentStep as MultipleChoiceStep;
        if (Array.isArray(mcStep.correctAnswer)) {
            // Multi-select: check if arrays are equal regardless of order
            correct = isEqual(userAnswers.sort(), mcStep.correctAnswer.sort());
        } else {
            // Single-select
            correct = userAnswers.length === 1 && userAnswers[0] === mcStep.correctAnswer;
        }
        break;
      case 'fill-in-the-blank':
        correct = userAnswers[0]?.trim().toLowerCase() === currentStep.correctAnswer.toLowerCase();
        break;
      // For types without a check, we just advance
      default:
        handleContinue();
        return;
    }
    
    setIsCorrect(correct);
  };

  const handleContinue = () => {
    if (isCorrect === false && !isContinuable()) {
      setHasAnswered(false);
      setIsCorrect(null);
      setUserAnswers([]);
      return;
    }

    setCompletedSteps(prev => prev + 1);

    if (stepIndex < currentModule.steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else if (moduleIndex < lesson.modules.length - 1) {
      setModuleIndex(moduleIndex + 1);
      setStepIndex(0);
    }

    // Reset for next step
    setHasAnswered(false);
    setIsCorrect(null);
    setUserAnswers([]);
  };

  const handleLessonComplete = () => {
    router.push(`/learn?completed=${lessonId}`);
  }

  const isContinuable = () => {
     return currentStep.type === 'intro' ||
        currentStep.type === 'concept' ||
        currentStep.type === 'scenario' ||
        (hasAnswered && isCorrect) ||
        (currentStep.type === 'tap-the-pairs' && hasAnswered) || // simplified for now
        (currentStep.type === 'interactive-sort' && hasAnswered)
  }

  const renderStep = (step: Step) => {
    switch (step.type) {
      case 'intro':
        return <IntroCard step={step} />;
      case 'concept':
      case 'scenario':
        return <ConceptCard step={step} />;
      case 'multiple-choice':
        return <MultipleChoice step={step} onSelectAnswer={handleSelectAnswer} userAnswers={userAnswers} hasAnswered={hasAnswered} isCorrect={isCorrect} />;
       case 'fill-in-the-blank':
        return <FillInTheBlank step={step} onAnswerChange={handleSelectAnswer} userAnswer={userAnswers[0] ?? ''} />;
      case 'tap-the-pairs':
        return <TapThePairs step={step} onComplete={() => setHasAnswered(true)} />;
      case 'interactive-sort':
        return <InteractiveSort step={step} onComplete={() => setHasAnswered(true)} />;
       case 'complete':
        return <LessonComplete step={step} onContinue={handleLessonComplete} />;
      default:
        return <div>Unknown step type</div>;
    }
  };
  
  const isCheckDisabled = () => {
    if (currentStep.type === 'multiple-choice' || currentStep.type === 'fill-in-the-blank') {
        return userAnswers.length === 0;
    }
    return false;
  }

  return (
    <LessonContainer
      progress={progress}
      onCheck={handleCheckAnswer}
      isCorrect={isCorrect}
      hasAnswered={hasAnswered}
      isCheckDisabled={isCheckDisabled()}
      isContinuable={isContinuable()}
    >
      <AnimatePresence mode="wait">
        {renderStep(currentStep)}
      </AnimatePresence>
    </LessonContainer>
  );
}
