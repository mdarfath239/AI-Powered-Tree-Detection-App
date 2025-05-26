import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Leaf, AlertTriangle, CheckCircle, TreePine } from "lucide-react";

interface HealthIndicator {
  name: string;
  status: 'good' | 'moderate' | 'poor';
  value: number;
  description: string;
}

interface TreeHealthProps {
  status: 'healthy' | 'moderate' | 'concerning';
  indicators: HealthIndicator[];
  issues: string[];
  recommendations: string[];
}

const TreeHealth: React.FC<TreeHealthProps> = ({
  status,
  indicators,
  issues,
  recommendations,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500';
      case 'moderate':
        return 'bg-yellow-500';
      case 'concerning':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getIndicatorColor = (status: 'good' | 'moderate' | 'poor') => {
    switch (status) {
      case 'good':
        return 'text-green-500';
      case 'moderate':
        return 'text-yellow-500';
      case 'poor':
        return 'text-red-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Health Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TreePine className="h-6 w-6" />
            Tree Health Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Badge className={`${getStatusColor(status)} text-white`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>

          {/* Health Indicators */}
          <div className="space-y-4">
            {indicators.map((indicator, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{indicator.name}</span>
                  <span className={getIndicatorColor(indicator.status)}>
                    {indicator.value}%
                  </span>
                </div>
                <Progress value={indicator.value} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {indicator.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Issues */}
      {issues.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Identified Issues</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1">
              {issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Recommendations */}
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Care Recommendations</AlertTitle>
        <AlertDescription>
          <ul className="list-disc list-inside space-y-1">
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default TreeHealth;