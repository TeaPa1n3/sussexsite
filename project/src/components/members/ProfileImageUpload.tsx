import React, { useState, useRef } from 'react';
import { Upload, X, User, Trash2, Eye, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ProfileImageUploadProps {
  memberId: string;
  memberName: string;
  currentImageUrl?: string | null;
  onImageUpdate: (newImageUrl: string | null) => void;
}

export function ProfileImageUpload({ 
  memberId, 
  memberName, 
  currentImageUrl, 
  onImageUpdate 
}: ProfileImageUploadProps) {
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
      setError('Please select an image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be smaller than 10MB');
      return;
    }

    await uploadImage(file);
  };

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    setError(null);
    setUploadProgress(10);

    try {
      console.log('🔄 Starting profile image upload for:', memberName);

      // Check admin status first with timeout
      console.log('🔍 Checking admin status...');
      setUploadProgress(20);

      const adminCheckPromise = supabase.rpc('debug_admin_status');
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Admin check timeout')), 10000)
      );

      const adminResult = await Promise.race([adminCheckPromise, timeoutPromise]) as any;
      
      if (adminResult.error) {
        console.error('❌ Admin check failed:', adminResult.error);
        throw new Error(`Admin verification failed: ${adminResult.error.message}`);
      }

      const adminData = adminResult.data;
      console.log('👤 Admin status check result:', adminData);
      
      if (!adminData || adminData.length === 0 || !adminData[0].is_admin) {
        throw new Error('You must be an admin to upload profile images');
      }

      console.log('✅ Admin status confirmed');
      setUploadProgress(40);

      // Create a unique filename
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const timestamp = Date.now();
      const fileName = `profile-${memberId}-${timestamp}.${fileExt}`;
      const filePath = `profile-images/${fileName}`;

      console.log('📝 Generated file path:', filePath);
      setUploadProgress(50);

      // Upload the new image with timeout
      console.log('⬆️ Uploading new image...');
      
      const uploadPromise = supabase.storage
        .from('profile-images')
        .upload(filePath, file, {
          cacheControl: '31536000', // 1 year cache
          upsert: false,
          contentType: file.type
        });

      const uploadTimeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Upload timeout - please try again')), 30000)
      );

      const uploadResult = await Promise.race([uploadPromise, uploadTimeoutPromise]) as any;

      if (uploadResult.error) {
        console.error('❌ Upload error:', uploadResult.error);
        throw new Error(`Upload failed: ${uploadResult.error.message}`);
      }

      console.log('✅ File uploaded successfully');
      setUploadProgress(80);

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;
      console.log('🔗 Generated public URL:', publicUrl);

      // Update the database using the safe function
      console.log('💾 Updating database...');
      const { error: updateError } = await supabase.rpc('update_profile_image', {
        target_user_id: memberId,
        new_image_url: publicUrl
      });

      if (updateError) {
        console.error('❌ Database update error:', updateError);
        
        // Clean up uploaded file on database error
        try {
          await supabase.storage
            .from('profile-images')
            .remove([filePath]);
          console.log('🧹 Cleaned up uploaded file after database error');
        } catch (cleanupError) {
          console.warn('⚠️ Failed to cleanup file:', cleanupError);
        }
        
        throw new Error(`Database update failed: ${updateError.message}`);
      }

      console.log('✅ Database updated successfully');
      setUploadProgress(100);

      // Success! Update the UI
      onImageUpdate(publicUrl);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      console.log('🎉 Profile image upload completed successfully');

      // Delete old image after successful upload (don't wait for this)
      if (currentImageUrl && currentImageUrl !== publicUrl) {
        deleteExistingImage(currentImageUrl).catch(err => {
          console.warn('⚠️ Failed to delete old image:', err);
        });
      }

    } catch (err: any) {
      console.error('💥 Upload process failed:', err);
      setError(err.message || 'Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 3000);
    }
  };

  const deleteExistingImage = async (imageUrl: string) => {
    try {
      console.log('🗑️ Attempting to delete existing image:', imageUrl);
      
      // Extract the file path from the URL
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split('/');
      
      // Find the filename in the path
      const fileName = pathParts[pathParts.length - 1].split('?')[0]; // Remove query params
      
      if (fileName && fileName.includes('profile-')) {
        const filePath = `profile-images/${fileName}`;
        console.log('🎯 Deleting file at path:', filePath);
        
        const { error } = await supabase.storage
          .from('profile-images')
          .remove([filePath]);

        if (error) {
          console.warn('⚠️ Storage deletion failed:', error);
        } else {
          console.log('✅ Old image deleted from storage');
        }
      }
    } catch (err) {
      console.warn('⚠️ Error deleting old image:', err);
    }
  };

  const handleDeleteImage = async () => {
    if (!currentImageUrl) return;

    if (!confirm(`Are you sure you want to delete ${memberName}'s profile image?`)) {
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      console.log('🗑️ Starting profile image deletion for:', memberName);

      // Update database to remove the image URL using the safe function
      const { error: updateError } = await supabase.rpc('update_profile_image', {
        target_user_id: memberId,
        new_image_url: null
      });

      if (updateError) {
        console.error('❌ Database update error:', updateError);
        throw new Error(`Database update failed: ${updateError.message}`);
      }

      console.log('✅ Database updated - image URL removed');

      // Try to delete from storage (but don't fail if this doesn't work)
      deleteExistingImage(currentImageUrl).catch(err => {
        console.warn('⚠️ Storage deletion failed:', err);
      });

      onImageUpdate(null);
      console.log('🎉 Profile image deletion completed successfully');

    } catch (err: any) {
      console.error('💥 Delete process failed:', err);
      setError(err.message || 'Failed to delete image. Please try again.');
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
                alt={`${memberName}'s profile`}
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-500/30"
                onError={(e) => {
                  console.warn('⚠️ Image failed to load:', currentImageUrl);
                }}
                onLoad={() => {
                  console.log('✅ Image loaded successfully:', currentImageUrl);
                }}
              />
              <button
                onClick={() => setShowPreview(true)}
                className="absolute inset-0 bg-gray-900/50 rounded-full opacity-0 group-hover:opacity-100 
                  transition-opacity flex items-center justify-center"
                title="View full size"
              >
                <Eye className="w-4 h-4 text-white" />
              </button>
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500/30 
              flex items-center justify-center">
              <User className="w-8 h-8 text-amber-500" />
            </div>
          )}
        </div>

        <div className="flex-grow">
          <p className="text-amber-500 font-medium">{memberName}</p>
          <p className="text-gray-400 text-sm">
            {currentImageUrl ? 'Profile image set' : 'No profile image'}
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
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Progress */}
      {isUploading && uploadProgress > 0 && (
        <div className="space-y-2">
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-amber-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-amber-500 text-sm text-center">
            {uploadProgress < 30 ? 'Checking permissions...' :
             uploadProgress < 60 ? 'Uploading image...' :
             uploadProgress < 90 ? 'Updating database...' :
             'Finalizing...'}
          </p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-500 text-sm">{error}</p>
          <p className="text-gray-400 text-xs mt-1">
            If the issue persists, try refreshing the page and logging in again.
          </p>
        </div>
      )}

      {/* Success Message */}
      {uploadProgress === 100 && !error && (
        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <p className="text-green-500 text-sm">✅ Profile image uploaded successfully!</p>
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
              alt={`${memberName}'s profile`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <p className="text-center text-amber-500 mt-4 font-medieval">
              {memberName}'s Profile Image
            </p>
          </div>
        </div>
      )}
    </div>
  );
}