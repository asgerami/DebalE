import { useState } from "react";
import { uploadListingPhoto, uploadProfilePhoto } from "../lib/supabase-crud";

export function useStorageUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const uploadListing = async (file: File, listingId: string) => {
    setUploading(true);
    setError(null);
    setUrl(null);
    try {
      const data = await uploadListingPhoto(file, listingId);
      setUrl(data?.path ? data.path : null);
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const uploadProfile = async (file: File, userId: string) => {
    setUploading(true);
    setError(null);
    setUrl(null);
    try {
      const data = await uploadProfilePhoto(file, userId);
      setUrl(data?.path ? data.path : null);
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return { uploading, error, url, uploadListing, uploadProfile };
}
