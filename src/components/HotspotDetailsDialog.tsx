
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, Camera, ThumbsUp, Route } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Define the hotspot type
interface Hotspot {
  id: number;
  name: string;
  location: string;
  district: string;
  details: string;
  image: string;
  category: string;
  visitDuration: string;
  bestTime: string;
  entryFee: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  tips?: string[];
  additionalImages: string[];
}

interface HotspotDetailsDialogProps {
  hotspot: Hotspot | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToItinerary: (hotspot: Hotspot) => void;
}

// Sample additional images for the hotspot (in a real app, this would come from the backend)
// const getAdditionalImages = (mainImage: string) => {
//   // In a real app, you'd have actual additional images
//   // Here we're just reusing the main image to simulate multiple photos
//   return [
//     mainImage,
//     '/lovable-uploads/04bb80f1-f5bf-401e-8e65-e67086760165.png',
//     '/lovable-uploads/c5b36d98-5b95-4333-9508-2b9ba95125d1.png'
//   ];
// };

const HotspotDetailsDialog = ({ 
  hotspot, 
  isOpen, 
  onClose, 
  onAddToItinerary 
}: HotspotDetailsDialogProps) => {
  if (!hotspot) return null;
  
  //const additionalImages = getAdditionalImages(hotspot.image);

  const handleAddToItinerary = () => {
    onAddToItinerary(hotspot);
    toast.success(`${hotspot.name} added to your itinerary`, {
      description: "Plan your perfect tour with the places you save"
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{hotspot.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6">
          {/* Main image and gallery */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-3">
            <div className="rounded-md overflow-hidden h-60">
              <img 
                src={hotspot.image} 
                alt={hotspot.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 h-60">
              {hotspot.additionalImages.slice(0, 2).map((img, i) => (
                <div key={i} className="rounded-md overflow-hidden h-full">
                  <img 
                    src={img} 
                    alt={`${hotspot.name} view ${i+1}`} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-[3fr_1fr] gap-6">
            <div className="space-y-6">
              {/* Tabs for different information sections */}
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="fun">Why it's fun</TabsTrigger>
                  <TabsTrigger value="visit">Visit Info</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="space-y-4 pt-4 animate-fade-in">
                  <div className="flex gap-2 flex-wrap">
                    <Badge>{hotspot.category}</Badge>
                    <Badge variant="outline">{hotspot.district}</Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Overview</h3>
                    <p className="text-muted-foreground">{hotspot.details}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 bg-muted/30 p-3 rounded-md">
                      <MapPin size={18} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{hotspot.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-muted/30 p-3 rounded-md">
                      <Clock size={18} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Visit Duration</p>
                        <p className="font-medium">{hotspot.visitDuration}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="fun" className="space-y-4 pt-4 animate-fade-in">
                  <h3 className="text-lg font-medium mb-2">Why it's fun to visit</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-1">
                        <Camera size={18} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Photographic Opportunity</h4>
                        <p className="text-muted-foreground">
                          Capture stunning views and unique cultural moments that make for perfect travel memories.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-1">
                        <Star size={18} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Authentic Experience</h4>
                        <p className="text-muted-foreground">
                          Get a genuine taste of local culture, traditions, and daily life in Manipur.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-1">
                        <ThumbsUp size={18} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Local Recommendation</h4>
                        <p className="text-muted-foreground">
                          This location is highly recommended by locals and experienced travelers for its unique charm.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="visit" className="space-y-4 pt-4 animate-fade-in">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Visiting Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-muted/30 p-3 rounded-md">
                        <p className="text-sm text-muted-foreground">Entry Fee</p>
                        <p className="font-medium">{hotspot.entryFee}</p>
                      </div>
                      <div className="bg-muted/30 p-3 rounded-md">
                        <p className="text-sm text-muted-foreground">Best Time to Visit</p>
                        <p className="font-medium">{hotspot.bestTime}</p>
                      </div>
                    </div>
                  </div>
                  
                  {hotspot.tips && hotspot.tips.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Travel Tips</h3>
                      <ul className="space-y-2">
                        {hotspot.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start">
                            <ThumbsUp size={16} className="text-primary mt-1 mr-2" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Location Map</h3>
                <div className="bg-muted h-[250px] rounded-md flex items-center justify-center">
                  {/* In a real app, this would be a Google Maps component */}
                  <div className="text-center">
                    <MapPin size={32} className="mx-auto mb-2 text-primary" />
                    <p className="text-muted-foreground text-sm">Map view would be integrated here</p>
                    <p className="text-xs">Location: {hotspot.location}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-md">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 mb-4 flex items-center gap-2"
                  onClick={handleAddToItinerary}
                >
                  <Route size={16} />
                  Add to Itinerary
                </Button>
                
                <Separator className="my-4" />
                
                <h4 className="font-medium mb-3">Quick Info</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{hotspot.category}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">District</span>
                    <span className="font-medium">{hotspot.district}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Entry Fee</span>
                    <span className="font-medium">{hotspot.entryFee}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{hotspot.visitDuration}</span>
                  </li>
                </ul>
                
                <Separator className="my-4" />
                
                <div className="text-sm text-muted-foreground">
                  <h4 className="font-medium text-foreground mb-2">Need a guide?</h4>
                  <p className="mb-2">Enhance your experience with a knowledgeable local guide</p>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/tours">Browse Tour Options</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HotspotDetailsDialog;
