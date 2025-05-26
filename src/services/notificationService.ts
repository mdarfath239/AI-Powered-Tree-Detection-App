import { v4 as uuidv4 } from 'uuid';

export interface Notification {
  id: string;
  type: 'growth' | 'event' | 'community' | 'achievement';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// Mock notifications data
let notifications: Notification[] = [
  {
    id: uuidv4(),
    type: 'growth',
    title: 'Oak Tree Growth Milestone',
    message: 'Your monitored Oak tree has reached a significant growth stage!',
    timestamp: '2 hours ago',
    read: false,
    actionUrl: '/trees/oak-123'
  },
  {
    id: uuidv4(),
    type: 'event',
    title: 'Upcoming Tree Planting Event',
    message: 'Join us this weekend for a community tree planting event in Central Park.',
    timestamp: '1 day ago',
    read: false,
    actionUrl: '/events/planting-456'
  },
  {
    id: uuidv4(),
    type: 'community',
    title: 'Expert Q&A Session',
    message: 'Live Q&A with botanist Dr. Smith starting in 1 hour!',
    timestamp: '3 days ago',
    read: true,
    actionUrl: '/chat/qa-789'
  },
  {
    id: uuidv4(),
    type: 'achievement',
    title: 'New Badge Earned',
    message: 'Congratulations! You\'ve earned the "Tree Guardian" badge.',
    timestamp: '1 week ago',
    read: true
  }
];

// Simulate fetching notifications
export const fetchNotifications = async (): Promise<Notification[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(notifications);
    }, 500);
  });
};

// Mark a single notification as read
export const markAsRead = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      notifications = notifications.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      );
      resolve();
    }, 300);
  });
};

// Mark all notifications as read
export const markAllAsRead = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      notifications = notifications.map(notification => ({
        ...notification,
        read: true
      }));
      resolve();
    }, 300);
  });
};

// Add a new notification
export const addNotification = async (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): Promise<Notification> => {
  return new Promise((resolve) => {
    const newNotification: Notification = {
      id: uuidv4(),
      ...notification,
      timestamp: 'Just now',
      read: false
    };

    setTimeout(() => {
      notifications = [newNotification, ...notifications];
      resolve(newNotification);
    }, 300);
  });
};

// Delete a notification
export const deleteNotification = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      notifications = notifications.filter(notification => notification.id !== id);
      resolve();
    }, 300);
  });
};

// Get unread notification count
export const getUnreadCount = async (): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const count = notifications.filter(notification => !notification.read).length;
      resolve(count);
    }, 200);
  });
};