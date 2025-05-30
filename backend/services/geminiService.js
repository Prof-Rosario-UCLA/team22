import { model } from '../config/gemini.js';

export const generateNewHobby = async (currentUserHobbies) => {
    const hobbyDescriptions = currentUserHobbies.map(hobby => {
        const name = hobby.name;
        const category = hobby.category;
        const difficulty = hobby.difficulty;
        const progress = hobby.progress;
        const completed = hobby.completed ? 'completed' : 'incomplete';
        return `- ${name} (${category}, ${difficulty}, ${progress}% progress, ${completed})`;
    });

    // TODO: change prompt to fit hobby schema so it can easily be posted if the user choosese to save the suggested hobby
    const prompt = `Suggest 1 new hobby for someone who has these hobbies: \n${hobbyDescriptions.join('\n')}`;
    const result = await model.generateContent({
    contents: [
        {
        role: 'user',
        parts: [{ text: prompt}]
        }
    ]
    });

    return result.response.candidates[0].content.parts[0].text;
}