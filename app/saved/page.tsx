"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth-guard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MapPin,
  BedDouble,
  Users,
  Wifi,
  Car,
  Shield,
  Loader2,
  Search,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import {
  getSavedListings,
  unsaveListing,
  getListing,
  getListingPhotos,
} from "@/lib/supabase-crud";
import { Listing } from "@/lib/supabase";
import { toast } from "sonner";

const PLACEHOLDER_IMAGE = "/placeholder.svg";

interface ListingWithPhoto extends Listing {
  photoUrl: string;
}

function getAmenities(listing: Listing): string[] {
  const amenities: string[] = [];
  if (listing.wifi) amenities.push("WiFi");
  if (listing.kitchen_access) amenities.push("Kitchen");
  if (listing.parking) amenities.push("Parking");
  if (listing.security) amenities.push("Security");
  if (listing.furnished) amenities.push("Furnished");
  return amenities;
}

export default function SavedPage() {
  return (
    <AuthGuard>
      <SavedContent />
    </AuthGuard>
  );
}

function SavedContent() {
  const { user } = useAuth();
  const [listings, setListings] = useState<ListingWithPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    fetchSavedListings();
  }, [user]);

  async function fetchSavedListings() {
    if (!user) return;
    setLoading(true);
    try {
      const savedIds = await getSavedListings(user.id);
      
      const listingsData = await Promise.all(
        savedIds.map(async (id) => {
          try {
            const listing = await getListing(id);
            const photos = await getListingPhotos(id);
            return { ...listing, photoUrl: photos[0] || PLACEHOLDER_IMAGE };
          } catch {
            return null;
          }
        })
      );

      setListings(listingsData.filter(Boolean) as ListingWithPhoto[]);
    } catch (err) {
      console.error("Error fetching saved listings:", err);
      toast.error("Failed to load saved listings");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(listingId: string) {
    if (!user) return;
    setRemovingId(listingId);
    try {
      await unsaveListing(user.id, listingId);
      setListings((prev) => prev.filter((l) => l.id !== listingId));
      toast.success("Removed from saved");
    } catch (err) {
      console.error("Error removing listing:", err);
      toast.error("Failed to remove");
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFEF7]">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#3C2A1E]">Saved Rooms</h1>
            <p className="text-[#7F8C8D]">{listings.length} saved listings</p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#F6CB5A]" />
          </div>
        )}

        {/* Empty State */}
        {!loading && listings.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-[#FDF8F0] rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-[#F6CB5A]" />
            </div>
            <h3 className="text-xl font-semibold text-[#3C2A1E] mb-2">No saved rooms yet</h3>
            <p className="text-[#7F8C8D] mb-6">Start exploring and save rooms you like</p>
            <Link href="/search">
              <Button className="bg-[#F6CB5A] hover:bg-[#E5BA49] text-[#3C2A1E] font-semibold h-11 px-6 rounded-xl">
                <Search className="w-4 h-4 mr-2" />
                Browse Rooms
              </Button>
            </Link>
          </div>
        )}

        {/* Listings Grid */}
        {!loading && listings.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => {
              const amenities = getAmenities(listing);
              return (
                <div
                  key={listing.id}
                  className="group bg-white rounded-2xl border border-[#ECF0F1] overflow-hidden hover:shadow-lg transition-all"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={listing.photoUrl}
                      alt={listing.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {listing.featured && (
                      <Badge className="absolute top-3 left-3 bg-[#F6CB5A] text-[#3C2A1E] font-semibold">
                        Featured
                      </Badge>
                    )}

                    <button
                      onClick={() => handleRemove(listing.id)}
                      disabled={removingId === listing.id}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      {removingId === listing.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Heart className="w-4 h-4 fill-current" />
                      )}
                    </button>

                    <div className="absolute bottom-3 left-3">
                      <div className="bg-white rounded-lg px-3 py-1.5 shadow-lg">
                        <span className="text-lg font-bold text-[#3C2A1E]">
                          {listing.monthly_rent.toLocaleString()}
                        </span>
                        <span className="text-xs text-[#7F8C8D] ml-1">Birr/mo</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <Link href={`/listing/${listing.id}`}>
                      <h3 className="font-semibold text-[#3C2A1E] mb-1 line-clamp-1 hover:text-[#F6CB5A] transition-colors">
                        {listing.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-[#7F8C8D] flex items-center mb-3">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      {listing.area}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[#5D6D7E] mb-3">
                      <span className="flex items-center">
                        <BedDouble className="w-4 h-4 mr-1 text-[#F6CB5A]" />
                        {listing.room_type}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1 text-[#F6CB5A]" />
                        {listing.current_roommates} roommates
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {amenities.slice(0, 3).map((amenity) => (
                        <span
                          key={amenity}
                          className="text-xs bg-[#FDF8F0] text-[#5D6D7E] px-2 py-1 rounded-md"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <Link href={`/listing/${listing.id}`}>
                      <Button className="w-full h-10 bg-[#F6CB5A] hover:bg-[#E5BA49] text-[#3C2A1E] font-semibold rounded-xl">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
