"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  User,
  Home,
  Shield,
  BedDouble,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  // Mock profile data
  const profile = {
    name: "Meron Tadesse",
    email: "meron.tadesse@example.com",
    userType: "Room Provider",
    phone: "+251 911 123 456",
    location: "Bole, Addis Ababa",
    bio: "Friendly and responsible. I love meeting new people and helping students find a safe place to stay in Addis.",
    avatar:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&auto=format&fit=facearea&w=400&h=400&facepad=2&q=80",
    verified: true,
    memberSince: "2023",
  };

  // Mock listings data
  const listings = [
    {
      id: 1,
      title: "Cozy Room Near AAU Campus",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: 1500,
      location: "Sidist Kilo, Addis Ababa",
      type: "Private Room",
    },
    {
      id: 2,
      title: "Modern Shared Apartment",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: 2200,
      location: "Bole, Addis Ababa",
      type: "Shared Room",
    },
    {
      id: 3,
      title: "Budget-Friendly Option",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: 900,
      location: "Merkato, Addis Ababa",
      type: "Shared Room",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFEF7] flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-5xl mx-auto">
        {/* Profile Card */}
        <Card className="w-full bg-white border border-[#ECF0F1] rounded-2xl shadow-lg mb-10">
          <CardHeader className="flex flex-col items-center pt-8 pb-4">
            <div className="relative w-28 h-28 mb-4">
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={112}
                height={112}
                className="rounded-full object-cover border-4 border-[#F6CB5A]"
              />
              {profile.verified && (
                <span className="absolute bottom-2 right-2 bg-[#2ECC71] text-white rounded-full p-1">
                  <Shield className="w-4 h-4" />
                </span>
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-[#3C2A1E] mb-1">
              {profile.name}
            </CardTitle>
            <CardDescription className="text-[#7F8C8D] mb-2">
              {profile.userType}
            </CardDescription>
            <Badge className="bg-[#F6CB5A] text-[#3C2A1E] px-3 py-1">
              Member since {profile.memberSince}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6 px-8 pb-8">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#3C2A1E]">
                  <Mail className="w-4 h-4" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-2 text-[#3C2A1E]">
                  <Phone className="w-4 h-4" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[#3C2A1E]">
                  <Home className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#3C2A1E] mb-1">
                  About
                </h3>
                <p className="text-[#7F8C8D] leading-relaxed">{profile.bio}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Listings Section */}
        <div className="w-full">
          <h2 className="text-2xl font-bold text-[#3C2A1E] mb-6">
            Your Listings
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {listings.map((listing) => (
              <Card
                key={listing.id}
                className="bg-white border border-[#ECF0F1] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="relative w-full h-40">
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </div>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#3C2A1E] line-clamp-1">
                      {listing.title}
                    </h3>
                    <span className="text-[#F6CB5A] font-bold text-lg">
                      {listing.price} Birr
                    </span>
                  </div>
                  <div className="flex items-center text-[#7F8C8D] text-sm mb-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {listing.location}
                  </div>
                  <div className="flex items-center text-[#7F8C8D] text-xs">
                    <BedDouble className="w-4 h-4 mr-1" />
                    {listing.type}
                  </div>
                  <div className="flex justify-end pt-2">
                    <Link href={`/listing/${listing.id}`}>
                      <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold px-4 py-1 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
