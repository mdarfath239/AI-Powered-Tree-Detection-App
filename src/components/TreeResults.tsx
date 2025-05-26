
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TreePine, Leaf, Mountain, Ruler, Clock } from "lucide-react";

interface TreeCharacteristics {
  height: string;
  habitat: string;
  leaves: string;
  bark: string;
  age: string;
}

interface TreeResultsProps {
  treeName: string;
  scientificName: string;
  description: string;
  characteristics: TreeCharacteristics;
  funFacts: string[];
  confidence: number;
  imageUrl: string;
}

const TreeResults: React.FC<TreeResultsProps> = ({
  treeName,
  scientificName,
  description,
  characteristics,
  funFacts,
  confidence,
  imageUrl,
}) => {
  return (
    <div className="w-full max-w-4xl animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Card */}
        <Card className="md:w-1/2 overflow-hidden">
          <div className="relative aspect-square">
            <img 
              src={imageUrl} 
              alt={treeName}
              className="object-cover w-full h-full rounded-t-md"
            />
            <div className="absolute bottom-3 right-3">
              <Badge className="bg-forest hover:bg-forest-dark">
                {`${Math.round(confidence)}% Confidence`}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Main Info Card */}
        <Card className="md:w-1/2 flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl text-forest-dark">{treeName}</CardTitle>
            <CardDescription className="italic text-muted-foreground">
              {scientificName}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm mb-4">{description}</p>
            <Separator className="my-4" />
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="bg-forest/10 p-1.5 rounded-full">
                  <Ruler className="h-4 w-4 text-forest-dark" />
                </div>
                <span className="text-sm"><span className="font-medium">Height:</span> {characteristics.height}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-forest/10 p-1.5 rounded-full">
                  <Mountain className="h-4 w-4 text-forest-dark" />
                </div>
                <span className="text-sm"><span className="font-medium">Habitat:</span> {characteristics.habitat}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-forest/10 p-1.5 rounded-full">
                  <Leaf className="h-4 w-4 text-forest-dark" />
                </div>
                <span className="text-sm"><span className="font-medium">Leaves:</span> {characteristics.leaves}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-forest/10 p-1.5 rounded-full">
                  <TreePine className="h-4 w-4 text-forest-dark" />
                </div>
                <span className="text-sm"><span className="font-medium">Bark:</span> {characteristics.bark}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-forest/10 p-1.5 rounded-full">
                  <Clock className="h-4 w-4 text-forest-dark" />
                </div>
                <span className="text-sm"><span className="font-medium">Age:</span> {characteristics.age}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fun Facts Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Fun Facts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {funFacts.map((fact, index) => (
              <li key={index} className="text-sm">{fact}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreeResults;
