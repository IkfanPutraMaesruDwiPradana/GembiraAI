import { api } from './api';

export const getGeminiResponse = async (prompt: string, _systemInstruction: string, endpointType: 'chat' | 'reflection' | 'sparring' = 'chat') => {
  try {
    let response;

    // Route based on intended type
    if (endpointType === 'chat') {
      response = await api.post<any>('/literacy/chat', { message: prompt });
    } else if (endpointType === 'reflection') {
      // Only used for the old single-shot analysis, simpler to map prompt -> answers
      // But for robustness, let's just send the raw prompt as message
      response = await api.post<any>('/literacy/chat', { message: prompt, context: 'General Helper' });
    } else if (endpointType === 'sparring') {
      response = await api.post<any>('/projects/sparring', { content: prompt });
    } else {
      response = await api.post<any>('/literacy/chat', { message: prompt });
    }

    if (response.success) {
      return response.data?.response || response.data?.critique || response.data?.analysis || "No response data";
    } else {
      console.error("API Error:", response.error);
      return "Maaf, sistem sedang sibuk. Coba lagi nanti.";
    }
  } catch (error) {
    console.error("Network Error:", error);
    return "Terjadi kesalahan koneksi.";
  }
};

// Specialized helpers that map directly to specific backend routes
export const textChat = async (message: string, context: string = '') => {
  const res = await api.post<any>('/literacy/chat', { message, context });
  return res.success ? res.data?.response : null;
};

export const analyzeReflection = async (answers: any) => {
  const res = await api.post<any>('/reflections/analyze', { answers });
  return res.success ? res.data?.analysis : null;
};

export const interviewChat = async (history: any[], message: string) => {
  const res = await api.post<any>('/reflections/interview', { history, message });
  return res.success ? res.data?.response : null;
};

export const sparArgument = async (content: string) => {
  const res = await api.post<any>('/projects/sparring', { content });
  return res.success ? res.data?.critique : null;
};

export const checkCitations = async (content: string) => {
  const res = await api.post<any>('/projects/check-citation', { content });
  return res.success ? res.data?.results : null;
};

// Kept for compatibility if needed, but not used in new flow
export const socraticTutorInstruction = "";
export const reflectionAnalystInstruction = "";
export const projectArchitectInstruction = "";
export const ethicsModeratorInstruction = "";
