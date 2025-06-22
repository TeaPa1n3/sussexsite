import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
  image: {
    src: string;
    alt: string;
    caption?: string;
  } | null;
  onClose: () => void;
}

export function ImageModal({ image, onClose }: ImageModalProps) {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/95"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-amber-500 hover:text-amber-400 
          transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-full"
      >
        <X size={32} />
      </button>
      
      <div 
        className="max-w-7xl w-full max-h-[90vh] p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-contain rounded-xl"
        />
        {image.caption && (
          <p className="text-center text-gray-400 mt-4">{image.caption}</p>
        )}
      </div>
    </div>
  );
}