import React from 'react';

const VideoSection = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="text-3xl font-bold">Experience Manipur's Beauty</h2>
        <p className="text-muted-foreground mt-2">Explore the enchanting landscapes and rich culture</p>
      </div>
      <div 
        className="relative rounded-xl overflow-hidden shadow-xl mx-auto glow-border-primary"
        style={{
          width: '1120px',
          height: '630px',
          maxWidth: '95vw' // Ensures responsiveness
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <video 
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source 
                src="/videos/ManipurHorizontalVideo.mp4" 
                type="video/mp4"
                // Add media query for better quality control
                media="(min-width: 768px)"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-xl font-semibold mb-2">Discover the Unexplored</h3>
            <p className="text-white/80">From misty mountains to vibrant traditions, Manipur awaits you.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;