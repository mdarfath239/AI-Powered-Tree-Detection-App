
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Info, Camera, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PlantCareTips = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate header
    gsap.from(headerRef.current, {
      y: -30,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Animate tips cards with stagger
    gsap.from(tipsRef.current?.children || [], {
      scale: 0.9,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: "back.out(1.7)"
    });
  }, []);

  const careCategories = [
    {
      title: "Watering",
      icon: <Leaf className="h-6 w-6 text-sky-dark" />,
      tips: [
        "Water deeply and less frequently to encourage deep root growth.",
        "Most plants prefer consistent moisture rather than frequent light watering.",
        "Always check the soil moisture before watering - stick your finger an inch into the soil."
      ]
    },
    {
      title: "Sunlight",
      icon: <Leaf className="h-6 w-6 text-forest" />,
      tips: [
        "Most trees need at least 6 hours of direct sunlight daily.",
        "Young trees may need protection from intense afternoon sun.",
        "Consider the natural habitat of your tree when positioning it."
      ]
    },
    {
      title: "Pruning",
      icon: <Leaf className="h-6 w-6 text-earth-dark" />,
      tips: [
        "Remove dead or diseased branches first.",
        "Winter pruning encourages vigorous spring growth.",
        "Never remove more than 25% of a tree's canopy in a single year."
      ]
    },
    {
      title: "Soil & Fertilizer",
      icon: <Leaf className="h-6 w-6 text-earth" />,
      tips: [
        "Most trees prefer well-draining soil with organic matter.",
        "Apply slow-release fertilizer in early spring.",
        "Avoid fertilizing newly planted trees until they're established."
      ]
    },
    {
      title: "Seasonal Care",
      icon: <Leaf className="h-6 w-6 text-forest-light" />,
      tips: [
        "Protect young trees from frost with burlap wrapping in winter.",
        "Mulch helps retain moisture in summer and insulates roots in winter.",
        "Fall is often the best time for planting new trees."
      ]
    },
    {
      title: "Pest Management",
      icon: <Leaf className="h-6 w-6 text-forest-dark" />,
      tips: [
        "Regularly inspect trees for signs of pests or disease.",
        "Use natural predators and organic treatments when possible.",
        "Healthy trees are more resistant to pest problems."
      ]
    }
  ];

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
        <div ref={headerRef} className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-forest-dark mb-4">Plant Care Tips</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn how to properly care for your trees and plants with these expert tips.
          </p>
          <div className="mt-6">
            <Button asChild className="bg-forest hover:bg-forest-dark mr-2">
              <Link to="/"><ArrowLeft className="mr-1 h-4 w-4" /> Back to Home</Link>
            </Button>
            <Button asChild variant="outline" className="border-forest text-forest hover:bg-forest/10">
              <Link to="/"><Camera className="mr-1 h-4 w-4" /> Identify a Tree</Link>
            </Button>
          </div>
        </div>
        
        <div ref={tipsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {careCategories.map((category, index) => (
            <Card key={index} className="border-forest-light/20 hover:border-forest-light transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  {category.icon}
                  <CardTitle className="text-xl text-forest-dark">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {category.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="inline-block h-5 w-5 min-w-5 bg-forest-light/20 text-forest-dark rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center pb-12">
          <Card className="max-w-2xl border-forest-light/30 bg-forest-light/10">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-forest mt-1" />
                <div>
                  <h3 className="font-semibold text-forest-dark mb-2">Personalized Plant Care</h3>
                  <p className="text-muted-foreground">
                    For personalized care advice, use our tree identification feature to get species-specific recommendations.
                    Different trees have different needs based on their species, age, location, and local climate.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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

export default PlantCareTips;
