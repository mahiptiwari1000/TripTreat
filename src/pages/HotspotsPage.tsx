
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MapPin, Search, ThumbsUp, Camera, Clock, ExternalLink, Map, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import HotspotDetailsDialog from '@/components/HotspotDetailsDialog';

// Define hotspot types
type Hotspot = {
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
};

// Sample images that we have
const availableImages = [
  '/lovable-uploads/d4e3086a-1ee6-4e6f-bbe8-ae7112cfc6f5.png',
  '/lovable-uploads/f13215f5-2e9e-4597-b99e-722351fb1544.png',
  '/lovable-uploads/ca94ce45-398a-48a5-a429-f6ac7b5e80f7.png',
  '/lovable-uploads/0164db78-e122-4072-8dfa-2c6d65efae7b.png',
  '/lovable-uploads/2a0be913-e122-4396-b744-24bc7dea5037.png',
  '/lovable-uploads/e91aeeb5-3d41-4239-9c94-d2f36f9ee75e.png',
  '/lovable-uploads/834fac93-b92b-4423-b982-9a67262496ef.png',
  '/lovable-uploads/6d26ee7a-393a-49f5-9000-cac21a51cd05.png',
  '/lovable-uploads/04bb80f1-f5bf-401e-8e65-e67086760165.png',
  '/lovable-uploads/c5b36d98-5b95-4333-9508-2b9ba95125d1.png'
];

// Hotspots data from the provided information
const hotspots: Hotspot[] = [
  {
    id: 1,
    name: 'Shaheed Minar',
    location: 'Bir Tikendrajit Park, Imphal',
    district: 'Imphal Valley',
    details: 'A memorial honoring Manipuri martyrs of the 1891 Anglo-Manipuri War. This historic monument stands as a symbol of resistance and serves as a reminder of Manipur\'s fight for independence.',
    image: availableImages[0],
    category: 'Historical',
    visitDuration: '1-2 hours',
    bestTime: 'October to March',
    entryFee: 'Free',
    tips: ['Visit early morning to avoid crowds', 'Great for photography', 'Near other central Imphal attractions']
  },
  {
    id: 2,
    name: 'Khwairamband Bazar (Ima Market)',
    location: 'Imphal West (city center)',
    district: 'Imphal Valley',
    details: "Asia's largest all-women-run market with traditional handicrafts, spices, and textiles. This unique market has been operating for over 500 years and showcases the economic empowerment of women in Manipuri society.",
    image: availableImages[1],
    category: 'Cultural',
    visitDuration: '2-3 hours',
    bestTime: 'Any time of year',
    entryFee: 'Free',
    tips: ['Bargaining is acceptable but respectful', 'Best visited in the morning when fresh produce arrives', 'Great for purchasing authentic Manipuri handicrafts']
  },
  {
    id: 3,
    name: 'Manipur Zoological Garden',
    location: 'Lamphelpat, Imphal',
    district: 'Imphal Valley',
    details: 'Home to the endangered Sangai deer and other wildlife. The zoo is involved in conservation efforts for several endangered species native to the northeast region of India.',
    image: availableImages[2],
    category: 'Wildlife',
    visitDuration: '3-4 hours',
    bestTime: 'November to February',
    entryFee: '₹50 for adults, ₹20 for children',
    tips: ['Visit during feeding times for best animal viewing', 'Wear comfortable walking shoes', 'Photography allowed with small fee']
  },
  {
    id: 4,
    name: 'Khonghampat Orchidarium',
    location: '10 km from Imphal (NH-39)',
    district: 'Imphal Valley',
    details: 'Houses over 110 rare orchid species, including endemic varieties. This botanical garden is a paradise for nature lovers and showcases the rich biodiversity of the region.',
    image: availableImages[3],
    category: 'Nature',
    visitDuration: '2-3 hours',
    bestTime: 'March to May (flowering season)',
    entryFee: '₹30',
    tips: ['Bring a camera for close-up flower photography', 'Visit during peak blooming season', 'Guided tours available']
  },
  {
    id: 5,
    name: 'Sadu Chiru Waterfall',
    location: 'Tiddim Road (NH-150), 20 km from Imphal',
    district: 'Imphal Valley',
    details: 'A three-tiered waterfall surrounded by lush foothills. The cascading water creates a serene atmosphere perfect for nature enthusiasts and photographers.',
    image: availableImages[4],
    category: 'Nature',
    visitDuration: 'Half day',
    bestTime: 'June to September (monsoon)',
    entryFee: 'Free',
    tips: ['Wear appropriate footwear for slippery terrain', 'Best visited during monsoon for full water flow', 'Picnic spots available nearby']
  },
  {
    id: 6,
    name: 'Waithou Lake',
    location: '16 km from Imphal',
    district: 'Thoubal District',
    details: 'A serene lake ideal for birdwatching and picnics. The surrounding hills and vegetation create a picturesque setting perfect for relaxation.',
    image: availableImages[6],
    category: 'Nature',
    visitDuration: '2-3 hours',
    bestTime: 'November to February',
    entryFee: 'Free',
    tips: ['Bring binoculars for birdwatching', 'Early morning visits recommended for wildlife', 'Boat rides available']
  },
  {
    id: 7,
    name: 'Khangkhui Cave',
    location: '20 km from Ukhrul town',
    district: 'Ukhrul District',
    details: 'Ancient limestone caves with WWII bunker remnants. These natural caves have historical significance and feature interesting limestone formations.',
    image: availableImages[7],
    category: 'Adventure',
    visitDuration: '2-3 hours',
    bestTime: 'October to April',
    entryFee: '₹50',
    tips: ['Bring a flashlight/torch', 'Wear sturdy shoes', 'Local guide recommended']
  },
  {
    id: 8,
    name: 'Tharon Cave',
    location: '30 km from Tamenglong',
    district: 'Tamenglong District',
    details: 'A 650-meter-long cave system with carvings linked to Vietnamese Hovnanian culture. This archaeological site offers insights into ancient civilizations.',
    image: availableImages[0],
    category: 'Adventure',
    visitDuration: 'Half day',
    bestTime: 'November to February',
    entryFee: '₹100',
    tips: ['Local guide mandatory', 'Carry water and snacks', 'Moderate physical fitness required']
  },
  {
    id: 9,
    name: 'Andro Village',
    location: '25 km from Imphal',
    district: 'Offbeat Gems',
    details: 'Famous for traditional pottery and a cultural complex with tribal house replicas. This village offers an authentic glimpse into the traditional lifestyles of Manipuri communities.',
    image: availableImages[2],
    category: 'Cultural',
    visitDuration: 'Half day',
    bestTime: 'October to March',
    entryFee: '₹50 for cultural complex',
    tips: ['Pottery demonstrations available', 'Support local artisans by purchasing crafts', 'Respectful photography encouraged']
  },
  {
    id: 10,
    name: 'Singda Dam',
    location: '26 km from Imphal',
    district: 'Offbeat Gems',
    details: "The world's highest mud dam, surrounded by terraced paddy fields. This engineering marvel offers breathtaking views of the surrounding landscape.",
    image: availableImages[3],
    category: 'Engineering',
    visitDuration: '2-3 hours',
    bestTime: 'November to February',
    entryFee: 'Free',
    tips: ['Sunset views are spectacular', 'Photography permitted', 'Limited facilities so bring supplies']
  },
];

