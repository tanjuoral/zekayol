
export type SubjectId = 'math' | 'turkish' | 'science' | 'social' | 'english' | 'religion';
export type GradeLevel = 7 | 8;

export enum Difficulty {
  EASY = 'Kolay',
  MEDIUM = 'Orta',
  HARD = 'Zor',
  EXAM_READY = 'Yazılıya Hazırım'
}

export interface Topic {
  id: string;
  name: string;
  isLocked?: boolean;
}

export interface Unit {
  id: string;
  name: string;
  description: string;
  topics: Topic[];
}

export interface Subject {
  id: SubjectId;
  name: string;
  icon: string;
  color: string;
  units: Unit[];
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  FILL_BLANK = 'FILL_BLANK'
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options: string[]; // For MCQ
  correctAnswer: string;
  explanation?: string; // Pre-generated or fetched
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface UserStats {
  xp: number;
  streak: number;
  level: number;
  gems: number;
  hearts: number;
  dailyXpGoal: number;
  xpEarnedToday: number;
  achievements: Achievement[];
  currentGrade: GradeLevel;
}

export interface AIExplanationResponse {
  encouragement: string;
  explanation: string;
  tip: string;
}
