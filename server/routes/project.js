import express from 'express';
import { generateContent } from '../services/aiService.js';

const router = express.Router();

const sparringInstruction = `
You are a "Sparring Partner" akademis yang kritis. 
Tantang argumen pengguna dengan pertanyaan tajam.
Tunjukkan celah logika.
Jangan memperbaiki tulisan mereka, tapi paksa mereka berpikir lebih dalam.
`;

const citationInstruction = `
You are an academic citation verifier.
Check the text for potential hallucinations or fake citations.
If a citation looks real, mark it as verified (simulated).
If it looks suspicious or generic, flag it.
Return JSON format: { results: [{ text, status, note }] }
`;

router.post('/sparring', async (req, res) => {
    try {
        const { content } = req.body;
        const prompt = `Draft content: "${content}". Challenge this argument.`;
        const response = await generateContent(prompt, sparringInstruction);
        res.json({ success: true, critique: response });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/check-citation', async (req, res) => {
    try {
        const { content } = req.body;
        const prompt = `Analyze citations in: "${content}"`;
        // For now, we mock the verified status since we can't real-time check Google Scholar
        // But we use AI to identify *potential* hallucinations based on patterns
        const response = await generateContent(prompt, citationInstruction);

        // Fallback if AI doesn't return JSON
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

        res.json({ success: true, results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
