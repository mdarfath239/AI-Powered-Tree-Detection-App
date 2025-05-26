import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Book, Video, FileText, Link2, GraduationCap, CheckCircle } from "lucide-react";

interface LearningModule {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  topics: string[];
  prerequisites?: string[];
}

interface Tutorial {
  id: string;
  moduleId: string;
  title: string;
  content: TutorialStep[];
  resources: Resource[];
}

interface TutorialStep {
  order: number;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  tips: string[];
}

interface Resource {
  type: 'article' | 'video' | 'document' | 'link';
  title: string;
  description: string;
  url: string;
}

interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
}

interface QuizQuestion {
  id: string;
  text: string;
  type: 'multiple_choice' | 'true_false' | 'matching';
  options: string[];
  correctAnswer: string | string[];
  explanation: string;
}

interface TreeEducationProps {
  modules: LearningModule[];
  currentTutorial?: Tutorial;
  currentQuiz?: Quiz;
  onModuleSelect: (moduleId: string) => void;
  onQuizSubmit: (quizId: string, answers: Record<string, string | string[]>) => void;
}

const TreeEducation: React.FC<TreeEducationProps> = ({
  modules,
  currentTutorial,
  currentQuiz,
  onModuleSelect,
  onQuizSubmit,
}) => {
  const [activeTab, setActiveTab] = useState('modules');
  const [currentStep, setCurrentStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string | string[]>>({});

  const getDifficultyColor = (difficulty: LearningModule['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'advanced':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'article':
        return <Book className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'document':
        return <FileText className="h-5 w-5" />;
      case 'link':
        return <Link2 className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const handleQuizSubmit = () => {
    if (currentQuiz) {
      onQuizSubmit(currentQuiz.id, quizAnswers);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            Tree Education Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="tutorial">Tutorial</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
            </TabsList>

            <TabsContent value="modules" className="space-y-4">
              {modules.map((module) => (
                <Card key={module.id} className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => onModuleSelect(module.id)}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{module.title}</h3>
                      <Badge className={`${getDifficultyColor(module.difficulty)} text-white`}>
                        {module.difficulty}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{module.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>⏱️ {module.estimatedTime}</span>
                      <span>📚 {module.topics.length} topics</span>
                    </div>
                    {module.prerequisites && module.prerequisites.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Prerequisites:</p>
                        <div className="flex gap-2 flex-wrap">
                          {module.prerequisites.map((prereq) => (
                            <Badge key={prereq} variant="outline">{prereq}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="tutorial" className="space-y-4">
              {currentTutorial ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{currentTutorial.title}</h2>
                      <p className="text-muted-foreground">
                        Step {currentStep + 1} of {currentTutorial.content.length}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        disabled={currentStep === 0}
                        onClick={() => setCurrentStep(current => current - 1)}
                      >
                        Previous
                      </Button>
                      <Button
                        disabled={currentStep === currentTutorial.content.length - 1}
                        onClick={() => setCurrentStep(current => current + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>

                  <Progress
                    value={((currentStep + 1) / currentTutorial.content.length) * 100}
                    className="h-2"
                  />

                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4">
                        {currentTutorial.content[currentStep].title}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {currentTutorial.content[currentStep].description}
                      </p>
                      {currentTutorial.content[currentStep].tips.length > 0 && (
                        <div className="bg-accent/50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">💡 Tips:</h4>
                          <ul className="space-y-2">
                            {currentTutorial.content[currentStep].tips.map((tip, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        {currentTutorial.resources.map((resource, index) => (
                          <Card key={index}>
                            <CardContent className="pt-6">
                              <div className="flex items-center gap-2 mb-2">
                                {getResourceIcon(resource.type)}
                                <span className="font-medium">{resource.title}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-4">
                                {resource.description}
                              </p>
                              <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => window.open(resource.url, '_blank')}
                              >
                                View Resource
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p>Please select a module to view its tutorial.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="quiz" className="space-y-4">
              {currentQuiz ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{currentQuiz.title}</CardTitle>
                      <CardDescription>{currentQuiz.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[500px] pr-4">
                        <div className="space-y-8">
                          {currentQuiz.questions.map((question) => (
                            <div key={question.id} className="space-y-4">
                              <h3 className="font-medium">{question.text}</h3>
                              <RadioGroup
                                value={quizAnswers[question.id] as string}
                                onValueChange={(value) =>
                                  setQuizAnswers(current => ({
                                    ...current,
                                    [question.id]: value
                                  }))
                                }
                              >
                                {question.options.map((option) => (
                                  <div key={option} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                                    <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                  <Button
                    className="w-full"
                    onClick={handleQuizSubmit}
                  >
                    Submit Quiz
                  </Button>
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p>Please complete the tutorial to unlock the quiz.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreeEducation;