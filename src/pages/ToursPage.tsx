
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Clock, Users, Star } from 'lucide-react';
import { toast } from 'sonner';

const tours = [
  {
    id: 1,
    name: 'Loktak Lake & Keibul Lamjao Tour',
    location: 'Moirang, Manipur',
    description: 'Explore the iconic Loktak Lake with its floating phumdis and visit Keibul Lamjao National Park to spot the endangered Sangai deer.',
    image: '/lovable-uploads/loktrek.png',
    price: 2500,
    duration: 'Full Day (8 hours)',
    groupSize: '1-8 people',
    rating: 4.9,
    reviews: 32,
    categories: ['Nature', 'Wildlife', 'Photography'],
    languages: ['English', 'Manipuri', 'Hindi']
  },
  {
    id: 2,
    name: 'Imphal Heritage Walk',
    location: 'Imphal, Manipur',
    description: 'Discover the rich history and culture of Imphal through this guided walking tour of historical sites, including Kangla Fort and Ima Market.',
    image: '/lovable-uploads/walktrek.png',
    price: 1500,
    duration: 'Half Day (4 hours)',
    groupSize: '1-10 people',
    rating: 4.7,
    reviews: 24,
    categories: ['Cultural', 'Historical', 'Walking'],
    languages: ['English', 'Manipuri']
  },
  {
    id: 3,
    name: 'Dzukou Valley Trek',
    location: 'Manipur-Nagaland Border',
    description: 'Experience the stunning beauty of Dzukou Valley, known for its vibrant flowers and rolling hills. This trek offers breathtaking views and a unique natural landscape.',
    image: '/lovable-uploads/dztrek.png',
    price: 3500,
    duration: '2 Days',
    groupSize: '2-6 people',
    rating: 4.8,
    reviews: 18,
    categories: ['Adventure', 'Trekking', 'Nature'],
    languages: ['English', 'Manipuri', 'Nagamese']
  },
  {
    id: 4,
    name: 'Shirui Lily Trek',
    location: 'Ukhrul, Manipur',
    description: 'Trek to the habitat of the rare and beautiful Shirui Lily, which blooms only in the Shirui Hills of Manipur during the early monsoon season.',
    image: '/lovable-uploads/shiroitrek.png',
    price: 2800,
    duration: '1 Day',
    groupSize: '2-8 people',
    rating: 4.6,
    reviews: 12,
    categories: ['Adventure', 'Trekking', 'Botany'],
    languages: ['English', 'Manipuri', 'Tangkhul']
  },
  {
    id: 5,
    name: 'Manipuri Culinary Tour',
    location: 'Imphal, Manipur',
    description: 'Sample the flavors of Manipuri cuisine with visits to local markets, street food stalls, and a cooking demonstration of traditional dishes.',
    image: '/lovable-uploads/foodCarousel.png',
    price: 1800,
    duration: 'Half Day (5 hours)',
    groupSize: '2-8 people',
    rating: 4.9,
    reviews: 22,
    categories: ['Food', 'Cultural', 'Market'],
    languages: ['English', 'Manipuri', 'Hindi']
  },
  {
    id: 6,
    name: 'Moreh Border Town Exploration',
    location: 'Moreh, Manipur',
    description: 'Visit the bustling border town of Moreh on the India-Myanmar border, known for its vibrant markets and cultural diversity.',
    image: '/lovable-uploads/mortrek.png',
    price: 3000,
    duration: 'Full Day (10 hours)',
    groupSize: '2-4 people',
    rating: 4.5,
    reviews: 14,
    categories: ['Cultural', 'Market', 'Border'],
    languages: ['English', 'Manipuri', 'Burmese']
  }
];

