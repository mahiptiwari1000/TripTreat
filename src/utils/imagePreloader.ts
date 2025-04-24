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
    '/file-uploads/foodcar1.png',
    '/file-uploads/loktakComplete.png',
    '/file-uploads/sangolKangjei.jpg',
    '/file-uploads/Hills.jpg',
    '/file-uploads/pottery.jpg',
    '/file-uploads/marjing.png',
    
    // Other common images
    '/file-uploads/share.png',
    '/file-uploads/dztrek.png',
    '/file-uploads/itecar.jpg',
    '/file-uploads/foodCarousel.png',
    '/file-uploads/expcar.jpg',
    '/file-uploads/h1.jpg',
    '/file-uploads/h4.avif',
    '/file-uploads/h6.avif',
    '/file-uploads/h7.avif',
    '/file-uploads/h9.avif',
    '/file-uploads/hcar.png',
    '/file-uploads/hcar2.png',
    '/file-uploads/hotcar.png',
    '/file-uploads/lok1.jpg',
    '/file-uploads/loktakView.webp',
    '/file-uploads/loktrek.png',
    '/file-uploads/mortrek.png',
    '/file-uploads/homecar.jpg',
    '/file-uploads/shiroi4.jpg',
    '/file-uploads/shiroitrek.png',
    '/file-uploads/tourWhole.png',
    '/file-uploads/tourcar.png',
    '/file-uploads/tourcar2.png',
    '/file-uploads/uhk.jpg',
    '/file-uploads/walk1.jpg',
    '/file-uploads/walktrek.png',
    '/file-uploads/herkit.jpg',
    '/file-uploads/lokres.jpg',
    '/file-uploads/imafoo.jpg',
    '/file-uploads/bamfoo.jpg',
    '/file-uploads/royalfoo.jpg',
    '/file-uploads/orgfoo.jpg',
    '/file-uploads/dance.jpg',
    '/file-uploads/hand.jpg',
    '/file-uploads/pot.jpg',
    '/file-uploads/foodcarou.jpg',
    
    // Add more image paths as needed to match all your static images
    // For demonstration, I've included all the images mentioned in your allowed-files section
  ];