export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'expert' | 'admin';
  joinDate: string;
  preferences: UserPreferences;
  expertise?: ExpertProfile;
  contributions: UserContributions;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    communityUpdates: boolean;
    treeAlerts: boolean;
  };
  privacy: {
    showLocation: boolean;
    showProfile: boolean;
    showContributions: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  language: string;
}

export interface ExpertProfile {
  specialization: string[];
  credentials: string[];
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verificationDate?: string;
  biography: string;
  publications?: string[];
  experience: number; // years
}

export interface UserContributions {
  treesIdentified: number;
  postsCreated: number;
  commentsPosted: number;
  expertAnswers?: number;
  verifiedSpecies?: number;
  badges: UserBadge[];
  reputation: number;
}

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'identification' | 'contribution' | 'expertise' | 'community';
  dateEarned: string;
  level?: 'bronze' | 'silver' | 'gold';
}

export interface UserActivity {
  id: string;
  userId: string;
  type: 'identification' | 'post' | 'comment' | 'expert_answer' | 'verification';
  timestamp: string;
  details: {
    targetId: string; // ID of the related content (tree, post, etc.)
    targetType: string;
    action: string;
    metadata?: Record<string, any>;
  };
}

export interface UserNotification {
  id: string;
  userId: string;
  type: 'alert' | 'update' | 'achievement' | 'mention' | 'response';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export interface UserSettings {
  id: string;
  userId: string;
  notifications: {
    email: {
      daily: boolean;
      weekly: boolean;
      mentions: boolean;
      responses: boolean;
    };
    push: {
      treeAlerts: boolean;
      communityActivity: boolean;
      expertRequests: boolean;
    };
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    locationSharing: boolean;
    activityVisibility: 'public' | 'private' | 'friends';
  };
  display: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    timezone: string;
    dateFormat: string;
  };
  accessibility: {
    highContrast: boolean;
    fontSize: 'small' | 'medium' | 'large';
    reduceMotion: boolean;
  };
}

export interface ExpertVerification {
  id: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  submissionDate: string;
  reviewDate?: string;
  reviewerId?: string;
  credentials: {
    education: string[];
    certifications: string[];
    experience: string[];
    documents: string[]; // URLs to uploaded verification documents
  };
  specializations: string[];
  notes?: string;
  verificationHistory: {
    date: string;
    status: string;
    note?: string;
  }[];
}