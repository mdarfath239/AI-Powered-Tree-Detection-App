import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Trees, Settings, Camera, Image, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from 'gsap';
import ImageUpload from "@/components/ImageUpload";
import TreeResults from "@/components/TreeResults";
import ApiKeyModal from "@/components/ApiKeyModal";
import CameraCapture from "@/components/CameraCapture";
import LearnMore from "@/components/LearnMore";
import { analyzeTreeImage } from "@/services/treeAnalysisService";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [showApiModal, setShowApiModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const { toast } = useToast();
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apiKey = localStorage.getItem('gemini-api-key');
    if (!apiKey) {
      setShowApiModal(true);
    }

    // GSAP animations
    gsap.from(headerRef.current, {
      y: -30,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(contentRef.current, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.3
    });

    gsap.from(navRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      delay: 1
    });
  }, []);

  useEffect(() => {
    if (selectedImage) {
      const objectUrl = URL.createObjectURL(selectedImage);
      setImageUrl(objectUrl);
      
      // Clean up the URL when component unmounts
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedImage]);

  const handleImageSelected = async (file: File) => {
    setSelectedImage(file);
    setAnalysisResult(null);
    
    try {
      setIsAnalyzing(true);
      const result = await analyzeTreeImage(file);
      setAnalysisResult(result);
    } catch (error) {
      console.error("Error analyzing image:", error);
      // Toast is already shown in the service
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCameraCapture = (file: File) => {
    setShowCamera(false);
    handleImageSelected(file);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImageUrl('');
    setAnalysisResult(null);
  };

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
      
      {/* Animated leaf elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute animate-leaf-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          >
            <Trees 
              size={Math.floor(Math.random() * 16) + 8} 
              className="text-forest-light/20" 
            />
          </div>
        ))}
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 py-8 relative z-10">
        <header ref={headerRef} className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-forest/10 p-2 rounded-full">
              <Trees className="h-8 w-8 text-forest" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-forest-dark">TreeIdentify</h1>
              <p className="text-muted-foreground text-sm">Instant tree recognition powered by AI</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div ref={navRef} className="hidden sm:flex items-center gap-3 mr-4">
              <Button asChild variant="ghost" className="text-forest hover:bg-forest/10">
                <Link to="/database">Plant Database</Link>
              </Button>
              <Button asChild variant="ghost" className="text-forest hover:bg-forest/10">
                <Link to="/care-tips">Care Tips</Link>
              </Button>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setShowApiModal(true)}
              className="border-earth-light"
            >
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </header>
        
        <main ref={contentRef} className="flex flex-col items-center justify-center space-y-8 pb-20">
          {!analysisResult ? (
            <div className="text-center max-w-lg mx-auto mb-8">
              <h2 className="text-3xl font-bold mb-3 text-forest-dark">Identify Any Tree</h2>
              <p className="text-muted-foreground mb-8">
                Upload a photo of any tree and our AI will identify the species and provide detailed information about it.
              </p>
              
              {showCamera ? (
                <CameraCapture 
                  onImageCaptured={handleCameraCapture} 
                  onClose={() => setShowCamera(false)} 
                />
              ) : (
                <>
                  <ImageUpload onImageSelected={handleImageSelected} isLoading={isAnalyzing} />
                  
                  <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      onClick={() => setShowCamera(true)}
                      className="bg-forest hover:bg-forest-dark flex gap-2"
                      disabled={isAnalyzing}
                    >
                      <Camera size={18} />
                      Capture Photo
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="border-forest text-forest hover:bg-forest/10"
                      disabled={isAnalyzing}
                      onClick={() => document.getElementById('fileInput')?.click()}
                    >
                      <Image size={18} className="mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </>
              )}
              
              {isAnalyzing && (
                <p className="mt-4 text-sm text-muted-foreground">
                  This may take a few moments...
                </p>
              )}
            </div>
          ) : (
            <div className="w-full">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-forest-dark mb-2">Analysis Results</h2>
                <p className="text-muted-foreground">Here's what we found about your tree</p>
              </div>
              
              <TreeResults 
                treeName={analysisResult.treeName}
                scientificName={analysisResult.scientificName}
                description={analysisResult.description}
                characteristics={analysisResult.characteristics}
                funFacts={analysisResult.funFacts}
                confidence={analysisResult.confidence}
                imageUrl={imageUrl}
              />
              
              <LearnMore treeName={analysisResult.treeName} />
              
              <div className="flex justify-center mt-8">
                <Button 
                  onClick={handleReset}
                  className="bg-forest hover:bg-forest-dark"
                >
                  Identify Another Tree
                </Button>
              </div>
            </div>
          )}
        </main>
        
        {/* Mobile navigation */}
        <div className="sm:hidden fixed bottom-16 left-0 right-0 z-20 flex justify-center pb-2">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full border border-forest-light/20 shadow-lg p-1">
            <div className="flex items-center">
              <Button asChild variant="ghost" size="sm" className="text-forest">
                <Link to="/">Home</Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="text-forest">
                <Link to="/database">Database</Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="text-forest">
                <Link to="/care-tips">Care Tips</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-white bg-opacity-80 backdrop-blur-sm py-4 border-t border-earth-light/20 fixed bottom-0 w-full">
        <div className="container max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>TreeIdentify uses Google's Gemini AI to analyze and identify trees.</p>
        </div>
      </footer>
      
      <ApiKeyModal open={showApiModal} onClose={() => setShowApiModal(false)} />
    </div>
  );
};

export default Index;
