import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Tree, Sun, Cloud, Ruler, Download, RefreshCw } from "lucide-react";

interface TreeModel {
  id: string;
  species: string;
  modelUrl: string;
  scale: {
    min: number;
    max: number;
    default: number;
  };
  seasons: {
    spring: string;
    summer: string;
    fall: string;
    winter: string;
  };
  growthStages: {
    sapling: string;
    young: string;
    mature: string;
  };
}

interface ARMeasurement {
  height: number;
  width: number;
  distance: number;
  timestamp: number;
}

interface ARVisualizationProps {
  isSupported: boolean;
  availableModels: TreeModel[];
  onModelSelect: (modelId: string) => void;
  onEnvironmentChange: (environment: {
    lighting: 'day' | 'night' | 'custom';
    weather: 'clear' | 'rain' | 'snow';
    season: 'spring' | 'summer' | 'fall' | 'winter';
  }) => void;
  onMeasure: () => Promise<ARMeasurement>;
  onSnapshot: () => Promise<string>;
}

const ARVisualization: React.FC<ARVisualizationProps> = ({
  isSupported,
  availableModels,
  onModelSelect,
  onEnvironmentChange,
  onMeasure,
  onSnapshot,
}) => {
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [scale, setScale] = useState<number>(1);
  const [activeTab, setActiveTab] = useState('placement');
  const [environment, setEnvironment] = useState({
    lighting: 'day' as const,
    weather: 'clear' as const,
    season: 'summer' as const,
  });
  const [measurements, setMeasurements] = useState<ARMeasurement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedModel) {
      onModelSelect(selectedModel);
    }
  }, [selectedModel, onModelSelect]);

  useEffect(() => {
    onEnvironmentChange(environment);
  }, [environment, onEnvironmentChange]);

  const handleMeasure = async () => {
    setIsLoading(true);
    try {
      const result = await onMeasure();
      setMeasurements(result);
    } catch (error) {
      console.error('Error measuring:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSnapshot = async () => {
    setIsLoading(true);
    try {
      await onSnapshot();
    } catch (error) {
      console.error('Error taking snapshot:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSupported) {
    return (
      <Alert variant="destructive">
        <AlertTitle>AR Not Supported</AlertTitle>
        <AlertDescription>
          Your device or browser does not support AR features. Please try using a compatible device.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-6 w-6" />
            AR Visualization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="placement">Tree Placement</TabsTrigger>
              <TabsTrigger value="environment">Environment</TabsTrigger>
              <TabsTrigger value="measurements">Measurements</TabsTrigger>
            </TabsList>

            <TabsContent value="placement" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Tree Species</label>
                  <Select
                    value={selectedModel}
                    onValueChange={setSelectedModel}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a tree species" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableModels.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          <div className="flex items-center gap-2">
                            <Tree className="h-4 w-4" />
                            {model.species}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tree Scale</label>
                  <Slider
                    value={[scale]}
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    onValueChange={([value]) => setScale(value)}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>0.5x</span>
                    <span>{scale}x</span>
                    <span>2.0x</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleSnapshot}
                    disabled={isLoading}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Capture View
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="environment" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Lighting</label>
                  <Select
                    value={environment.lighting}
                    onValueChange={(value: typeof environment.lighting) =>
                      setEnvironment(prev => ({ ...prev, lighting: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Day</SelectItem>
                      <SelectItem value="night">Night</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Weather</label>
                  <Select
                    value={environment.weather}
                    onValueChange={(value: typeof environment.weather) =>
                      setEnvironment(prev => ({ ...prev, weather: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clear">Clear</SelectItem>
                      <SelectItem value="rain">Rain</SelectItem>
                      <SelectItem value="snow">Snow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Season</label>
                  <Select
                    value={environment.season}
                    onValueChange={(value: typeof environment.season) =>
                      setEnvironment(prev => ({ ...prev, season: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spring">Spring</SelectItem>
                      <SelectItem value="summer">Summer</SelectItem>
                      <SelectItem value="fall">Fall</SelectItem>
                      <SelectItem value="winter">Winter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => onEnvironmentChange(environment)}
                    disabled={isLoading}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Update Environment
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="measurements" className="space-y-4">
              <div className="space-y-4">
                <Button
                  className="w-full"
                  onClick={handleMeasure}
                  disabled={isLoading}
                >
                  <Ruler className="h-4 w-4 mr-2" />
                  Measure Tree
                </Button>

                {measurements && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Height</label>
                          <p className="text-2xl font-bold">{measurements.height.toFixed(1)}m</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Width</label>
                          <p className="text-2xl font-bold">{measurements.width.toFixed(1)}m</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Distance</label>
                          <p className="text-2xl font-bold">{measurements.distance.toFixed(1)}m</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Measured</label>
                          <p className="text-sm text-muted-foreground">
                            {new Date(measurements.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ARVisualization;