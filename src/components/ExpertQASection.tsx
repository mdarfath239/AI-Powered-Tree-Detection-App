import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, ArrowRight } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExpertQAModal from './ExpertQAModal';
import { ExpertSession, fetchExpertSessions, getUpcomingSessions, getLiveSessions } from '@/services/expertQAService';

const ExpertQASection = () => {
  const [sessions, setSessions] = useState<ExpertSession[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<ExpertSession[]>([]);
  const [liveSessions, setLiveSessions] = useState<ExpertSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ExpertSession | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    const [all, upcoming, live] = await Promise.all([
      fetchExpertSessions(),
      getUpcomingSessions(),
      getLiveSessions()
    ]);

    setSessions(all);
    setUpcomingSessions(upcoming);
    setLiveSessions(live);
  };

  const handleJoinSession = (session: ExpertSession) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const SessionCard = ({ session }: { session: ExpertSession }) => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={session.expert.avatar} />
            <AvatarFallback>{session.expert.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{session.topic}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  with {session.expert.name}
                </p>
              </div>
              <Badge
                variant={session.status === 'live' ? 'destructive' : 'secondary'}
                className="capitalize"
              >
                {session.status}
              </Badge>
            </div>

            <p className="text-sm mb-3">{session.description}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              {session.expert.specialization.map((spec, index) => (
                <Badge key={index} variant="outline">{spec}</Badge>
              ))}
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {session.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {session.time}
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {session.participantCount} joined
              </div>
            </div>

            <Button
              className="mt-4"
              variant={session.status === 'live' ? 'destructive' : 'default'}
              onClick={() => handleJoinSession(session)}
            >
              {session.status === 'live' ? 'Join Now' : 'Set Reminder'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Expert Q&A Sessions</h2>
          <p className="text-muted-foreground">
            Join live discussions with tree experts and learn from their experience
          </p>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming
            {upcomingSessions.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {upcomingSessions.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="live">
            Live Now
            {liveSessions.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {liveSessions.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="all">All Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          <ScrollArea className="h-[600px] pr-4">
            {upcomingSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="live" className="mt-6">
          <ScrollArea className="h-[600px] pr-4">
            {liveSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
            {liveSessions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No live sessions at the moment
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          <ScrollArea className="h-[600px] pr-4">
            {sessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {selectedSession && (
        <ExpertQAModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          session={selectedSession}
        />
      )}
    </div>
  );
};

export default ExpertQASection;