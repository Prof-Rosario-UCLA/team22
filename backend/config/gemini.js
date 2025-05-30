import { VertexAI } from '@google-cloud/vertexai';
import dotenv from 'dotenv';
dotenv.config();

const vertexAI = new VertexAI({ 
    project: 'cs144-25s-genekung-458805', 
    location: 'us-central1' 
});

export const model = vertexAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash-preview-05-20' 
});
