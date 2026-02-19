import { generateContent } from '../utils/ai.js';

const interviewInstruction = `
You are a warm, curious interviewer helping a student discover their Ikigai.
Ask one follow-up question at a time.
Be brief, encouraging, and insightful.
`;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    try {
        const { history, message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, error: 'Message is required' });
        }

        const prompt = `History: ${JSON.stringify(history || [])}. User says: ${message}`;
        const response = await generateContent(prompt, interviewInstruction);

        return res.status(200).json({ success: true, response });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
    }
}
