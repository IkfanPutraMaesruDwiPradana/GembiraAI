
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODELS_TO_TRY = ["gemini-1.5-flash", "gemini-1.5-flash-001", "gemini-1.5-pro", "gemini-1.0-pro"];

export const generateContent = async (prompt, systemInstruction) => {
    let lastError = null;

    for (const modelName of MODELS_TO_TRY) {
        try {
            console.log(`Trying model: ${modelName}`);
            const model = ai.models.generateContent({
                model: modelName,
                contents: prompt,
                config: {
                    systemInstruction: systemInstruction,
                    temperature: 0.7,
                }
            });

            const response = await model;
            return response.text();
        } catch (error) {
            console.error(`Failed with model ${modelName}:`, error.message);
            lastError = error;
            // Continue to next model
        }
    }

    console.error("All models failed. Last error:", lastError);
    throw new Error("Failed to generate AI content with any available model. Please check API Key quota or validity.");
};
