"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MapPin,
  Users,
  Shield,
  Star,
  Coffee,
  Home,
  MessageCircle,
  ArrowRight,
  User,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import { getActiveListingsPaginated } from "@/lib/supabase-crud";

export default function LandingPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [roomCount, setRoomCount] = useState<number | null>(null);
  
  // Search state
  const [searchLocation, setSearchLocation] = useState("");
  const [searchBudget, setSearchBudget] = useState("");
  const [searchRoomType, setSearchRoomType] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Button loading states
  const [listRoomLoading, setListRoomLoading] = useState(false);
  const [createProfileLoading, setCreateProfileLoading] = useState(false);

  // Fetch room count on mount
  useEffect(() => {
    async function fetchRoomCount() {
      try {
        const { total } = await getActiveListingsPaginated(1, 1);
        setRoomCount(total);
      } catch {
        setRoomCount(0);
      }
    }
    fetchRoomCount();
  }, []);

  // Handle search
  const handleSearch = () => {
    setIsSearching(true);
    const params = new URLSearchParams();
    if (searchLocation) params.set("location", searchLocation);
    if (searchBudget) params.set("budget", searchBudget);
    if (searchRoomType) params.set("type", searchRoomType);
    
    setTimeout(() => {
      router.push(`/search?${params.toString()}`);
    }, 300);
  };

  // Handle "List your room" click
  const handleListRoom = () => {
    setListRoomLoading(true);
    if (user) {
      router.push("/list-room");
    } else {
      router.push("/login?redirect=/list-room");
    }
  };

  // Handle "Create profile" click
  const handleCreateProfile = () => {
    setCreateProfileLoading(true);
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/register");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFEF7] flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3C2A1E] leading-tight">
                  Find Your Perfect
                  <span className="text-[#F6CB5A]"> Roommate</span> in Ethiopia
                </h1>
                <p className="text-xl text-[#7F8C8D] leading-relaxed">
                  Connect with trusted students and young professionals. Safe,
                  affordable, and culturally-aware housing solutions across
                  Ethiopian cities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/search">
                  <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-4 px-8 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 w-full sm:w-auto">
                    Find Rooms
                    <Search className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button 
                  onClick={handleListRoom}
                  disabled={listRoomLoading}
                  className="border-2 border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E] py-4 px-8 rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 w-full sm:w-auto bg-transparent"
                >
                  {listRoomLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      List Your Room
                      <Home className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#FDF8F0] to-[#FFFEF7] rounded-2xl p-8 shadow-xl">
                <Image
                  src="/images/hero-ethiopian.png"
                  alt="Ethiopian students and young professionals"
                  width={500}
                  height={400}
                  className="rounded-xl w-full object-cover"
                />
                <div className="absolute -bottom-4 -left-4 bg-[#FFFEF7] rounded-lg p-4 shadow-lg border border-[#ECF0F1]">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#2ECC71] rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-[#3C2A1E]">
                      {roomCount !== null ? `${roomCount.toLocaleString()} rooms available` : "Loading..."}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Buttons */}
      <section className="py-16 bg-[#FFFEF7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Need a roommate? */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#ECF0F1] hover:shadow-xl hover:border-[#F6CB5A]/30 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#3C2A1E]">
                    Need a roommate?
                  </h3>
                  <p className="text-[#7F8C8D] text-sm">
                    {user ? "Post your room and find the perfect match" : "Sign in to list your available room"}
                  </p>
                  <Button 
                    onClick={handleListRoom}
                    disabled={listRoomLoading}
                    className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-4 px-8 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    {listRoomLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : null}
                    {user ? "List your room" : "Sign in to list"}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="hidden md:block">
                  <div className="w-24 h-24 bg-[#F6CB5A] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-12 h-12 text-[#3C2A1E]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Looking for a place? */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#ECF0F1] hover:shadow-xl hover:border-[#3C2A1E]/20 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#3C2A1E]">
                    Looking for a place?
                  </h3>
                  <p className="text-[#7F8C8D] text-sm">
                    {user ? "Browse rooms and find your new home" : "Create a profile to start searching"}
                  </p>
                  <Button 
                    onClick={handleCreateProfile}
                    disabled={createProfileLoading}
                    className="bg-[#3C2A1E] hover:bg-[#2C1A0E] text-white font-semibold py-4 px-8 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    {createProfileLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : null}
                    {user ? "Go to Dashboard" : "Create your profile"}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="hidden md:block">
                  <div className="w-24 h-24 bg-[#3C2A1E] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Home className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <section className="py-12 bg-[#FDF8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#3C2A1E] mb-2">
              Start Your Search
            </h2>
            <p className="text-[#7F8C8D]">
              Find rooms in your preferred area and budget
            </p>
          </div>

          <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 shadow-sm">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="font-semibold text-[#7F8C8D] text-sm">
                  Location
                </label>
                <Select value={searchLocation} onValueChange={setSearchLocation}>
                  <SelectTrigger className="bg-[#FFFEF7] border-[#BDC3C7] focus:border-[#F6CB5A] h-12 rounded-lg">
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bole">Bole</SelectItem>
                    <SelectItem value="kazanchis">Kazanchis</SelectItem>
                    <SelectItem value="piassa">Piassa</SelectItem>
                    <SelectItem value="cmc">CMC</SelectItem>
                    <SelectItem value="megenagna">Megenagna</SelectItem>
                    <SelectItem value="4kilo">4 Kilo</SelectItem>
                    <SelectItem value="gerji">Gerji</SelectItem>
                    <SelectItem value="sarbet">Sarbet</SelectItem>
                    <SelectItem value="ayat">Ayat</SelectItem>
                    <SelectItem value="summit">Summit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="font-semibold text-[#7F8C8D] text-sm">
                  Budget (Birr/month)
                </label>
                <Select value={searchBudget} onValueChange={setSearchBudget}>
                  <SelectTrigger className="bg-[#FFFEF7] border-[#BDC3C7] focus:border-[#F6CB5A] h-12 rounded-lg">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-3000">Under 3,000</SelectItem>
                    <SelectItem value="3000-5000">3,000 - 5,000</SelectItem>
                    <SelectItem value="5000-8000">5,000 - 8,000</SelectItem>
                    <SelectItem value="8000-12000">8,000 - 12,000</SelectItem>
                    <SelectItem value="12000+">12,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="font-semibold text-[#7F8C8D] text-sm">
                  Room Type
                </label>
                <Select value={searchRoomType} onValueChange={setSearchRoomType}>
                  <SelectTrigger className="bg-[#FFFEF7] border-[#BDC3C7] focus:border-[#F6CB5A] h-12 rounded-lg">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private Room</SelectItem>
                    <SelectItem value="shared">Shared Room</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold h-12 px-6 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 w-full"
                >
                  {isSearching ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3C2A1E] mb-4">
              How DebalE Works
            </h2>
            <p className="text-xl text-[#7F8C8D] max-w-2xl mx-auto">
              Simple, safe, and effective way to find your ideal living situation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: User, title: "Create Profile", desc: "Tell us about yourself, your preferences, and what you're looking for in a roommate or room." },
              { icon: Search, title: "Smart Matching", desc: "Our algorithm finds compatible matches based on location, budget, lifestyle, and preferences." },
              { icon: MessageCircle, title: "Connect Safely", desc: "Chat securely, meet in safe locations, and move in with confidence using our verification system." },
            ].map((item, i) => (
              <div key={i} className="text-center space-y-4 group">
                <div className="w-16 h-16 bg-[#F6CB5A] rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-[#3C2A1E]" />
                </div>
                <h3 className="text-xl font-bold text-[#3C2A1E]">{item.title}</h3>
                <p className="text-[#7F8C8D]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-[#FDF8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3C2A1E] mb-4">
              Why Choose DebalE?
            </h2>
            <p className="text-xl text-[#7F8C8D]">
              Built specifically for the Ethiopian market
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Verified Profiles", desc: "All users are verified with phone numbers, student IDs, or employment letters for your safety." },
              { icon: MapPin, title: "Local Expertise", desc: "Deep understanding of Ethiopian cities, universities, and cultural preferences." },
              { icon: Users, title: "Cultural Matching", desc: "Find roommates who share your cultural values, language preferences, and lifestyle." },
              { icon: Coffee, title: "Affordable Options", desc: "From budget-friendly shared rooms to premium private spaces, options for every budget." },
              { icon: MessageCircle, title: "Multi-Language Support", desc: "Available in Amharic, English, and Oromo to serve all Ethiopian communities." },
              { icon: Star, title: "Community Reviews", desc: "Read reviews from previous roommates and landlords to make informed decisions." },
            ].map((item, i) => (
              <Card key={i} className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 shadow-sm hover:shadow-md hover:border-[#F6CB5A]/30 transition-all duration-300 group">
                <CardContent className="p-0 space-y-4">
                  <div className="w-12 h-12 bg-[#F6CB5A] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-[#3C2A1E]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#3C2A1E]">{item.title}</h3>
                  <p className="text-[#7F8C8D]">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#F6CB5A] to-[#E6B84A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3C2A1E] mb-4">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-xl text-[#3C2A1E] mb-8 opacity-90">
            Join thousands of Ethiopian students and professionals who found their ideal living situation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleCreateProfile}
              disabled={createProfileLoading}
              className="bg-[#3C2A1E] hover:bg-[#2A1E14] text-[#FFFEF7] font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              {createProfileLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              {user ? "Go to Dashboard" : "Get Started Free"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Link href="/search">
              <Button className="bg-transparent border-2 border-[#3C2A1E] text-[#3C2A1E] hover:bg-[#3C2A1E] hover:text-[#FFFEF7] py-4 px-8 rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                Browse Rooms
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3C2A1E] text-[#FFFEF7] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#F6CB5A] rounded-lg flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-[#3C2A1E]" />
                </div>
                <span className="text-xl font-bold">DebalE</span>
              </div>
              <p className="text-[#7F8C8D]">
                Connecting Ethiopian students and young professionals with safe, affordable housing solutions.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg">For Room Seekers</h3>
              <div className="space-y-2">
                <Link href="/search" className="block text-[#7F8C8D] hover:text-[#F6CB5A] transition-colors">Find Rooms</Link>
                <Link href="/how-it-works" className="block text-[#7F8C8D] hover:text-[#F6CB5A] transition-colors">How It Works</Link>
                <Link href="/safety" className="block text-[#7F8C8D] hover:text-[#F6CB5A] transition-colors">Safety Tips</Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg">For Room Providers</h3>
              <div className="space-y-2">
                <Link href="/list-room" className="block text-[#7F8C8D] hover:text-[#F6CB5A] transition-colors">List Your Room</Link>
                <Link href="/help" className="block text-[#7F8C8D] hover:text-[#F6CB5A] transition-colors">Help Center</Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg">Support</h3>
              <div className="space-y-2">
                <Link href="/help" className="block text-[#7F8C8D] hover:text-[#F6CB5A] transition-colors">Help Center</Link>
                <Link href="/contact" className="block text-[#7F8C8D] hover:text-[#F6CB5A] transition-colors">Contact Us</Link>
                <Link href="/privacy" className="block text-[#7F8C8D] hover:text-[#F6CB5A] transition-colors">Privacy Policy</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-[#7F8C8D]/30 mt-8 pt-8 text-center">
            <p className="text-[#7F8C8D]">© 2024 DebalE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
