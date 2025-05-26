import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle, Leaf, Sprout, Bug, Droplet } from "lucide-react";

interface HealthIssue {
  type: 'disease' | 'pest';
  name: string;
  confidence: number;
  description: string;
  symptoms: string[];
  severity: 'low' | 'moderate' | 'severe';
}

interface Treatment {
  type: 'organic' | 'chemical' | 'cultural';
  name: string;
  description: string;
  applicationMethod: string;
  frequency: string;
  precautions: string[];
  effectiveness: number;
}

interface DiagnosisResult {
  issues: HealthIssue[];
  treatments: Treatment[];
  preventiveMeasures: string[];
  recommendedActions: string[];
  followUpInDays: number;
}

interface TreeDiagnosisProps {
  diagnosis: DiagnosisResult;
  onTreatmentSelect: (treatment: Treatment) => void;
}

const TreeDiagnosis: React.FC<TreeDiagnosisProps> = ({
  diagnosis,
  onTreatmentSelect,
}) => {
  const [activeTab, setActiveTab] = useState('issues');

  const getSeverityColor = (severity: HealthIssue['severity']) => {
    switch (severity) {
      case 'low':
        return 'bg-yellow-500';
      case 'moderate':
        return 'bg-orange-500';
      case 'severe':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTreatmentTypeIcon = (type: Treatment['type']) => {
    switch (type) {
      case 'organic':
        return <Leaf className="h-5 w-5" />;
      case 'chemical':
        return <Droplet className="h-5 w-5" />;
      case 'cultural':
        return <Sprout className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
            Tree Health Diagnosis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="issues">Issues</TabsTrigger>
              <TabsTrigger value="treatments">Treatments</TabsTrigger>
              <TabsTrigger value="prevention">Prevention</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>

            <TabsContent value="issues" className="space-y-4">
              {diagnosis.issues.map((issue, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {issue.type === 'disease' ? (
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <Bug className="h-5 w-5 text-orange-500" />
                        )}
                        <h3 className="font-semibold">{issue.name}</h3>
                      </div>
                      <Badge className={`${getSeverityColor(issue.severity)} text-white`}>
                        {issue.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{issue.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Confidence</span>
                        <span className="text-sm font-medium">{Math.round(issue.confidence * 100)}%</span>
                      </div>
                      <Progress value={issue.confidence * 100} className="h-2" />
                    </div>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Symptoms:</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {issue.symptoms.map((symptom, idx) => (
                          <li key={idx}>{symptom}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="treatments" className="space-y-4">
              {diagnosis.treatments.map((treatment, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {getTreatmentTypeIcon(treatment.type)}
                        <h3 className="font-semibold">{treatment.name}</h3>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {treatment.type}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{treatment.description}</p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Application Method:</h4>
                        <p className="text-muted-foreground">{treatment.applicationMethod}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Frequency:</h4>
                        <p className="text-muted-foreground">{treatment.frequency}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Precautions:</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {treatment.precautions.map((precaution, idx) => (
                            <li key={idx}>{precaution}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Effectiveness</span>
                          <span className="text-sm font-medium">
                            {Math.round(treatment.effectiveness * 100)}%
                          </span>
                        </div>
                        <Progress value={treatment.effectiveness * 100} className="h-2" />
                      </div>
                      <Button
                        className="w-full mt-4"
                        onClick={() => onTreatmentSelect(treatment)}
                      >
                        Select Treatment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="prevention" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Preventive Measures</h3>
                  <ul className="space-y-3">
                    {diagnosis.preventiveMeasures.map((measure, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <span className="text-muted-foreground">{measure}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actions" className="space-y-4">
              <Alert>
                <AlertTitle>Follow-up Required</AlertTitle>
                <AlertDescription>
                  Schedule next inspection in {diagnosis.followUpInDays} days
                </AlertDescription>
              </Alert>
              {diagnosis.recommendedActions.map((action, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-lg">{index + 1}.</span>
                      <span className="text-muted-foreground">{action}</span>
                    </div>
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

export default TreeDiagnosis;