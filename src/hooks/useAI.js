import { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { API_KEY } from '../helper';
import { extractCode } from '../utils/helpers';
import { AI_PROMPT_TEMPLATE } from '../utils/constants';
import { toast } from 'react-toastify';

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const generateWebsite = async (prompt) => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt!");
      return null;
    }

    setLoading(true);
    try {
      const textPrompt = AI_PROMPT_TEMPLATE(prompt);
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: textPrompt,
      });
      const extractedCode = extractCode(response.text);
      return extractedCode;
    } catch (error) {
      toast.error("Failed to generate website. Please try again.");
      console.error("AI generation error:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generateWebsite, loading };
};