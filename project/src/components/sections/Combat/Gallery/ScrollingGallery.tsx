import React, { useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryImage } from './types';

interface ScrollingGalleryProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage) => void;
}

export function ScrollingGallery({ images, onImageClick }: ScrollingGalleryProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePrevious = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(current => (current - 1 + images.length) % images.length);
  }, [images.length]);

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(current => (current + 1) % images.length);
  }, [images.length]);

  const handleImageClick = useCallback((e: React.MouseEvent, image: GalleryImage) => {
    e.stopPropagation();
    onImageClick(image);
  }, [onImageClick]);

  return (
    <div className="relative h-[400px] overflow-hidden rounded-lg">
      {/* Images container */}
      <div className="absolute inset-0 flex items-center">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(calc(-${currentIndex * IMAGE_WIDTH}px))`,
            gap: '2rem'
          }}
        >
          {images.map((image, index) => (
            <div 
              key={index}
              className="flex-shrink-0"
              style={{ width: `${IMAGE_WIDTH}px` }}
            >
              <div
                onClick={(e) => handleImageClick(e, image)}
                className="relative h-[400px] overflow-hidden rounded-lg group cursor-pointer"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading={Math.abs(index - currentIndex) <= 1 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4 text-white text-lg font-medieval">
                    Click to enlarge
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation controls */}
      <div className="absolute inset-0 flex items-center justify-between z-10 pointer-events-none">
        <button 
          onClick={handlePrevious}
          className="ml-4 p-3 bg-gray-900/70 text-amber-500 rounded-full hover:bg-gray-900/90 
            transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500 pointer-events-auto"
          aria-label="Previous image"
        >
          <ChevronLeft size={32} />
        </button>
        
        <button 
          onClick={handleNext}
          className="mr-4 p-3 bg-gray-900/70 text-amber-500 rounded-full hover:bg-gray-900/90 
            transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500 pointer-events-auto"
          aria-label="Next image"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Image counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-gray-900/70 
        rounded-full backdrop-blur-sm z-10 pointer-events-none">
        <span className="text-amber-500 font-medieval">
          {currentIndex + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}

const IMAGE_WIDTH = 360; // Width of each image in the gallery