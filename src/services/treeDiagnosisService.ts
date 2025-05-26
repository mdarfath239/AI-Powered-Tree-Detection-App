import { toast } from '@/components/ui/use-toast';

interface HealthIssue {
  type: 'disease' | 'pest';
  name: string;
  confidence: number;
  description: string;
  symptoms: string[];
  severity: 'low' | 'moderate' | 'severe';
}

interface Treatment {
  type: 'organic' | 'chemical' | 'cultural';
  name: string;
  description: string;
  applicationMethod: string;
  frequency: string;
  precautions: string[];
  effectiveness: number;
}

interface DiagnosisResult {
  issues: HealthIssue[];
  treatments: Treatment[];
  preventiveMeasures: string[];
  recommendedActions: string[];
  followUpInDays: number;
}

export const analyzeTreeHealth = async (imageData: string): Promise<DiagnosisResult> => {
  try {
    // This would be replaced with actual AI model API call
    const diagnosis = await mockAnalyzeImage(imageData);
    return diagnosis;
  } catch (error) {
    console.error('Error analyzing tree health:', error);
    toast({
      title: 'Error',
      description: 'Failed to analyze tree health',
      variant: 'destructive',
    });
    throw error;
  }
};

const mockAnalyzeImage = async (imageData: string): Promise<DiagnosisResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  return {
    issues: [
      {
        type: 'disease',
        name: 'Leaf Spot',
        confidence: 0.85,
        description: 'Fungal infection causing dark spots on leaves',
        symptoms: [
          'Dark brown spots on leaves',
          'Yellowing around spots',
          'Premature leaf drop'
        ],
        severity: 'moderate'
      },
      {
        type: 'pest',
        name: 'Spider Mites',
        confidence: 0.72,
        description: 'Tiny arachnids that feed on plant cells',
        symptoms: [
          'Stippled or yellowed leaves',
          'Fine webbing on leaves',
          'Leaf drop'
        ],
        severity: 'low'
      }
    ],
    treatments: [
      {
        type: 'organic',
        name: 'Neem Oil Solution',
        description: 'Natural fungicide and insecticide',
        applicationMethod: 'Spray on affected leaves, ensuring complete coverage',
        frequency: 'Every 7-14 days until symptoms improve',
        precautions: [
          'Apply in early morning or evening',
          'Avoid spraying in direct sunlight',
          'Test on small area first'
        ],
        effectiveness: 0.75
      },
      {
        type: 'cultural',
        name: 'Improved Air Circulation',
        description: 'Prune to improve airflow and reduce humidity',
        applicationMethod: 'Remove overcrowded branches and nearby vegetation',
        frequency: 'As needed, typically once per season',
        precautions: [
          'Use clean, sharp tools',
          'Avoid over-pruning',
          'Dispose of infected material properly'
        ],
        effectiveness: 0.85
      }
    ],
    preventiveMeasures: [
      'Maintain proper spacing between plants',
      'Water at base of plant to keep leaves dry',
      'Remove fallen leaves and debris regularly',
      'Monitor regularly for early signs of problems'
    ],
    recommendedActions: [
      'Apply neem oil treatment within 2 days',
      'Prune affected areas within 1 week',
      'Adjust watering schedule to morning only',
      'Schedule follow-up inspection in 2 weeks'
    ],
    followUpInDays: 14
  };
};

export const getTreatmentDetails = async (treatmentId: string): Promise<Treatment> => {
  try {
    // This would be replaced with actual API call
    const treatment = await mockGetTreatment(treatmentId);
    return treatment;
  } catch (error) {
    console.error('Error fetching treatment details:', error);
    toast({
      title: 'Error',
      description: 'Failed to fetch treatment details',
      variant: 'destructive',
    });
    throw error;
  }
};

const mockGetTreatment = async (treatmentId: string): Promise<Treatment> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    type: 'organic',
    name: 'Neem Oil Solution',
    description: 'Natural fungicide and insecticide derived from neem tree seeds',
    applicationMethod: 'Mix 2-3 tsp neem oil with 1 gallon water and spray thoroughly',
    frequency: 'Apply every 7-14 days until symptoms improve',
    precautions: [
      'Apply in early morning or evening',
      'Avoid spraying in direct sunlight',
      'Test on small area first',
      'Keep away from beneficial insects'
    ],
    effectiveness: 0.75
  };
};

export const updateDiagnosisHistory = async (
  treeId: string,
  diagnosis: DiagnosisResult
): Promise<void> => {
  try {
    // This would be replaced with actual API call
    await new Promise(resolve => setTimeout(resolve, 600));

    toast({
      title: 'Success',
      description: 'Diagnosis history updated successfully',
    });
  } catch (error) {
    console.error('Error updating diagnosis history:', error);
    toast({
      title: 'Error',
      description: 'Failed to update diagnosis history',
      variant: 'destructive',
    });
    throw error;
  }
};

export const getHistoricalDiagnoses = async (treeId: string): Promise<DiagnosisResult[]> => {
  try {
    // This would be replaced with actual API call
    const history = await mockGetHistory(treeId);
    return history;
  } catch (error) {
    console.error('Error fetching diagnosis history:', error);
    toast({
      title: 'Error',
      description: 'Failed to fetch diagnosis history',
      variant: 'destructive',
    });
    throw error;
  }
};

const mockGetHistory = async (treeId: string): Promise<DiagnosisResult[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return [
    // Mock historical diagnosis data
    {
      issues: [
        {
          type: 'disease',
          name: 'Powdery Mildew',
          confidence: 0.9,
          description: 'White powdery coating on leaves',
          symptoms: ['White powder on leaves', 'Leaf distortion'],
          severity: 'moderate'
        }
      ],
      treatments: [
        {
          type: 'organic',
          name: 'Sulfur Spray',
          description: 'Organic fungicide',
          applicationMethod: 'Spray on affected areas',
          frequency: 'Weekly',
          precautions: ['Avoid applying in hot weather'],
          effectiveness: 0.8
        }
      ],
      preventiveMeasures: ['Improve air circulation', 'Avoid overhead watering'],
      recommendedActions: ['Apply sulfur spray', 'Prune affected areas'],
      followUpInDays: 7
    }
  ];
};