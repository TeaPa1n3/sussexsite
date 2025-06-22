import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import type { GalleryImage } from './types';

interface ImageModalProps {
  image: GalleryImage | null;
  onClose: () => void;
}

export function ImageModal({ image, onClose }: ImageModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (image) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [image]);

  if (!image) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-gray-900/95 overflow-auto"
      onClick={onClose}
    >
      {/* Controls */}
      <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(!isZoomed);
          }}
          className="p-2 text-amber-500 hover:text-amber-400 
            transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-full
            bg-gray-900/50 backdrop-blur-sm"
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        >
          {isZoomed ? <ZoomOut size={24} /> : <ZoomIn size={24} />}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-2 text-amber-500 hover:text-amber-400 
            transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-full
            bg-gray-900/50 backdrop-blur-sm"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
      </div>

      {/* Image container */}
      <div 
        className="min-h-screen w-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt}
          className={`rounded-lg ${
            isZoomed 
              ? 'w-auto h-auto max-w-none cursor-zoom-out' 
              : 'max-w-full max-h-[90vh] cursor-zoom-in'
          }`}
        />
      </div>
    </div>
  );
}