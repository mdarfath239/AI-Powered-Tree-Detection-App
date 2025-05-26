
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TreeDeciduous, TreePine, Leaf, Info } from "lucide-react";
import { Link } from "react-router-dom";

interface PlantType {
  id: number;
  name: string;
  type: 'tree' | 'shrub' | 'flower';
  icon: React.ReactNode;
  description: string;
  imageUrl: string;
}

const plantData: PlantType[] = [
  {
    id: 1,
    name: "Oak Tree",
    type: "tree",
    icon: <TreeDeciduous className="h-8 w-8 text-forest" />,
    description: "Majestic and long-lived, oak trees are known for their strong wood and acorns.",
    imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86"
  },
  {
    id: 2,
    name: "Pine Tree",
    type: "tree",
    icon: <TreePine className="h-8 w-8 text-forest" />,
    description: "Evergreen conifers with needle-like leaves and distinctive cones.",
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
  },
  {
    id: 3,
    name: "Maple Tree",
    type: "tree",
    icon: <TreeDeciduous className="h-8 w-8 text-forest" />,
    description: "Known for their distinctive leaf shape and beautiful fall colors.",
    imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843"
  },
  {
    id: 4,
    name: "Willow Tree",
    type: "tree",
    icon: <TreeDeciduous className="h-8 w-8 text-forest" />,
    description: "Characterized by their long, drooping branches and association with water.",
    imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff"
  },
];

const PlantDatabase = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header animation
    gsap.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Staggered cards animation
    gsap.from(cardsRef.current?.children || [], {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)"
    });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="fixed inset-0 -z-10 bg-gradient-to-br from-forest-light/40 via-white to-forest/30 animate-gradient"
        style={{
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite'
        }}
      />
      
      <div className="container max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div ref={headerRef} className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-forest-dark mb-4">Plant Database</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of trees and plants. Learn about different species and their characteristics.
          </p>
          <div className="mt-6">
            <Button asChild className="bg-forest hover:bg-forest-dark">
              <Link to="/">Return to Tree Identifier</Link>
            </Button>
          </div>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {plantData.map((plant) => (
            <Card key={plant.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div 
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${plant.imageUrl})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
              </div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {plant.icon}
                  <CardTitle>{plant.name}</CardTitle>
                </div>
                <CardDescription>{plant.type.charAt(0).toUpperCase() + plant.type.slice(1)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{plant.description}</p>
                <Button variant="outline" className="mt-4 w-full border-forest text-forest hover:bg-forest/10">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center pb-12">
          <div className="inline-flex items-center gap-2 bg-forest-light/10 p-4 rounded-lg border border-forest-light/20">
            <Info className="h-5 w-5 text-forest" />
            <p className="text-sm">
              This database is for educational purposes. For more detailed information, consult with a professional arborist or botanist.
            </p>
          </div>
        </div>
      </div>
      
      <footer className="bg-white bg-opacity-80 backdrop-blur-sm py-4 border-t border-earth-light/20 fixed bottom-0 w-full">
        <div className="container max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>TreeIdentify uses Google's Gemini AI to analyze and identify trees.</p>
        </div>
      </footer>
    </div>
  );
};

export default PlantDatabase;
