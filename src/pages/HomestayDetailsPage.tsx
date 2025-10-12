import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { format, addDays, differenceInDays } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Homestay, allHomestays } from './homestays-data';
import {
  MapPin,
  Users,
  Star,
  Wifi,
  UtensilsCrossed,
  Image,
  MapIcon,
  MessageCircle,
  Calendar as CalendarIcon,
  BedDouble,
  Waves,
  MapPinned,
  Palette,
  TreePalm,
  Car,
  Droplet,
  Footprints,
  Leaf,
  Bike,
  Sparkles,
  Fan,
  PawPrint,
  Baby,
  Mountain,
  Fish,
  Rabbit,
  Flame,
  Telescope,
  Home,
  TentTree,
} from 'lucide-react';

const HomestayDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    addDays(new Date(), 3)
  );
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  // Find the homestay with default values
  const homestay = allHomestays.find(h => h.id === Number(id)) || {
    id: 0,
    name: '',
    location: '',
    description: '',
    images: ['/placeholder-homestay.jpg'],
    price: 0,
    rating: 0,
    reviews: 0,
    guests: 2,
    amenities: [],
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    rooms: [{ id: 1, name: 'Standard Room', capacity: 2, price: 0 }],
    host: {
      name: 'Host',
      image: 'https://i.pravatar.cc/150',
      joinedDate: '2023',
      languages: ['English'],
      responseRate: 100,
    },
    reviews_list: [],
    location_description: '',
  };

  useEffect(() => {
    if (!id || !allHomestays.some(h => h.id === Number(id))) {
      toast.error('Homestay not found');
      navigate('/homestays');
    }
  }, [id, navigate]);

  const [selectedRoom, setSelectedRoom] = useState(homestay.rooms[0]);
  const stayDuration =
    checkInDate && checkOutDate
      ? differenceInDays(checkOutDate, checkInDate) + 1
      : 0;
  const subtotal = selectedRoom.price * rooms * stayDuration;
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  const handleBooking = () => {
    if (!checkInDate || !checkOutDate) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    if (!acceptedPolicy) {
      toast.error('Please accept the booking policy');
      return;
    }

    toast.success('Booking request sent!', {
      description: `${guests} guest(s) for ${stayDuration} nights from ${format(checkInDate, 'PPP')} to ${format(checkOutDate, 'PPP')}`,
    });
  };

  const otherHomestays = allHomestays
    .filter(h => h.id !== Number(id))
    .slice(0, 3);

  if (!homestay.id) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p>Loading homestay details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{homestay.name}</h1>
          <div className="flex items-center mt-2 text-sm">
            <div className="flex items-center">
              <Star
                size={16}
                className="text-yellow-500 fill-yellow-500 mr-1"
              />
              <span className="font-semibold">{homestay.rating}</span>
              <span className="mx-1 text-muted-foreground">
                ({homestay.reviews} reviews)
              </span>
            </div>
            <span className="mx-2">•</span>
            <div className="flex items-center text-muted-foreground">
              <MapPin size={16} className="mr-1" />
              {homestay.location}
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        {showAllImages ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8 relative">
            {homestay.images.map((image, index) => (
              <div
                key={index}
                className={`${index === 0 ? 'md:col-span-2 md:row-span-2' : ''} overflow-hidden rounded-lg`}
              >
                <img
                  src={image}
                  alt={`${homestay.name} - Image ${index + 1}`}
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
            <div className="col-span-2 flex justify-center mt-4">
              <Button
                variant="default"
                className="bg-blue-500 text-white hover:bg-blue-700"
                onClick={() => {
                  setShowAllImages(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Close Gallery
              </Button>
            </div>
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
              <div
                key={index}
                className="col-span-2 md:col-span-1 overflow-hidden rounded-lg hidden md:block"
              >
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
                <h2 className="text-xl font-semibold">
                  Hosted by {homestay.host.name}
                </h2>
                <p className="text-muted-foreground">
                  {homestay.guests} guests • {homestay.bedrooms} bedrooms •{' '}
                  {homestay.beds} beds • {homestay.bathrooms} bathrooms
                </p>
              </div>
              <img
                src={homestay.host.image}
                alt={homestay.host.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>

            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <div className="py-6">
                  <h3 className="text-lg font-semibold mb-4">
                    About this place
                  </h3>
                  <p className="text-muted-foreground">
                    {homestay.description}
                  </p>
                  {homestay.location_description && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Location</h4>
                      <p className="text-muted-foreground">
                        {homestay.location_description}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="amenities">
                <div className="py-6">
                  <h3 className="text-lg font-semibold mb-4">
                    What this place offers
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {homestay.amenities.map((amenity, index) => {
                      const amenitiesIcons = {
                        Wifi: <Wifi size={18} className="mr-2" />,
                        'Traditional Meals': (
                          <UtensilsCrossed size={18} className="mr-2" />
                        ),
                        'Lake View': <Waves size={18} className="mr-2" />,
                        'Guided Tours': (
                          <MapPinned size={18} className="mr-2" />
                        ),
                        'Cultural Activities': (
                          <Palette size={18} className="mr-2" />
                        ),
                        Garden: <TreePalm size={18} className="mr-2" />,
                        'Free Parking': <Car size={18} className="mr-2" />,
                        'Hot Water': <Droplet size={18} className="mr-2" />,
                        'Trekking Tours': (
                          <Footprints size={18} className="mr-2" />
                        ),
                        'Organic Meals': <Leaf size={18} className="mr-2" />,
                        'Bicycle Rental': <Bike size={18} className="mr-2" />,
                        'Spa Services': <Sparkles size={18} className="mr-2" />,
                        'Air Conditioning': <Fan size={18} className="mr-2" />,
                        'Pet Friendly': <PawPrint size={18} className="mr-2" />,
                        'Family Friendly': <Baby size={18} className="mr-2" />,
                        'Mountain View': (
                          <Mountain size={18} className="mr-2" />
                        ),
                        'River View': <Fish size={18} className="mr-2" />,
                        'Wildlife Tours': <Rabbit size={18} className="mr-2" />,
                        Bonfire: <Flame size={18} className="mr-2" />,
                        Stargazing: <Telescope size={18} className="mr-2" />,
                        Campfire: <TentTree size={18} className="mr-2" />,
                      };

                      const Icon = amenitiesIcons[
                        amenity as keyof typeof amenitiesIcons
                      ] || <Home size={18} className="mr-2" />;

                      return (
                        <div key={index} className="flex items-center">
                          {Icon}
                          <span>{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="py-6">
                  <div className="flex items-center mb-4">
                    <Star
                      size={24}
                      className="text-yellow-500 fill-yellow-500 mr-2"
                    />
                    <span className="text-xl font-semibold">
                      {homestay.rating}
                    </span>
                    <span className="ml-1 text-muted-foreground">
                      ({homestay.reviews} reviews)
                    </span>
                  </div>
                  <div className="space-y-6">
                    {homestay.reviews_list?.map(review => (
                      <div
                        key={review.id}
                        className="pb-6 border-b last:border-0"
                      >
                        <div className="flex items-center mb-3">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                          <div>
                            <p className="font-semibold">{review.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {review.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < review.rating
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300'
                              }
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <div className="py-6 border-b">
              <h3 className="text-lg font-semibold mb-4">
                Available Room Types
              </h3>
              <div className="space-y-4">
                {homestay.rooms.map(room => (
                  <div
                    key={room.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedRoom.id === room.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
                    onClick={() => setSelectedRoom(room)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{room.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Up to {room.capacity} guests
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">
                          ₹{room.price}
                          <span className="text-sm font-normal">/night</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapIcon className="mr-2" /> Map
              </h3>

              <div className="rounded-xl overflow-hidden border h-[300px] bg-muted/30 flex items-center justify-center">
                <div className="text-center">
                  <MapPin
                    size={48}
                    className="mx-auto mb-2 text-muted-foreground"
                  />
                  <p className="text-muted-foreground font-medium">
                    {homestay.location}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    (Interactive map coming soon)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold">
                      ₹{selectedRoom.price}
                    </span>
                    <span className="text-muted-foreground"> / night</span>
                  </div>
                  <div className="flex items-center">
                    <Star
                      size={16}
                      className="text-yellow-500 fill-yellow-500 mr-1"
                    />
                    <span>{homestay.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkInDate ? format(checkInDate, 'PP') : 'Check-in'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkInDate}
                        onSelect={setCheckInDate}
                        disabled={date => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOutDate
                          ? format(checkOutDate, 'PP')
                          : 'Check-out'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkOutDate}
                        onSelect={setCheckOutDate}
                        disabled={date =>
                          checkInDate ? date <= checkInDate : date <= new Date()
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span>Rooms</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                        disabled={rooms <= 1}
                      >
                        -
                      </Button>
                      <span>{rooms}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setRooms(rooms + 1)}
                        disabled={rooms >= homestay.rooms.length}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded">
                    <span>Guests</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        disabled={guests <= 1}
                      >
                        -
                      </Button>
                      <span>{guests}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setGuests(guests + 1)}
                        disabled={guests >= selectedRoom.capacity * rooms}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Maximum {selectedRoom.capacity} guests per room
                  </div>
                </div>

                <div className="mb-6 flex items-start space-x-2">
                  <Checkbox
                    id="policy"
                    checked={acceptedPolicy}
                    onCheckedChange={checked =>
                      setAcceptedPolicy(checked === true)
                    }
                  />
                  <Label
                    htmlFor="policy"
                    className="text-sm font-normal leading-snug"
                  >
                    I agree to the booking and cancellation policy.
                    Cancellations within 48 hours of check-in incur a 50%
                    charge.
                  </Label>
                </div>

                <Button
                  className="w-full mb-4"
                  onClick={handleBooking}
                  disabled={!checkInDate || !checkOutDate || !acceptedPolicy}
                >
                  Book Now
                </Button>

                <div className="text-sm text-center text-muted-foreground mb-4">
                  You won't be charged yet
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>
                      ₹{selectedRoom.price} × {stayDuration} nights
                    </span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>₹{serviceFee}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* More Homestays Section */}
        <div className="py-10">
          <h2 className="text-2xl font-semibold mb-6">More places to stay</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherHomestays.map(home => (
              <div
                key={home.id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={home.images[0]}
                  alt={home.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{home.name}</h3>
                    <div className="flex items-center">
                      <Star
                        size={16}
                        className="text-yellow-500 fill-yellow-500 mr-1"
                      />
                      <span>{home.rating}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    <MapPin size={14} className="inline mr-1" />
                    {home.location}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {home.description}
                  </p>
                  <Button asChild className="w-full">
                    <Link to={`/homestays/${home.id}`}>View Details</Link>
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
