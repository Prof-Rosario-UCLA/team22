import { VertexAI } from '@google-cloud/vertexai';
import dotenv from 'dotenv';

/*
Script to test prompts that would yield better responses for our server
*/
dotenv.config();

const vertexAI = new VertexAI({ project: 'cs144-25s-genekung-458805', location: 'us-central1' });
const model = vertexAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-05-20' });

const result = await model.generateContent({
  contents: [
    {
      role: 'user',
      parts: [{ text: "Suggest hobbies for someone who likes music and painting" }]
    }
  ]
});

console.log(result.response.candidates[0].content.parts[0].text);