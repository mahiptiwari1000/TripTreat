
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Users, Wifi, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const homestays = [
  {
    id: 1,
    name: 'Loktak Lake View Homestay',
    location: 'Moirang, Manipur',
    description: 'Enjoy panoramic views of the floating phumdis on Loktak Lake in this traditional Manipuri home.',
    image: '/file-uploads/loktakView.webp',
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
    image: '/file-uploads/h6.avif',
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
    image: '/file-uploads/uhk.jpg',
    price: 950,
    rating: 4.8,
    reviews: 19,
    guests: 3,
    amenities: ['Mountain View', 'Trekking Tours', 'Organic Meals', 'Local Crafts']
  }
];

const FeaturedHomestays = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Featured Homestays</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Live like a local in our handpicked homestays offering authentic Manipuri experiences
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homestays.map((homestay) => (
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
                  {homestay.rating}
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
                       amenity === 'Traditional Meals' ? <Coffee size={12} className="mr-1" /> : null}
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
        
        <div className="text-center mt-10">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
            <Link to="/homestays">View All Homestays</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHomestays;
