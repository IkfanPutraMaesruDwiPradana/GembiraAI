
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const runTest = async () => {
    try {
        console.log("Initializing Gemini Client...");
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        console.log("Listing available models...");
        // list() might return an async iterator or a response object depending on SDK version
        // detailed error logging
        try {
            // For @google/genai, it is usually .list()
            const response = await ai.models.list();
            // response might contain 'models' array
            if (response && response.models) {
                console.log("Available Models:");
                response.models.forEach(model => {
                    console.log(`- ${model.name}`);
                });
            } else {
                console.log("Response format unexpected:", response);
            }
        } catch (listError) {
            console.error("List failed, trying generate with fallback 'gemini-1.5-flash-001'...");
            // Fallback test
            const model = ai.models.generateContent({
                model: "gemini-1.5-flash-001",
                contents: "Test",
            });
            await model;
            console.log("Fallback generation successful.");
        }

    } catch (error) {
        console.error("FAILED:");
        console.error(error);
    }
};

runTest();
