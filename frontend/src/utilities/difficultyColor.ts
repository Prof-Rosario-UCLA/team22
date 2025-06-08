export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "beginner":
      return {
        text: "text-green-700",
        bg: "bg-green-100",
      };
    case "intermediate":
      return {
        text: "text-yellow-700",
        bg: "bg-yellow-100",
      };
    case "advanced":
      return {
        text: "text-red-700",
        bg: "bg-red-100",
      };
    default:
      return {
        text: "text-gray-500",
        bg: "bg-gray-100",
      };
  }
};
