import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Image as ImageIcon, Video, Mic } from "lucide-react";

interface Message {
  id: string;
  user: {
    name: string;
    avatar: string;
    isExpert?: boolean;
  };
  content: string;
  timestamp: string;
  attachments?: {
    type: 'image' | 'video' | 'audio';
    url: string;
  }[];
}

interface ChatRoomProps {
  title: string;
  type: 'species' | 'regional';
  description: string;
  onlineCount?: number;
  expertMode?: boolean;
}

const ChatRoom: React.FC<ChatRoomProps> = ({
  title,
  type,
  description,
  onlineCount = 0,
  expertMode = false,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: {
        name: 'Tree Expert',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Expert',
        isExpert: true,
      },
      content: 'Welcome to the chat room! Feel free to ask questions about tree care and identification.',
      timestamp: 'Just now',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      user: {
        name: 'Current User',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
      },
      content: newMessage,
      timestamp: 'Just now',
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (type: 'image' | 'video' | 'audio') => {
    // Implement file upload logic here
    setIsUploading(true);
    setTimeout(() => setIsUploading(false), 1500); // Simulate upload
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {title}
              <Badge variant={type === 'species' ? 'default' : 'secondary'}>
                {type === 'species' ? 'Species' : 'Regional'}
              </Badge>
              {expertMode && (
                <Badge variant="destructive">Expert Q&A</Badge>
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <Badge variant="outline" className="ml-auto">
            {onlineCount} online
          </Badge>
        </div>
      </CardHeader>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-3">
              <Avatar>
                <AvatarImage src={message.user.avatar} />
                <AvatarFallback>{message.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{message.user.name}</span>
                  {message.user.isExpert && (
                    <Badge variant="destructive" className="text-xs">Expert</Badge>
                  )}
                  <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                </div>
                <p className="mt-1">{message.content}</p>
                {message.attachments && (
                  <div className="mt-2 flex gap-2">
                    {message.attachments.map((attachment, index) => (
                      <div key={index} className="relative rounded-lg overflow-hidden">
                        {attachment.type === 'image' && (
                          <img src={attachment.url} alt="" className="w-40 h-40 object-cover" />
                        )}
                        {attachment.type === 'video' && (
                          <video src={attachment.url} className="w-40 h-40 object-cover" controls />
                        )}
                        {attachment.type === 'audio' && (
                          <audio src={attachment.url} controls className="w-full" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <CardContent className="border-t p-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleFileUpload('image')}
            disabled={isUploading}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleFileUpload('video')}
            disabled={isUploading}
          >
            <Video className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleFileUpload('audio')}
            disabled={isUploading}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isUploading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isUploading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatRoom;