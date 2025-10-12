import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Car,
  Truck,
  Check,
  Calendar,
  Clock,
  MapPin,
  Users,
  Phone,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TransportBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  transportType: string | null;
}

const TransportBookingDialog = ({
  isOpen,
  onClose,
  transportType,
}: TransportBookingDialogProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState<Date>();
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [submitted, setSubmitted] = useState(false);

  const isCabBooking = transportType === 'cab';
  const title = isCabBooking ? 'Book a Cab' : 'Rent a Vehicle';
  const Icon = isCabBooking ? Car : Truck;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      toast.success('Request submitted successfully!', {
        description: `We'll contact you shortly to confirm your ${isCabBooking ? 'cab booking' : 'vehicle rental'}.`,
      });
      onClose();
      resetForm();
    }, 1500);
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setDate(undefined);
    setPickupLocation('');
    setDropLocation('');
    setPassengers('1');
    setSubmitted(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => {
        if (!open) resetForm();
        onClose();
      }}
    >
      <DialogContent className="sm:max-w-md md:max-w-lg animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Icon className="h-6 w-6 text-primary" />
            {title}
          </DialogTitle>
          <DialogDescription>
            {isCabBooking
              ? 'Fill in the details below to book a cab in Manipur'
              : 'Complete this form to request a vehicle rental'}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Request Submitted!</h3>
            <p className="text-muted-foreground">
              We've received your{' '}
              {isCabBooking ? 'cab booking' : 'vehicle rental'} request. Our
              team will get in touch with you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={date => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pickup">Pickup Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="pickup"
                  className="pl-10"
                  placeholder="Enter pickup location"
                  value={pickupLocation}
                  onChange={e => setPickupLocation(e.target.value)}
                  required
                />
              </div>
            </div>

            {isCabBooking && (
              <div className="space-y-2">
                <Label htmlFor="drop">Drop Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="drop"
                    className="pl-10"
                    placeholder="Enter destination"
                    value={dropLocation}
                    onChange={e => setDropLocation(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isCabBooking ? (
                <div className="space-y-2">
                  <Label htmlFor="passengers">Number of Passengers</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="passengers"
                      className="pl-10"
                      type="number"
                      min="1"
                      max="10"
                      value={passengers}
                      onChange={e => setPassengers(e.target.value)}
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="vehicle-type">Vehicle Type</Label>
                  <select
                    id="vehicle-type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    required
                  >
                    <option value="">Select vehicle type</option>
                    <option value="hatchback">Hatchback</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="minivan">Minivan</option>
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="duration">
                  {isCabBooking ? 'Trip Type' : 'Rental Duration'}
                </Label>
                <select
                  id="duration"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  required
                >
                  {isCabBooking ? (
                    <>
                      <option value="">Select trip type</option>
                      <option value="one-way">One-way trip</option>
                      <option value="round">Round trip</option>
                      <option value="hourly">Hourly rental</option>
                    </>
                  ) : (
                    <>
                      <option value="">Select duration</option>
                      <option value="daily">Daily (24 hours)</option>
                      <option value="weekly">Weekly (7 days)</option>
                      <option value="monthly">Monthly (30 days)</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="w-full md:w-auto"
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full md:w-auto bg-primary">
                Submit Request
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TransportBookingDialog;
