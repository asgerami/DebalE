"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Filter,
  Heart,
  Star,
  Wifi,
  Car,
  Shield,
  Users,
  BedDouble,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";

const mockListings = [
  {
    id: 1,
    title: "Cozy Room Near AAU Campus",
    location: "Sidist Kilo, Addis Ababa",
    price: 1500,
    type: "Private Room",
    rating: 4.8,
    reviews: 24,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80",
    amenities: ["WiFi", "Kitchen", "Parking"],
    roommates: 2,
    verified: true,
    featured: true,
    providerId: "provider-1",
  },
  {
    id: 2,
    title: "Modern Shared Apartment",
    location: "Bole, Addis Ababa",
    price: 2200,
    type: "Shared Room",
    rating: 4.6,
    reviews: 18,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    amenities: ["WiFi", "Laundry", "Security"],
    roommates: 3,
    verified: true,
    featured: false,
    providerId: "provider-2",
  },
  {
    id: 3,
    title: "Student-Friendly Housing",
    location: "Piazza, Addis Ababa",
    price: 1200,
    type: "Shared Room",
    rating: 4.5,
    reviews: 31,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    amenities: ["WiFi", "Kitchen", "Study Area"],
    roommates: 1,
    verified: true,
    featured: false,
    providerId: "provider-3",
  },
  {
    id: 4,
    title: "Professional's Choice",
    location: "Kazanchis, Addis Ababa",
    price: 2800,
    type: "Private Room",
    rating: 4.9,
    reviews: 12,
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    amenities: ["WiFi", "Gym", "Parking", "Security"],
    roommates: 2,
    verified: true,
    featured: true,
    providerId: "provider-4",
  },
  {
    id: 5,
    title: "Budget-Friendly Option",
    location: "Merkato, Addis Ababa",
    price: 900,
    type: "Shared Room",
    rating: 4.2,
    reviews: 45,
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80",
    amenities: ["Kitchen", "Laundry"],
    roommates: 3,
    verified: true,
    featured: false,
    providerId: "provider-5",
  },
  {
    id: 6,
    title: "Female-Only Housing",
    location: "CMC, Addis Ababa",
    price: 1800,
    type: "Private Room",
    rating: 4.7,
    reviews: 22,
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    amenities: ["WiFi", "Kitchen", "Security", "Female Only"],
    roommates: 2,
    verified: true,
    featured: false,
  },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [roomType, setRoomType] = useState("");
  const [showFilters, setShowFilters] = useState(false);

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
              {mockListings.length} rooms found in Addis Ababa
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

        {/* Listings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockListings.map((listing) => (
            <Card
              key={listing.id}
              className={`${listing.featured
                ? "bg-gradient-to-br from-[#FDF8F0] to-[#FFFEF7] border-2 border-[#F6CB5A] shadow-md relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#F6CB5A] before:rounded-l-xl"
                : "bg-[#FFFEF7] border border-[#ECF0F1] shadow-sm"
                } rounded-xl hover:shadow-md transition-shadow duration-200 overflow-hidden`}
            >
              <div className="relative">
                <Image
                  src={listing.image || "/placeholder.svg"}
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
                {listing.verified && (
                  <div className="absolute bottom-3 left-3 bg-[#2ECC71] text-white px-2 py-1 rounded-md text-xs flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </div>
                )}
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold text-[#3C2A1E] line-clamp-1">
                      {listing.title}
                    </h3>
                    <div className="text-right">
                      <div className="text-xl font-bold text-[#F6CB5A]">
                        {listing.price} Birr
                      </div>
                      <div className="text-xs text-[#7F8C8D]">per month</div>
                    </div>
                  </div>

                  <div className="flex items-center text-[#7F8C8D] text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {listing.location}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-[#7F8C8D]">
                    <div className="flex items-center">
                      <BedDouble className="w-4 h-4 mr-1" />
                      {listing.type}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {listing.roommates} roommates
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-[#F6CB5A] text-[#F6CB5A]" />
                    <span className="text-sm font-medium text-[#3C2A1E]">
                      {listing.rating}
                    </span>
                    <span className="text-sm text-[#7F8C8D]">
                      ({listing.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {listing.amenities.slice(0, 3).map((amenity, index) => (
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
                  {listing.amenities.length > 3 && (
                    <Badge className="bg-[#FDF8F0] text-[#7F8C8D] border-[#ECF0F1] px-2 py-1 text-xs">
                      +{listing.amenities.length - 3} more
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
                    href={`/messages?listing=${listing.id}&provider=${listing.providerId || "provider-1"
                      }`}
                  >
                    <Button className="border-2 border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E] py-2 px-4 rounded-lg transition-all duration-200">
                      Contact
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
