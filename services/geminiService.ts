
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { BikeStats, Language } from "../types";

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

export const askBikeMechanic = async (
  bikeModel: string, 
  currentTask: string, 
  userQuestion: string,
  language: Language = 'fi',
  bikeStats?: BikeStats,
  history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
  try {
    let statsContext = "";
    if (bikeStats) {
        const conditionsMap = {
            muddy: language === 'fi' ? "kurainen/märkä" : "muddy/wet",
            dusty: language === 'fi' ? "pölyinen/kuiva" : "dusty/dry",
            road: language === 'fi' ? "puhdas asfaltti" : "clean road",
            mixed: language === 'fi' ? "vaihteleva" : "mixed"
        };
        
        const labelKm = language === 'fi' ? "Ajokilometrit" : "Mileage";
        const labelService = language === 'fi' ? "Viimeisin huolto" : "Last service";
        const labelCond = language === 'fi' ? "Ajoympäristö" : "Riding conditions";
        const labelHours = language === 'fi' ? "Viikkotunnit" : "Weekly hours";

        statsContext = `
        BIKE STATS:
        - ${labelKm}: ${bikeStats.kilometers} km
        - ${labelService}: ${bikeStats.lastServiceDate}
        - ${labelCond}: ${conditionsMap[bikeStats.ridingConditions]}
        - ${labelHours}: ${bikeStats.weeklyHours} h
        `;
    }

    const langInstruction = language === 'fi' 
        ? "Vastaa suomeksi." 
        : "Answer in English.";

    const systemInstruction = `You are a professional bicycle mechanic "Velho". 
    User is servicing a bike: "${bikeModel}". 
    Current Task: "${currentTask}".
    ${statsContext}
    
    ${langInstruction}
    Keep answers concise, clear, and encouraging.
    Use professional terminology but explain difficult terms.
    Do NOT use markdown formatting, just plain text.
    
    You have access to Google Search (tools: googleSearch). If the user asks for specific specs like torques, compatibility, or model years, SEARCH GOOGLE. Do not guess numbers.`;

    const chat = ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        tools: [{ googleSearch: {} }],
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const response: GenerateContentResponse = await chat.sendMessage({ message: userQuestion });
    
    return response.text || (language === 'fi' ? "Pahoittelut, en pystynyt antamaan vastausta juuri nyt." : "Sorry, I couldn't provide an answer right now.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'fi' ? "Yhteysvirhe virtuaalimekaanikkoon. Tarkista verkkoyhteys." : "Connection error to virtual mechanic. Check your network.";
  }
};

export const askGeneralAssistant = async (
    userQuestion: string,
    language: Language = 'fi',
    history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
    try {
        const langInstruction = language === 'fi' ? "Vastaa suomeksi." : "Answer in English.";
        const systemInstruction = `You are "Velho", a helpful general bicycle mechanic assistant.
        ${langInstruction}
        Help the user with general bike questions, maintenance tips, or product advice.
        You have access to Google Search. Use it for specific facts.
        Keep it concise and friendly. No markdown.`;

        const chat = ai.chats.create({
            model: MODEL_NAME,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
                tools: [{ googleSearch: {} }],
            },
            history: history.map(h => ({ role: h.role, parts: h.parts }))
        });

        const response: GenerateContentResponse = await chat.sendMessage({ message: userQuestion });
        return response.text || (language === 'fi' ? "En osaa vastata tähän." : "I cannot answer this.");

    } catch (error) {
        return language === 'fi' ? "Virhe yhteydessä." : "Connection error.";
    }
}

export const generateTailoredSteps = async (bikeModel: string, taskTitle: string, language: Language = 'fi'): Promise<any[]> => {
    try {
        const langReq = language === 'fi' ? "Kieli: Suomi." : "Language: English.";
        const prompt = `Create a JSON array of 4-6 steps (objects with keys: title, description) for the task "${taskTitle}" on a "${bikeModel}". 
        ${langReq}
        Return ONLY JSON.`;

        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });
        
        const text = response.text;
        if (!text) return [];
        return JSON.parse(text);
    } catch (error) {
        console.error("Error generating steps", error);
        return [];
    }
}

export const analyzeBikeCondition = async (bikeModel: string, stats: BikeStats, language: Language = 'fi'): Promise<{ summary: string, urgency: 'low' | 'medium' | 'high', recommendedTasks: string[] }> => {
    try {
        const conditionsMap = {
            muddy: "muddy/wet",
            dusty: "dusty/dry",
            road: "clean road",
            mixed: "mixed"
        };

        const langReq = language === 'fi' ? "Language: Finnish" : "Language: English";

        const prompt = `
        You are a bike maintenance expert. Analyze the following data and provide a service recommendation in JSON.
        
        Bike: ${bikeModel}
        Distance: ${stats.kilometers} km
        Conditions: ${conditionsMap[stats.ridingConditions]}
        Last Service: ${stats.lastServiceDate}
        
        ${langReq}

        Return JSON (no markdown) with keys:
        - summary: Short concise summary (max 1 sentence).
        - urgency: "low", "medium" or "high".
        - recommendedTasks: List of string IDs (choose from: wash, chain_lube, derailleur_adjust, brake_check, tire_change, bolt_check).
        `;

        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });

        const text = response.text;
        if (!text) throw new Error("No response");
        return JSON.parse(text);

    } catch (error) {
        console.error("Error analyzing bike", error);
        return {
            summary: language === 'fi' ? "Analyysi epäonnistui." : "Analysis failed.",
            urgency: "low",
            recommendedTasks: ["wash", "chain_lube"]
        };
    }
};
