"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  MapPin,
  Star,
  Heart,
  Share2,
  Shield,
  Users,
  BedDouble,
  MessageCircle,
  Calendar,
  CheckCircle,
  Phone,
  Mail,
  Camera,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getListing, getListingPhotos, getProfile } from "@/lib/supabase-crud";
import { Listing, Profile } from "@/lib/supabase";
import Header from "@/components/header";

// Placeholder image for when no photos are available
const PLACEHOLDER_IMAGE = "/placeholder.svg";

export default function ListingDetailPage() {
  const params = useParams();
  const listingId = params.id as string;

  const [listing, setListing] = useState<Listing | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [provider, setProvider] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    async function fetchListingData() {
      if (!listingId) return;

      setLoading(true);
      setError(null);

      try {
        // Fetch listing details
        const listingData = await getListing(listingId);
        setListing(listingData);

        // Fetch photos from storage
        const photoUrls = await getListingPhotos(listingId);
        setPhotos(photoUrls);

        // Fetch provider profile
        if (listingData?.provider_id) {
          try {
            const providerData = await getProfile(listingData.provider_id);
            setProvider(providerData);
          } catch (err) {
            console.error("Error fetching provider:", err);
          }
        }
      } catch (err: any) {
        console.error("Error fetching listing:", err);
        setError(err.message || "Failed to load listing");
      } finally {
        setLoading(false);
      }
    }

    fetchListingData();
  }, [listingId]);

  // Build amenities list from listing data
  const getAmenities = () => {
    if (!listing) return [];
    const amenities: string[] = [];
    if (listing.wifi) amenities.push("WiFi");
    if (listing.kitchen_access) amenities.push("Kitchen Access");
    if (listing.parking) amenities.push("Parking");
    if (listing.laundry) amenities.push("Laundry");
    if (listing.security) amenities.push("Security");
    if (listing.private_bathroom) amenities.push("Private Bathroom");
    if (listing.furnished) amenities.push("Furnished");
    return amenities;
  };

  // Parse house rules from string
  const getHouseRules = () => {
    if (!listing?.house_rules) return [];
    return listing.house_rules.split("\n").filter((rule) => rule.trim());
  };

  // Get images to display (use photos from storage or placeholder)
  const displayImages = photos.length > 0 ? photos : [PLACEHOLDER_IMAGE];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFEF7] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#F6CB5A]" />
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-[#FFFEF7] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#3C2A1E] mb-2">
              {error || "Listing not found"}
            </h2>
            <Link href="/search" className="text-[#F6CB5A] hover:underline">
              Back to Search
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const amenities = getAmenities();
  const houseRules = getHouseRules();

  return (
    <div className="min-h-screen bg-[#FFFEF7] flex flex-col">
      <Header />

      {/* Sub-header Actions */}
      <div className="bg-[#FFFEF7]/80 backdrop-blur-md border-b border-[#ECF0F1] sticky top-[73px] z-40 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/search" className="flex items-center space-x-2 text-[#7F8C8D] hover:text-[#3C2A1E] transition-colors group">
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Search</span>
          </Link>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#7F8C8D] hover:bg-[#FDF8F0] rounded-xl"
            >
              <Share2 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#7F8C8D] hover:text-[#E74C3C] hover:bg-[#FDF8F0] rounded-xl"
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative">
                <Image
                  src={displayImages[currentImageIndex] || PLACEHOLDER_IMAGE}
                  alt={listing.title}
                  width={600}
                  height={400}
                  className="w-full h-96 object-cover rounded-xl"
                />
                {listing.featured && (
                  <Badge className="absolute top-4 left-4 bg-[#F6CB5A] text-[#3C2A1E] px-3 py-1">
                    Featured
                  </Badge>
                )}
                {provider?.phone_verified && (
                  <div className="absolute top-4 right-4 bg-[#2ECC71] text-white px-3 py-1 rounded-md text-sm flex items-center">
                    <Shield className="w-4 h-4 mr-1" />
                    Verified
                  </div>
                )}
                {displayImages.length > 0 && displayImages[0] !== PLACEHOLDER_IMAGE && (
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-md text-sm flex items-center">
                    <Camera className="w-4 h-4 mr-1" />
                    {currentImageIndex + 1} / {displayImages.length}
                  </div>
                )}
              </div>

              {displayImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {displayImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative rounded-lg overflow-hidden ${
                        currentImageIndex === index ? "ring-2 ring-[#F6CB5A]" : ""
                      }`}
                    >
                      <Image
                        src={image || PLACEHOLDER_IMAGE}
                        alt={`Room view ${index + 1}`}
                        width={150}
                        height={100}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Listing Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-[#3C2A1E] mb-2">
                      {listing.title}
                    </h1>
                    <div className="flex items-center text-[#7F8C8D] mb-2">
                      <MapPin className="w-5 h-5 mr-2" />
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
                        {listing.current_roommates} current roommates
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#F6CB5A]">
                      {listing.monthly_rent} Birr
                    </div>
                    <div className="text-sm text-[#7F8C8D]">per month</div>
                  </div>
                </div>

                <p className="text-[#3C2A1E] leading-relaxed">
                  {listing.description || "No description provided."}
                </p>
              </div>

              {/* Amenities */}
              {amenities.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-[#3C2A1E] mb-4">
                    Amenities
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-[#3C2A1E]"
                      >
                        <CheckCircle className="w-5 h-5 text-[#2ECC71]" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* House Rules */}
              {houseRules.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-[#3C2A1E] mb-4">
                    House Rules
                  </h2>
                  <div className="space-y-2">
                    {houseRules.map((rule, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-[#3C2A1E]"
                      >
                        <div className="w-2 h-2 bg-[#F6CB5A] rounded-full"></div>
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Availability Info */}
              {listing.available_from && (
                <div>
                  <h2 className="text-xl font-bold text-[#3C2A1E] mb-4">
                    Availability
                  </h2>
                  <div className="flex items-center space-x-2 text-[#3C2A1E]">
                    <Calendar className="w-5 h-5 text-[#F6CB5A]" />
                    <span>
                      Available from{" "}
                      {new Date(listing.available_from).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="bg-gradient-to-br from-[#FDF8F0] to-[#FFFEF7] border-2 border-[#F6CB5A] rounded-xl p-6 shadow-md sticky top-8">
              <CardContent className="p-0 space-y-6">
                {/* Provider Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#F6CB5A] rounded-full flex items-center justify-center overflow-hidden">
                      {provider?.avatar_url ? (
                        <Image
                          src={provider.avatar_url}
                          alt={provider.full_name || "Provider"}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[#3C2A1E] font-bold">
                          {provider?.full_name?.[0] || "?"}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-[#3C2A1E]">
                        {provider?.full_name || "Provider"}
                      </div>
                      <div className="flex items-center space-x-2">
                        {provider?.phone_verified && (
                          <Shield className="w-4 h-4 text-[#2ECC71]" />
                        )}
                        <span className="text-sm text-[#7F8C8D]">
                          {provider?.phone_verified ? "Verified" : ""}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-[#7F8C8D]">
                    {provider?.created_at && (
                      <div>
                        Member since{" "}
                        {new Date(provider.created_at).getFullYear()}
                      </div>
                    )}
                    {provider?.languages && provider.languages.length > 0 && (
                      <div>Languages: {provider.languages.join(", ")}</div>
                    )}
                    {provider?.occupation && (
                      <div>Occupation: {provider.occupation}</div>
                    )}
                  </div>
                </div>

                {/* Contact Form */}
                <div className="space-y-4">
                  {!showContactForm ? (
                    <div className="space-y-3">
                      <Button
                        onClick={() => setShowContactForm(true)}
                        className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 w-full"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                      <Button className="border-2 border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E] py-3 px-6 rounded-lg transition-all duration-200 w-full">
                        <Calendar className="w-5 h-5 mr-2" />
                        Schedule Visit
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Hi! I'm interested in your room. When would be a good time to visit?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] min-h-[100px]"
                      />
                      <div className="flex space-x-2">
                        <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex-1">
                          Send
                        </Button>
                        <Button
                          onClick={() => setShowContactForm(false)}
                          className="border border-[#BDC3C7] text-[#7F8C8D] hover:bg-[#FDF8F0] py-2 px-4 rounded-lg transition-all duration-200"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Contact */}
                <div className="pt-4 border-t border-[#ECF0F1]">
                  <div className="text-sm font-semibold text-[#7F8C8D] mb-2">
                    Quick Contact
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      className="text-[#7F8C8D] hover:bg-[#FDF8F0] p-2 rounded-md flex-1"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-[#7F8C8D] hover:bg-[#FDF8F0] p-2 rounded-md flex-1"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 shadow-sm">
              <CardContent className="p-0 space-y-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-[#2ECC71]" />
                  <h3 className="font-bold text-[#3C2A1E]">Safety Tips</h3>
                </div>
                <div className="space-y-2 text-sm text-[#7F8C8D]">
                  <div>• Meet in public places first</div>
                  <div>• Verify identity before sharing personal info</div>
                  <div>• Trust your instincts</div>
                  <div>• Report suspicious behavior</div>
                </div>
                <Link
                  href="/safety"
                  className="text-[#F6CB5A] hover:text-[#E6B84A] text-sm font-medium"
                >
                  Read full safety guide →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
