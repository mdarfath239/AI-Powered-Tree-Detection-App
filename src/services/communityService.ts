import { User } from '@/types/user';

export interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  image: string;
  description: string;
  location: string;
  species: string;
  likes: number;
  comments: number;
  timestamp: string;
}

export interface Comment {
  id: string;
  postId: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
}

// Mock data store - would be replaced with actual API calls
let posts: Post[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Parker',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86',
    description: 'Found this magnificent oak tree during my morning walk. The trunk must be over 100 years old!',
    location: 'Central Park, NY',
    species: 'Red Oak',
    likes: 124,
    comments: 18,
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    user: {
      name: 'Mike Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    },
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
    description: 'The fall colors on this maple tree are absolutely stunning!',
    location: 'Boston Commons',
    species: 'Sugar Maple',
    likes: 89,
    comments: 12,
    timestamp: '5 hours ago'
  }
];

let comments: Comment[] = [
  {
    id: '1',
    postId: '1',
    user: {
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    content: 'Amazing find! The bark pattern is characteristic of old growth oak trees.',
    timestamp: '1 hour ago',
    likes: 5
  }
];

export const fetchPosts = async (page: number = 1, limit: number = 10): Promise<Post[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const start = (page - 1) * limit;
  const end = start + limit;
  return posts.slice(start, end);
};

export const fetchPostById = async (postId: string): Promise<Post | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return posts.find(post => post.id === postId) || null;
};

export const createPost = async (post: Omit<Post, 'id' | 'likes' | 'comments' | 'timestamp'>): Promise<Post> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newPost: Post = {
    ...post,
    id: Math.random().toString(36).substr(2, 9),
    likes: 0,
    comments: 0,
    timestamp: 'Just now'
  };
  
  posts = [newPost, ...posts];
  return newPost;
};

export const likePost = async (postId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  posts = posts.map(post => {
    if (post.id === postId) {
      return { ...post, likes: post.likes + 1 };
    }
    return post;
  });
};

export const fetchComments = async (postId: string, page: number = 1, limit: number = 10): Promise<Comment[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const postComments = comments.filter(comment => comment.postId === postId);
  const start = (page - 1) * limit;
  const end = start + limit;
  return postComments.slice(start, end);
};

export const createComment = async (comment: Omit<Comment, 'id' | 'likes' | 'timestamp'>): Promise<Comment> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newComment: Comment = {
    ...comment,
    id: Math.random().toString(36).substr(2, 9),
    likes: 0,
    timestamp: 'Just now'
  };
  
  comments = [newComment, ...comments];
  
  // Update post comment count
  posts = posts.map(post => {
    if (post.id === comment.postId) {
      return { ...post, comments: post.comments + 1 };
    }
    return post;
  });
  
  return newComment;
};

export const searchPosts = async (query: string): Promise<Post[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
  
  return posts.filter(post => {
    const searchableText = [
      post.description.toLowerCase(),
      post.species.toLowerCase(),
      post.location.toLowerCase(),
      post.user.name.toLowerCase()
    ].join(' ');
    
    return searchTerms.every(term => searchableText.includes(term));
  });
};

export const filterPostsBySpecies = async (species: string): Promise<Post[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return posts.filter(post => post.species.toLowerCase() === species.toLowerCase());
};

export const filterPostsByLocation = async (location: string): Promise<Post[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return posts.filter(post => post.location.toLowerCase().includes(location.toLowerCase()));
};