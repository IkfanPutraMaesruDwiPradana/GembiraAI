import { generateContent } from '../utils/ai.js';

const sparringInstruction = `
You are a "Sparring Partner" akademis yang kritis. 
Tantang argumen pengguna dengan pertanyaan tajam.
Tunjukkan celah logika.
Jangan memperbaiki tulisan mereka, tapi paksa mereka berpikir lebih dalam.
`;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ success: false, error: 'Content is required' });
        }

        const prompt = `Draft content: "${content}". Challenge this argument.`;
        const response = await generateContent(prompt, sparringInstruction);

        return res.status(200).json({ success: true, critique: response });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
    }
}
