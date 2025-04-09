
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Clock, Users } from "lucide-react";
import { toast } from "sonner";
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
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ReservationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eateryName: string;
}

const ReservationDialog = ({ isOpen, onClose, eateryName }: ReservationDialogProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("19:00");
  const [guests, setGuests] = useState<string>("2");
  
  const handleReserve = () => {
    toast.success(`Reservation confirmed!`, {
      description: `Your reservation for ${eateryName} on ${format(date!, 'PPP')} at ${time} for ${guests} guests has been confirmed.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl">Reserve a Table</DialogTitle>
          <DialogDescription>
            {eateryName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" /> Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="time" className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> Time
            </Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="11:00">11:00 AM</SelectItem>
                <SelectItem value="12:00">12:00 PM</SelectItem>
                <SelectItem value="13:00">1:00 PM</SelectItem>
                <SelectItem value="14:00">2:00 PM</SelectItem>
                <SelectItem value="18:00">6:00 PM</SelectItem>
                <SelectItem value="19:00">7:00 PM</SelectItem>
                <SelectItem value="20:00">8:00 PM</SelectItem>
                <SelectItem value="21:00">9:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="guests" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Number of Guests
            </Label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger>
                <SelectValue placeholder="Select number of guests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 person</SelectItem>
                <SelectItem value="2">2 people</SelectItem>
                <SelectItem value="3">3 people</SelectItem>
                <SelectItem value="4">4 people</SelectItem>
                <SelectItem value="5">5 people</SelectItem>
                <SelectItem value="6">6 people</SelectItem>
                <SelectItem value="7">7 people</SelectItem>
                <SelectItem value="8">8+ people</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="notes">Special Requests</Label>
            <Input id="notes" placeholder="Any special requests or dietary preferences?" />
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-primary hover:bg-primary/80" onClick={handleReserve}>
            Confirm Reservation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDialog;
