"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  Loader2,
  Calendar,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth-guard";
import {
  getUserListings,
  updateListing,
  deleteListing,
  getListingPhotos,
} from "@/lib/supabase-crud";
import { Listing } from "@/lib/supabase";
import Header from "@/components/header";

const PLACEHOLDER_IMAGE = "/placeholder.svg";

export default function MyListingsPage() {
  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen">
        <Header />
        <MyListingsContent />
      </div>
    </AuthGuard>
  );
}

function MyListingsContent() {
  const { user } = useAuth();
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [listingPhotos, setListingPhotos] = useState<Record<string, string[]>>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchListings();
    }
  }, [user]);

  const fetchListings = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getUserListings(user.id);
      setListings(data);

      // Fetch photos for each listing
      const photosMap: Record<string, string[]> = {};
      for (const listing of data) {
        const photos = await getListingPhotos(listing.id);
        photosMap[listing.id] = photos;
      }
      setListingPhotos(photosMap);
    } catch (err: any) {
      console.error("Error fetching listings:", err);
      setError(err.message || "Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (listingId: string, currentStatus: boolean) => {
    try {
      await updateListing(listingId, { is_active: !currentStatus });
      setListings((prev) =>
        prev.map((listing) =>
          listing.id === listingId
            ? { ...listing, is_active: !currentStatus }
            : listing
        )
      );
    } catch (err: any) {
      console.error("Error toggling listing status:", err);
      alert("Failed to update listing status");
    }
  };

  const handleDelete = async (listingId: string) => {
    if (!confirm("Are you sure you want to permanently delete this listing? This action cannot be undone.")) return;

    setDeletingId(listingId);
    try {
      await deleteListing(listingId);
      setListings((prev) => prev.filter((listing) => listing.id !== listingId));
    } catch (err: any) {
      console.error("Error deleting listing:", err);
      alert("Failed to delete listing");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#F6CB5A]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#3C2A1E] mb-2">{error}</h2>
          <Button onClick={fetchListings} className="bg-[#F6CB5A] text-[#3C2A1E]">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#FFFEF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#3C2A1E]">My Listings</h1>
            <p className="text-[#7F8C8D] mt-2">
              Manage your room listings and track their performance
            </p>
          </div>
          <Link href="/list-room">
            <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold">
              <Plus className="w-5 h-5 mr-2" />
              Add New Listing
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-[#FDF8F0] to-[#FFFEF7] border border-[#ECF0F1]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#7F8C8D] mb-1">Total Listings</p>
                  <p className="text-3xl font-bold text-[#3C2A1E]">
                    {listings.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#F6CB5A] rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#3C2A1E]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#E8F5E9] to-[#FFFEF7] border border-[#ECF0F1]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#7F8C8D] mb-1">Active</p>
                  <p className="text-3xl font-bold text-[#2ECC71]">
                    {listings.filter((l) => l.is_active).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#2ECC71] rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#FFF3E0] to-[#FFFEF7] border border-[#ECF0F1]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#7F8C8D] mb-1">Inactive</p>
                  <p className="text-3xl font-bold text-[#E67E22]">
                    {listings.filter((l) => !l.is_active).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#E67E22] rounded-full flex items-center justify-center">
                  <EyeOff className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Listings Grid */}
        {listings.length === 0 ? (
          <Card className="bg-[#FFFEF7] border border-[#ECF0F1]">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-[#FDF8F0] rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-[#F6CB5A]" />
              </div>
              <h3 className="text-xl font-bold text-[#3C2A1E] mb-2">
                No listings yet
              </h3>
              <p className="text-[#7F8C8D] mb-6">
                Create your first listing to start finding roommates
              </p>
              <Link href="/list-room">
                <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Listing
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => {
              const photos = listingPhotos[listing.id] || [];
              const mainPhoto = photos[0] || PLACEHOLDER_IMAGE;

              return (
                <Card
                  key={listing.id}
                  className="bg-[#FFFEF7] border border-[#ECF0F1] hover:shadow-lg transition-shadow duration-200"
                >
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className="relative">
                      <Image
                        src={mainPhoto}
                        alt={listing.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover rounded-t-xl"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge
                          className={`${
                            listing.is_active
                              ? "bg-[#2ECC71] text-white"
                              : "bg-[#7F8C8D] text-white"
                          }`}
                        >
                          {listing.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      {listing.featured && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-[#F6CB5A] text-[#3C2A1E]">
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-[#3C2A1E] mb-2 line-clamp-1">
                        {listing.title}
                      </h3>

                      <div className="flex items-center text-sm text-[#7F8C8D] mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="line-clamp-1">{listing.area}</span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-[#F6CB5A]">
                            {listing.monthly_rent}
                          </span>
                          <span className="text-sm text-[#7F8C8D]"> Birr/mo</span>
                        </div>
                        <div className="text-sm text-[#7F8C8D]">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          {new Date(listing.created_at).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link href={`/listing/${listing.id}`} className="flex-1">
                          <Button
                            variant="outline"
                            className="w-full border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#FDF8F0]"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          onClick={() =>
                            handleToggleActive(listing.id, listing.is_active)
                          }
                          className="border-[#2ECC71] text-[#2ECC71] hover:bg-[#E8F5E9]"
                        >
                          {listing.is_active ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleDelete(listing.id)}
                          disabled={deletingId === listing.id}
                          className="border-[#E74C3C] text-[#E74C3C] hover:bg-[#FFEBEE]"
                        >
                          {deletingId === listing.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
