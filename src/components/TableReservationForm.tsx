
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { format, addDays } from 'date-fns';
import { toast } from 'sonner';
import { 
  CalendarIcon, Clock, Users, UtensilsCrossed, MapPin, Info, 
  Calendar as CalendarIcon2, User, Mail, Phone, Home, Lightbulb 
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from '@/components/ui/alert-dialog';

interface TableReservationFormProps {
  eateryName: string;
  eateryLocation?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const TableReservationForm = ({ 
  eateryName, 
  eateryLocation, 
  isOpen = true,
  onClose
}: TableReservationFormProps) => {
  const [date, setDate] = useState<Date>(addDays(new Date(), 1));
  const [time, setTime] = useState<string>('19:00');
  const [partySize, setPartySize] = useState<number>(2);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [seatingPreference, setSeatingPreference] = useState<string>('No Preference');
  const [dietaryNeeds, setDietaryNeeds] = useState<string[]>([]);
  const [isGuestDialogOpen, setIsGuestDialogOpen] = useState<boolean>(false);
  const [isDateTimeDialogOpen, setIsDateTimeDialogOpen] = useState<boolean>(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);

  const occasions = ['None', 'Birthday', 'Anniversary', 'Business Meal', 'Date Night', 'Family Gathering'];
  const seatingOptions = ['No Preference', 'Indoor', 'Outdoor', 'Window', 'Private Area'];
  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'glutenFree', label: 'Gluten-Free' },
    { id: 'nutFree', label: 'Nut-Free' }
  ];
  
  const sourcesOptions = [
    'Search Engine', 
    'Social Media', 
    'Friend Recommendation', 
    'Travel Website', 
    'Local Guide', 
    'Hotel Recommendation',
    'Other'
  ];
  
  const timeSlots = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', 
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
  ];

  const handleDietaryChange = (id: string, checked: boolean) => {
    if (checked) {
      setDietaryNeeds(prev => [...prev, id]);
    } else {
      setDietaryNeeds(prev => prev.filter(item => item !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name || !email || !phone || !date || !time) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    
    // Submit reservation
    setShowSuccessDialog(true);
    
    // Reset form fields
    setName('');
    setEmail('');
    setPhone('');
    setCity('');
    setSource('');
    setSpecialRequests('');
    setDate(addDays(new Date(), 1));
    setTime('19:00');
    setPartySize(2);
    setSeatingPreference('No Preference');
    setOccasion('');
    setDietaryNeeds([]);
  };

  const formatGuestsLabel = () => {
    return `${partySize} ${partySize === 1 ? 'Guest' : 'Guests'}`;
  };

  const formatDateTimeLabel = () => {
    if (!date) return 'Select Date & Time';
    return `${format(date, 'PPP')} at ${time}`;
  };

  const closeSuccessDialog = () => {
    setShowSuccessDialog(false);
    if (onClose) {
      onClose();
    }
  };

  const FormContent = () => (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold">{eateryName}</h3>
          {eateryLocation && (
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin size={14} className="mr-1" />
              <span>{eateryLocation}</span>
            </div>
          )}
        </div>
        
        {/* Date Time Selection - Now triggers dialog */}
        <div 
          onClick={() => setIsDateTimeDialogOpen(true)}
          className="rounded-md border p-4 flex justify-between items-center hover:bg-accent/50 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2">
            <CalendarIcon2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Date & Time</p>
              <p className="text-sm text-muted-foreground">{formatDateTimeLabel()}</p>
            </div>
          </div>
          <Button type="button" variant="ghost" size="icon">
            <CalendarIcon className="h-4 w-4" />
            <span className="sr-only">Open</span>
          </Button>
        </div>
        
        {/* Party Size Selection - Now triggers dialog */}
        <div 
          onClick={() => setIsGuestDialogOpen(true)}
          className="rounded-md border p-4 flex justify-between items-center hover:bg-accent/50 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Party Size</p>
              <p className="text-sm text-muted-foreground">{formatGuestsLabel()}</p>
            </div>
          </div>
          <Button type="button" variant="ghost" size="icon">
            <Users className="h-4 w-4" />
            <span className="sr-only">Open</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center">
              <User size={16} className="mr-1 text-muted-foreground" />
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center">
              <Mail size={16} className="mr-1 text-muted-foreground" />
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center">
              <Phone size={16} className="mr-1 text-muted-foreground" />
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit mobile number"
              required
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="city" className="flex items-center">
              <Home size={16} className="mr-1 text-muted-foreground" />
              City <span className="text-destructive">*</span>
            </Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Your city"
              required
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="source" className="flex items-center">
            <Lightbulb size={16} className="mr-1 text-muted-foreground" />
            How did you hear about us? <span className="text-destructive">*</span>
          </Label>
          <Select value={source} onValueChange={setSource} required>
            <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-primary/20">
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              {sourcesOptions.map((sourceOption) => (
                <SelectItem key={sourceOption} value={sourceOption}>
                  {sourceOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="occasion">Occasion</Label>
          <Select value={occasion} onValueChange={setOccasion}>
            <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-primary/20">
              <SelectValue placeholder="Select occasion" />
            </SelectTrigger>
            <SelectContent>
              {occasions.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="seatingPreference">Seating Preference</Label>
          <Select value={seatingPreference} onValueChange={setSeatingPreference}>
            <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-primary/20">
              <SelectValue placeholder="Select seating preference" />
            </SelectTrigger>
            <SelectContent>
              {seatingOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="flex items-center">
            <UtensilsCrossed size={16} className="mr-1" />
            Dietary Requirements
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {dietaryOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={dietaryNeeds.includes(option.id)}
                  onCheckedChange={(checked) => 
                    handleDietaryChange(option.id, checked === true)
                  }
                  className="data-[state=checked]:animate-pulse"
                />
                <label
                  htmlFor={option.id}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="specialRequests" className="flex items-center">
            <Info size={16} className="mr-1" />
            Special Requests
          </Label>
          <Textarea
            id="specialRequests"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="Any special arrangements, requirements, or notes for the restaurant"
            rows={3}
            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground mb-4">
        <p>* Reservation is subject to confirmation by the restaurant. You'll receive a confirmation via email or phone.</p>
        <p>* For large groups (8+), the restaurant may require a deposit.</p>
      </div>
      
      <div className="flex gap-4">
        {onClose && (
          <Button 
            type="button" 
            variant="outline" 
            className="w-full transition-all hover:scale-105" 
            onClick={onClose}
          >
            Cancel
          </Button>
        )}
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 transition-all hover:scale-105"
        >
          Request Reservation
        </Button>
      </div>
    </form>
  );

  // Date & Time selection dialog
  const DateTimeDialog = () => (
    <Dialog open={isDateTimeDialogOpen} onOpenChange={setIsDateTimeDialogOpen}>
      <DialogContent className="sm:max-w-[425px] animate-enter">
        <DialogTitle>Select Date & Time</DialogTitle>
        <DialogDescription>Choose your preferred reservation date and time</DialogDescription>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md border mx-auto"
              disabled={(date) => date < new Date()}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center">
              <Clock size={16} className="mr-1" /> Time
            </Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot} className="cursor-pointer">
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button
            onClick={() => setIsDateTimeDialogOpen(false)}
            className="bg-primary hover:bg-primary/90"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Guest selection dialog
  const GuestDialog = () => (
    <Dialog open={isGuestDialogOpen} onOpenChange={setIsGuestDialogOpen}>
      <DialogContent className="sm:max-w-[425px] animate-enter">
        <DialogTitle>Select Number of Guests</DialogTitle>
        <DialogDescription>Choose how many people will be dining</DialogDescription>
        
        <div className="flex items-center justify-center space-x-4 py-8">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={() => partySize > 1 && setPartySize(partySize - 1)}
            disabled={partySize <= 1}
          >
            -
          </Button>
          
          <span className="text-4xl font-semibold w-16 text-center">{partySize}</span>
          
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={() => partySize < 20 && setPartySize(partySize + 1)}
            disabled={partySize >= 20}
          >
            +
          </Button>
        </div>
        
        <p className="text-center text-sm text-muted-foreground">
          {partySize >= 8 ? 
            "Large groups may require a special arrangement. The restaurant will contact you to confirm availability." :
            "Standard reservation for small groups."
          }
        </p>
        
        <div className="flex justify-end">
          <Button
            onClick={() => setIsGuestDialogOpen(false)}
            className="bg-primary hover:bg-primary/90"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Success dialog
  const SuccessDialog = () => (
    <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
      <AlertDialogContent className="animate-enter">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-xl">Reservation Requested!</AlertDialogTitle>
          <div className="mx-auto my-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <AlertDialogDescription className="text-center text-base">
            Your reservation request at <span className="font-semibold">{eateryName}</span> for {partySize} {partySize === 1 ? 'person' : 'people'} on {format(date, 'MMMM d, yyyy')} at {time} has been received. 
            <br /><br />
            The restaurant will contact you shortly to confirm your reservation.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center">
          <Button
            onClick={closeSuccessDialog}
            className="bg-primary hover:bg-primary/90 px-8"
          >
            Done
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );

  // If we're using this in a dialog/modal
  if (!isOpen) {
    return null;
  }

  // If we're using it as a standalone form
  return (
    <>
      <FormContent />
      <DateTimeDialog />
      <GuestDialog />
      <SuccessDialog />
    </>
  );
};

export default TableReservationForm;
