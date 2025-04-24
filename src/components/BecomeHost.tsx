
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const BecomeHost = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="section-title">Share Your Manipuri Home With The World</h2>
            <p className="text-muted-foreground mb-6">
              Join our community of hosts and showcase the authentic culture of Manipur. Whether you have a traditional 
              homestay, local eatery, or expertise as a guide, we invite you to be part of our growing family.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full mr-4">
                  <Home className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">List Your Property</h3>
                  <p className="text-muted-foreground text-sm">
                    Share your traditional home, modern apartment, or unique living space with travelers.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full mr-4">
                  <MapPin className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Become a Local Guide</h3>
                  <p className="text-muted-foreground text-sm">
                    Offer your knowledge about hidden gems, cultural insights, and adventure spots.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full mr-4">
                  <Users className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Create Cultural Experiences</h3>
                  <p className="text-muted-foreground text-sm">
                    Host cooking classes, craft demonstrations, or traditional performances.
                  </p>
                </div>
              </div>
            </div>
            
            <Button 
              className="cta-button bg-manipur-green hover:bg-manipur-green/90" 
              asChild
            >
              <Link to="/become-host">Get Started as Host</Link>
            </Button>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img 
                src="/file-uploads/share.png" 
                alt="Become a host" 
                className="rounded-lg shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 hidden md:block">
                <div className="bg-white p-4 rounded-lg shadow-lg max-w-[200px]">
                  <p className="font-semibold">Earn up to</p>
                  <p className="text-2xl font-bold text-primary">₹15,000</p>
                  <p className="text-sm text-muted-foreground">per month sharing your space</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeHost;
