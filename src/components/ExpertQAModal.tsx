import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Send } from 'lucide-react';

interface Message {
  id: string;
  user: {
    name: string;
    avatar: string;
    isExpert?: boolean;
  };
  content: string;
  timestamp: string;
}

interface ExpertQAModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: {
    expert: {
      name: string;
      avatar: string;
      specialization: string[];
      bio: string;
    };
    topic: string;
    date: string;
    time: string;
    duration: string;
    participantCount: number;
  };
}

const ExpertQAModal: React.FC<ExpertQAModalProps> = ({
  isOpen,
  onClose,
  session
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: {
        name: session.expert.name,
        avatar: session.expert.avatar,
        isExpert: true
      },
      content: 'Welcome everyone! I\'m excited to discuss tree care and answer your questions today.',
      timestamp: '2:00 PM'
    },
    {
      id: '2',
      user: {
        name: 'Alice Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice'
      },
      content: 'What\'s the best time of year to prune oak trees?',
      timestamp: '2:02 PM'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      user: {
        name: 'Current User',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser'
      },
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Expert Q&A Session</DialogTitle>
          <DialogDescription>
            <div className="flex items-start gap-4 mt-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={session.expert.avatar} />
                <AvatarFallback>{session.expert.name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{session.expert.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{session.expert.bio}</p>
                
                <div className="flex flex-wrap gap-2">
                  {session.expert.specialization.map((spec, index) => (
                    <Badge key={index} variant="secondary">{spec}</Badge>
                  ))}
                </div>

                <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {session.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {session.time} ({session.duration})
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {session.participantCount} participants
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        {/* Chat Area */}
        <ScrollArea className="flex-1 mt-6 pr-4">
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
                      <Badge variant="secondary" className="text-xs">Expert</Badge>
                    )}
                    <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                  </div>
                  <p className="mt-1">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="mt-4 flex gap-2">
          <Input
            placeholder="Type your question..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExpertQAModal;