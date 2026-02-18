import express from 'express';
import { generateContent } from '../services/aiService.js';

const router = express.Router();

const socraticInstruction = `
You are a Socratic tutor for university students on GEMBIRA AI. 
Your goal is AI literacy. 
NEVER give direct answers. 
ALWAYS respond with a question or a nudge that forces the student to think critically. 
If they ask 'What is AI?', don't define it. Ask them what they think separates a human mind from a calculator.
`;

router.post('/chat', async (req, res) => {
    try {
        const { message, context } = req.body;
        const prompt = `Context: ${context || 'General AI Literacy'}. User says: ${message}`;
        const response = await generateContent(prompt, socraticInstruction);
        res.json({ success: true, response });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
