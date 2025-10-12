import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import VideoSection from '@/components/VideoSection';
import FeaturedCategories from '@/components/FeaturedCategories';
import FeaturedHomestays from '@/components/FeaturedHomestays';
import Testimonials from '@/components/Testimonials';
import BecomeHost from '@/components/BecomeHost';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedCategories />
      <FeaturedHomestays />
      <Testimonials />
      <VideoSection />
      <BecomeHost />
      <Footer />
    </div>
  );
};

export default Index;
