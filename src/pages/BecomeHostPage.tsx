
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BecomeHostForm from '@/components/BecomeHostForm';

const BecomeHostPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="relative py-16 bg-gradient-to-b from-manipur-brown/10 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Become a Host</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Share your space, cuisine, or cultural knowledge with travelers from around the world. 
              Join our community of hosts showcasing the best of Manipur.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <img 
                src="/file-uploads/tourWhole.png" 
                alt="Become a Host" 
                className="rounded-lg shadow-lg w-full h-auto max-h-[600px] object-cover"
              />
              
              <div className="mt-8 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">Why become a host?</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-5 h-5 bg-primary rounded-full mr-3 flex items-center justify-center text-white text-sm">✓</span>
                      <span>Earn extra income sharing your space or skills</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-5 h-5 bg-primary rounded-full mr-3 flex items-center justify-center text-white text-sm">✓</span>
                      <span>Showcase Manipuri culture to the world</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-5 h-5 bg-primary rounded-full mr-3 flex items-center justify-center text-white text-sm">✓</span>
                      <span>Connect with travelers from diverse backgrounds</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-5 h-5 bg-primary rounded-full mr-3 flex items-center justify-center text-white text-sm">✓</span>
                      <span>Benefit from our marketing and booking platform</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">Host categories</h3>
                  <p className="text-muted-foreground mb-4">You can register as:</p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Homestay Host</h4>
                      <p className="text-sm text-muted-foreground">Share your home or property with guests</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Eatery Owner</h4>
                      <p className="text-sm text-muted-foreground">Showcase your restaurant or food service</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Local Guide</h4>
                      <p className="text-sm text-muted-foreground">Offer your expertise and local knowledge</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Experience Host</h4>
                      <p className="text-sm text-muted-foreground">Create unique cultural activities for travelers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-6">Apply to become a host</h2>
              <BecomeHostForm />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BecomeHostPage;
