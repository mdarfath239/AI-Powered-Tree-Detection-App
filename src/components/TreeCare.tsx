import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Leaf, AlertTriangle, CheckCircle } from "lucide-react";
import { format } from 'date-fns';

interface CareTask {
  id: string;
  type: 'watering' | 'pruning' | 'fertilizing' | 'inspection' | 'treatment';
  description: string;
  dueDate: string;
  completed: boolean;
  notes?: string;
}

interface CareReminder {
  taskId: string;
  type: 'upcoming' | 'overdue' | 'completed';
  message: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

interface TreeCareProps {
  species: string;
  tasks: CareTask[];
  reminders: CareReminder[];
  seasonalCare: Record<string, string[]>;
  onTaskComplete: (taskId: string) => void;
}

const TreeCare: React.FC<TreeCareProps> = ({
  species,
  tasks,
  reminders,
  seasonalCare,
  onTaskComplete,
}) => {
  const [activeTab, setActiveTab] = useState('tasks');

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'low':
        return 'bg-blue-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'high':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTaskTypeIcon = (type: CareTask['type']) => {
    switch (type) {
      case 'watering':
        return '💧';
      case 'pruning':
        return '✂️';
      case 'fertilizing':
        return '🌱';
      case 'inspection':
        return '🔍';
      case 'treatment':
        return '🏥';
      default:
        return '📋';
    }
  };

  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'fall';
    return 'winter';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-6 w-6" />
            Tree Care Plan for {species}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="reminders">Reminders</TabsTrigger>
              <TabsTrigger value="seasonal">Seasonal Care</TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 border rounded-lg ${task.completed ? 'bg-muted' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getTaskTypeIcon(task.type)}</span>
                      <span className="font-medium">{task.type.charAt(0).toUpperCase() + task.type.slice(1)}</span>
                    </div>
                    <Button
                      variant={task.completed ? 'outline' : 'default'}
                      size="sm"
                      onClick={() => onTaskComplete(task.id)}
                    >
                      {task.completed ? 'Completed' : 'Mark Complete'}
                    </Button>
                  </div>
                  <p className="text-muted-foreground mb-2">{task.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {format(new Date(task.dueDate), 'PPP')}</span>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="reminders" className="space-y-4">
              {reminders.map((reminder) => (
                <Alert
                  key={reminder.taskId}
                  variant={reminder.type === 'overdue' ? 'destructive' : 'default'}
                >
                  <div className="flex items-center gap-2">
                    {reminder.type === 'overdue' ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                    <Badge className={`${getPriorityColor(reminder.priority)} text-white`}>
                      {reminder.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <AlertTitle className="mt-2">{reminder.message}</AlertTitle>
                  <AlertDescription className="text-sm">
                    Due: {format(new Date(reminder.dueDate), 'PPP')}
                  </AlertDescription>
                </Alert>
              ))}
            </TabsContent>

            <TabsContent value="seasonal" className="space-y-4">
              {Object.entries(seasonalCare).map(([season, tasks]) => (
                <Card key={season} className={season === getCurrentSeason() ? 'border-primary' : ''}>
                  <CardHeader>
                    <CardTitle className="capitalize">{season} Care</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                      {tasks.map((task, index) => (
                        <li key={index} className="text-muted-foreground">{task}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreeCare;