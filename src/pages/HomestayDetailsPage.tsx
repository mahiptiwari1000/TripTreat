import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Star, Wifi, Coffee, UtensilsCrossed, Image, MapIcon, MessageCircle, Calendar as CalendarIcon, BedDouble, Check } from 'lucide-react';
import { toast } from 'sonner';
import { format, addDays, differenceInDays } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const homestayData = {
  id: 1,
  name: 'Loktak Lake View Homestay',
  location: 'Moirang, Manipur',
  description: 'Enjoy panoramic views of the floating phumdis on Loktak Lake in this traditional Manipuri home. This authentic homestay offers a unique opportunity to experience the local culture and cuisine while enjoying breathtaking views of Loktak Lake, the largest freshwater lake in Northeast India. The homestay is owned by a warm, welcoming family who will introduce you to traditional Manipuri hospitality.',
  images: [
    '/lovable-uploads/loktakView.webp',
    '/lovable-uploads/loktakComplete.png',
    '/lovable-uploads/h1.jpg',
    '/lovable-uploads/loktakView.webp',
    '/lovable-uploads/lok1.jpg',
  ],
  price: 1200,
  rating: 4.9,
  reviews: 28,
  guests: 4,
  bedrooms: 2,
  beds: 3,
  bathrooms: 1,
  rooms: [
    { id: 1, name: 'Lake View Room', capacity: 2, price: 1200 },
    { id: 2, name: 'Garden Room', capacity: 2, price: 1000 }
  ],
  amenities: [
    'Wifi', 
    'Traditional Meals', 
    'Lake View', 
    'Guided Tours',
    'Free Parking',
    'Hot Water',
    'Kitchen Access',
    'Traditional Clothing Experience'
  ],
  host: {
    name: 'Rajkumar Singh',
    image: 'https://i.pravatar.cc/150?img=68',
    joinedDate: 'January 2020',
    languages: ['English', 'Manipuri', 'Hindi'],
    responseRate: 98
  },
  location_description: 'Located on the banks of the beautiful Loktak Lake, just 48 km from Imphal. The homestay is a short 10-minute boat ride from the main shore, offering spectacular views and peaceful surroundings.',
  reviews_list: [
    {
      id: 1,
      name: 'Priya Sharma',
      avatar: 'https://i.pravatar.cc/150?img=32',
      date: '2 months ago',
      rating: 5,
      comment: "Our stay at the Loktak Lake View Homestay was magical. The hosts treated us like family and showed us the real beauty of Manipur. The floating phumdis are a must-see!"
    },
    {
      id: 2,
      name: 'Rahul Mehta',
      avatar: 'https://i.pravatar.cc/150?img=53',
      date: '3 months ago',
      rating: 4,
      comment: "Great location and very authentic experience. The traditional meals were delicious and the host was very knowledgeable about the area. The boat tour of the lake was the highlight of our trip."
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=47',
      date: '4 months ago',
      rating: 5,
      comment: "This homestay gave us authentic insights into Manipuri culture. The traditional dance performance arranged by our host was the highlight of our trip. Would highly recommend for anyone looking to experience the real Manipur."
    }
  ]
};

const otherHomestaysData = [
  {
    id: 2,
    name: 'Heritage Villa Imphal',
    location: 'Imphal East, Manipur',
    description: 'Experience royal Manipuri hospitality in this heritage home with traditional architecture.',
    image: '/lovable-uploads/h6.avif',
    price: 1500,
    rating: 4.7
  },
  {
    id: 3,
    name: 'Mountain Retreat Ukhrul',
    location: 'Ukhrul, Manipur',
    description: 'Nestled in the hills of Ukhrul, this cozy retreat offers stunning mountain views and tranquility.',
    image: '/lovable-uploads/uhk.jpg',
    price: 950,
    rating: 4.8
  },
  {
    id: 4,
    name: 'Eco Farm Cottage',
    location: 'Bishnupur, Manipur',
    description: 'A sustainable eco-friendly cottage surrounded by organic farms and traditional crafts workshops.',
    image: '/lovable-uploads/h4.avif',
    price: 1100,
    rating: 4.6
  }
];

const HomestayDetailsPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(addDays(new Date(), 3));
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(homestayData.rooms[0]);

  const homestay = homestayData;
  const otherHomestays = otherHomestaysData;

  const stayDuration = checkInDate && checkOutDate ? differenceInDays(checkOutDate, checkInDate) : 0;
  const roomPrice = selectedRoom.price;
  const subtotal = roomPrice * rooms * stayDuration;
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  const handleBooking = () => {
    if (!checkInDate || !checkOutDate) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    if (!acceptedPolicy) {
      toast.error("Please accept the booking policy");
      return;
    }
    
    toast.success("Booking request sent successfully!", {
      description: `${guests} guest(s) for ${stayDuration} nights from ${format(checkInDate, 'PPP')} to ${format(checkOutDate, 'PPP')}. The host will contact you shortly.`,
    });
  };

  const handleInquiry = () => {
    toast.success("Your inquiry has been sent!", {
      description: "The host will respond to your questions within 24 hours.",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{homestay.name}</h1>
          <div className="flex items-center mt-2 text-sm">
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
              <span className="font-semibold">{homestay.rating}</span>
              <span className="mx-1 text-muted-foreground">({homestay.reviews} reviews)</span>
            </div>
            <span className="mx-2">•</span>
            <div className="flex items-center text-muted-foreground">
              <MapPin size={16} className="mr-1" />
              {homestay.location}
            </div>
          </div>
        </div>
        
        {showAllImages ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
            {homestay.images.map((image, index) => (
              <div key={index} className={`${index === 0 ? 'md:col-span-2 md:row-span-2' : ''} overflow-hidden rounded-lg`}>
                <img 
                  src={image} 
                  alt={`${homestay.name} - Image ${index + 1}`} 
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
            <Button 
              variant="outline" 
              className="absolute top-4 right-8 bg-white/80 backdrop-blur-sm"
              onClick={() => setShowAllImages(false)}
            >
              Close Gallery
            </Button>
          </div>
        ) : (
          <div className="relative grid grid-cols-4 gap-2 mb-8">
            <div className="col-span-4 md:col-span-2 row-span-2 overflow-hidden rounded-lg">
              <img 
                src={homestay.images[selectedImage]} 
                alt={homestay.name} 
                className="w-full h-[400px] object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                onClick={() => setShowAllImages(true)}
              />
            </div>
            {homestay.images.slice(1, 5).map((image, index) => (
              <div key={index} className="col-span-2 md:col-span-1 overflow-hidden rounded-lg hidden md:block">
                <img 
                  src={image} 
                  alt={`${homestay.name} - Image ${index + 1}`} 
                  className="w-full h-[198px] object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                  onClick={() => setSelectedImage(index + 1)}
                />
              </div>
            ))}
            <Button 
              variant="outline" 
              className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm"
              onClick={() => setShowAllImages(true)}
            >
              <Image size={16} className="mr-2" /> Show All Photos
            </Button>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between pb-6 border-b">
              <div>
                <h2 className="text-xl font-semibold">Hosted by {homestay.host.name}</h2>
                <p className="text-muted-foreground">
                  {homestay.guests} guests • {homestay.bedrooms} bedrooms • {homestay.beds} beds • {homestay.bathrooms} bathrooms
                </p>
              </div>
              <img 
                src={homestay.host.image} 
                alt={homestay.host.name}
                className="w-12 h-12 rounded-full object-cover" 
              />
            </div>
            
            <div className="py-6 border-b">
              <h3 className="text-lg font-semibold mb-4">About this place</h3>
              <p className="text-muted-foreground">{homestay.description}</p>
            </div>
            
            <div className="py-6 border-b">
              <h3 className="text-lg font-semibold mb-4">What this place offers</h3>
              <div className="grid grid-cols-2 gap-4">
                {homestay.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    {amenity === 'Wifi' ? <Wifi size={18} className="mr-2 text-muted-foreground" /> : 
                     amenity === 'Traditional Meals' ? <UtensilsCrossed size={18} className="mr-2 text-muted-foreground" /> :
                     <Coffee size={18} className="mr-2 text-muted-foreground" />}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="py-6 border-b">
              <h3 className="text-lg font-semibold mb-4">Available Room Types</h3>
              <div className="space-y-4">
                {homestay.rooms.map((room) => (
                  <div 
                    key={room.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedRoom.id === room.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
                    onClick={() => setSelectedRoom(room)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{room.name}</h4>
                        <p className="text-sm text-muted-foreground">Up to {room.capacity} guests</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">₹{room.price}<span className="text-sm font-normal">/night</span></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Tabs defaultValue="reviews" className="py-6">
              <TabsList className="mb-4">
                <TabsTrigger value="reviews">Reviews ({homestay.reviews})</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="host">Host</TabsTrigger>
              </TabsList>
              
              <TabsContent value="reviews">
                <div className="flex items-center mb-4">
                  <Star size={24} className="text-yellow-500 fill-yellow-500 mr-2" />
                  <span className="text-xl font-semibold">{homestay.rating}</span>
                  <span className="ml-1 text-muted-foreground">({homestay.reviews} reviews)</span>
                </div>
                
                <div className="space-y-6">
                  {homestay.reviews_list.map((review) => (
                    <div key={review.id} className="pb-6 border-b last:border-0">
                      <div className="flex items-center mb-3">
                        <img 
                          src={review.avatar} 
                          alt={review.name}
                          className="w-10 h-10 rounded-full object-cover mr-3" 
                        />
                        <div>
                          <p className="font-semibold">{review.name}</p>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="location">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Where you'll be</h3>
                  <p className="text-muted-foreground mb-4">{homestay.location_description}</p>
                  
                  <div className="rounded-lg overflow-hidden border h-[300px] bg-muted/30 flex items-center justify-center">
                    <div className="text-center">
                      <MapIcon size={48} className="mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">Interactive map would be displayed here</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => toast.info("Map view would open in a larger view")}
                      >
                        View Larger Map
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="host">
                <div className="flex items-start mb-4">
                  <img 
                    src={homestay.host.image} 
                    alt={homestay.host.name}
                    className="w-16 h-16 rounded-full object-cover mr-4" 
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{homestay.host.name}</h3>
                    <p className="text-muted-foreground">Host since {homestay.host.joinedDate}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-lg text-muted-foreground mb-2">
                      <Star size={16} className="text-yellow-500 fill-yellow-500 inline mr-2" />
                      {homestay.host.responseRate}% response rate
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {homestay.host.languages.map((language, index) => (
                        <Badge key={index} variant="outline">{language}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={handleInquiry}
                  >
                    <MessageCircle size={16} className="mr-2" />
                    Contact Host
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold">₹{selectedRoom.price}</span>
                    <span className="text-muted-foreground"> / night</span>
                  </div>
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
                    <span>{homestay.rating}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div>
                    <Label className="block text-sm font-medium mb-2">Check-in / Check-out dates</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={`w-full justify-start text-left ${!checkInDate && 'text-muted-foreground'}`}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkInDate ? format(checkInDate, 'PP') : <span>Check-in</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={checkInDate}
                            onSelect={setCheckInDate}
                            className="p-3 pointer-events-auto"
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={`w-full justify-start text-left ${!checkOutDate && 'text-muted-foreground'}`}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkOutDate ? format(checkOutDate, 'PP') : <span>Check-out</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={checkOutDate}
                            onSelect={setCheckOutDate}
                            className="p-3 pointer-events-auto"
                            disabled={(date) => checkInDate ? date <= checkInDate : date <= new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    {stayDuration > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {stayDuration} {stayDuration === 1 ? 'night' : 'nights'} stay
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium mb-2">Rooms</Label>
                    <div className="flex items-center border rounded-md p-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                        disabled={rooms <= 1}
                      >
                        -
                      </Button>
                      <div className="mx-4 font-medium flex items-center">
                        <BedDouble size={16} className="mr-2 text-muted-foreground" />
                        {rooms} Room{rooms !== 1 ? 's' : ''}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setRooms(Math.min(homestay.rooms.length, rooms + 1))}
                        disabled={rooms >= homestay.rooms.length}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium mb-2">Guests</Label>
                    <div className="flex items-center border rounded-md p-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        disabled={guests <= 1}
                      >
                        -
                      </Button>
                      <div className="mx-4 font-medium flex items-center">
                        <Users size={16} className="mr-2 text-muted-foreground" />
                        {guests} Guest{guests !== 1 ? 's' : ''}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setGuests(Math.min(selectedRoom.capacity * rooms, guests + 1))}
                        disabled={guests >= selectedRoom.capacity * rooms}
                      >
                        +
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Maximum {selectedRoom.capacity * rooms} guests for {rooms} {rooms === 1 ? 'room' : 'rooms'}
                    </p>
                  </div>
                </div>
                
                <div className="mb-6 flex items-start space-x-2">
                  <Checkbox 
                    id="policy" 
                    checked={acceptedPolicy}
                    onCheckedChange={(checked) => setAcceptedPolicy(checked === true)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="policy"
                      className="text-sm text-muted-foreground font-normal leading-snug"
                    >
                      I agree to the booking and cancellation policy. Cancellations made within 48 hours of check-in will incur a 50% charge.
                    </Label>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={handleBooking}
                  disabled={!checkInDate || !checkOutDate || !acceptedPolicy}
                >
                  Book Now
                </Button>
                
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  You won't be charged yet
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>₹{selectedRoom.price} x {stayDuration} {stayDuration === 1 ? 'night' : 'nights'} x {rooms} {rooms === 1 ? 'room' : 'rooms'}</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Service fee</span>
                    <span>₹{serviceFee}</span>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="py-10">
          <h2 className="text-2xl font-semibold mb-6">More places to stay in Manipur</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {otherHomestaysData.map((home) => (
              <div key={home.id} className="listing-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={home.image} 
                    alt={home.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 text-sm font-semibold flex items-center">
                    <Star size={16} className="text-yellow-500 mr-1 fill-yellow-500" />
                    {home.rating}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{home.name}</h3>
                    <span className="text-lg font-bold text-primary">₹{home.price}<span className="text-sm text-muted-foreground font-normal">/night</span></span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <MapPin size={14} className="mr-1" />
                    {home.location}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{home.description}</p>
                  <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => toast.info(`You clicked on ${home.name}`)}>
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomestayDetailsPage;
