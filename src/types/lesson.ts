export type StepType =
  | 'intro'
  | 'concept'
  | 'fill-in-the-blank'
  | 'multiple-choice'
  | 'tap-the-pairs'
  | 'interactive-sort'
  | 'scenario'
  | 'complete';

interface BaseStep {
  type: StepType;
  title?: string;
  text?: string;
  mascotImage?: string;
}

export interface IntroStep extends BaseStep {
  type: 'intro';
}

export interface ConceptStep extends BaseStep {
  type: 'concept';
}

export interface FillInTheBlankStep extends BaseStep {
  type: 'fill-in-the-blank';
  question: string;
  correctAnswer: string;
  reinforcement: string;
}

export interface MultipleChoiceStep extends BaseStep {
  type: 'multiple-choice';
  question: string;
  options: string[];
  correctAnswer: string;
  reinforcement?: string;
}

export interface TapThePairsStep extends BaseStep {
  type: 'tap-the-pairs';
  instructions: string;
  pairs: { term: string; definition: string }[];
}

export interface SortItem {
  id: string;
  text: string;
  correctBox: 'box1' | 'box2';
}

export interface InteractiveSortStep extends BaseStep {
  type: 'interactive-sort';
  instructions: string;
  box1Label: string;
  box2Label: string;
  items: SortItem[];
}

export interface ScenarioStep extends BaseStep {
    type: 'scenario';
}

export interface CompleteStep extends BaseStep {
  type: 'complete';
  rewards: {
    xp: number;
    coins: number;
  };
}

export type Step =
  | IntroStep
  | ConceptStep
  | FillInTheBlankStep
  | MultipleChoiceStep
  | TapThePairsStep
  | InteractiveSortStep
  | ScenarioStep
  | CompleteStep;

export interface Module {
  title: string;
  xp: number;
  steps: Step[];
}

export interface Lesson {
  id: string;
  title: string;
  modules: Module[];
}
