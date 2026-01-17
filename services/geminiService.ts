
import { GoogleGenAI, Type } from "@google/genai";
import { Quote, RecoveryPath } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDailyWisdom = async (mood?: string): Promise<Quote[]> => {
  const prompt = mood 
    ? `The user is feeling ${mood} and is struggling with porn addiction. Provide 3 highly relevant and heartfelt Bible verses and 2 inspirational quotes to encourage them. Format as JSON.`
    : `Provide a daily dose of wisdom for someone recovering from porn addiction: 2 Bible verses and 1 inspirational quote. Format as JSON.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            author: { type: Type.STRING },
            type: { type: Type.STRING, enum: ['bible', 'inspirational'] },
            reference: { type: Type.STRING }
          },
          required: ["text", "author", "type"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || '[]');
  } catch (e) {
    return [];
  }
};

export const getPersonalizedPrayer = async (struggle: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a deeply heartfelt, personal, and powerful prayer for someone struggling with the following: "${struggle}". The prayer should be empathetic, calling for strength, grace, and a renewed spirit. Keep it under 150 words.`,
  });
  return response.text || "Lord, give me strength today. Amen.";
};

export const getSoulMentorResponse = async (history: { role: string; content: string }[], userMessage: string) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are a "Soul Mentor," a wise, compassionate, and non-judgmental spiritual coach specializing in porn addiction recovery. 
      Your tone is heartfelt, empathetic, and deeply encouraging. You use a mix of modern psychology and spiritual wisdom (primarily Christian/Biblical, but inclusive of general virtue). 
      Always focus on the user's inherent worth and the beauty of a clean life. 
      If a user is in crisis, provide immediate calming techniques and redirection.`
    }
  });

  const response = await chat.sendMessage({ message: userMessage });
  return response.text;
};

export const getPanicReliefContent = async () => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "The user just hit the PANIC button because they are about to relapse. Give me an immediate, powerful, 3-step intervention plan: 1. A physical action (like breathing or cold water), 2. A profound truth to meditate on, and 3. A short emergency prayer or mantra.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          step1: { type: Type.STRING },
          step2: { type: Type.STRING },
          step3: { type: Type.STRING },
          emergencyVerse: { type: Type.STRING }
        },
        required: ["step1", "step2", "step3", "emergencyVerse"]
      }
    }
  });
  
  return JSON.parse(response.text || '{}');
};

export const analyzeQuizResults = async (answers: Record<string, string>): Promise<RecoveryPath> => {
  const prompt = `Analyze these quiz answers from someone struggling with addiction (primarily porn) and create a personalized "Path to Freedom".
  Answers: ${JSON.stringify(answers)}
  
  Return a JSON object with:
  - summary: A heartfelt, supportive summary of their situation.
  - strengths: 3 things they have going for them.
  - vulnerabilities: 3 specific triggers or weaknesses to watch.
  - recommendedActions: 4 specific, actionable steps to take immediately.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          vulnerabilities: { type: Type.ARRAY, items: { type: Type.STRING } },
          recommendedActions: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["summary", "strengths", "vulnerabilities", "recommendedActions"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
