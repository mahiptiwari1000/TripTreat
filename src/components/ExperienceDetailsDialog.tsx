
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, CalendarIcon, Check } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Experience {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  maxParticipants: number;
  rating: number;
  reviews: number;
  category: string;
  host: string;
  hostImage: string;
  included: string[];
}

interface ExperienceDetailsDialogProps {
  experience: Experience | null;
  isOpen: boolean;
  onClose: () => void;
}

const ExperienceDetailsDialog = ({ experience, isOpen, onClose }: ExperienceDetailsDialogProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("10:00");
  const [guests, setGuests] = useState("2");
  const [showBooking, setShowBooking] = useState(false);

  if (!experience) return null;

  const handleBook = () => {
    toast.success(`Experience booked successfully!`, {
      description: `Your booking for "${experience.name}" on ${date ? format(date, 'PPP') : 'today'} at ${time} for ${guests} ${parseInt(guests) === 1 ? 'person' : 'people'} has been confirmed.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl">{experience.name}</DialogTitle>
          <DialogDescription className="flex items-center gap-1">
            <MapPin size={14} className="text-muted-foreground" /> {experience.location}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6">
          <div className="rounded-md overflow-hidden h-64 w-full glow-border-primary">
            <img 
              src={experience.image} 
              alt={experience.name} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          <div className="grid md:grid-cols-[2fr_1fr] gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">About this experience</h3>
                <p className="text-muted-foreground">{experience.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-2 py-2">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-muted-foreground" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-muted-foreground" />
                  <span>Up to {experience.maxParticipants} people</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">What's included</h3>
                <ul className="space-y-2">
                  {experience.included.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={16} className="text-primary mt-1 mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Your host</h3>
                <div className="flex items-center gap-3">
                  <img 
                    src={experience.hostImage} 
                    alt={experience.host} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{experience.host}</p>
                    <p className="text-sm text-muted-foreground">Local {experience.category} Expert</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-md space-y-4 light-sweep">
              <div className="text-lg font-bold text-primary">
                ₹{experience.price}<span className="text-xs text-muted-foreground font-normal">/person</span>
              </div>
              
              {!showBooking ? (
                <Button 
                  className="w-full text-xs bg-primary hover:bg-primary/90 glow-on-hover"
                  onClick={() => setShowBooking(true)}
                >
                  Book this Experience
                </Button>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm font-normal"
                        >
                          <CalendarIcon className="h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 z-50 pointer-events-auto" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time</label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="13:00">1:00 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Number of guests</label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: experience.maxParticipants }, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'person' : 'people'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>₹{experience.price} × {guests} people</span>
                      <span>₹{experience.price * parseInt(guests)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>₹{experience.price * parseInt(guests)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 glow-on-hover"
                    onClick={handleBook}
                  >
                    Confirm Booking
                  </Button>
                </div>
              )}
              
              <div className="text-center text-xs text-muted-foreground pt-2">
                You won't be charged yet
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceDetailsDialog;
