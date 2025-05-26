
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "@/components/ui/use-toast";

interface TreeAnalysisResult {
  treeName: string;
  scientificName: string;
  description: string;
  characteristics: {
    height: string;
    habitat: string;
    leaves: string;
    bark: string;
  };
  funFacts: string[];
  confidence: number;
}

export const analyzeTreeImage = async (imageFile: File): Promise<TreeAnalysisResult> => {
  try {
    const apiKey = localStorage.getItem('gemini-api-key');
    
    if (!apiKey) {
      toast({
        title: "API Key Missing",
        description: "Please set your Google Gemini API key in the settings",
        variant: "destructive",
      });
      throw new Error("API key is missing");
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Using gemini-1.5-flash model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Convert the image file to base64
    const base64Image = await getBase64FromFile(imageFile);
    
    const prompt = `
      I have an image of a tree. Please:
      1. Identify the tree species with a confidence level (as a percentage).
      2. Provide its full scientific name.
      3. Write a brief description (2-3 sentences).
      4. List key characteristics: average height, typical habitat, leaf type, and bark appearance.
      5. Include 2-3 interesting facts about this tree species.
      
      Format the response as a JSON object with these keys:
      treeName, scientificName, description, characteristics (with nested keys: height, habitat, leaves, bark), funFacts (as an array of strings), confidence (as a number between 0-100)
    `;
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image.split("base64,")[1],
        },
      },
    ]);
    
    const response = result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*}/);
    let jsonStr = jsonMatch ? jsonMatch[1] || jsonMatch[0] : text;
    
    // Clean up the string to ensure it's valid JSON
    jsonStr = jsonStr.replace(/^\s*```json\s*/, "").replace(/\s*```\s*$/, "");
    
    try {
      const parsedData = JSON.parse(jsonStr);
      return {
        treeName: parsedData.treeName || "Unknown Tree",
        scientificName: parsedData.scientificName || "Unknown Scientific Name",
        description: parsedData.description || "No description available",
        characteristics: {
          height: parsedData.characteristics?.height || "Unknown",
          habitat: parsedData.characteristics?.habitat || "Unknown",
          leaves: parsedData.characteristics?.leaves || "Unknown",
          bark: parsedData.characteristics?.bark || "Unknown",
        },
        funFacts: Array.isArray(parsedData.funFacts) ? parsedData.funFacts : ["No fun facts available"],
        confidence: parsedData.confidence || 0,
      };
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      throw new Error("Failed to parse tree analysis results");
    }
  } catch (error) {
    console.error("Error in tree analysis:", error);
    toast({
      title: "Analysis Failed",
      description: "Failed to analyze the image. Please try again or check your API key.",
      variant: "destructive",
    });
    throw new Error("Error analyzing image: " + error);
  }
};

// Helper function to convert File to base64 string
const getBase64FromFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};
