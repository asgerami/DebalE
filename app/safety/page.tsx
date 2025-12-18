"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Coffee,
  Shield,
  AlertTriangle,
  CheckCircle,
  Users,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  Star,
  ArrowRight,
  Eye,
  Lock,
  Camera,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const safetyGuidelines = [
  {
    category: "Before Meeting",
    icon: Shield,
    tips: [
      "Always communicate through the DebalE app first",
      "Verify the other person's profile and reviews",
      "Ask for additional photos of the room/property",
      "Research the neighborhood and area",
      "Trust your instincts - if something feels off, don't proceed",
    ],
  },
  {
    category: "First Meeting",
    icon: Users,
    tips: [
      "Meet in a public place like a coffee shop or mall",
      "Bring a friend or family member with you",
      "Meet during daylight hours",
      "Let someone know where you're going and when you'll be back",
      "Keep your personal information private initially",
    ],
  },
  {
    category: "Property Viewing",
    icon: Eye,
    tips: [
      "Visit the property during the day",
      "Take photos and notes during the visit",
      "Ask about security measures and neighborhood safety",
      "Check for working utilities and maintenance",
      "Meet current roommates if possible",
    ],
  },
  {
    category: "Financial Safety",
    icon: Lock,
    tips: [
      "Never send money before seeing the property",
      "Get everything in writing - rent, deposit, utilities",
      "Ask for receipts for all payments",
      "Be cautious of deals that seem too good to be true",
      "Use secure payment methods when possible",
    ],
  },
];

const redFlags = [
  {
    title: "Pressure to Move Quickly",
    description:
      "Someone insisting you decide immediately or pay upfront without seeing the property.",
    icon: AlertTriangle,
  },
  {
    title: "Unwilling to Meet in Person",
    description: "Avoiding face-to-face meetings or property viewings.",
    icon: Users,
  },
  {
    title: "Suspicious Payment Requests",
    description:
      "Asking for payment through unusual methods or before any agreement.",
    icon: Lock,
  },
  {
    title: "Inconsistent Information",
    description: "Details that don't match up or change frequently.",
    icon: AlertTriangle,
  },
  {
    title: "No Verification",
    description:
      "Unverified profiles or refusal to provide basic verification.",
    icon: Shield,
  },
  {
    title: "Too Good to Be True",
    description: "Rent prices significantly below market rates for the area.",
    icon: Heart,
  },
];

const emergencyContacts = [
  {
    title: "DebalE Support",
    description: "24/7 customer support for safety concerns",
    contact: "support@debale.et",
    icon: Mail,
  },
  {
    title: "Local Police",
    description: "Emergency police contact",
    contact: "911",
    icon: Phone,
  },
  {
    title: "Report Suspicious Activity",
    description: "Report users or listings that violate our policies",
    contact: "report@debale.et",
    icon: AlertTriangle,
  },
];

