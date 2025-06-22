import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface DivisionImage {
  division: string;
  image_url: string;
  updated_at: string;
}

export function useDivisionImages() {
  const [divisionImages, setDivisionImages] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDivisionImages();
  }, []);

  const loadDivisionImages = async () => {
    try {
      console.log('🏰 Loading division images...');
      
      const { data, error } = await supabase
        .from('division_images')
        .select('division, image_url, updated_at');

      if (error) {
        console.error('❌ Error loading division images:', error);
        throw error;
      }

      console.log('📊 Raw division images data:', data);

      // Convert array to object for easier lookup
      const imageMap: Record<string, string> = {};
      data?.forEach(item => {
        // Ensure exact case matching
        const divisionKey = item.division.trim();
        imageMap[divisionKey] = item.image_url;
        console.log(`🏰 Loaded image for "${divisionKey}":`, item.image_url);
      });

      console.log('🏰 All division images loaded:', imageMap);
      setDivisionImages(imageMap);
      setError(null);
    } catch (err: any) {
      console.error('Error loading division images:', err);
      setError(err.message || 'Failed to load division images');
    } finally {
      setIsLoading(false);
    }
  };

  const getDivisionImage = (division: string | null): string | null => {
    if (!division) {
      console.log('🏰 No division provided');
      return null;
    }
    
    // Normalize division name to handle case variations and trim whitespace
    const normalizedDivision = division.trim();
    
    const image = divisionImages[normalizedDivision];
    
    console.log(`🏰 Getting image for division "${division}":`, image || 'not found');
    console.log('🏰 Available divisions:', Object.keys(divisionImages));
    
    if (!image) {
      console.warn(`⚠️ No image found for division "${normalizedDivision}". Available: ${Object.keys(divisionImages).join(', ')}`);
    }
    
    return image || null;
  };

  return {
    divisionImages,
    getDivisionImage,
    isLoading,
    error,
    refresh: loadDivisionImages
  };
}