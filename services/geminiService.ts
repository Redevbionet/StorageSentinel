import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const analyzeLogWithGemini = async (
  query: string, 
  contextLogs: string
): Promise<string> => {
  if (!apiKey) {
    return "Error: API_KEY is missing in the environment variables. Please provide a valid key.";
  }

  try {
    const modelId = "gemini-2.5-flash";
    
    const systemInstruction = `You are an expert Storage Systems Engineer assistant named "Sentinel". 
    Your expertise covers SAN, NAS, Object Storage, RAID configurations, Data Encryption, and Disaster Recovery.
    You are analyzing system logs or answering technical questions about storage architecture.
    Be precise, technical, and concise. Highlight anomalies in logs if found.`;

    const prompt = `
    Context (System Logs/Data):
    ${contextLogs}

    User Query:
    ${query}
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while communicating with the AI analysis engine.";
  }
};