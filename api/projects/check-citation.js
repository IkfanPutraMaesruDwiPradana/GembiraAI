import { generateContent } from '../utils/ai.js';

const citationInstruction = `
You are an academic citation verifier.
Check the text for potential hallucinations or fake citations.
If a citation looks real, mark it as verified (simulated).
If it looks suspicious or generic, flag it.
Return JSON format: { results: [{ text, status, note }] }
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

        const prompt = `Analyze citations in: "${content}"`;
        const response = await generateContent(prompt, citationInstruction);

        let results = [];
        try {
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                results = parsed.results || [];
            } else {
                results = [{ text: "Analysis complete", status: "info", note: response }];
            }
        } catch (e) {
            results = [{ text: "Could not parse AI response", status: "error", note: response }];
        }

        return res.status(200).json({ success: true, results });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
    }
}
