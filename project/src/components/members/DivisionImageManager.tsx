import React, { useState, useEffect } from 'react';
import { ParchmentBox } from '../ui/ParchmentBox';
import { Users, RefreshCw } from 'lucide-react';
import { DivisionImageUpload } from './DivisionImageUpload';
import { supabase } from '../../lib/supabase';

interface DivisionImage {
  division: string;
  image_url: string;
  updated_at: string;
}

// Division names that match the registration form options
const DIVISIONS = ['Lewes', 'Portsmouth', 'Derby', 'Routier'];

export function DivisionImageManager() {
  const [divisionImages, setDivisionImages] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDivisionImages();
  }, []);

  const loadDivisionImages = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🏰 Loading division images from database...');
      
      const { data, error } = await supabase
        .from('division_images')
        .select('division, image_url, updated_at');

      if (error) {
        console.error('❌ Error loading division images:', error);
        throw error;
      }

      console.log('📊 Division images data from database:', data);

      // Convert array to object for easier lookup
      const imageMap: Record<string, string> = {};
      data?.forEach(item => {
        imageMap[item.division] = item.image_url;
        console.log(`🏰 Mapped division "${item.division}" to image: ${item.image_url}`);
      });

      console.log('🏰 Final division image mapping:', imageMap);
      setDivisionImages(imageMap);
    } catch (err: any) {
      console.error('Error loading division images:', err);
      setError(err.message || 'Failed to load division images');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpdate = (division: string, newImageUrl: string | null) => {
    console.log(`🏰 Updating division image for ${division}:`, newImageUrl);
    
    setDivisionImages(prev => {
      const updated = { ...prev };
      if (newImageUrl) {
        updated[division] = newImageUrl;
      } else {
        delete updated[division];
      }
      console.log('🏰 Updated division images state:', updated);
      return updated;
    });
  };

  if (isLoading) {
    return (
      <ParchmentBox>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-6 h-6 text-amber-500" />
            <h3 className="text-xl font-medieval text-amber-500">Division Image Management</h3>
          </div>
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 text-amber-500">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Loading division images...
            </div>
          </div>
        </div>
      </ParchmentBox>
    );
  }

  return (
    <ParchmentBox>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-500" />
            <h3 className="text-xl font-medieval text-amber-500">Division Image Management</h3>
          </div>
          <button
            onClick={loadDivisionImages}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-500 rounded-lg
              hover:bg-amber-500/20 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
            <p className="text-amber-500 text-sm">
              <strong>📁 Storage Location:</strong> Division images are stored in the profile-images bucket 
              under the "division-images/\" folder. Make sure division names match exactly: {DIVISIONS.join(', ')}.
            </p>
          </div>

          <div className="space-y-4">
            {DIVISIONS.map(division => (
              <div key={division} className="p-4 bg-gray-800/50 rounded-lg">
                <DivisionImageUpload
                  division={division}
                  currentImageUrl={divisionImages[division]}
                  onImageUpdate={handleImageUpdate}
                />
              </div>
            ))}
          </div>

          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-blue-500 text-sm">
              <strong>💡 Usage:</strong> Once uploaded, division images will automatically appear next to the division 
              indicator on member cards throughout the application. Images are automatically resized and optimized for display.
              <br /><br />
              <strong>🔧 Troubleshooting:</strong> If images don't appear, check that:
              <br />• The division name in the database exactly matches: {DIVISIONS.join(', ')}
              <br />• The image was uploaded to the correct folder: profile-images/division-images/
              <br />• The image URL is publicly accessible
            </p>
          </div>
        </div>
      </div>
    </ParchmentBox>
  );
}