import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, TreePine, Image as ImageIcon } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (post: {
    user: { name: string; avatar: string };
    image: string;
    description: string;
    location: string;
    species: string;
  }) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onCreatePost }) => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [species, setSpecies] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageSelected = (file: File) => {
    setSelectedImage(file);
  };

  const handleSubmit = async () => {
    if (!selectedImage || !description.trim() || !location.trim() || !species.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and upload an image.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, you would upload the image to a server and get a URL back
      const imageUrl = URL.createObjectURL(selectedImage);

      await onCreatePost({
        user: {
          name: "Current User", // In a real app, this would come from auth
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser",
        },
        image: imageUrl,
        description,
        location,
        species,
      });

      // Reset form
      setDescription('');
      setLocation('');
      setSpecies('');
      setSelectedImage(null);
      onClose();
    } catch (error) {
      toast({
        title: "Post Creation Failed",
        description: "Failed to create the post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Tree Image</Label>
            <ImageUpload
              onImageSelected={handleImageSelected}
              isLoading={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label>Species</Label>
            <div className="flex gap-2">
              <TreePine className="h-4 w-4 mt-3" />
              <Input
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                placeholder="Enter tree species"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Location</Label>
            <div className="flex gap-2">
              <MapPin className="h-4 w-4 mt-3" />
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Share your thoughts about this tree..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;