import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users, MapPin, Heart, MessageCircle, Share2, Plus, Image as ImageIcon, Award, Star, Leaf, Bell, GraduationCap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreatePostModal from "@/components/CreatePostModal";
import ChatSection from "@/components/ChatSection";
import UserProfile from "@/components/UserProfile";
import ExpertQASection from "@/components/ExpertQASection";
import { Link } from "react-router-dom";
import { searchPosts, likePost, createPost, fetchPosts } from "@/services/communityService";
import { fetchNotifications, markAsRead, markAllAsRead } from "@/services/notificationService";
import NotificationCenter from "@/components/NotificationCenter";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
}

const Community = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([
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
  ]);

  const { toast } = useToast();

  const [isSearching, setIsSearching] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 5;

  // Fetch notifications
  useEffect(() => {
    const loadNotifications = async () => {
      const notifs = await fetchNotifications();
      setNotifications(notifs);
    };
    loadNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    await markAsRead(id);
    const updatedNotifs = await fetchNotifications();
    setNotifications(updatedNotifs);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
    const updatedNotifs = await fetchNotifications();
    setNotifications(updatedNotifs);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadPosts();
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchPosts(searchQuery);
      setPosts(results);
      if (results.length === 0) {
        toast({
          title: "No Results",
          description: "No posts found matching your search.",
        });
      }
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Failed to search posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleLike = async (postId: string) => {
    try {
      await likePost(postId);
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      }));
      
      // Add post to liked posts
      if (!likedPosts.includes(postId)) {
        setLikedPosts([...likedPosts, postId]);
      }
    } catch (error) {
      toast({
        title: "Like Failed",
        description: "Failed to like the post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const loadPosts = async (page = currentPage) => {
    try {
      const fetchedPosts = await fetchPosts(page, postsPerPage);
      setPosts(fetchedPosts);
      
      // For demo purposes, let's assume we have 20 posts total
      setTotalPages(Math.ceil(20 / postsPerPage));
    } catch (error) {
      toast({
        title: "Failed to Load Posts",
        description: "Could not load community posts. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    loadPosts(page);
  };

  useEffect(() => {
    loadPosts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    // Animate header
    gsap.from(headerRef.current, {
      y: -30,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Animate content
    gsap.from(contentRef.current?.children || [], {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)"
    });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="fixed inset-0 -z-10 bg-gradient-to-br from-forest-light/40 via-white to-forest/30 animate-gradient"
        style={{
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite'
        }}
      />
      
      <div className="container max-w-6xl mx-auto px-4 py-8 relative z-10">
        <div ref={headerRef} className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-forest-dark mb-4">Tree Community</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Share your tree discoveries and connect with fellow nature enthusiasts.
          </p>
          
          {/* Search and Filter */}
          <div className="flex items-center justify-between max-w-xl mx-auto">
            <div className="flex gap-4 flex-1">
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Search posts by description, species, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                disabled={isSearching}
              />
              <Button 
                onClick={handleSearch} 
                variant="outline"
                disabled={isSearching}
              >
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>
            <Button 
              className="bg-forest hover:bg-forest-dark"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative ml-4">
                  <Bell className="h-5 w-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[380px] p-0" align="end">
                <NotificationCenter
                  notifications={notifications}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAllAsRead={handleMarkAllAsRead}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Tabs defaultValue="posts" className="mt-8">
          <TabsList className="mb-8">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="chat">Chat Rooms</TabsTrigger>
            <TabsTrigger value="qa">
              Expert Q&A
              <GraduationCap className="ml-2 h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <div ref={contentRef} className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4 flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={post.user.avatar} alt={post.user.name} />
                    <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{post.user.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {post.location}
                    </div>
                  </div>
                </div>
                
                <div className="aspect-video relative">
                  <img 
                    src={post.image} 
                    alt="Tree" 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <p className="mb-2">{post.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="font-medium text-forest-dark">{post.species}</span>
                    <span>{post.timestamp}</span>
                  </div>

                  <div className="flex items-center gap-6 mt-4 pt-4 border-t">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={likedPosts.includes(post.id) ? "bg-red-100 hover:bg-red-200 text-red-500" : ""}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${likedPosts.includes(post.id) ? "fill-red-500 text-red-500" : ""}`} />
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
              </CardContent>
            </Card>
          ))}
              
              {/* Pagination */}
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage - 1);
                          }} 
                        />
                      </PaginationItem>
                    )}
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show current page, first, last, and pages around current
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink 
                              href="#" 
                              isActive={page === currentPage}
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(page);
                              }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      
                      // Show ellipsis for gaps
                      if (
                        (page === 2 && currentPage > 3) ||
                        (page === totalPages - 1 && currentPage < totalPages - 2)
                      ) {
                        return <PaginationItem key={page}><PaginationEllipsis /></PaginationItem>;
                      }
                      
                      return null;
                    })}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage + 1);
                          }} 
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat">
            <ChatSection />
          </TabsContent>

          <TabsContent value="qa">
            <ExpertQASection />
          </TabsContent>

          <TabsContent value="profile">
            <UserProfile
              user={{
                name: "Sarah Parker",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
                joinDate: "January 2024",
                bio: "Passionate about urban forestry and tree conservation. Always eager to learn and share knowledge about different tree species.",
                expertise: ["Oak Trees", "Urban Forestry", "Tree Care"],
                stats: {
                  treesIdentified: 47,
                  postsCreated: 15,
                  commentsPosted: 89,
                  expertReplies: 23,
                  reputation: 1250,
                  level: 8,
                  nextLevelProgress: 75
                },
                achievements: [
                  {
                    id: "1",
                    title: "Tree Expert",
                    description: "Provided 20+ accurate tree identifications",
                    icon: <Award className="h-4 w-4" />,
                    earnedAt: "2 weeks ago"
                  },
                  {
                    id: "2",
                    title: "Community Guide",
                    description: "Helped 50+ community members with tree care advice",
                    icon: <Users className="h-4 w-4" />,
                    earnedAt: "1 month ago"
                  },
                  {
                    id: "3",
                    title: "Nature's Guardian",
                    description: "Participated in 5 tree planting events",
                    icon: <Leaf className="h-4 w-4" />,
                    earnedAt: "2 months ago"
                  }
                ]
              }}
            />
          </TabsContent>
        </Tabs>

        <CreatePostModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreatePost={async (postData) => {
            try {
              const newPost = await createPost({
                ...postData,
                user: {
                  name: 'Current User',
                  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser'
                }
              });
              setPosts([newPost, ...posts]);
              toast({
                title: "Success",
                description: "Your post has been created!"
              });
            } catch (error) {
              toast({
                title: "Error",
                description: "Failed to create post",
                variant: "destructive"
              });
            }
          }}
        />
      </div>
    </div>
  );
};

export default Community;