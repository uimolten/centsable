
export type StepType =
  | 'intro'
  | 'concept'
  | 'fill-in-the-blank'
  | 'multiple-choice'
  | 'tap-the-pairs'
  | 'interactive-sort'
  | 'scenario'
  | 'goal-builder'
  | 'goal-summary'
  | 'interactive-town'
  | 'complete';

interface BaseStep {
  type: StepType;
  title?: string;
  text?: string;
}

export interface IntroStep extends BaseStep {
  type: 'intro';
  image?: string;
  imageHint?: string;
}

export interface ConceptStep extends BaseStep {
  type: 'concept';
  image?: string;
  imageHint?: string;
  icon?: 'search' | 'tag' | 'thumbs-up' | 'heart' | 'calendar';
}

export interface FillInTheBlankStep extends BaseStep {
  type: 'fill-in-the-blank';
  question: string;
  correctAnswer: string;
  reinforcement: string;
  image?: string;
  imageHint?: string;
}

export interface MultipleChoiceOption {
  id: string;
  text?: string;
  image?: string;
  imageHint?: string;
}

export interface MultipleChoiceStep extends BaseStep {
  type: 'multiple-choice';
  question: string;
  options: MultipleChoiceOption[];
  correctAnswer: string | string[]; // Now refers to option IDs
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
  image?: string;
  imageHint?: string;
}

export type GoalBuilderInputType = 'text' | 'number' | 'date';

export interface GoalBuilderStep extends BaseStep {
  type: 'goal-builder';
  instructions: string;
  inputType: GoalBuilderInputType;
  placeholder?: string;
  dateOptions?: { label: string; value: string }[];
  storageKey: string;
}

export interface GoalSummaryStep extends BaseStep {
  type: 'goal-summary';
  textTemplate: string;
}

export interface InteractiveTownItem {
  id: string;
  icon: 'school' | 'road' | 'police' | 'hospital' | 'jet';
  tooltip: string;
  position: { top: string; left: string };
}
export interface InteractiveTownStep extends BaseStep {
  type: 'interactive-town';
  items: InteractiveTownItem[];
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
  | GoalBuilderStep
  | GoalSummaryStep
  | InteractiveTownStep
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
