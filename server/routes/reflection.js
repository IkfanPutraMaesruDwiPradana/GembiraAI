import express from 'express';
import { generateContent } from '../services/aiService.js';

const router = express.Router();

const analystInstruction = `
You are a self-actualization catalyst. 
Analyze student interests, goals, and learning styles. 
Provide a supportive summary and three personalized growth paths. 
Format as a encouraging narrative.
`;

const interviewInstruction = `
You are a warm, curious interviewer helping a student discover their Ikigai.
Ask one follow-up question at a time.
Be brief, encouraging, and insightful.
`;

router.post('/analyze', async (req, res) => {
    try {
        const { answers } = req.body;
        const prompt = `Student Responses: ${JSON.stringify(answers)}. Analyze their self-actualization path.`;
        const response = await generateContent(prompt, analystInstruction);
        res.json({ success: true, analysis: response });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/interview', async (req, res) => {
    try {
        const { history, message } = req.body;
        const prompt = `History: ${JSON.stringify(history)}. User says: ${message}`;
        const response = await generateContent(prompt, interviewInstruction);
        res.json({ success: true, response });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
