
import React, { useState, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { TreePine } from "lucide-react";

interface ImageUploadProps {
  onImageSelected: (file: File) => void;
  isLoading: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();
  
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageSelected(file);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image file.",
          variant: "destructive"
        });
      }
    }
  }, [onImageSelected, toast]);
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelected(e.target.files[0]);
    }
  }, [onImageSelected]);
  
  return (
    <Card className={`w-full max-w-xl transition-all duration-300 ${dragActive ? 'border-forest ring-2 ring-forest/20' : 'border-earth/20'}`}>
      <CardContent className="p-0">
        <div
          className="flex flex-col items-center justify-center p-8 text-center min-h-[300px] cursor-pointer rounded-md transition-all duration-200"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-forest border-t-transparent"></div>
              <p className="text-muted-foreground">Analyzing your tree image...</p>
            </div>
          ) : (
            <>
              <div className="h-24 w-24 mb-4 rounded-full bg-forest/10 flex items-center justify-center">
                <TreePine className="h-12 w-12 text-forest" />
              </div>
              <h3 className="text-xl font-medium mb-2">Upload Tree Image</h3>
              <p className="text-muted-foreground mb-6">Drag and drop your tree image here, or click to select a file</p>
              <p className="text-sm text-muted-foreground">Supported formats: JPG, PNG, WEBP</p>
            </>
          )}
          <input 
            id="fileInput" 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange}
            disabled={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
