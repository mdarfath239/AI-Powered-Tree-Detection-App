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

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  topics: string[];
  content: LearningContent[];
}

export interface LearningContent {
  type: 'text' | 'image' | 'video' | 'quiz';
  content: string;
  caption?: string;
  questions?: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Mock data store - would be replaced with actual API calls
const treeSpecies: TreeSpecies[] = [
  {
    id: '1',
    commonName: 'Red Oak',
    scientificName: 'Quercus rubra',
    family: 'Fagaceae',
    description: 'The Red Oak is one of the most popular and fastest-growing oak trees. Known for its striking fall colors and adaptability to various conditions.',
    characteristics: {
      height: '60-75 feet',
      spread: '40-50 feet',
      growthRate: 'fast',
      lifespan: '150-200 years',
      sunRequirement: 'full sun',
      soilType: ['well-drained', 'acidic', 'sandy', 'clay']
    },
    nativeRegions: ['Eastern North America', 'Central United States'],
    uses: ['shade tree', 'timber', 'wildlife habitat'],
    images: {
      main: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
      leaf: 'https://example.com/red-oak-leaf.jpg',
      bark: 'https://example.com/red-oak-bark.jpg'
    },
    funFacts: [
      'Can grow up to 2 feet per year in good conditions',
      'Acorns take two years to mature',
      'Can live for several centuries in optimal conditions'
    ],
    careGuide: {
      watering: 'Water deeply and regularly during first growing season. Established trees need less frequent watering.',
      pruning: 'Prune in winter or early spring before new growth begins. Remove dead, diseased, or crossing branches.',
      fertilizing: 'Apply balanced fertilizer in early spring. Young trees benefit from yearly fertilization.',
      pestControl: 'Monitor for common pests like oak wilt and gypsy moths. Maintain tree health to prevent infestations.',
      seasonalCare: {
        spring: 'Check for winter damage and apply fertilizer',
        summer: 'Monitor water needs during dry spells',
        fall: 'Clean up fallen leaves to prevent disease',
        winter: 'Protect young trees from frost damage'
      }
    }
  }
];

const learningModules: LearningModule[] = [
  {
    id: '1',
    title: 'Introduction to Tree Identification',
    description: 'Learn the basics of identifying trees through their leaves, bark, and overall shape.',
    difficulty: 'beginner',
    duration: '30 minutes',
    topics: ['leaf shapes', 'bark patterns', 'tree silhouettes'],
    content: [
      {
        type: 'text',
        content: 'Trees can be identified through various characteristics...'
      },
      {
        type: 'image',
        content: 'https://example.com/leaf-shapes.jpg',
        caption: 'Common leaf shapes and their characteristics'
      }
    ]
  }
];

export const fetchTreeSpecies = async (id: string): Promise<TreeSpecies | null> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return treeSpecies.find(species => species.id === id) || null;
};

export const searchTreeSpecies = async (query: string): Promise<TreeSpecies[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const searchTerms = query.toLowerCase().split(' ');
  return treeSpecies.filter(species => {
    const searchString = `${species.commonName} ${species.scientificName} ${species.family}`.toLowerCase();
    return searchTerms.every(term => searchString.includes(term));
  });
};

export const fetchLearningModule = async (id: string): Promise<LearningModule | null> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return learningModules.find(module => module.id === id) || null;
};

export const fetchLearningModules = async (
  difficulty?: 'beginner' | 'intermediate' | 'advanced',
  topic?: string
): Promise<LearningModule[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  let filtered = [...learningModules];
  
  if (difficulty) {
    filtered = filtered.filter(module => module.difficulty === difficulty);
  }
  
  if (topic) {
    filtered = filtered.filter(module => module.topics.includes(topic));
  }
  
  return filtered;
};

export const getTreeCareGuide = async (species: string): Promise<{
  watering: string;
  pruning: string;
  fertilizing: string;
  pestControl: string;
  seasonalCare: Record<string, string>;
} | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const tree = treeSpecies.find(
    t => t.commonName.toLowerCase() === species.toLowerCase() ||
         t.scientificName.toLowerCase() === species.toLowerCase()
  );
  
  return tree ? tree.careGuide : null;
};

export const getTreeFunFacts = async (species: string): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const tree = treeSpecies.find(
    t => t.commonName.toLowerCase() === species.toLowerCase() ||
         t.scientificName.toLowerCase() === species.toLowerCase()
  );
  
  return tree ? tree.funFacts : [];
};