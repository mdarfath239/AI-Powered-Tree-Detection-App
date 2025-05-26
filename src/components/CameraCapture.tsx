
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface CameraCaptureProps {
  onImageCaptured: (file: File) => void;
  onClose: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onImageCaptured, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    // Request camera access when component mounts
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsStreaming(true);
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        toast({
          title: "Camera Access Failed",
          description: "Unable to access your camera. Please check permissions.",
          variant: "destructive",
        });
      }
    };

    startCamera();

    // Clean up when component unmounts
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current && isStreaming) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas size to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        
        // Convert canvas to blob
        canvas.toBlob((blob) => {
          if (blob) {
            // Create a File from the Blob
            const imageFile = new File([blob], "tree-capture.jpg", { type: "image/jpeg" });
            onImageCaptured(imageFile);
          }
        }, 'image/jpeg', 0.9);
      }
    }
  };

  return (
    <Card className="w-full max-w-xl">
      <CardContent className="p-0 relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <div className="relative h-96 bg-black">
          <video 
            ref={videoRef} 
            className="w-full h-full object-cover" 
            autoPlay 
            playsInline
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
        
        <div className="p-4 flex justify-center">
          <Button 
            onClick={captureImage}
            className="bg-forest hover:bg-forest-dark rounded-full h-16 w-16 p-0"
            disabled={!isStreaming}
          >
            <Camera className="h-8 w-8" />
            <span className="sr-only">Take Photo</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CameraCapture;
