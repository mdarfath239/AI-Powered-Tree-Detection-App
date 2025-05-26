import { TreeAnalysisResult } from '@/types/tree';
import { toast } from '@/components/ui/use-toast';

interface OfflineData {
  treeAnalyses: TreeAnalysisResult[];
  pendingUploads: {
    images: Array<{
      id: string;
      data: string;
      timestamp: number;
    }>;
    analyses: Array<{
      id: string;
      data: TreeAnalysisResult;
      timestamp: number;
    }>;
  };
  lastSyncTimestamp: number;
}

const STORAGE_KEY = 'tree_detection_offline_data';

const getInitialOfflineData = (): OfflineData => ({
  treeAnalyses: [],
  pendingUploads: {
    images: [],
    analyses: [],
  },
  lastSyncTimestamp: Date.now(),
});

export const initializeOfflineStorage = async (): Promise<void> => {
  try {
    const existingData = localStorage.getItem(STORAGE_KEY);
    if (!existingData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(getInitialOfflineData()));
    }
  } catch (error) {
    console.error('Error initializing offline storage:', error);
    toast({
      title: 'Error',
      description: 'Failed to initialize offline storage',
      variant: 'destructive',
    });
  }
};

export const saveTreeAnalysis = async (analysis: TreeAnalysisResult): Promise<void> => {
  try {
    const offlineData = await getOfflineData();
    offlineData.treeAnalyses.push(analysis);
    offlineData.pendingUploads.analyses.push({
      id: Math.random().toString(36).substr(2, 9),
      data: analysis,
      timestamp: Date.now(),
    });
    await saveOfflineData(offlineData);

    toast({
      title: 'Success',
      description: 'Analysis saved for offline access',
    });
  } catch (error) {
    console.error('Error saving tree analysis:', error);
    toast({
      title: 'Error',
      description: 'Failed to save analysis offline',
      variant: 'destructive',
    });
    throw error;
  }
};

export const saveImageForUpload = async (imageData: string): Promise<void> => {
  try {
    const offlineData = await getOfflineData();
    offlineData.pendingUploads.images.push({
      id: Math.random().toString(36).substr(2, 9),
      data: imageData,
      timestamp: Date.now(),
    });
    await saveOfflineData(offlineData);
  } catch (error) {
    console.error('Error saving image for upload:', error);
    toast({
      title: 'Error',
      description: 'Failed to save image offline',
      variant: 'destructive',
    });
    throw error;
  }
};

export const getOfflineAnalyses = async (): Promise<TreeAnalysisResult[]> => {
  try {
    const offlineData = await getOfflineData();
    return offlineData.treeAnalyses;
  } catch (error) {
    console.error('Error getting offline analyses:', error);
    toast({
      title: 'Error',
      description: 'Failed to retrieve offline analyses',
      variant: 'destructive',
    });
    throw error;
  }
};

export const getPendingUploads = async () => {
  try {
    const offlineData = await getOfflineData();
    return offlineData.pendingUploads;
  } catch (error) {
    console.error('Error getting pending uploads:', error);
    toast({
      title: 'Error',
      description: 'Failed to retrieve pending uploads',
      variant: 'destructive',
    });
    throw error;
  }
};

export const syncOfflineData = async (): Promise<void> => {
  try {
    const offlineData = await getOfflineData();
    const { images, analyses } = offlineData.pendingUploads;

    // Simulate API calls for syncing data
    await Promise.all([
      mockSyncImages(images),
      mockSyncAnalyses(analyses),
    ]);

    // Clear pending uploads after successful sync
    offlineData.pendingUploads = {
      images: [],
      analyses: [],
    };
    offlineData.lastSyncTimestamp = Date.now();
    await saveOfflineData(offlineData);

    toast({
      title: 'Success',
      description: 'Data synchronized successfully',
    });
  } catch (error) {
    console.error('Error syncing offline data:', error);
    toast({
      title: 'Error',
      description: 'Failed to synchronize data',
      variant: 'destructive',
    });
    throw error;
  }
};

const mockSyncImages = async (images: OfflineData['pendingUploads']['images']) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  console.log('Synced images:', images.length);
};

const mockSyncAnalyses = async (analyses: OfflineData['pendingUploads']['analyses']) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Synced analyses:', analyses.length);
};

export const clearOfflineData = async (): Promise<void> => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getInitialOfflineData()));
    toast({
      title: 'Success',
      description: 'Offline data cleared successfully',
    });
  } catch (error) {
    console.error('Error clearing offline data:', error);
    toast({
      title: 'Error',
      description: 'Failed to clear offline data',
      variant: 'destructive',
    });
    throw error;
  }
};

const getOfflineData = async (): Promise<OfflineData> => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    const initialData = getInitialOfflineData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(data);
};

const saveOfflineData = async (data: OfflineData): Promise<void> => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getLastSyncTimestamp = async (): Promise<number> => {
  try {
    const offlineData = await getOfflineData();
    return offlineData.lastSyncTimestamp;
  } catch (error) {
    console.error('Error getting last sync timestamp:', error);
    throw error;
  }
};

export const checkStorageQuota = async (): Promise<{
  used: number;
  available: number;
}> => {
  try {
    // @ts-ignore: Storage Manager API
    if (navigator.storage && navigator.storage.estimate) {
      // @ts-ignore: Storage Manager API
      const estimate = await navigator.storage.estimate();
      return {
        used: estimate.usage || 0,
        available: estimate.quota || 0,
      };
    }
    return {
      used: 0,
      available: 0,
    };
  } catch (error) {
    console.error('Error checking storage quota:', error);
    throw error;
  }
};