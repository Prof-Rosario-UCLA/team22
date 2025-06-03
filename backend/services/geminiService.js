import { model } from "../config/gemini.js";
import { HobbySchema } from "../models/Hobby.js";

export const generateNewHobby = async (currentUserHobbies) => {
  const hobbyDescriptions = currentUserHobbies.map((hobby) => {
    const name = hobby.name;
    const category = hobby.category;
    const difficulty = hobby.difficulty;
    const progress = hobby.progress;
    const completed = hobby.completed ? "completed" : "incomplete";
    return `- ${name} (${category}, ${difficulty}, ${progress}% progress, ${completed})`;
  });

  // TODO: change prompt to fit hobby schema so it can easily be posted if the user choosese to save the suggested hobby
  const prompt = `Suggest 1 new hobby for someone who has these hobbies: \n${hobbyDescriptions.join(
    "\n"
  )}. Return only singular JSON object of a hobby recommendation that fits the following schema: ${HobbySchema}. 
  However, ignore the progress, completed and proofUrl fields, but fill in the name, category, and difficulty fields. 
  Include only a short description of this hobby as well, that is under 20 words. Add it to a field in the return JSON object called: "description".
  Also include an estimated percentage match field, called "matchPercentage", which should be a number between 0 and 100, indicating how well the suggested hobby fits the user's interests. 
  The response should be a valid JSON object with the following fields: name, category, difficulty, matchPercentage, description.`;
  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  return result.response.candidates[0].content.parts[0].text;
};
