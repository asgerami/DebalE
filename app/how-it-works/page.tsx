"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Coffee,
  User,
  Search,
  MessageCircle,
  Shield,
  CheckCircle,
  Star,
  MapPin,
  Calendar,
  Heart,
  ArrowRight,
  Users,
  Home,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const steps = [
  {
    step: 1,
    title: "Create Your Profile",
    description:
      "Tell us about yourself, your preferences, and what you're looking for in a roommate or room.",
    icon: User,
    details: [
      "Basic information and contact details",
      "Lifestyle preferences and habits",
      "Budget range and location preferences",
      "Verification with phone number and optional ID",
    ],
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    step: 2,
    title: "Smart Matching",
    description:
      "Our algorithm finds compatible matches based on location, budget, lifestyle, and preferences.",
    icon: Search,
    details: [
      "AI-powered compatibility scoring",
      "Location-based recommendations",
      "Budget and lifestyle matching",
      "Cultural and language preferences",
    ],
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    step: 3,
    title: "Connect Safely",
    description:
      "Chat securely, meet in safe locations, and move in with confidence using our verification system.",
    icon: MessageCircle,
    details: [
      "In-app messaging with verified users",
      "Safe meeting location suggestions",
      "Background check options",
      "Community guidelines and support",
    ],
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const safetyFeatures = [
  {
    title: "Verified Profiles",
    description:
      "All users are verified with phone numbers, student IDs, or employment letters.",
    icon: Shield,
  },
  {
    title: "Safe Meeting Guidelines",
    description:
      "We provide tips and guidelines for safe first meetings with potential roommates.",
    icon: CheckCircle,
  },
  {
    title: "Community Reviews",
    description:
      "Read reviews from previous roommates and landlords to make informed decisions.",
    icon: Star,
  },
  {
    title: "24/7 Support",
    description:
      "Our support team is available to help with any concerns or issues.",
    icon: Phone,
  },
];

const testimonials = [
  {
    name: "Sara M.",
    role: "AAU Student",
    content:
      "DebalE helped me find the perfect roommate for my studies. The cultural matching feature is amazing!",
    rating: 5,
  },
  {
    name: "Daniel K.",
    role: "Software Developer",
    content:
      "As a young professional new to Addis, DebalE made finding affordable housing so much easier and safer.",
    rating: 5,
  },
  {
    name: "Meron A.",
    role: "Room Provider",
    content:
      "I found great tenants for my extra rooms through DebalE. The verification system gives me peace of mind.",
    rating: 5,
  },
];

import Header from "@/components/header";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF7] selection:bg-[#F6CB5A]/30 flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[#FDF8F0] to-[#FFFEF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-[#FDF8F0] text-[#F6CB5A] border-[#F6CB5A] px-4 py-2 mb-6">
            🇪🇹 Made for Ethiopia
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-[#3C2A1E] mb-6">
            How DebalE Works
          </h1>
          <p className="text-xl text-[#7F8C8D] max-w-3xl mx-auto mb-8">
            Simple, safe, and effective way to find your ideal living situation
            in Ethiopia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-3 px-6 rounded-lg">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/search">
              <Button
                variant="outline"
                className="border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E] py-3 px-6 rounded-lg"
              >
                Browse Rooms
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3C2A1E] mb-4">
              Three Simple Steps
            </h2>
            <p className="text-xl text-[#7F8C8D]">
              From profile creation to moving in
            </p>
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  }`}
              >
                <div
                  className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""
                    }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#F6CB5A] rounded-full flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-[#3C2A1E]" />
                    </div>
                    <div>
                      <Badge className="bg-[#FDF8F0] text-[#F6CB5A] border-[#F6CB5A]">
                        Step {step.step}
                      </Badge>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-[#3C2A1E]">
                    {step.title}
                  </h3>
                  <p className="text-lg text-[#7F8C8D]">{step.description}</p>

                  <ul className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-[#2ECC71] flex-shrink-0" />
                        <span className="text-[#3C2A1E]">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <div className="relative">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={600}
                      height={400}
                      className="rounded-2xl shadow-lg object-cover"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-[#F6CB5A] rounded-lg p-3 shadow-lg">
                      <div className="text-sm font-semibold text-[#3C2A1E]">
                        Step {step.step}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-16 bg-[#FDF8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3C2A1E] mb-4">
              Your Safety is Our Priority
            </h2>
            <p className="text-xl text-[#7F8C8D]">
              Built-in safety features to protect our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, index) => (
              <Card
                key={index}
                className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 text-center hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-0 space-y-4">
                  <div className="w-12 h-12 bg-[#F6CB5A] rounded-lg flex items-center justify-center mx-auto">
                    <feature.icon className="w-6 h-6 text-[#3C2A1E]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#3C2A1E]">
                    {feature.title}
                  </h3>
                  <p className="text-[#7F8C8D] text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3C2A1E] mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-[#7F8C8D]">
              Real stories from the DebalE community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#F6CB5A] text-[#F6CB5A]"
                      />
                    ))}
                  </div>
                  <p className="text-[#3C2A1E] italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#F6CB5A] rounded-full flex items-center justify-center">
                      <span className="text-[#3C2A1E] font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-[#3C2A1E]">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-[#7F8C8D]">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
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
            Ready to Get Started?
          </h2>
          <p className="text-xl text-[#3C2A1E] mb-8 opacity-90">
            Join thousands of Ethiopian students and professionals who found
            their ideal living situation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="bg-[#3C2A1E] hover:bg-[#2A1E14] text-[#FFFEF7] font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                Create Your Profile
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/search">
              <Button className="bg-transparent border-2 border-[#3C2A1E] text-[#3C2A1E] hover:bg-[#3C2A1E] hover:text-[#FFFEF7] py-4 px-8 rounded-lg transition-all duration-200">
                Browse Available Rooms
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
