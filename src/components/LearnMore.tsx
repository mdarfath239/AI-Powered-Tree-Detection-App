
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Leaf, Info, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from 'gsap';

interface LearnMoreProps {
  treeName: string;
}

const LearnMore: React.FC<LearnMoreProps> = ({ treeName }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate the card entrance
    gsap.from(cardRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.3
    });
    
    // Animate resources with stagger
    gsap.from(resourcesRef.current?.children || [], {
      y: 15,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.6
    });
  }, []);

  // List of generic plant care resources and specific resources based on tree type
  const resources = [
    {
      title: "General Tree Care Guide",
      description: "Learn the basics of tree care and maintenance",
      url: "https://www.arborday.org/trees/tips/"
    },
    {
      title: "Watering Guidelines",
      description: "How and when to water trees properly",
      url: "https://www.treepeople.org/tree-care/watering/"
    },
    {
      title: "Seasonal Tree Maintenance",
      description: "Season-by-season care tips",
      url: "https://www.almanac.com/content/tree-care-guide"
    }
  ];

  // Add species-specific resource if we have a tree name
  if (treeName && treeName !== "Unknown Tree") {
    resources.unshift({
      title: `${treeName} Care Guide`,
      description: `Specific care tips for your ${treeName}`,
      url: `https://www.google.com/search?q=${encodeURIComponent(treeName + " tree care guide")}`
    });
  }

  return (
    <Card className="mt-8 animate-fade-in" ref={cardRef}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-forest" />
          Learn More About Tree Care
        </CardTitle>
        <CardDescription>
          Resources to help you care for and maintain your trees
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div ref={resourcesRef} className="space-y-3 mb-6">
            {resources.map((resource, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-muted hover:bg-muted/20 transition-colors">
                <div className="mb-2 sm:mb-0">
                  <h4 className="font-medium">{resource.title}</h4>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-forest-light/20 border-forest-light/30 text-forest-dark hover:bg-forest-light/30"
                  onClick={() => window.open(resource.url, "_blank")}
                >
                  Visit <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <Button asChild variant="default" className="bg-forest hover:bg-forest-dark">
              <Link to="/database" className="flex items-center justify-center">
                Explore Plant Database <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-forest text-forest hover:bg-forest/10">
              <Link to="/care-tips" className="flex items-center justify-center">
                Plant Care Tips <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="mt-4 p-3 rounded-lg bg-forest-light/10 border border-forest-light/20">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-forest mt-0.5" />
              <p className="text-sm">
                Remember that proper tree care varies by species, climate, and local conditions. 
                Consider consulting with a local arborist for specific advice about your trees.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearnMore;
