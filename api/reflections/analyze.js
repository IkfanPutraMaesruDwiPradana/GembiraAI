import { generateContent } from '../utils/ai.js';

const analystInstruction = `
You are a self-actualization catalyst. 
Analyze student interests, goals, and learning styles. 
Provide a supportive summary and three personalized growth paths. 
Format as a encouraging narrative.
`;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    try {
        const { answers } = req.body;

        if (!answers) {
            return res.status(400).json({ success: false, error: 'Answers are required' });
        }

        const prompt = `Student Responses: ${JSON.stringify(answers)}. Analyze their self-actualization path.`;
        const response = await generateContent(prompt, analystInstruction);

        return res.status(200).json({ success: true, analysis: response });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
    }
}
