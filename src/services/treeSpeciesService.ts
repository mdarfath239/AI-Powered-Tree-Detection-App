import { toast } from "@/components/ui/use-toast";

export interface TreeSpecies {
  id: string;
  commonName: string;
  scientificName: string;
  family: string;
  description: string;
  characteristics: {
    height: string;
    spread: string;
    growthRate: string;
    lifespan: string;
    habitat: string;
    nativeRegions: string[];
  };
  leaves: {
    type: string;
    shape: string;
    arrangement: string;
    color: string;
    seasonalChanges: string;
  };
  bark: {
    texture: string;
    color: string;
    characteristics: string;
  };
  flowers: {
    color: string;
    season: string;
    description: string;
  };
  fruit: {
    type: string;
    color: string;
    season: string;
    edible: boolean;
  };
  care: {
    sunlight: string;
    water: string;
    soil: string;
    fertilizer: string;
    pruning: string;
    pests: string[];
    diseases: string[];
  };
  ecologicalValue: {
    wildlifeValue: string;
    environmentalBenefits: string[];
    carbonSequestration: string;
  };
  images: {
    tree: string[];
    leaves: string[];
    bark: string[];
    flowers: string[];
    fruit: string[];
  };
  healthIndicators: {
    leafColor: string[];
    barkCondition: string[];
    growthPatterns: string[];
    warningSignals: string[];
  };
}

export const fetchTreeSpecies = async (id: string): Promise<TreeSpecies> => {
  try {
    // This would be replaced with actual API call
    const response = await fetch(`/api/species/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch tree species data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tree species:', error);
    toast({
      title: "Error",
      description: "Failed to fetch tree species information",
      variant: "destructive",
    });
    throw error;
  }
};

export const searchTreeSpecies = async (query: string): Promise<TreeSpecies[]> => {
  try {
    // This would be replaced with actual API call
    const response = await fetch(`/api/species/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search tree species');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching tree species:', error);
    toast({
      title: "Error",
      description: "Failed to search tree species",
      variant: "destructive",
    });
    throw error;
  }
};

export const getHealthAssessment = async (imageFile: File): Promise<{
  status: 'healthy' | 'moderate' | 'concerning';
  issues: string[];
  recommendations: string[];
}> => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    // This would be replaced with actual API call
    const response = await fetch('/api/health-assessment', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to assess tree health');
    }

    return await response.json();
  } catch (error) {
    console.error('Error assessing tree health:', error);
    toast({
      title: "Error",
      description: "Failed to assess tree health",
      variant: "destructive",
    });
    throw error;
  }
};