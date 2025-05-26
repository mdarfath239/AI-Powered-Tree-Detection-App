import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, TreePine, MapPin, Crown } from "lucide-react";

interface ChatRoomInfo {
  id: string;
  title: string;
  type: 'species' | 'regional';
  description: string;
  onlineCount: number;
  expertMode?: boolean;
  nextExpertSession?: string;
}

interface ChatRoomListProps {
  rooms: ChatRoomInfo[];
  onRoomSelect: (room: ChatRoomInfo) => void;
  selectedRoomId?: string;
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({
  rooms,
  onRoomSelect,
  selectedRoomId
}) => {
  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Chat Rooms
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full">
          <div className="space-y-2 p-4">
            {rooms.map((room) => (
              <Button
                key={room.id}
                variant={selectedRoomId === room.id ? "default" : "ghost"}
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => onRoomSelect(room)}
              >
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center gap-2">
                    {room.type === 'species' ? (
                      <TreePine className="h-4 w-4" />
                    ) : (
                      <MapPin className="h-4 w-4" />
                    )}
                    <span className="font-medium flex-1">{room.title}</span>
                    <Badge variant="outline" className="ml-auto">
                      {room.onlineCount} online
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {room.description}
                  </p>

                  {room.expertMode && (
                    <div className="flex items-center gap-2 mt-1">
                      <Crown className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-muted-foreground">
                        Next Expert Session: {room.nextExpertSession}
                      </span>
                    </div>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ChatRoomList;