
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const categories = [
  {
    id: 'homestays',
    name: 'Homestays',
    description: 'Authentic Manipuri living experiences',
    image: '/file-uploads/hcar2.png',
    color: 'from-manipur-green/50',
    link: '/homestays'
  },
  {
    id: 'eateries',
    name: 'Eateries',
    description: 'Taste traditional Manipuri cuisine',
    image: '/file-uploads/foodCarousel.png',
    color: 'from-manipur-pink/50',
    link: '/eateries'
  },
  {
    id: 'tours',
    name: 'Tours',
    description: 'Guided expeditions with local experts',
    image: '/file-uploads/tourcar2.png',
    color: 'from-manipur-blue/50',
    link: '/tours'
  },
  {
    id: 'hotspots',
    name: 'Hotspots',
    description: 'Must-visit attractions in Manipur',
    image: '/file-uploads/hotcar.png',
    color: 'from-manipur-brown/50',
    link: '/hotspots'
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="section-title text-center">Explore Manipur</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Discover the beauty, culture, and hospitality of Manipur through our curated experiences
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={category.link} 
              className="category-card group"
            >
              <div className="relative h-72 overflow-hidden rounded-lg">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t to-transparent",
                  category.color
                )}></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-white/90">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
