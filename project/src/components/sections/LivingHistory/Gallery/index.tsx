import React, { useState } from 'react';
import { ScrollingGallery } from '../../Combat/Gallery/ScrollingGallery';
import { ImageModal } from '../../Combat/Gallery/ImageModal';
import { galleryImages } from './data';
import type { GalleryImage } from '../../Combat/Gallery/types';
import { SectionContainer } from '../../../ui/SectionContainer';

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <SectionContainer>
      <h2 className="text-4xl font-medieval text-amber-500 mb-12 text-center">
        Living History Gallery
      </h2>
      <ScrollingGallery
        images={galleryImages}
        onImageClick={setSelectedImage}
      />

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </SectionContainer>
  );
}