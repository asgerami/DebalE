"use client";

import { useState } from "react";
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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useListings } from "../../../hooks/useListings";

const mockListing = {
  id: 1,
  title: "Cozy Room Near AAU Campus",
  location: "Sidist Kilo, Addis Ababa",
  price: 1500,
  type: "Private Room",
  rating: 4.8,
  reviews: 24,
  images: [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1560448075-bb485b067938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1560448204-5c9c0c0c0c0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  ],
  amenities: [
    "WiFi",
    "Kitchen Access",
    "Parking",
    "Laundry",
    "Security",
    "Study Area",
  ],
  roommates: 2,
  verified: true,
  featured: true,
  description:
    "Perfect for AAU students! This cozy private room is located just 10 minutes walk from the main campus. The house is shared with 2 other friendly students who are respectful and clean. Great study environment with fast WiFi and quiet atmosphere.",
  houseRules: [
    "No smoking inside",
    "Quiet hours: 10 PM - 7 AM",
    "Clean common areas after use",
    "Guests allowed with prior notice",
  ],
  nearbyPlaces: [
    { name: "Addis Ababa University", distance: "10 min walk" },
    { name: "Sidist Kilo Market", distance: "5 min walk" },
    { name: "Bus Station", distance: "3 min walk" },
    { name: "Pharmacy", distance: "2 min walk" },
  ],
  provider: {
    name: "Meron Tadesse",
    rating: 4.9,
    reviews: 15,
    verified: true,
    responseTime: "Usually responds within 2 hours",
    languages: ["Amharic", "English"],
    memberSince: "2023",
  },
  currentRoommates: [
    {
      name: "Sara",
      age: 22,
      occupation: "Engineering Student",
      interests: ["Reading", "Coffee"],
    },
    {
      name: "Daniel",
      age: 24,
      occupation: "Computer Science Student",
      interests: ["Gaming", "Music"],
    },
  ],
};

export default function ListingDetailPage() {
  // Example usage of the listings hook
  const { listings, loading, error, addListing, editListing } = useListings();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFEF7]">
      {/* Header */}
      <header className="bg-[#FFFEF7] shadow-sm border-b border-[#ECF0F1] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/search" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-[#7F8C8D]" />
              <span className="text-[#7F8C8D] hover:text-[#3C2A1E]">
                Back to Search
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-[#7F8C8D] hover:bg-[#FDF8F0] p-2 rounded-md"
            >
              <Share2 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              className="text-[#7F8C8D] hover:text-[#E74C3C] hover:bg-[#FDF8F0] p-2 rounded-md"
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative">
                <Image
                  src={
                    mockListing.images[currentImageIndex] || "/placeholder.svg"
                  }
                  alt={mockListing.title}
                  width={600}
                  height={400}
                  className="w-full h-96 object-cover rounded-xl"
                />
                {mockListing.featured && (
                  <Badge className="absolute top-4 left-4 bg-[#F6CB5A] text-[#3C2A1E] px-3 py-1">
                    Featured
                  </Badge>
                )}
                {mockListing.verified && (
                  <div className="absolute top-4 right-4 bg-[#2ECC71] text-white px-3 py-1 rounded-md text-sm flex items-center">
                    <Shield className="w-4 h-4 mr-1" />
                    Verified
                  </div>
                )}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-md text-sm flex items-center">
                  <Camera className="w-4 h-4 mr-1" />
                  {currentImageIndex + 1} / {mockListing.images.length}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {mockListing.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative rounded-lg overflow-hidden ${
                      currentImageIndex === index ? "ring-2 ring-[#F6CB5A]" : ""
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Room view ${index + 1}`}
                      width={150}
                      height={100}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Listing Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-[#3C2A1E] mb-2">
                      {mockListing.title}
                    </h1>
                    <div className="flex items-center text-[#7F8C8D] mb-2">
                      <MapPin className="w-5 h-5 mr-2" />
                      {mockListing.location}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-[#7F8C8D]">
                      <div className="flex items-center">
                        <BedDouble className="w-4 h-4 mr-1" />
                        {mockListing.type}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {mockListing.roommates} current roommates
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-[#F6CB5A] text-[#F6CB5A]" />
                        {mockListing.rating} ({mockListing.reviews} reviews)
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#F6CB5A]">
                      {mockListing.price} Birr
                    </div>
                    <div className="text-sm text-[#7F8C8D]">per month</div>
                  </div>
                </div>

                <p className="text-[#3C2A1E] leading-relaxed">
                  {mockListing.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-xl font-bold text-[#3C2A1E] mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {mockListing.amenities.map((amenity, index) => (
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

              {/* House Rules */}
              <div>
                <h2 className="text-xl font-bold text-[#3C2A1E] mb-4">
                  House Rules
                </h2>
                <div className="space-y-2">
                  {mockListing.houseRules.map((rule, index) => (
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

              {/* Current Roommates */}
              <div>
                <h2 className="text-xl font-bold text-[#3C2A1E] mb-4">
                  Current Roommates
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {mockListing.currentRoommates.map((roommate, index) => (
                    <Card
                      key={index}
                      className="bg-[#FDF8F0] border border-[#ECF0F1] rounded-xl p-4"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-[#F6CB5A] rounded-full flex items-center justify-center">
                          <span className="text-[#3C2A1E] font-bold">
                            {roommate.name[0]}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-[#3C2A1E]">
                            {roommate.name}, {roommate.age}
                          </div>
                          <div className="text-sm text-[#7F8C8D]">
                            {roommate.occupation}
                          </div>
                          <div className="text-xs text-[#7F8C8D]">
                            Interests: {roommate.interests.join(", ")}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Nearby Places */}
              <div>
                <h2 className="text-xl font-bold text-[#3C2A1E] mb-4">
                  Nearby Places
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {mockListing.nearbyPlaces.map((place, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-[#FDF8F0] rounded-lg"
                    >
                      <span className="text-[#3C2A1E]">{place.name}</span>
                      <span className="text-sm text-[#7F8C8D]">
                        {place.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
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
                    <div className="w-12 h-12 bg-[#F6CB5A] rounded-full flex items-center justify-center">
                      <span className="text-[#3C2A1E] font-bold">
                        {mockListing.provider.name[0]}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-[#3C2A1E]">
                        {mockListing.provider.name}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 fill-[#F6CB5A] text-[#F6CB5A]" />
                        <span className="text-sm text-[#7F8C8D]">
                          {mockListing.provider.rating} (
                          {mockListing.provider.reviews} reviews)
                        </span>
                        {mockListing.provider.verified && (
                          <Shield className="w-4 h-4 text-[#2ECC71]" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-[#7F8C8D]">
                    <div>Member since {mockListing.provider.memberSince}</div>
                    <div>{mockListing.provider.responseTime}</div>
                    <div>
                      Languages: {mockListing.provider.languages.join(", ")}
                    </div>
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
