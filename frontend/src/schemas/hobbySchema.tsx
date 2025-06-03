export default interface HobbySchema {
  name: string;
  category: string;
  difficulty: string;
  progress: number;
  completed: boolean;
  proofUrl?: string;
}