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