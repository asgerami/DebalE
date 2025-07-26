"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "@/components/mobile-nav";
import { useAuth } from "@/contexts/AuthContext";

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#FFFEF7]">
      {/* Header */}
      <header className="bg-[#FFFEF7] shadow-sm border-b border-[#ECF0F1] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#F6CB5A] to-[#E6B84A] rounded-lg flex items-center justify-center">
              <Coffee className="w-6 h-6 text-[#3C2A1E]" />
            </div>
            <span className="text-2xl font-bold text-[#3C2A1E]">DebalE</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/search"
              className="text-[#7F8C8D] hover:text-[#3C2A1E] font-medium transition-colors"
            >
              Find Rooms
            </Link>
            <Link
              href="/list-room"
              className="text-[#7F8C8D] hover:text-[#3C2A1E] font-medium transition-colors"
            >
              List Room
            </Link>
            <Link
              href="/how-it-works"
              className="text-[#7F8C8D] hover:text-[#3C2A1E] font-medium transition-colors"
            >
              How It Works
            </Link>
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="text-[#7F8C8D] hover:bg-[#FDF8F0] py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-[#7F8C8D] hover:bg-[#FDF8F0] py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link href="/register">
                  <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </nav>

          <MobileNav />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-[#FDF8F0] text-[#F6CB5A] border-[#F6CB5A] px-4 py-2">
                  🇪🇹 Made for Ethiopia
                </Badge>
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
                  <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-4 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 w-full sm:w-auto">
                    Find Rooms
                    <Search className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/list-room">
                  <Button className="border-2 border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E] py-4 px-8 rounded-lg transition-all duration-200 w-full sm:w-auto">
                    List Your Room
                    <Home className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#3C2A1E]">
                    5,000+
                  </div>
                  <div className="text-sm text-[#7F8C8D]">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#3C2A1E]">
                    1,200+
                  </div>
                  <div className="text-sm text-[#7F8C8D]">
                    Successful Matches
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#3C2A1E]">15+</div>
                  <div className="text-sm text-[#7F8C8D]">Cities</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#FDF8F0] to-[#FFFEF7] rounded-2xl p-8 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                  alt="Ethiopian students and young professionals studying together"
                  width={500}
                  height={400}
                  className="rounded-xl w-full"
                />
                <div className="absolute -bottom-4 -left-4 bg-[#FFFEF7] rounded-lg p-4 shadow-lg border border-[#ECF0F1]">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#2ECC71] rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-[#3C2A1E]">
                      2,341 rooms available
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
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#ECF0F1] hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#3C2A1E]">
                    Need a roommate?
                  </h3>
                  <Link href="/list-room">
                    <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-4 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
                      List your room
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="w-24 h-24 bg-[#F6CB5A] rounded-full flex items-center justify-center">
                    <Users className="w-12 h-12 text-[#3C2A1E]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Looking for a place? */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#ECF0F1] hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#3C2A1E]">
                    Looking for a place?
                  </h3>
                  <Link href="/register">
                    <Button className="bg-[#3C2A1E] hover:bg-[#2C1A0E] text-white font-semibold py-4 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
                      Create your profile
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="w-24 h-24 bg-[#3C2A1E] rounded-full flex items-center justify-center">
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
                <Input
                  placeholder="Addis Ababa, Bole..."
                  className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                />
              </div>
              <div className="space-y-2">
                <label className="font-semibold text-[#7F8C8D] text-sm">
                  Budget (Birr/month)
                </label>
                <Input
                  placeholder="1000 - 3000"
                  className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                />
              </div>
              <div className="space-y-2">
                <label className="font-semibold text-[#7F8C8D] text-sm">
                  Room Type
                </label>
                <Input
                  placeholder="Private room"
                  className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                />
              </div>
              <div className="flex items-end">
                <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 w-full">
                  <Search className="w-5 h-5 mr-2" />
                  Search
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
              Simple, safe, and effective way to find your ideal living
              situation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#F6CB5A] rounded-full flex items-center justify-center mx-auto">
                <User className="w-8 h-8 text-[#3C2A1E]" />
              </div>
              <h3 className="text-xl font-bold text-[#3C2A1E]">
                Create Profile
              </h3>
              <p className="text-[#7F8C8D]">
                Tell us about yourself, your preferences, and what you're
                looking for in a roommate or room.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#F6CB5A] rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-[#3C2A1E]" />
              </div>
              <h3 className="text-xl font-bold text-[#3C2A1E]">
                Smart Matching
              </h3>
              <p className="text-[#7F8C8D]">
                Our algorithm finds compatible matches based on location,
                budget, lifestyle, and preferences.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#F6CB5A] rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="w-8 h-8 text-[#3C2A1E]" />
              </div>
              <h3 className="text-xl font-bold text-[#3C2A1E]">
                Connect Safely
              </h3>
              <p className="text-[#7F8C8D]">
                Chat securely, meet in safe locations, and move in with
                confidence using our verification system.
              </p>
            </div>
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
            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 bg-[#F6CB5A] rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#3C2A1E]" />
                </div>
                <h3 className="text-xl font-bold text-[#3C2A1E]">
                  Verified Profiles
                </h3>
                <p className="text-[#7F8C8D]">
                  All users are verified with phone numbers, student IDs, or
                  employment letters for your safety.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 bg-[#F6CB5A] rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#3C2A1E]" />
                </div>
                <h3 className="text-xl font-bold text-[#3C2A1E]">
                  Local Expertise
                </h3>
                <p className="text-[#7F8C8D]">
                  Deep understanding of Ethiopian cities, universities, and
                  cultural preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 bg-[#F6CB5A] rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#3C2A1E]" />
                </div>
                <h3 className="text-xl font-bold text-[#3C2A1E]">
                  Cultural Matching
                </h3>
                <p className="text-[#7F8C8D]">
                  Find roommates who share your cultural values, language
                  preferences, and lifestyle.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 bg-[#F6CB5A] rounded-lg flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-[#3C2A1E]" />
                </div>
                <h3 className="text-xl font-bold text-[#3C2A1E]">
                  Affordable Options
                </h3>
                <p className="text-[#7F8C8D]">
                  From budget-friendly shared rooms to premium private spaces,
                  options for every budget.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 bg-[#F6CB5A] rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-[#3C2A1E]" />
                </div>
                <h3 className="text-xl font-bold text-[#3C2A1E]">
                  Multi-Language Support
                </h3>
                <p className="text-[#7F8C8D]">
                  Available in Amharic, English, and Oromo to serve all
                  Ethiopian communities.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 bg-[#F6CB5A] rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-[#3C2A1E]" />
                </div>
                <h3 className="text-xl font-bold text-[#3C2A1E]">
                  Community Reviews
                </h3>
                <p className="text-[#7F8C8D]">
                  Read reviews from previous roommates and landlords to make
                  informed decisions.
                </p>
              </CardContent>
            </Card>
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
            Join thousands of Ethiopian students and professionals who found
            their ideal living situation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="bg-[#3C2A1E] hover:bg-[#2A1E14] text-[#FFFEF7] font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/search">
              <Button className="bg-transparent border-2 border-[#3C2A1E] text-[#3C2A1E] hover:bg-[#3C2A1E] hover:text-[#FFFEF7] py-4 px-8 rounded-lg transition-all duration-200">
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
                Connecting Ethiopian students and young professionals with safe,
                affordable housing solutions.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg">For Room Seekers</h3>
              <div className="space-y-2">
                <Link
                  href="/search"
                  className="block text-[#7F8C8D] hover:text-[#F6CB5A] transition-colors"
                >
                  Find Rooms
                </Link>
                <Link
                  href="/how-it-works"
                  className="block text-[#7F8C8D] hover:text-[#F6CB5A] transition-colors"
                >
                  How It Works
                </Link>
                <Link
                  href="/safety"
                  className="block text-[#7F8C8D] hover:text-[#F6CB5A] transition-colors"
                >
                  Safety Tips
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg">For Room Providers</h3>
              <div className="space-y-2">
                <Link
                  href="/list-room"
                  className="block text-[#7F8C8D] hover:text-[#F6CB5A] transition-colors"
                >
                  List Your Room
                </Link>
                <Link
                  href="/pricing"
                  className="block text-[#7F8C8D] hover:text-[#F6CB5A] transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="/resources"
                  className="block text-[#7F8C8D] hover:text-[#F6CB5A] transition-colors"
                >
                  Resources
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg">Support</h3>
              <div className="space-y-2">
                <Link
                  href="/help"
                  className="block text-[#7F8C8D] hover:text-[#F6CB5A] transition-colors"
                >
                  Help Center
                </Link>
                <Link
                  href="/contact"
                  className="block text-[#7F8C8D] hover:text-[#F6CB5A] transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="/privacy"
                  className="block text-[#7F8C8D] hover:text-[#F6CB5A] transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-[#7F8C8D] mt-8 pt-8 text-center">
            <p className="text-[#7F8C8D]">
              © 2024 DebalE. Made with ❤️ for Ethiopia. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
