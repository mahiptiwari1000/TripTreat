
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { CalendarIcon, Users, Clock, Leaf, Info } from 'lucide-react';
import { toast } from 'sonner';

interface TourBookingFormProps {
  tourId: number;
  tourName: string;
  defaultDate?: Date;
  pricePerPerson: number;
  onClose?: () => void;
}

const TourBookingForm = ({ tourId, tourName, defaultDate, pricePerPerson, onClose }: TourBookingFormProps) => {
  const [date, setDate] = useState<Date | undefined>(defaultDate || new Date());
  const [numberOfPersons, setNumberOfPersons] = useState<number>(2);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [pickupRequired, setPickupRequired] = useState<boolean>(false);
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [preferredLanguage, setPreferredLanguage] = useState<string>('English');
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  
  const languageOptions = ['English', 'Hindi', 'Manipuri', 'Bengali'];
  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'glutenFree', label: 'Gluten-Free' },
    { id: 'nutFree', label: 'Nut-Free' }
  ];
  
  const totalPrice = pricePerPerson * numberOfPersons;
  
  const handleDietaryChange = (id: string, checked: boolean) => {
    if (checked) {
      setDietaryPreferences(prev => [...prev, id]);
    } else {
      setDietaryPreferences(prev => prev.filter(item => item !== id));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name || !email || !phone || !date) {
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
    
    // Submit booking
    toast.success('Tour booking successful!', {
      description: `Your booking for ${tourName} on ${format(date, 'PPP')} for ${numberOfPersons} people has been confirmed.`,
    });
    
    // Close modal if provided
    if (onClose) {
      onClose();
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold">{tourName}</h3>
          <p className="text-muted-foreground">Please fill in the details to complete your booking</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit mobile number"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Tour Date <span className="text-destructive">*</span></Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => {
                    // Disable dates in the past
                    return date < new Date(new Date().setHours(0, 0, 0, 0));
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center">
              <Users size={16} className="mr-1" />
              Number of Persons <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => numberOfPersons > 1 && setNumberOfPersons(numberOfPersons - 1)}
                disabled={numberOfPersons <= 1}
              >
                -
              </Button>
              <Input
                className="w-16 text-center"
                value={numberOfPersons}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value > 0) {
                    setNumberOfPersons(value);
                  }
                }}
                min={1}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setNumberOfPersons(numberOfPersons + 1)}
              >
                +
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center">
              <Clock size={16} className="mr-1" />
              Preferred Language
            </Label>
            <Select
              value={preferredLanguage}
              onValueChange={setPreferredLanguage}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="flex items-center">
            <Leaf size={16} className="mr-1" />
            Dietary Preferences
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {dietaryOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={dietaryPreferences.includes(option.id)}
                  onCheckedChange={(checked) => 
                    handleDietaryChange(option.id, checked === true)
                  }
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
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pickup"
              checked={pickupRequired}
              onCheckedChange={(checked) => {
                setPickupRequired(checked === true);
                if (!checked) setPickupLocation('');
              }}
            />
            <Label htmlFor="pickup" className="font-medium cursor-pointer">
              I need hotel/accommodation pickup
            </Label>
          </div>
          
          {pickupRequired && (
            <div className="mt-2 pl-6">
              <Label htmlFor="pickupLocation">Pickup Location</Label>
              <Input
                id="pickupLocation"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="Hotel name or address"
                className="mt-1"
              />
            </div>
          )}
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
            placeholder="Any special requirements or questions?"
            rows={3}
          />
        </div>
        
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Price per person:</span>
            <span>₹{pricePerPerson.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Number of persons:</span>
            <span>{numberOfPersons}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4">
        {onClose && (
          <Button type="button" variant="outline" className="w-full" onClick={onClose}>
            Cancel
          </Button>
        )}
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
          Confirm Booking
        </Button>
      </div>
    </form>
  );
};

export default TourBookingForm;
