/**
  * Utility for preloading images during the initial loading phase
  */
 
 /**
  * Preloads a single image and returns a promise that resolves when the image is loaded
  */
 export const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => {
        console.warn(`Failed to preload image: ${src}`);
        resolve(); // Resolve anyway to not block other images
      };
      img.src = src;
    });
  };
  
  /**
   * Preloads a batch of images with a progress callback
   */
  export const preloadImages = async (
    sources: string[],
    onProgress?: (progress: number) => void
  ): Promise<void> => {
    let loaded = 0;
    const total = sources.length;
  
    // Create an array of promises for each image
    const promises = sources.map(
      (src) =>
        new Promise<void>((resolve) => {
          preloadImage(src)
            .then(() => {
              loaded++;
              // Report progress if callback is provided
              if (onProgress) {
                onProgress((loaded / total) * 100);
              }
              resolve();
            })
            .catch(() => {
              // Count failed loads in the progress too
              loaded++;
              if (onProgress) {
                onProgress((loaded / total) * 100);
              }
              resolve();
            });
        })
    );
  
    // Wait for all images to be loaded or failed
    await Promise.all(promises);
  };
  
  /**
   * List of all static images used in the project
   */
  export const staticImages = [
    // Hero images
    '/lovable-uploads/foodcar1.png',
    '/lovable-uploads/loktakComplete.png',
    '/lovable-uploads/sangolKangjei.jpg',
    '/lovable-uploads/Hills.jpg',
    '/lovable-uploads/pottery.jpg',
    '/lovable-uploads/marjing.png',
    
    // Other common images
    '/lovable-uploads/share.png',
    '/lovable-uploads/dztrek.png',
    '/lovable-uploads/itecar.jpg',
    '/lovable-uploads/foodCarousel.png',
    '/lovable-uploads/expcar.jpg',
    '/lovable-uploads/h1.jpg',
    '/lovable-uploads/h4.avif',
    '/lovable-uploads/h6.avif',
    '/lovable-uploads/h7.avif',
    '/lovable-uploads/h9.avif',
    '/lovable-uploads/hcar.png',
    '/lovable-uploads/hcar2.png',
    '/lovable-uploads/hotcar.png',
    '/lovable-uploads/lok1.jpg',
    '/lovable-uploads/loktakView.webp',
    '/lovable-uploads/loktrek.png',
    '/lovable-uploads/mortrek.png',
    '/lovable-uploads/homecar.jpg',
    '/lovable-uploads/shiroi4.jpg',
    '/lovable-uploads/shiroitrek.png',
    '/lovable-uploads/tourWhole.png',
    '/lovable-uploads/tourcar.png',
    '/lovable-uploads/tourcar2.png',
    '/lovable-uploads/uhk.jpg',
    '/lovable-uploads/walk1.jpg',
    '/lovable-uploads/walktrek.png',
    '/lovable-uploads/herkit.jpg',
    '/lovable-uploads/lokres.jpg',
    '/lovable-uploads/imafoo.jpg',
    '/lovable-uploads/bamfoo.jpg',
    '/lovable-uploads/royalfoo.jpg',
    '/lovable-uploads/orgfoo.jpg',
    '/lovable-uploads/dance.jpg',
    '/lovable-uploads/hand.jpg',
    '/lovable-uploads/pot.jpg',
    '/lovable-uploads/foodcarou.jpg',
    
    // Add more image paths as needed to match all your static images
    // For demonstration, I've included all the images mentioned in your allowed-files section
  ];