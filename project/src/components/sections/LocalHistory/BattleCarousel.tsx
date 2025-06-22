import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ParchmentBox } from '../../ui/ParchmentBox';

interface BattleImage {
  src: string;
  alt: string;
}

const battleImages: BattleImage[] = [
  {
    src: "https://lh3.googleusercontent.com/pw/AP1GczM7xLj1QVDqtXmrwF2pg-Z2UPcTWS1ccX-YnrH5owfDW-Wb2LgGNxq3LPgTe9T5HImK_P35aTlmxdXNkc7VDjoqsx3ZSealCUej0TS9kbtiIO8SrVLo06awALLtdqevzV6HTmzylIBP5wFiarpU9Rfu=w1892-h1293-s-no-gm?authuser=0",
    alt: "Battle of Lewes Historical Site 1"
  },
  {
    src: "https://lh3.googleusercontent.com/pw/AP1GczNe9p7B-Ck1HvjSL8NLX8QC4gEx4HePDH2fGfTYJCdBZNxeBUy5coUEgHJBqXqDbDJFf9jkrbfheXW8rR7kGWayYDj7vTju0f7BHzh3uO6cf9ml8ZjzO1VOQNSSxKScXOk-u4ByCZjLroQHYN7FaD7g=w1892-h1293-s-no-gm?authuser=0",
    alt: "Battle of Lewes Historical Site 2"
  },
  {
    src: "https://lh3.googleusercontent.com/pw/AP1GczMGLx14ZR2m4_57YNXLuNPKF-D_EX-CjYlcS8bHugJmcl5dXrK2mLJMzSPAK0rxrc64gx_zHakFV-Lso_kU-6A_-jVHECtCUtCDizrFQorTCgC8e8uDVJYDOIjO5Hbc0pOvCNyM_DNI15BrrvTttfeE=w1892-h1293-s-no-gm?authuser=0",
    alt: "Battle of Lewes Historical Site 3"
  }
];

export function BattleCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? battleImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === battleImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <ParchmentBox>
      <div className="p-6">
        <h3 className="text-2xl font-medieval text-amber-500 mb-6 text-center">
          The Three Phases of the Battle
        </h3>
        
        <div className="relative">
          {/* Image container */}
          <div className="relative h-[800px] overflow-hidden rounded-lg">
            {battleImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="relative h-full w-full flex items-center justify-center bg-gray-900/20">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="max-h-full max-w-full object-contain"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/50 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-900/50 text-amber-500 
              hover:bg-gray-900/70 transition-colors backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-900/50 text-amber-500 
              hover:bg-gray-900/70 transition-colors backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-gray-900/50 
            rounded-full backdrop-blur-sm text-amber-500 font-medieval">
            {currentIndex + 1} / {battleImages.length}
          </div>
        </div>
      </div>
    </ParchmentBox>
  );
}