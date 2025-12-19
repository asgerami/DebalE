"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Filter,
  Heart,
  Wifi,
  Car,
  Shield,
  Users,
  BedDouble,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import { getActiveListings, getListingPhotos } from "@/lib/supabase-crud";
import { Listing } from "@/lib/supabase";

// Placeholder image when no photos available
const PLACEHOLDER_IMAGE = "/placeholder.svg";

// Type for listing with photo
interface ListingWithPhoto extends Listing {
  photoUrl: string;
}

// Helper to get amenities from listing
function getAmenities(listing: Listing): string[] {
  const amenities: string[] = [];
  if (listing.wifi) amenities.push("WiFi");
  if (listing.kitchen_access) amenities.push("Kitchen");
  if (listing.parking) amenities.push("Parking");
  if (listing.laundry) amenities.push("Laundry");
  if (listing.security) amenities.push("Security");
  if (listing.private_bathroom) amenities.push("Private Bath");
  if (listing.furnished) amenities.push("Furnished");
  return amenities;
}

export default function SearchPage() {
  const [listings, setListings] = useState<ListingWithPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [roomType, setRoomType] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      setError(null);
      try {
        const data = await getActiveListings();
        
        // Fetch first photo for each listing
        const listingsWithPhotos = await Promise.all(
          data.map(async (listing) => {
            const photos = await getListingPhotos(listing.id);
            return {
              ...listing,
              photoUrl: photos.length > 0 ? photos[0] : PLACEHOLDER_IMAGE,
            };
          })
        );
        
        setListings(listingsWithPhotos);
      } catch (err: any) {
        console.error("Error fetching listings:", err);
        setError(err.message || "Failed to load listings");
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  // Filter listings based on search
  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      !searchQuery ||
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (listing.neighborhood?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    
    const matchesRoomType =
      !roomType ||
      listing.room_type.toLowerCase().includes(roomType.toLowerCase());

    return matchesSearch && matchesRoomType;
  });

  return (
    <div className="min-h-screen bg-[#FFFEF7]">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#3C2A1E] mb-2">
            Find Your Perfect Room
          </h1>
          <p className="text-[#7F8C8D]">
            Discover rooms and roommates that match your lifestyle
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by location, university, or neighborhood..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="border-2 border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E] py-3 px-6 rounded-lg transition-all duration-200"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </Button>
            <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>

          {showFilters && (
            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 shadow-sm">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="font-semibold text-[#7F8C8D] text-sm">
                    Price Range (Birr/month)
                  </label>
                  <Input
                    placeholder="500 - 3000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-[#7F8C8D] text-sm">
                    Room Type
                  </label>
                  <Input
                    placeholder="Private, Shared..."
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-[#7F8C8D] text-sm">
                    Gender Preference
                  </label>
                  <Input
                    placeholder="Any, Male, Female"
                    className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-[#7F8C8D] text-sm">
                    Amenities
                  </label>
                  <Input
                    placeholder="WiFi, Parking..."
                    className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                  />
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#3C2A1E]">
              Available Rooms
            </h2>
            <p className="text-[#7F8C8D]">
              {filteredListings.length} rooms found
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#7F8C8D]">Sort by:</span>
            <Button
              variant="ghost"
              className="text-[#7F8C8D] hover:bg-[#FDF8F0] py-2 px-4 rounded-md transition-colors duration-200"
            >
              Price: Low to High
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#F6CB5A]" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredListings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#7F8C8D]">No rooms found. Try adjusting your search.</p>
          </div>
        )}

        {/* Listings Grid */}
        {!loading && !error && filteredListings.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => {
              const amenities = getAmenities(listing);
              return (
                <Card
                  key={listing.id}
                  className={`${listing.featured
                    ? "bg-gradient-to-br from-[#FDF8F0] to-[#FFFEF7] border-2 border-[#F6CB5A] shadow-md relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#F6CB5A] before:rounded-l-xl"
                    : "bg-[#FFFEF7] border border-[#ECF0F1] shadow-sm"
                    } rounded-xl hover:shadow-md transition-shadow duration-200 overflow-hidden`}
                >
                  <div className="relative">
                    <Image
                      src={listing.photoUrl || PLACEHOLDER_IMAGE}
                      alt={listing.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    {listing.featured && (
                      <Badge className="absolute top-3 left-3 bg-[#F6CB5A] text-[#3C2A1E] px-2 py-1">
                        Featured
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white text-[#7F8C8D] hover:text-[#E74C3C] rounded-full p-2"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-bold text-[#3C2A1E] line-clamp-1">
                          {listing.title}
                        </h3>
                        <div className="text-right">
                          <div className="text-xl font-bold text-[#F6CB5A]">
                            {listing.monthly_rent} Birr
                          </div>
                          <div className="text-xs text-[#7F8C8D]">per month</div>
                        </div>
                      </div>

                      <div className="flex items-center text-[#7F8C8D] text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {listing.area}
                        {listing.neighborhood && `, ${listing.neighborhood}`}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-[#7F8C8D]">
                        <div className="flex items-center">
                          <BedDouble className="w-4 h-4 mr-1" />
                          {listing.room_type || "Room"}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {listing.current_roommates} roommates
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {amenities.slice(0, 3).map((amenity, index) => (
                        <Badge
                          key={index}
                          className="bg-[#FDF8F0] text-[#7F8C8D] border-[#ECF0F1] px-2 py-1 text-xs"
                        >
                          {amenity === "WiFi" && <Wifi className="w-3 h-3 mr-1" />}
                          {amenity === "Parking" && (
                            <Car className="w-3 h-3 mr-1" />
                          )}
                          {amenity}
                        </Badge>
                      ))}
                      {amenities.length > 3 && (
                        <Badge className="bg-[#FDF8F0] text-[#7F8C8D] border-[#ECF0F1] px-2 py-1 text-xs">
                          +{amenities.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Link href={`/listing/${listing.id}`} className="flex-1">
                        <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-2 px-4 rounded-lg transition-all duration-200 w-full">
                          View Details
                        </Button>
                      </Link>
                      <Link
                        href={`/messages?listing=${listing.id}&provider=${listing.provider_id}`}
                      >
                        <Button className="border-2 border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E] py-2 px-4 rounded-lg transition-all duration-200">
                          Contact
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-12">
          <Button className="border-2 border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E] py-3 px-8 rounded-lg transition-all duration-200">
            Load More Rooms
          </Button>
        </div>
      </div>
    </div>
  );
}
