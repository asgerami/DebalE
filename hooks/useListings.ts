import { useState, useEffect, useCallback } from "react";
import {
  getActiveListings,
  createListing,
  updateListing,
} from "../lib/supabase-crud";
import { Listing } from "../lib/supabase";

export function useListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getActiveListings();
      setListings(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const addListing = async (listing: Partial<Listing>) => {
    setLoading(true);
    setError(null);
    try {
      const newListing = await createListing(listing);
      setListings((prev) => [newListing, ...prev]);
      return newListing;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editListing = async (id: string, updates: Partial<Listing>) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateListing(id, updates);
      setListings((prev) => prev.map((l) => (l.id === id ? updated : l)));
      return updated;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    listings,
    loading,
    error,
    refresh: fetchListings,
    addListing,
    editListing,
  };
}
