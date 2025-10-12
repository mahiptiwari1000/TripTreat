import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import {
  MapPin,
  Calendar as CalendarIcon,
  Clock,
  Users,
  ArrowRight,
  Car,
  Trash2,
  Route,
  Plus,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { toast } from 'sonner';

// This would typically come from context or Redux in a real app
const getItineraryFromStorage = () => {
  const saved = localStorage.getItem('manipurItinerary');
  return saved ? JSON.parse(saved) : [];
};

const saveItineraryToStorage = items => {
  localStorage.setItem('manipurItinerary', JSON.stringify(items));
};

// Updated transportation cost rates per km
const TRANSPORT_RATES = {
  car: 25, // ₹25 per km for private car (most expensive)
  taxi: 20, // ₹20 per km for taxi (moderately priced)
  bus: 8, // ₹8 per km for shared bus (cheapest)
};

// Updated guide cost - fixed ₹1000
const GUIDE_COST = 1000; // ₹1000 flat fee

const ItineraryPage = () => {
  const [itineraryItems, setItineraryItems] = useState([]);
  const [date, setDate] = useState(new Date());
  const [transportMode, setTransportMode] = useState('car');
  const [guests, setGuests] = useState('2');
  const [includeGuide, setIncludeGuide] = useState(false);
  const [optimizedRoute, setOptimizedRoute] = useState(null);
  const [specialRequests, setSpecialRequests] = useState('');

  useEffect(() => {
    // Load saved itinerary items on component mount
    const savedItems = getItineraryFromStorage();
    setItineraryItems(savedItems);

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleRemoveItem = id => {
    const updatedItems = itineraryItems.filter(item => item.id !== id);
    setItineraryItems(updatedItems);
    saveItineraryToStorage(updatedItems);
    toast.success('Item removed from your itinerary');
  };

  const handleMoveItem = (index, direction) => {
    const newItems = [...itineraryItems];
    if (direction === 'up' && index > 0) {
      [newItems[index], newItems[index - 1]] = [
        newItems[index - 1],
        newItems[index],
      ];
    } else if (direction === 'down' && index < newItems.length - 1) {
      [newItems[index], newItems[index + 1]] = [
        newItems[index + 1],
        newItems[index],
      ];
    }
    setItineraryItems(newItems);
    saveItineraryToStorage(newItems);
  };

  const calculateOptimalRoute = () => {
    // In a real app, this would call a Google Maps API to calculate the optimal route
    toast.info('Calculating optimal route...');

    setTimeout(() => {
      // Calculate a more realistic distance based on number of locations
      const locationCount = itineraryItems.length;
      const baseDistance = 15; // 15 km average between locations
      const totalDistance = Math.floor(
        baseDistance * (locationCount - 1) * (1 + Math.random() * 0.4)
      ); // Adds some randomness

      // More realistic time calculation
      // Assume average speed: car: 45 km/h, taxi: 40 km/h, bus: 30 km/h in Manipur's roads
      const averageSpeeds = {
        car: 45,
        taxi: 40,
        bus: 30,
      };
      const averageSpeed = averageSpeeds[transportMode];
      const totalTime = +(totalDistance / averageSpeed).toFixed(1); // In hours

      // Calculate cost based on distance and transport mode
      const costPerKm = TRANSPORT_RATES[transportMode];
      const baseCost = totalDistance * costPerKm;

      // Add fuel surcharge, driver fees, etc. for more realistic pricing
      const surcharges = {
        car: 500, // Premium service surcharge for private car
        taxi: 300, // Standard taxi surcharge
        bus: 100, // Minimal surcharge for shared bus
      };
      const surcharge = surcharges[transportMode];
      const totalCost = Math.ceil(baseCost + surcharge);

      setOptimizedRoute({
        distance: totalDistance,
        time: totalTime,
        costPerKm: costPerKm,
        baseCost: baseCost,
        totalCost: totalCost,
      });

      toast.success('Optimal route calculated!');
    }, 1500);
  };

  const calculateTotalCost = () => {
    if (!optimizedRoute) return 1000 + (includeGuide ? GUIDE_COST : 0);

    const transportCost = optimizedRoute.totalCost;
    const guideCost = includeGuide ? GUIDE_COST : 0;

    return transportCost + guideCost;
  };

  const handleBookTour = () => {
    toast.success('Tour booking successful!', {
      description: `Your custom tour for ${format(date, 'PPP')} with ${guests} guests has been booked.`,
    });
  };

  // Fixed the checkbox handler to properly handle the checked state
  const handleGuideChange = checked => {
    setIncludeGuide(checked === true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[250px] mb-8">
        <img
          src="/file-uploads/itecar.jpg"
          alt="My Manipur Itinerary"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 animate-fade-in">
            My Itinerary
          </h1>
          <p className="text-xl text-white/90 animate-fade-in transition-all duration-500 delay-150">
            Plan your perfect Manipur tour
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-8">
          {/* Left column: Itinerary items */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Your Saved Places</h2>
              {itineraryItems.length > 1 && (
                <Button
                  onClick={calculateOptimalRoute}
                  className="bg-primary hover:bg-primary/90 flex items-center gap-2 glow-on-hover"
                >
                  <Route size={16} />
                  Find Optimal Route
                </Button>
              )}
            </div>

            {itineraryItems.length === 0 ? (
              <Card className="bg-muted/30 hover-scale light-sweep">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center">
                      <MapPin size={24} className="text-muted-foreground" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Your itinerary is empty
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Add places from the Hotspots page to create your custom tour
                  </p>
                  <Button asChild className="glow-on-hover">
                    <a href="/hotspots" className="flex items-center gap-2">
                      <Plus size={16} />
                      Explore Hotspots
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {itineraryItems.map((item, index) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden hover:shadow-md transition-all hover-scale light-sweep"
                  >
                    <div className="grid sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr]">
                      <div className="h-full">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium">{item.name}</h3>
                            <div className="flex items-center text-muted-foreground text-sm mb-2">
                              <MapPin size={14} className="mr-1" />
                              {item.location}
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              disabled={index === 0}
                              onClick={() => handleMoveItem(index, 'up')}
                            >
                              <ChevronUp size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              disabled={index === itineraryItems.length - 1}
                              onClick={() => handleMoveItem(index, 'down')}
                            >
                              <ChevronDown size={14} />
                            </Button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <Badge variant="outline">{item.category}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 flex items-center gap-1"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 size={14} />
                            Remove
                          </Button>
                        </div>

                        {index < itineraryItems.length - 1 && (
                          <div className="flex items-center justify-center my-2">
                            <ArrowRight
                              size={14}
                              className="text-muted-foreground"
                            />
                          </div>
                        )}
                      </CardContent>
                    </div>
                  </Card>
                ))}

                {optimizedRoute && (
                  <Card className="bg-muted/30 p-4 animate-fade-in glow-border-success">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Route size={20} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Optimal Route</h3>
                          <p className="text-sm text-muted-foreground">
                            Calculated for efficiency
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 flex-wrap">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Distance
                          </p>
                          <p className="font-medium">
                            {optimizedRoute.distance} km
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Travel Time
                          </p>
                          <p className="font-medium">
                            ~{optimizedRoute.time} hours
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Rate</p>
                          <p className="font-medium">
                            ₹{optimizedRoute.costPerKm}/km
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Transport Cost
                          </p>
                          <p className="font-medium">
                            ₹{optimizedRoute.totalCost}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            )}
          </div>

          {/* Right column: Booking options */}
          <div>
            <Card className="sticky top-4 glow-border-primary">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">
                  Book Your Custom Tour
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tour Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 pointer-events-auto"
                        align="start"
                      >
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
                    <label className="text-sm font-medium">
                      Number of Travelers
                    </label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select number of guests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 person</SelectItem>
                        <SelectItem value="2">2 people</SelectItem>
                        <SelectItem value="3">3 people</SelectItem>
                        <SelectItem value="4">4 people</SelectItem>
                        <SelectItem value="5">5 people</SelectItem>
                        <SelectItem value="6">6 people</SelectItem>
                        <SelectItem value="7">7+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Transportation Mode
                    </label>
                    <Select
                      value={transportMode}
                      onValueChange={setTransportMode}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select transportation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="car">
                          Private Car (₹25/km)
                        </SelectItem>
                        <SelectItem value="taxi">Taxi (₹20/km)</SelectItem>
                        <SelectItem value="bus">Shared Bus (₹8/km)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="includeGuide"
                      checked={includeGuide}
                      onCheckedChange={handleGuideChange}
                    />
                    <label
                      htmlFor="includeGuide"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Include local guide (₹{GUIDE_COST} flat fee)
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Special Requests
                    </label>
                    <Input
                      placeholder="Any special requirements?"
                      value={specialRequests}
                      onChange={e => setSpecialRequests(e.target.value)}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Transport cost</span>
                      <span>
                        ₹{optimizedRoute ? optimizedRoute.totalCost : 1000}
                      </span>
                    </div>
                    {includeGuide && (
                      <div className="flex justify-between">
                        <span className="font-medium">Guide fee</span>
                        <span>₹{GUIDE_COST}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₹{calculateTotalCost()}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90 glow-on-hover"
                    onClick={handleBookTour}
                    disabled={itineraryItems.length === 0}
                  >
                    Book Custom Tour
                  </Button>

                  {itineraryItems.length === 0 && (
                    <p className="text-xs text-center text-muted-foreground">
                      Add places to your itinerary first
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ItineraryPage;
