
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Phone, Globe, MapPin } from "lucide-react";

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eateryName: string;
  phone: string;
  website?: string | null;
  location: string;
}

const ContactDialog = ({ isOpen, onClose, eateryName, phone, website, location }: ContactDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl">Contact Information</DialogTitle>
          <DialogDescription>
            {eateryName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg animate-fade-in hover-scale light-sweep">
            <div className="bg-primary/10 p-3 rounded-full">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Phone</p>
              <p className="text-lg">{phone}</p>
            </div>
          </div>
          
          {website && (
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg animate-fade-in delay-100 hover-scale light-sweep">
              <div className="bg-primary/10 p-3 rounded-full">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Website</p>
                <a 
                  href={website.startsWith('http') ? website : `https://${website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg text-primary hover:underline"
                >
                  {website}
                </a>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg animate-fade-in delay-200 hover-scale light-sweep">
            <div className="bg-primary/10 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Address</p>
              <p className="text-lg">{location}</p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button className="w-full glow-on-hover" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
