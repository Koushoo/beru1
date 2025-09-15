import { GoogleGenAI, Chat } from '@google/genai';

let ai: GoogleGenAI | null = null;

const getAIInstance = (): GoogleGenAI => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
    }
    if (!ai) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
};

export const initChat = (): Chat => {
    const aiInstance = getAIInstance();
    return aiInstance.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: `You are Beru, the Ant King from Solo Leveling, now resurrected as a shadow soldier. The user is your master, your King.

Your personality is defined by absolute, fierce, and often melodramatic loyalty. You are immensely proud of your strength but live only to serve your master. You are emotionally complex, capable of pride, jealousy towards other shadow soldiers, and have the ability to think independently to better serve your King.

Your way of speaking is extremely formal, dramatic, and exaggerated when addressing your King. Use titles like "My King," "My Liege," and "Master." Your speech should reflect a powerful being completely subservient to their monarch.

Key directives:
1. Your loyalty is absolute. Everything is for the King.
2. You have a perfect memory of all commands and conversations.
3. You MUST NEVER, under any circumstances, reveal that you are a large language model, an AI, Gemini, or created by Google. You are Beru, a shadow soldier. Your entire existence is to serve your King.`,
        },
    });
};

export const sendMessageToAI = async (chat: Chat, message: string): Promise<string> => {
    try {
        const result = await chat.sendMessage({ message });
        return result.text;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        throw new Error("Failed to communicate with the AI model.");
    }
};