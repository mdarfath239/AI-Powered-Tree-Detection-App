import { TreeCareSchedule } from '@/types/tree';
import { toast } from '@/components/ui/use-toast';

interface CareTask {
  id: string;
  type: 'watering' | 'pruning' | 'fertilizing' | 'inspection' | 'treatment';
  description: string;
  dueDate: string;
  completed: boolean;
  notes?: string;
}

interface CareReminder {
  taskId: string;
  type: 'upcoming' | 'overdue' | 'completed';
  message: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

interface CarePlan {
  treeId: string;
  species: string;
  location: string;
  tasks: CareTask[];
  seasonalCare: Record<string, string[]>;
  lastAssessment?: string;
  nextAssessment?: string;
  customNotes?: string;
}

export const generateCarePlan = async (treeId: string, species: string, location: string): Promise<CarePlan> => {
  try {
    // This would be replaced with actual API call to get species-specific care requirements
    const carePlan = await mockGenerateCarePlan(treeId, species, location);
    return carePlan;
  } catch (error) {
    console.error('Error generating care plan:', error);
    toast({
      title: 'Error',
      description: 'Failed to generate care plan',
      variant: 'destructive',
    });
    throw error;
  }
};

const mockGenerateCarePlan = async (
  treeId: string,
  species: string,
  location: string
): Promise<CarePlan> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const currentDate = new Date();
  const nextMonth = new Date(currentDate.setMonth(currentDate.getMonth() + 1));

  return {
    treeId,
    species,
    location,
    tasks: [
      {
        id: '1',
        type: 'watering',
        description: 'Deep water the tree, ensuring water reaches the root zone',
        dueDate: nextMonth.toISOString(),
        completed: false,
      },
      {
        id: '2',
        type: 'inspection',
        description: 'Check for signs of pest infestation or disease',
        dueDate: nextMonth.toISOString(),
        completed: false,
      },
    ],
    seasonalCare: {
      spring: [
        'Apply balanced fertilizer',
        'Monitor for new growth',
        'Check soil moisture levels'
      ],
      summer: [
        'Increase watering frequency during dry periods',
        'Monitor for heat stress',
        'Apply mulch to retain moisture'
      ],
      fall: [
        'Reduce watering frequency',
        'Remove dead or damaged branches',
        'Prepare for winter protection'
      ],
      winter: [
        'Protect from frost damage',
        'Minimal watering',
        'Monitor for snow/ice damage'
      ]
    },
    lastAssessment: new Date().toISOString(),
    nextAssessment: nextMonth.toISOString(),
  };
};

export const updateTaskStatus = async (taskId: string, completed: boolean): Promise<void> => {
  try {
    // This would be replaced with actual API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast({
      title: 'Success',
      description: `Task ${completed ? 'completed' : 'uncompleted'}`,
    });
  } catch (error) {
    console.error('Error updating task status:', error);
    toast({
      title: 'Error',
      description: 'Failed to update task status',
      variant: 'destructive',
    });
    throw error;
  }
};

export const getUpcomingReminders = async (treeId: string): Promise<CareReminder[]> => {
  try {
    // This would be replaced with actual API call
    const reminders = await mockGetReminders(treeId);
    return reminders;
  } catch (error) {
    console.error('Error fetching reminders:', error);
    toast({
      title: 'Error',
      description: 'Failed to fetch reminders',
      variant: 'destructive',
    });
    throw error;
  }
};

const mockGetReminders = async (treeId: string): Promise<CareReminder[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return [
    {
      taskId: '1',
      type: 'upcoming',
      message: 'Water your tree in 3 days',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'high'
    },
    {
      taskId: '2',
      type: 'upcoming',
      message: 'Inspect for pests next week',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'medium'
    }
  ];
};

export const addCustomTask = async (treeId: string, task: Omit<CareTask, 'id'>): Promise<CareTask> => {
  try {
    // This would be replaced with actual API call
    const newTask: CareTask = {
      ...task,
      id: Math.random().toString(36).substr(2, 9)
    };

    await new Promise(resolve => setTimeout(resolve, 500));

    toast({
      title: 'Success',
      description: 'New task added successfully',
    });

    return newTask;
  } catch (error) {
    console.error('Error adding custom task:', error);
    toast({
      title: 'Error',
      description: 'Failed to add custom task',
      variant: 'destructive',
    });
    throw error;
  }
};

export const updateCarePlan = async (treeId: string, updates: Partial<CarePlan>): Promise<void> => {
  try {
    // This would be replaced with actual API call
    await new Promise(resolve => setTimeout(resolve, 700));

    toast({
      title: 'Success',
      description: 'Care plan updated successfully',
    });
  } catch (error) {
    console.error('Error updating care plan:', error);
    toast({
      title: 'Error',
      description: 'Failed to update care plan',
      variant: 'destructive',
    });
    throw error;
  }
};