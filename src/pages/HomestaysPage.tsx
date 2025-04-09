
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { MapPin, Star, Users, Wifi, Coffee, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';

const homestays = [
  {
    id: 1,
    name: 'Loktak Lake View Homestay',
    location: 'Moirang, Manipur',
    description: 'Enjoy panoramic views of the floating phumdis on Loktak Lake in this traditional Manipuri home.',
    image: '/lovable-uploads/loktakView.webp',
    price: 1200,
    rating: 4.9,
    reviews: 28,
    guests: 4,
    amenities: ['Wifi', 'Traditional Meals', 'Lake View', 'Guided Tours']
  },
  {
    id: 2,
    name: 'Heritage Villa Imphal',
    location: 'Imphal East, Manipur',
    description: 'Experience royal Manipuri hospitality in this heritage home with traditional architecture.',
    image: '/lovable-uploads/h6.avif',
    price: 1500,
    rating: 4.7,
    reviews: 42,
    guests: 6,
    amenities: ['Wifi', 'Garden', 'Traditional Meals', 'Cultural Activities']
  },
  {
    id: 3,
    name: 'Mountain Retreat Ukhrul',
    location: 'Ukhrul, Manipur',
    description: 'Nestled in the hills of Ukhrul, this cozy retreat offers stunning mountain views and tranquility.',
    image: '/lovable-uploads/uhk.jpg',
    price: 950,
    rating: 4.8,
    reviews: 19,
    guests: 3,
    amenities: ['Mountain View', 'Trekking Tours', 'Organic Meals', 'Local Crafts']
  },
  {
    id: 4,
    name: 'Eco Farm Cottage',
    location: 'Bishnupur, Manipur',
    description: 'A sustainable eco-friendly cottage surrounded by organic farms and traditional crafts workshops.',
    image: '/lovable-uploads/h4.avif',
    price: 1100,
    rating: 4.6,
    reviews: 31,
    guests: 2,
    amenities: ['Organic Farm', 'Cooking Classes', 'Wifi', 'Bicycle Rental']
  },
  {
    id: 5,
    name: 'Riverside Haven',
    location: 'Tamenglong, Manipur',
    description: 'Peaceful riverside homestay offering fishing, bamboo rafting, and bird watching experiences.',
    image: '/lovable-uploads/h7.avif',
    price: 1350,
    rating: 4.5,
    reviews: 16,
    guests: 5,
    amenities: ['River View', 'Fishing Equipment', 'Traditional Meals', 'Guided Tours']
  },
  {
    id: 6,
    name: 'Sangai Valley Lodge',
    location: 'Sendra, Manipur',
    description: 'Traditional lodge near Keibul Lamjao National Park with opportunities to spot the rare Sangai deer.',
    image: '/lovable-uploads/h9.avif',
    price: 1600,
    rating: 4.9,
    reviews: 24,
    guests: 4,
    amenities: ['National Park Access', 'Wildlife Tours', 'Traditional Meals', 'Cultural Performances']
  }
];

const HomestaysPage = () => {
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [filteredHomestays, setFilteredHomestays] = useState(homestays);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    wifi: false,
    traditionalMeals: false,
    guidedTours: false,
    culturalActivities: false
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filtered = homestays.filter(homestay => {
      // Filter by price range
      const withinPriceRange = homestay.price >= priceRange[0] && homestay.price <= priceRange[1];
      
      // Filter by search term
      const matchesSearch = homestay.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           homestay.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by amenities
      const hasWifi = !filters.wifi || homestay.amenities.includes('Wifi');
      const hasMeals = !filters.traditionalMeals || homestay.amenities.includes('Traditional Meals');
      const hasTours = !filters.guidedTours || homestay.amenities.includes('Guided Tours');
      const hasCultural = !filters.culturalActivities || homestay.amenities.includes('Cultural Activities');
      
      return withinPriceRange && matchesSearch && hasWifi && hasMeals && hasTours && hasCultural;
    });
    
    setFilteredHomestays(filtered);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[300px] mb-8">
        <img 
          src="/lovable-uploads/0164db78-e122-4072-8dfa-2c6d65efae7b.png" 
          alt="Manipur Homestays" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Homestays in Manipur</h1>
          <p className="text-xl text-white/90">Experience authentic Manipuri hospitality and traditions</p>
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
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <Input 
                    type="text" 
                    placeholder="Location or homestay name" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Price Range (₹{priceRange[0]} - ₹{priceRange[1]})</label>
                  <Slider 
                    value={priceRange as [number, number]} 
                    min={500} 
                    max={2000} 
                    step={100}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹500</span>
                    <span>₹2000</span>
                  </div>
                </div>
                
                {/* Amenities */}
                <div className="space-y-4 mb-6">
                  <label className="block text-sm font-medium mb-2">Amenities</label>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="wifi" 
                      checked={filters.wifi}
                      onCheckedChange={(checked) => setFilters({...filters, wifi: checked as boolean})}
                    />
                    <label htmlFor="wifi" className="text-sm">Wifi</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="traditionalMeals" 
                      checked={filters.traditionalMeals}
                      onCheckedChange={(checked) => setFilters({...filters, traditionalMeals: checked as boolean})}
                    />
                    <label htmlFor="traditionalMeals" className="text-sm">Traditional Meals</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="guidedTours" 
                      checked={filters.guidedTours}
                      onCheckedChange={(checked) => setFilters({...filters, guidedTours: checked as boolean})}
                    />
                    <label htmlFor="guidedTours" className="text-sm">Guided Tours</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="culturalActivities" 
                      checked={filters.culturalActivities}
                      onCheckedChange={(checked) => setFilters({...filters, culturalActivities: checked as boolean})}
                    />
                    <label htmlFor="culturalActivities" className="text-sm">Cultural Activities</label>
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Apply Filters
                </Button>
              </form>
            </div>
          </div>
          
          {/* Homestay Listings */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">{filteredHomestays.length} homestays found</h2>
              <p className="text-muted-foreground">Discover your perfect stay in beautiful Manipur</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredHomestays.map((homestay) => (
                <div key={homestay.id} className="listing-card animate-scale-in">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={homestay.image} 
                      alt={homestay.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 text-sm font-semibold flex items-center">
                      <Star size={16} className="text-yellow-500 mr-1 fill-yellow-500" />
                      {homestay.rating} <span className="text-muted-foreground ml-1">({homestay.reviews})</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold">{homestay.name}</h3>
                      <span className="text-lg font-bold text-primary">₹{homestay.price}<span className="text-sm text-muted-foreground font-normal">/night</span></span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin size={14} className="mr-1" />
                      {homestay.location}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {homestay.description}
                    </p>
                    
                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-muted px-2 py-1 rounded-full flex items-center">
                        <Users size={12} className="mr-1" /> {homestay.guests} guests
                      </span>
                      {homestay.amenities.slice(0, 2).map((amenity, index) => (
                        <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full flex items-center">
                          {amenity === 'Wifi' ? <Wifi size={12} className="mr-1" /> : 
                          amenity === 'Traditional Meals' ? <UtensilsCrossed size={12} className="mr-1" /> : null}
                          {amenity}
                        </span>
                      ))}
                      {homestay.amenities.length > 2 && (
                        <span className="text-xs bg-muted px-2 py-1 rounded-full">
                          +{homestay.amenities.length - 2} more
                        </span>
                      )}
                    </div>
                    
                    <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                      <Link to={`/homestays/${homestay.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomestaysPage;
