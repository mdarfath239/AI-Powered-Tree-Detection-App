export interface TreeAnalysisResult {
  name: string;
  scientificName: string;
  confidence: number;
  description: string;
  characteristics: string[];
  funFacts: string[];
}

export interface TreeHealth {
  status: 'healthy' | 'moderate' | 'concerning';
  indicators: {
    name: string;
    status: 'good' | 'moderate' | 'poor';
    value: number;
    description: string;
  }[];
  issues: string[];
  recommendations: string[];
}

export interface TreeSpecies {
  id: string;
  commonName: string;
  scientificName: string;
  family: string;
  description: string;
  characteristics: {
    height: string;
    spread: string;
    growthRate: 'slow' | 'moderate' | 'fast';
    lifespan: string;
    sunRequirement: 'full sun' | 'partial shade' | 'full shade';
    soilType: string[];
  };
  nativeRegions: string[];
  uses: string[];
  images: {
    main: string;
    leaf?: string;
    bark?: string;
    flower?: string;
    fruit?: string;
  };
  funFacts: string[];
  careGuide: {
    watering: string;
    pruning: string;
    fertilizing: string;
    pestControl: string;
    seasonalCare: Record<string, string>;
  };
}

export interface TreeLocation {
  latitude: number;
  longitude: number;
  address?: string;
  timestamp: string;
  species?: string;
  health?: TreeHealth;
  images?: string[];
  notes?: string;
}

export interface TreeCommunityPost {
  id: string;
  userId: string;
  treeSpecies?: string;
  location?: TreeLocation;
  images: string[];
  description: string;
  likes: number;
  comments: number;
  timestamp: string;
  tags: string[];
}

export interface TreeHealthAssessment {
  id: string;
  treeId: string;
  timestamp: string;
  health: TreeHealth;
  images: string[];
  notes?: string;
  recommendations: string[];
  nextAssessmentDate?: string;
}

export interface TreeCareSchedule {
  id: string;
  treeId: string;
  tasks: {
    id: string;
    type: 'watering' | 'pruning' | 'fertilizing' | 'inspection' | 'treatment';
    description: string;
    dueDate: string;
    completed: boolean;
    notes?: string;
  }[];
  seasonalCare: Record<string, string[]>;
  reminders: boolean;
}