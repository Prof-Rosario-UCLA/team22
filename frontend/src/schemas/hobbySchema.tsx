export default interface HobbySchema {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  progress: number;
  completed: boolean;
  proofUrl?: string;
}