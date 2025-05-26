import { v4 as uuidv4 } from 'uuid';

export interface ExpertSession {
  id: string;
  expert: {
    name: string;
    avatar: string;
    specialization: string[];
    bio: string;
  };
  topic: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  participantCount: number;
  status: 'upcoming' | 'live' | 'completed';
  tags: string[];
}

// Mock data for expert sessions
let expertSessions: ExpertSession[] = [
  {
    id: uuidv4(),
    expert: {
      name: 'Dr. Emily Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      specialization: ['Urban Forestry', 'Tree Pathology', 'Conservation'],
      bio: 'PhD in Forestry with 15 years of experience in urban tree management and disease control.'
    },
    topic: 'Urban Tree Care Essentials',
    description: 'Join us for an in-depth discussion on maintaining healthy trees in urban environments.',
    date: 'March 15, 2024',
    time: '2:00 PM',
    duration: '1 hour',
    participantCount: 45,
    status: 'upcoming',
    tags: ['urban trees', 'tree care', 'maintenance']
  },
  {
    id: uuidv4(),
    expert: {
      name: 'Prof. Michael Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      specialization: ['Tree Species', 'Climate Adaptation', 'Biodiversity'],
      bio: 'Professor of Botany specializing in tree species adaptation to climate change.'
    },
    topic: 'Climate Change & Tree Species',
    description: 'Understanding how different tree species adapt to changing climate conditions.',
    date: 'March 20, 2024',
    time: '3:00 PM',
    duration: '1.5 hours',
    participantCount: 32,
    status: 'upcoming',
    tags: ['climate change', 'adaptation', 'species']
  }
];

// Fetch all expert sessions
export const fetchExpertSessions = async (): Promise<ExpertSession[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(expertSessions);
    }, 500);
  });
};

// Fetch a specific session by ID
export const fetchSessionById = async (id: string): Promise<ExpertSession | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const session = expertSessions.find(s => s.id === id);
      resolve(session || null);
    }, 300);
  });
};

// Create a new expert session
export const createExpertSession = async (sessionData: Omit<ExpertSession, 'id'>): Promise<ExpertSession> => {
  return new Promise((resolve) => {
    const newSession: ExpertSession = {
      id: uuidv4(),
      ...sessionData
    };

    setTimeout(() => {
      expertSessions = [newSession, ...expertSessions];
      resolve(newSession);
    }, 300);
  });
};

// Update session status
export const updateSessionStatus = async (id: string, status: ExpertSession['status']): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      expertSessions = expertSessions.map(session =>
        session.id === id ? { ...session, status } : session
      );
      resolve();
    }, 300);
  });
};

// Update participant count
export const updateParticipantCount = async (id: string, count: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      expertSessions = expertSessions.map(session =>
        session.id === id ? { ...session, participantCount: count } : session
      );
      resolve();
    }, 300);
  });
};

// Archive a completed session
export const archiveSession = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      expertSessions = expertSessions.filter(session => session.id !== id);
      resolve();
    }, 300);
  });
};

// Search sessions by topic or tags
export const searchSessions = async (query: string): Promise<ExpertSession[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowercaseQuery = query.toLowerCase();
      const results = expertSessions.filter(session =>
        session.topic.toLowerCase().includes(lowercaseQuery) ||
        session.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
        session.expert.specialization.some(spec => spec.toLowerCase().includes(lowercaseQuery))
      );
      resolve(results);
    }, 300);
  });
};

// Get upcoming sessions
export const getUpcomingSessions = async (): Promise<ExpertSession[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const upcoming = expertSessions.filter(session => session.status === 'upcoming');
      resolve(upcoming);
    }, 300);
  });
};

// Get live sessions
export const getLiveSessions = async (): Promise<ExpertSession[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const live = expertSessions.filter(session => session.status === 'live');
      resolve(live);
    }, 300);
  });
};