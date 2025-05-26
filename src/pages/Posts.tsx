import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import PostForm from '@/components/PostForm';

interface Post {
  id: string;
  title: string;
  description: string;
  location?: string;
  image?: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  createdAt: string;
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: 'Beautiful Oak Tree',
      description: 'Found this amazing oak tree during my morning walk. The trunk must be over 100 years old!',
      location: 'Central Park',
      image: '/placeholder.svg', // Using local placeholder image
      author: {
        name: 'John Doe',
        avatar: '/placeholder.svg', // Using local placeholder image
      },
      likes: 24,
      comments: 5,
      createdAt: '2024-01-20T10:00:00Z',
    },
  ]);

  const handleCreatePost = async (values: any) => {
    const newPost: Post = {
      id: Date.now().toString(),
      title: values.title,
      description: values.description,
      location: values.location,
      image: values.image,
      author: {
        name: 'Current User',
        avatar: '/placeholder.svg', // Using local placeholder image
      },
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    };

    setPosts([newPost, ...posts]);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        {/* Post Form Section */}
        <div className="md:sticky md:top-8 h-fit">
          <PostForm onSubmit={handleCreatePost} />
        </div>

        {/* Posts Feed Section */}
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{post.author.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{post.location}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">{post.description}</p>
                  {post.image && (
                    <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-6">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Heart className="h-4 w-4" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}