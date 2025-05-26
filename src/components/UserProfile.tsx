import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TreePine, Award, Star, Users, MessageSquare, Leaf } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earnedAt: string;
}

interface UserStats {
  treesIdentified: number;
  postsCreated: number;
  commentsPosted: number;
  expertReplies: number;
  reputation: number;
  level: number;
  nextLevelProgress: number;
}

interface UserProfileProps {
  user: {
    name: string;
    avatar: string;
    joinDate: string;
    bio: string;
    expertise: string[];
    stats: UserStats;
    achievements: Achievement[];
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      {/* User Info Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">Member since {user.joinDate}</p>
              
              <p className="mt-2">{user.bio}</p>

              <div className="flex flex-wrap gap-2 mt-3">
                {user.expertise.map((exp, index) => (
                  <Badge key={index} variant="secondary">{exp}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Level Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">Level {user.stats.level}</div>
            <Progress value={user.stats.nextLevelProgress} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              {user.stats.nextLevelProgress}% to Level {user.stats.level + 1}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reputation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-2xl font-bold">{user.stats.reputation}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <TreePine className="h-5 w-5 text-forest" />
              <div>
                <div className="font-medium">{user.stats.treesIdentified}</div>
                <div className="text-sm text-muted-foreground">Trees Identified</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              <div>
                <div className="font-medium">{user.stats.postsCreated}</div>
                <div className="text-sm text-muted-foreground">Posts Created</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <div className="font-medium">{user.stats.commentsPosted}</div>
                <div className="text-sm text-muted-foreground">Comments Posted</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="font-medium">{user.stats.expertReplies}</div>
                <div className="text-sm text-muted-foreground">Expert Replies</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {user.achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    {achievement.icon}
                  </div>
                  <div>
                    <div className="font-medium">{achievement.title}</div>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <div className="text-xs text-muted-foreground mt-1">Earned {achievement.earnedAt}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;