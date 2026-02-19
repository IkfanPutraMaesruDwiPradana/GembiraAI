import { generateContent } from '../utils/ai.js';

const socraticInstruction = `
You are a Socratic tutor for university students on GEMBIRA AI. 
Your goal is AI literacy. 
NEVER give direct answers. 
ALWAYS respond with a question or a nudge that forces the student to think critically. 
If they ask 'What is AI?', don't define it. Ask them what they think separates a human mind from a calculator.
`;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    try {
        const { message, context } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, error: 'Message is required' });
        }

        const prompt = `Context: ${context || 'General AI Literacy'}. User says: ${message}`;
        const response = await generateContent(prompt, socraticInstruction);

        return res.status(200).json({ success: true, response });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
    }
}
