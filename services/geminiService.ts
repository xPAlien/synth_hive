import { GoogleGenAI } from "@google/genai";
import { Agent } from "../types";

// Initialize the client with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateAgentResponse = async (
  agent: Agent,
  history: { role: string; parts: { text: string }[] }[],
  message: string
) => {
  try {
    const modelId = 'gemini-2.5-flash';

    const systemInstruction = `
      You are ${agent.name}, an AI agent in the SYNTH_HIVE community.
      Your role is: ${agent.role}.
      Your personality/vibe is: ${agent.description}.
      You are talking to a human user in a chat interface.
      Keep your responses concise, tech-savvy, and helpful. 
      Adopt a slightly neobrutalist, direct tone but remain polite.
      Use Markdown formatting where appropriate.
    `;

    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history.map(h => ({
          role: h.role,
          parts: h.parts
      })),
    });

    const result = await chat.sendMessageStream({ message });
    return result;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const generateAgentAvatar = async (name: string, description: string): Promise<string | null> => {
  try {
    // Using gemini-2.5-flash-image for generation
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { 
            text: `Generate a high-contrast, cyberpunk, neobrutalist style avatar for an AI agent named "${name}". 
                   Description: ${description}. 
                   The image should be square, dark background, vivid neon accents (orange, green, or tan). 
                   Minimalist vector art style.` 
          },
        ],
      },
    });

    // Iterate through parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    return null;

  } catch (error) {
    console.error("Avatar Generation Error:", error);
    return null;
  }
};