import Header from "@/components/header";

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF7] flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[#FDF8F0] to-[#FFFEF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-[#FDF8F0] text-[#F6CB5A] border-[#F6CB5A] px-4 py-2 mb-6">
            🇪🇹 Safety First
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-[#3C2A1E] mb-6">
            Safety Guidelines
          </h1>
          <p className="text-xl text-[#7F8C8D] max-w-3xl mx-auto mb-8">
            Your safety is our top priority. Follow these guidelines to ensure a
            secure and positive experience on DebalE.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-[#7F8C8D]">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-[#2ECC71]" />
              <span>Verified Users Only</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-[#2ECC71]" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-[#2ECC71]" />
              <span>Community Guidelines</span>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Guidelines */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3C2A1E] mb-4">
              Safety Guidelines
            </h2>
            <p className="text-xl text-[#7F8C8D]">
              Follow these steps to stay safe throughout your journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {safetyGuidelines.map((guideline, index) => (
              <Card
                key={index}
                className="bg-[#FFFEF7] border-2 border-[#ECF0F1] rounded-xl hover:shadow-md transition-shadow duration-200"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#F6CB5A] rounded-lg flex items-center justify-center">
                      <guideline.icon className="w-5 h-5 text-[#3C2A1E]" />
                    </div>
                    <CardTitle className="text-xl text-[#3C2A1E]">
                      {guideline.category}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {guideline.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#2ECC71] flex-shrink-0 mt-0.5" />
                      <span className="text-[#3C2A1E]">{tip}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Red Flags Section */}
      <section className="py-16 bg-[#FDF8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3C2A1E] mb-4">
              Warning Signs
            </h2>
            <p className="text-xl text-[#7F8C8D]">
              Be aware of these red flags and trust your instincts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {redFlags.map((flag, index) => (
              <Card
                key={index}
                className="bg-[#FFFEF7] border-2 border-[#E74C3C]/20 rounded-xl hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#E74C3C]/10 rounded-lg flex items-center justify-center">
                      <flag.icon className="w-5 h-5 text-[#E74C3C]" />
                    </div>
                    <h3 className="font-bold text-[#3C2A1E]">{flag.title}</h3>
                  </div>
                  <p className="text-[#7F8C8D] text-sm">{flag.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3C2A1E] mb-4">
              Emergency Contacts
            </h2>
            <p className="text-xl text-[#7F8C8D]">Get help when you need it</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {emergencyContacts.map((contact, index) => (
              <Card
                key={index}
                className="bg-[#FFFEF7] border-2 border-[#ECF0F1] rounded-xl hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-[#F6CB5A] rounded-lg flex items-center justify-center mx-auto">
                    <contact.icon className="w-6 h-6 text-[#3C2A1E]" />
                  </div>
                  <h3 className="font-bold text-[#3C2A1E]">{contact.title}</h3>
                  <p className="text-[#7F8C8D] text-sm">
                    {contact.description}
                  </p>
                  <div className="bg-[#FDF8F0] rounded-lg p-3">
                    <p className="font-semibold text-[#3C2A1E]">
                      {contact.contact}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-[#FDF8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3C2A1E] mb-4">
              Additional Resources
            </h2>
            <p className="text-xl text-[#7F8C8D]">
              Learn more about staying safe
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 bg-[#F6CB5A] rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#3C2A1E]" />
                </div>
                <h3 className="text-lg font-bold text-[#3C2A1E]">
                  Community Guidelines
                </h3>
                <p className="text-[#7F8C8D] text-sm">
                  Read our community guidelines to understand expected behavior
                  and reporting procedures.
                </p>
                <Link href="/help">
                  <Button
                    variant="outline"
                    className="w-full border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E]"
                  >
                    Read Guidelines
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 bg-[#F6CB5A] rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#3C2A1E]" />
                </div>
                <h3 className="text-lg font-bold text-[#3C2A1E]">
                  Trust & Safety Team
                </h3>
                <p className="text-[#7F8C8D] text-sm">
                  Our dedicated team works 24/7 to ensure your safety and
                  address any concerns.
                </p>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="w-full border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E]"
                  >
                    Contact Team
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 bg-[#F6CB5A] rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-[#3C2A1E]" />
                </div>
                <h3 className="text-lg font-bold text-[#3C2A1E]">
                  User Reviews
                </h3>
                <p className="text-[#7F8C8D] text-sm">
                  Read reviews from other users to make informed decisions about
                  potential matches.
                </p>
                <Link href="/search">
                  <Button
                    variant="outline"
                    className="w-full border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E]"
                  >
                    Browse Reviews
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#F6CB5A] to-[#E6B84A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3C2A1E] mb-4">
            Ready to Get Started Safely?
          </h2>
          <p className="text-xl text-[#3C2A1E] mb-8 opacity-90">
            Join our community of verified users and find your perfect living
            situation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="bg-[#3C2A1E] hover:bg-[#2A1E14] text-[#FFFEF7] font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                Create Verified Profile
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/help">
              <Button className="bg-transparent border-2 border-[#3C2A1E] text-[#3C2A1E] hover:bg-[#3C2A1E] hover:text-[#FFFEF7] py-4 px-8 rounded-lg transition-all duration-200">
                Get Help
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
