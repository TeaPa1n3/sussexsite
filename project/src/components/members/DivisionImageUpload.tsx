import React, { useState, useRef } from 'react';
import { Upload, X, Users, Trash2, Eye, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DivisionImageUploadProps {
  division: string;
  currentImageUrl?: string | null;
  onImageUpdate: (division: string, newImageUrl: string | null) => void;
}

export function DivisionImageUpload({ 
  division, 
  currentImageUrl, 
  onImageUpdate 
}: DivisionImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB');
      return;
    }

    await uploadImage(file);
  };

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      console.log(`🏰 Starting division image upload for: ${division}`);
      
      // Create a unique filename using division name and timestamp
      const fileExt = file.name.split('.').pop();
      const fileName = `${division.toLowerCase()}-${Date.now()}.${fileExt}`;
      // IMPORTANT: Upload to the division-images folder within the profile-images bucket
      const filePath = `division-images/${fileName}`;

      console.log(`📁 Upload path: ${filePath}`);

      // Delete existing image if it exists
      if (currentImageUrl) {
        await deleteExistingImage(currentImageUrl);
      }

      setUploadProgress(30);

      // Upload the new image to the correct folder
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('❌ Upload error:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      console.log('✅ File uploaded successfully to:', filePath);
      setUploadProgress(60);

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;
      console.log('🔗 Generated public URL:', publicUrl);

      setUploadProgress(80);

      // Update the division_images table
      const { error: updateError } = await supabase
        .from('division_images')
        .upsert({
          division: division, // Use exact division name
          image_url: publicUrl,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'division'
        });

      if (updateError) {
        console.error('❌ Database update error:', updateError);
        // If database update fails, clean up the uploaded file
        await supabase.storage
          .from('profile-images')
          .remove([filePath]);
        
        throw new Error(`Database update failed: ${updateError.message}`);
      }

      console.log('✅ Database updated successfully');
      setUploadProgress(100);

      // Success!
      onImageUpdate(division, publicUrl);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      console.log(`🎉 Division image upload completed for ${division}`);

    } catch (err: any) {
      console.error('💥 Upload error:', err);
      setError(err.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  const deleteExistingImage = async (imageUrl: string) => {
    try {
      console.log('🗑️ Attempting to delete existing image:', imageUrl);
      
      // Extract the file path from the URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `division-images/${fileName}`;

      console.log('🎯 Deleting file at path:', filePath);
      
      const { error } = await supabase.storage
        .from('profile-images')
        .remove([filePath]);

      if (error) {
        console.warn('⚠️ Storage deletion failed:', error);
      } else {
        console.log('✅ Old image deleted from storage');
      }
    } catch (err) {
      console.warn('⚠️ Error deleting old image:', err);
    }
  };

  const handleDeleteImage = async () => {
    if (!currentImageUrl) return;

    if (!confirm(`Are you sure you want to delete the ${division} division image?`)) {
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      console.log(`🗑️ Starting division image deletion for: ${division}`);

      // Delete from storage
      await deleteExistingImage(currentImageUrl);

      // Remove from database
      const { error: deleteError } = await supabase
        .from('division_images')
        .delete()
        .eq('division', division);

      if (deleteError) {
        throw new Error(`Database update failed: ${deleteError.message}`);
      }

      onImageUpdate(division, null);
      console.log(`🎉 Division image deletion completed for ${division}`);

    } catch (err: any) {
      console.error('💥 Delete error:', err);
      setError(err.message || 'Failed to delete image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Current Image Display */}
      <div className="flex items-center gap-4">
        <div className="relative">
          {currentImageUrl ? (
            <div className="relative group">
              <img
                src={currentImageUrl}
                alt={`${division} division`}
                className="w-16 h-16 rounded-lg object-cover border-2 border-amber-500/30"
                onLoad={() => console.log(`✅ Division image preview loaded for ${division}`)}
                onError={(e) => console.error(`❌ Division image preview failed for ${division}:`, e)}
              />
              <button
                onClick={() => setShowPreview(true)}
                className="absolute inset-0 bg-gray-900/50 rounded-lg opacity-0 group-hover:opacity-100 
                  transition-opacity flex items-center justify-center"
                title="View full size"
              >
                <Eye className="w-4 h-4 text-white" />
              </button>
            </div>
          ) : (
            <div className="w-16 h-16 rounded-lg bg-amber-500/20 border-2 border-amber-500/30 
              flex items-center justify-center">
              <Users className="w-8 h-8 text-amber-500" />
            </div>
          )}
        </div>

        <div className="flex-grow">
          <p className="text-amber-500 font-medium">{division} Division</p>
          <p className="text-gray-400 text-sm">
            {currentImageUrl ? 'Division image set' : 'No division image'}
          </p>
          <p className="text-gray-500 text-xs">
            Uploads to: profile-images/division-images/
          </p>
        </div>

        <div className="flex gap-2">
          {/* Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 px-3 py-2 bg-amber-500/10 text-amber-500 
              rounded-lg hover:bg-amber-500/20 transition-colors disabled:opacity-50"
            title={currentImageUrl ? 'Replace image' : 'Upload image'}
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            {currentImageUrl ? 'Replace' : 'Upload'}
          </button>

          {/* Delete Button */}
          {currentImageUrl && (
            <button
              onClick={handleDeleteImage}
              disabled={isUploading}
              className="flex items-center gap-2 px-3 py-2 bg-red-500/10 text-red-500 
                rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50"
              title="Delete image"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Progress */}
      {isUploading && uploadProgress > 0 && (
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div 
            className="bg-amber-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {uploadProgress === 100 && !error && (
        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <p className="text-green-500 text-sm">✅ Division image uploaded successfully!</p>
        </div>
      )}

      {/* Image Preview Modal */}
      {showPreview && currentImageUrl && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/95"
          onClick={() => setShowPreview(false)}
        >
          <div className="relative max-w-2xl max-h-[80vh] p-4">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute -top-2 -right-2 p-2 bg-gray-800 rounded-full text-amber-500 
                hover:text-amber-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={currentImageUrl}
              alt={`${division} division`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <p className="text-center text-amber-500 mt-4 font-medieval">
              {division} Division Image
            </p>
          </div>
        </div>
      )}
    </div>
  );
}