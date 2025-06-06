export interface GeminiHobbySuggestion {
  name: string;
  category: string;
  difficulty: string;
  matchPercentage: number;
  description?: string;
}

export interface HobbySchema {
  id?: string;
  name: string;
  category: string;
  difficulty: string;
  progress: number;
  completed: boolean;
  proofUrl?: string;
}

export const PROGRESS_BUCKETS = {
  "just-added": 33,
  "tried-it": 66,
  "completed": 100,
}

export type ProgressBucket = keyof typeof PROGRESS_BUCKETS;