const ToursPage = () => {
  const [priceRange, setPriceRange] = useState([1000, 4000]);
  const [filteredTours, setFilteredTours] = useState(tours);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  
  const allCategories = Array.from(new Set(tours.flatMap(tour => tour.categories)));
  const durations = ['Half Day', 'Full Day', 'Multi-Day'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filtered = tours.filter(tour => {
      // Filter by price range
      const withinPriceRange = tour.price >= priceRange[0] && tour.price <= priceRange[1];
      
      // Filter by search term
      const matchesSearch = tour.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           tour.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tour.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by categories
      const matchesCategories = selectedCategories.length === 0 || 
                               tour.categories.some(category => selectedCategories.includes(category));
      
      // Filter by duration
      const matchesDuration = selectedDurations.length === 0 || 
                             selectedDurations.some(duration => tour.duration.includes(duration));
      
      return withinPriceRange && matchesSearch && matchesCategories && matchesDuration;
    });
    
    setFilteredTours(filtered);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleDuration = (duration: string) => {
    setSelectedDurations(prev => 
      prev.includes(duration)
        ? prev.filter(d => d !== duration)
        : [...prev, duration]
    );
  };

  const handleBookTour = (tourName: string) => {
    toast.success(`Tour booking request sent!`, {
      description: `Your booking request for ${tourName} has been submitted. We'll contact you shortly with availability details.`,
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[300px] mb-8">
        <img 
          src="/lovable-uploads/tourWhole.png" 
          alt="Manipur Tours" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Tours & Experiences</h1>
          <p className="text-xl text-white/90">Explore the beauty and culture of Manipur with expert local guides</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              
              <form onSubmit={handleSearch}>
                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Search Tours</label>
                  <Input 
                    type="text" 
                    placeholder="Tour name or location" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Price Range (₹{priceRange[0]} - ₹{priceRange[1]})</label>
                  <Slider 
                    value={priceRange as [number, number]} 
                    min={1000} 
                    max={4000} 
                    step={100}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹1000</span>
                    <span>₹4000</span>
                  </div>
                </div>
                
                {/* Categories */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Categories</label>
                  <div className="space-y-2">
                    {allCategories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <label htmlFor={`category-${category}`} className="text-sm">{category}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Duration */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <div className="space-y-2">
                    {durations.map((duration) => (
                      <div key={duration} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`duration-${duration}`}
                          checked={selectedDurations.includes(duration)}
                          onCheckedChange={() => toggleDuration(duration)}
                        />
                        <label htmlFor={`duration-${duration}`} className="text-sm">{duration}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Apply Filters
                </Button>
              </form>
            </div>
          </div>
          
          {/* Tour Listings */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">{filteredTours.length} tours found</h2>
              <p className="text-muted-foreground">Discover unique experiences in Manipur</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {filteredTours.map((tour) => (
                <Card key={tour.id} className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                    <div className="md:col-span-1 relative overflow-hidden h-48 md:h-full">
                      <img 
                        src={tour.image} 
                        alt={tour.name} 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="md:col-span-2 p-6 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{tour.name}</h3>
                        <div className="flex items-center">
                          <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="font-semibold">{tour.rating}</span>
                          <span className="text-muted-foreground">({tour.reviews})</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground mb-2">
                        <MapPin size={16} className="mr-1" />
                        <span>{tour.location}</span>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{tour.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <Clock size={16} className="mr-2 text-muted-foreground" />
                          <span>{tour.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users size={16} className="mr-2 text-muted-foreground" />
                          <span>{tour.groupSize}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2 text-muted-foreground" />
                          <span>Available daily</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                        {tour.categories.map((category, index) => (
                          <Badge key={index} variant="outline">{category}</Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-xl font-bold text-primary">
                          ₹{tour.price}<span className="text-sm text-muted-foreground font-normal">/person</span>
                        </div>
                        <Button className="bg-primary hover:bg-primary/90" onClick={() => handleBookTour(tour.name)}>
                          Book This Tour
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
              
              {filteredTours.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No tours found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters or search criteria</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setPriceRange([1000, 4000]);
                      setSearchTerm('');
                      setSelectedCategories([]);
                      setSelectedDurations([]);
                      setFilteredTours(tours);
                    }}
                  >
                    Reset All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ToursPage;