// Category filters
const categories = ['All', 'Historical', 'Cultural', 'Nature', 'Wildlife', 'Adventure', 'Engineering'];

// Districts for filtering
const districts = ['All Districts', 'Imphal Valley', 'Bishnupur District', 'Thoubal District', 'Ukhrul District', 'Tamenglong District', 'Churachandpur District', 'Senapati District', 'Offbeat Gems'];

const HotspotsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDistrict, setActiveDistrict] = useState('All Districts');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHotspots, setFilteredHotspots] = useState(hotspots);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [itineraryItems, setItineraryItems] = useState<Hotspot[]>([]);
  
  useEffect(() => {
    // Load saved itinerary items on component mount
    const savedItems = localStorage.getItem('manipurItinerary');
    if (savedItems) {
      setItineraryItems(JSON.parse(savedItems));
    }
  }, []);

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
    filterHotspots(value, activeDistrict, searchTerm);
  };

  const handleDistrictChange = (value: string) => {
    setActiveDistrict(value);
    filterHotspots(activeCategory, value, searchTerm);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterHotspots(activeCategory, activeDistrict, term);
  };

  const filterHotspots = (category: string, district: string, term: string) => {
    let filtered = hotspots;

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter(hotspot => hotspot.category === category);
    }

    // Filter by district
    if (district !== 'All Districts') {
      filtered = filtered.filter(hotspot => hotspot.district === district);
    }

    // Filter by search term
    if (term) {
      filtered = filtered.filter(hotspot => 
        hotspot.name.toLowerCase().includes(term.toLowerCase()) || 
        hotspot.details.toLowerCase().includes(term.toLowerCase()) ||
        hotspot.location.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredHotspots(filtered);
  };

  const handleSeeDetails = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);
    setIsDetailsOpen(true);
  };
  
  const handleAddToItinerary = (hotspot: Hotspot) => {
    const updatedItinerary = [...itineraryItems];
    
    // Check if the hotspot is already in the itinerary
    const existingIndex = updatedItinerary.findIndex(item => item.id === hotspot.id);
    
    if (existingIndex === -1) {
      // Add to itinerary if not already there
      updatedItinerary.push(hotspot);
      setItineraryItems(updatedItinerary);
      
      // Save to localStorage
      localStorage.setItem('manipurItinerary', JSON.stringify(updatedItinerary));
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[300px] mb-8">
        <img 
          src="/lovable-uploads/6d26ee7a-393a-49f5-9000-cac21a51cd05.png" 
          alt="Manipur Hotspots" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 animate-fade-in">Manipur Hotspots</h1>
          <p className="text-xl text-white/90 animate-fade-in transition-all duration-500 delay-150">Discover the hidden gems and popular attractions</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 animate-fade-in">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative md:max-w-sm w-full transition-all duration-300 hover:scale-[1.01]">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                placeholder="Search hotspots..." 
                className="pl-9 transition-shadow duration-300 focus:ring-2 focus:ring-primary/20"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <select 
                className="px-4 py-2 rounded-md border border-input bg-background text-sm transition-all duration-300 hover:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                value={activeDistrict}
                onChange={(e) => handleDistrictChange(e.target.value)}
              >
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            
            <div className="ml-auto">
              <Button
                asChild
                className="transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Link to="/itinerary">
                  <Map size={16} />
                  View My Itinerary
                  {itineraryItems.length > 0 && (
                    <Badge className="ml-1 bg-secondary text-secondary-foreground">{itineraryItems.length}</Badge>
                  )}
                </Link>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="All" value={activeCategory} onValueChange={handleCategoryChange}>
            <TabsList className="inline-flex h-auto flex-wrap gap-2 mb-6 bg-transparent">
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 hover:scale-105"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map(category => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredHotspots.map((hotspot) => (
                    <Card key={hotspot.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={hotspot.image} 
                          alt={hotspot.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <Badge className="absolute top-3 left-3 bg-primary animate-fade-in">
                          {hotspot.category}
                        </Badge>
                        <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground animate-fade-in">
                          {hotspot.district}
                        </Badge>
                      </div>
                      
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{hotspot.name}</h3>
                        
                        <div className="flex items-center text-muted-foreground mb-3">
                          <MapPin size={14} className="mr-1" />
                          <span className="text-sm">{hotspot.location}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="flex items-center text-sm">
                            <Clock size={14} className="mr-1 text-muted-foreground" />
                            <span>{hotspot.visitDuration}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Camera size={14} className="mr-1 text-muted-foreground" />
                            <span>Entry: {hotspot.entryFee}</span>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {hotspot.details}
                        </p>
                        
                        {hotspot.tips && hotspot.tips.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center mb-2">
                              <ThumbsUp size={14} className="text-primary mr-1" />
                              <span className="text-sm font-medium">Travel Tips:</span>
                            </div>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {hotspot.tips.slice(0, 2).map((tip, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="mr-1">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                              {hotspot.tips.length > 2 && (
                                <li className="text-primary cursor-pointer hover:underline">
                                  + {hotspot.tips.length - 2} more tips
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                        
                        <Button 
                          className="w-full bg-primary hover:bg-primary/90 text-white mt-2 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                          onClick={() => handleSeeDetails(hotspot)}
                        >
                          See Details
                          <Info size={14} />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {filteredHotspots.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No hotspots found</h3>
                    <p className="text-muted-foreground mb-4">Try changing your search criteria or filters</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchTerm('');
                        setActiveCategory('All');
                        setActiveDistrict('All Districts');
                        setFilteredHotspots(hotspots);
                      }}
                      className="transition-all duration-300 hover:scale-105"
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        {/* Information Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Explore Manipur's Treasures</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              From historical monuments to natural wonders, Manipur offers a diverse range of attractions for every type of traveler.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="transition-all duration-500 hover:scale-[1.02]">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Clock size={18} className="mr-2 text-primary" />
                Best Time to Visit
              </h3>
              <p className="text-muted-foreground mb-4">
                October to March is generally considered the best time to visit Manipur, as the weather is pleasant and comfortable for sightseeing and outdoor activities.
              </p>
              <p className="text-muted-foreground">
                The region experiences monsoons from June to September, which can make travel challenging but also brings lush greenery and flowing waterfalls.
              </p>
            </div>
            
            <div className="transition-all duration-500 hover:scale-[1.02]">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <ThumbsUp size={18} className="mr-2 text-primary" />
                Travel Tips
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Carry valid ID proof as some areas might require permits</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Respect local customs and dress modestly when visiting religious sites</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Hire local guides for enhanced experience and supporting local economy</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Book accommodations in advance during peak season (October-February)</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-8 text-center transition-all duration-500 hover:bg-muted/50">
            <h3 className="text-2xl font-bold mb-4">Create Your Custom Tour</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Add places to your itinerary, organize them in your preferred order, and plan the perfect Manipur tour tailored to your interests.
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 flex items-center gap-2"
              asChild
            >
              <Link to="/itinerary">
                <Map size={16} />
                Go to My Itinerary
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Details Dialog */}
      {selectedHotspot && (
        <HotspotDetailsDialog 
          hotspot={selectedHotspot}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          onAddToItinerary={handleAddToItinerary}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default HotspotsPage;
