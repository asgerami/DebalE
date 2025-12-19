"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Filter,
  Heart,
  Wifi,
  Car,
  Users,
  BedDouble,
  Loader2,
  Shield,
  X,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import {
  getActiveListingsPaginated,
  getListingPhotos,
  getSavedListings,
  saveListing,
  unsaveListing,
} from "@/lib/supabase-crud";
import { Listing } from "@/lib/supabase";
import { toast } from "sonner";

const PLACEHOLDER_IMAGE = "/placeholder.svg";
const ITEMS_PER_PAGE = 9;

interface ListingWithPhoto extends Listing {
  photoUrl: string;
}

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
  const { user } = useAuth();
  const [listings, setListings] = useState<ListingWithPhoto[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [totalListings, setTotalListings] = useState(0);
  const [savingId, setSavingId] = useState<string | null>(null);

  // Filters
  const [filters, setFilters] = useState({
    roomType: "",
    minPrice: "",
    maxPrice: "",
    gender: "",
  });

  const hasMore = listings.length < totalListings;

  useEffect(() => {
    fetchListings(1, true);
    if (user) fetchSavedListings();
  }, [user]);

  async function fetchSavedListings() {
    if (!user) return;
    try {
      const saved = await getSavedListings(user.id);
      setSavedIds(saved);
    } catch (err) {
      console.error("Error fetching saved listings:", err);
    }
  }

  async function fetchListings(pageNum: number, reset: boolean = false) {
    if (reset) setLoading(true);
    else setLoadingMore(true);
    setError(null);

    try {
      const { listings: data, total } = await getActiveListingsPaginated(pageNum, ITEMS_PER_PAGE);
      setTotalListings(total);

      const listingsWithPhotos = await Promise.all(
        data.map(async (listing) => {
          const photos = await getListingPhotos(listing.id);
          return { ...listing, photoUrl: photos[0] || PLACEHOLDER_IMAGE };
        })
      );

      if (reset) {
        setListings(listingsWithPhotos);
      } else {
        setListings((prev) => [...prev, ...listingsWithPhotos]);
      }
      setPage(pageNum);
    } catch (err: any) {
      console.error("Error fetching listings:", err);
      setError(err.message || "Failed to load listings");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  async function handleToggleSave(listingId: string) {
    if (!user) {
      toast.error("Please login to save listings");
      return;
    }

    setSavingId(listingId);
    const isSaved = savedIds.includes(listingId);

    try {
      if (isSaved) {
        await unsaveListing(user.id, listingId);
        setSavedIds((prev) => prev.filter((id) => id !== listingId));
        toast.success("Removed from saved");
      } else {
        await saveListing(user.id, listingId);
        setSavedIds((prev) => [...prev, listingId]);
        toast.success("Saved to favorites");
      }
    } catch (err: any) {
      console.error("Error toggling save:", err);
      toast.error("Failed to update saved listings");
    } finally {
      setSavingId(null);
    }
  }

  function handleLoadMore() {
    if (!loadingMore && hasMore) {
      fetchListings(page + 1, false);
    }
  }

  // Filter listings client-side
  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      !searchQuery ||
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.neighborhood?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRoomType =
      !filters.roomType ||
      listing.room_type.toLowerCase().includes(filters.roomType.toLowerCase());

    const matchesMinPrice =
      !filters.minPrice || listing.monthly_rent >= parseInt(filters.minPrice);

    const matchesMaxPrice =
      !filters.maxPrice || listing.monthly_rent <= parseInt(filters.maxPrice);

    return matchesSearch && matchesRoomType && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <div className="min-h-screen bg-[#FFFEF7]">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#3C2A1E] mb-2">Find Your Perfect Room</h1>
          <p className="text-[#7F8C8D]">Discover rooms and roommates that match your lifestyle</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7F8C8D]" />
              <Input
                placeholder="Search by location, area, or neighborhood..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-white border-[#ECF0F1] rounded-xl focus:border-[#F6CB5A] focus:ring-[#F6CB5A]/20"
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className={`h-12 px-6 rounded-xl border-2 ${showFilters ? "border-[#F6CB5A] bg-[#FDF8F0]" : "border-[#ECF0F1]"}`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {showFilters && <X className="w-4 h-4 ml-2" />}
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-5 bg-white rounded-2xl border border-[#ECF0F1] shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#7F8C8D] mb-1.5 block">Room Type</label>
                  <Input
                    placeholder="Private, Shared..."
                    value={filters.roomType}
                    onChange={(e) => setFilters({ ...filters, roomType: e.target.value })}
                    className="h-10 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#7F8C8D] mb-1.5 block">Min Price</label>
                  <Input
                    placeholder="1000"
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="h-10 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#7F8C8D] mb-1.5 block">Max Price</label>
                  <Input
                    placeholder="5000"
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="h-10 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#7F8C8D] mb-1.5 block">Gender Pref</label>
                  <Input
                    placeholder="Any, Male, Female"
                    value={filters.gender}
                    onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                    className="h-10 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[#7F8C8D]">
            <span className="font-semibold text-[#3C2A1E]">{filteredListings.length}</span> rooms found
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#F6CB5A]" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filteredListings.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-[#FDF8F0] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-[#F6CB5A]" />
            </div>
            <h3 className="text-xl font-semibold text-[#3C2A1E] mb-2">No rooms found</h3>
            <p className="text-[#7F8C8D]">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Listings Grid */}
        {!loading && !error && filteredListings.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <RoomCard
                key={listing.id}
                listing={listing}
                isSaved={savedIds.includes(listing.id)}
                isSaving={savingId === listing.id}
                onToggleSave={() => handleToggleSave(listing.id)}
              />
            ))}
          </div>
        )}

        {/* Load More - Only show if there are more listings */}
        {!loading && hasMore && filteredListings.length >= ITEMS_PER_PAGE && (
          <div className="text-center mt-10">
            <Button
              onClick={handleLoadMore}
              disabled={loadingMore}
              variant="outline"
              className="h-12 px-8 rounded-xl border-2 border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E]"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  Load More Rooms
                  <ChevronDown className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}


// Room Card Component
function RoomCard({
  listing,
  isSaved,
  isSaving,
  onToggleSave,
}: {
  listing: ListingWithPhoto;
  isSaved: boolean;
  isSaving: boolean;
  onToggleSave: () => void;
}) {
  const amenities = getAmenities(listing);

  return (
    <div className="group bg-white rounded-2xl border border-[#ECF0F1] overflow-hidden hover:shadow-lg hover:border-[#F6CB5A]/30 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={listing.photoUrl}
          alt={listing.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {listing.featured && (
            <Badge className="bg-[#F6CB5A] text-[#3C2A1E] font-semibold px-2.5 py-1 text-xs">
              Featured
            </Badge>
          )}
          {listing.security && (
            <Badge className="bg-white/90 text-[#3C2A1E] font-medium px-2 py-1 text-xs">
              <Shield className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>

        {/* Save button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleSave();
          }}
          disabled={isSaving}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isSaved
              ? "bg-red-500 text-white"
              : "bg-white/90 text-[#7F8C8D] hover:text-red-500"
          } ${isSaving ? "opacity-50" : ""}`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
        </button>

        {/* Price tag */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white rounded-lg px-3 py-1.5 shadow-lg">
            <span className="text-lg font-bold text-[#3C2A1E]">{listing.monthly_rent.toLocaleString()}</span>
            <span className="text-xs text-[#7F8C8D] ml-1">Birr/mo</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title & Location */}
        <Link href={`/listing/${listing.id}`}>
          <h3 className="font-semibold text-[#3C2A1E] mb-1 line-clamp-1 group-hover:text-[#F6CB5A] transition-colors">
            {listing.title}
          </h3>
        </Link>
        <p className="text-sm text-[#7F8C8D] flex items-center mb-3">
          <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
          <span className="truncate">{listing.area}{listing.neighborhood && `, ${listing.neighborhood}`}</span>
        </p>

        {/* Room info */}
        <div className="flex items-center gap-4 text-sm text-[#5D6D7E] mb-3">
          <span className="flex items-center">
            <BedDouble className="w-4 h-4 mr-1 text-[#F6CB5A]" />
            {listing.room_type}
          </span>
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-1 text-[#F6CB5A]" />
            {listing.current_roommates} roommate{listing.current_roommates !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="inline-flex items-center text-xs bg-[#FDF8F0] text-[#5D6D7E] px-2 py-1 rounded-md"
            >
              {amenity === "WiFi" && <Wifi className="w-3 h-3 mr-1" />}
              {amenity === "Parking" && <Car className="w-3 h-3 mr-1" />}
              {amenity}
            </span>
          ))}
          {amenities.length > 3 && (
            <span className="text-xs text-[#7F8C8D] px-2 py-1">+{amenities.length - 3}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link href={`/listing/${listing.id}`} className="flex-1">
            <Button className="w-full h-10 bg-[#F6CB5A] hover:bg-[#E5BA49] text-[#3C2A1E] font-semibold rounded-xl">
              View Details
            </Button>
          </Link>
          <Link href={`/messages?listing=${listing.id}&provider=${listing.provider_id}`}>
            <Button
              variant="outline"
              className="h-10 px-4 rounded-xl border-2 border-[#ECF0F1] hover:border-[#F6CB5A] hover:bg-[#FDF8F0]"
            >
              Contact
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
