import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ChatRoom from './ChatRoom';
import ChatRoomList from './ChatRoomList';

interface ChatRoomInfo {
  id: string;
  title: string;
  type: 'species' | 'regional';
  description: string;
  onlineCount: number;
  expertMode?: boolean;
  nextExpertSession?: string;
}

const MOCK_ROOMS: ChatRoomInfo[] = [
  {
    id: '1',
    title: 'Oak Trees Enthusiasts',
    type: 'species',
    description: 'Discuss all things related to oak trees, from identification to care tips.',
    onlineCount: 24,
    expertMode: true,
    nextExpertSession: 'Today at 3 PM'
  },
  {
    id: '2',
    title: 'Maple Tree Care',
    type: 'species',
    description: 'Share experiences and get advice about maple tree varieties and maintenance.',
    onlineCount: 15
  },
  {
    id: '3',
    title: 'New York Tree Community',
    type: 'regional',
    description: 'Local discussion group for tree enthusiasts in the New York area.',
    onlineCount: 42
  },
  {
    id: '4',
    title: 'Boston Tree Network',
    type: 'regional',
    description: 'Connect with fellow tree lovers in Boston and surrounding areas.',
    onlineCount: 31,
    expertMode: true,
    nextExpertSession: 'Tomorrow at 2 PM'
  }
];

const ChatSection = () => {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoomInfo | null>(null);
  const [activeTab, setActiveTab] = useState('species');

  const filteredRooms = MOCK_ROOMS.filter(room => room.type === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Tabs defaultValue="species" className="w-[400px]" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="species">Species Rooms</TabsTrigger>
            <TabsTrigger value="regional">Regional Rooms</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Room
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <ChatRoomList
          rooms={filteredRooms}
          onRoomSelect={setSelectedRoom}
          selectedRoomId={selectedRoom?.id}
        />

        {selectedRoom ? (
          <ChatRoom
            title={selectedRoom.title}
            type={selectedRoom.type}
            description={selectedRoom.description}
            onlineCount={selectedRoom.onlineCount}
            expertMode={selectedRoom.expertMode}
          />
        ) : (
          <div className="h-[600px] flex items-center justify-center text-muted-foreground">
            Select a chat room to start discussing
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSection;