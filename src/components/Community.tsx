import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Heart, MessageCircle, Share2, Search, Plus } from "lucide-react";
import CreatePostModal from "./CreatePostModal";

interface Post {
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
  isLiked?: boolean;
}

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { toast } = useToast();

  // Mock initial posts
  useEffect(() => {
    setPosts([
      {
        id: '1',
        user: {
          name: 'John Doe',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        },
        image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d',
        description: 'Found this beautiful oak tree during my morning walk!',
        location: 'Central Park',
        species: 'Oak Tree',
        likes: 42,
        comments: 5,
        timestamp: '2 hours ago',
        isLiked: false,
      },
      // Add more mock posts as needed
    ]);
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      // Reset to show all posts if search is empty
      setPosts(posts);
      return;
    }

    const filteredPosts = posts.filter(post =>
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setPosts(filteredPosts);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newIsLiked = !post.isLiked;
        return {
          ...post,
          likes: newIsLiked ? post.likes + 1 : post.likes - 1,
          isLiked: newIsLiked,
        };
      }
      return post;
    }));
  };

  const handleCreatePost = async (newPost: Omit<Post, 'id' | 'likes' | 'comments' | 'timestamp' | 'isLiked'>) => {
    try {
      // In a real app, this would be an API call
      const post: Post = {
        ...newPost,
        id: Date.now().toString(),
        likes: 0,
        comments: 0,
        timestamp: 'Just now',
        isLiked: false,
      };

      setPosts([post, ...posts]);
      toast({
        title: "Success",
        description: "Your post has been created!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-4 mb-8">
        <Input
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      <div className="grid gap-8">
        {posts.map(post => (
          <div key={post.id} className="bg-card rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 flex items-center gap-4">
              <img
                src={post.user.avatar}
                alt={post.user.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{post.user.name}</h3>
                <p className="text-sm text-muted-foreground">{post.timestamp}</p>
              </div>
            </div>

            <img
              src={post.image}
              alt={post.description}
              className="w-full aspect-video object-cover"
            />

            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">{post.species}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{post.location}</span>
              </div>

              <p className="mb-4">{post.description}</p>

              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={post.isLiked ? 'text-red-500' : ''}
                  onClick={() => handleLike(post.id)}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  {post.likes}
                </Button>

                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {post.comments}
                </Button>

                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreatePost={handleCreatePost}
      />
    </div>
  );
};

export default Community;