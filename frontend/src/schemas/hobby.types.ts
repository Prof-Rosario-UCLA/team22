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
