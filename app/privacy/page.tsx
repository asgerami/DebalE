"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Coffee,
  Shield,
  Lock,
  Eye,
  Users,
  Calendar,
  Mail,
} from "lucide-react";
import Link from "next/link";

const privacySections = [
  {
    title: "Information We Collect",
    icon: Eye,
    content: [
      "Personal information (name, email, phone number)",
      "Profile information (age, occupation, preferences)",
      "Location data for room matching",
      "Communication data through our platform",
      "Usage analytics and preferences",
    ],
  },
  {
    title: "How We Use Your Information",
    icon: Users,
    content: [
      "To provide roommate matching services",
      "To verify user identities and ensure safety",
      "To improve our platform and user experience",
      "To send important updates and notifications",
      "To provide customer support",
    ],
  },
  {
    title: "Information Sharing",
    icon: Shield,
    content: [
      "We never sell your personal information",
      "Profile information is shared only with potential matches",
      "We may share data with law enforcement when required",
      "Aggregated, anonymized data may be used for analytics",
      "Third-party services are used only for essential functions",
    ],
  },
  {
    title: "Data Security",
    icon: Lock,
    content: [
      "All data is encrypted in transit and at rest",
      "Regular security audits and updates",
      "Access controls and authentication measures",
      "Secure hosting infrastructure",
      "Regular backups and disaster recovery",
    ],
  },
];

import Header from "@/components/header";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF7] flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[#FDF8F0] to-[#FFFEF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-[#FDF8F0] text-[#F6CB5A] border-[#F6CB5A] px-4 py-2 mb-6">
            🇪🇹 Privacy & Security
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-[#3C2A1E] mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-[#7F8C8D] max-w-3xl mx-auto mb-8">
            Your privacy and security are our top priorities. Learn how we
            protect your information and maintain your trust.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-[#7F8C8D]">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-[#2ECC71]" />
              <span>Data Protection</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-[#2ECC71]" />
              <span>Secure Platform</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-[#2ECC71]" />
              <span>Transparent Practices</span>
            </div>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6">
            <CardContent className="p-0">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-5 h-5 text-[#F6CB5A]" />
                <span className="font-semibold text-[#3C2A1E]">
                  Last Updated: December 2024
                </span>
              </div>
              <p className="text-[#7F8C8D]">
                This privacy policy describes how DebalE ("we," "us," or "our")
                collects, uses, and protects your information when you use our
                roommate matching platform.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {privacySections.map((section, index) => (
              <Card
                key={index}
                className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#F6CB5A] rounded-lg flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-[#3C2A1E]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#3C2A1E]">
                      {section.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {section.content.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start space-x-2"
                      >
                        <div className="w-1.5 h-1.5 bg-[#F6CB5A] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-[#3C2A1E] text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-[#FDF8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#3C2A1E] mb-4">
                Your Rights
              </h2>
              <p className="text-[#7F8C8D] mb-4">
                You have the right to access, update, or delete your personal
                information at any time. You can also:
              </p>
              <ul className="space-y-2 text-[#3C2A1E]">
                <li>• Request a copy of your data</li>
                <li>• Opt out of marketing communications</li>
                <li>• Deactivate your account</li>
                <li>• Report privacy concerns</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#3C2A1E] mb-4">
                Contact Us
              </h2>
              <p className="text-[#7F8C8D] mb-4">
                If you have any questions about this privacy policy or our data
                practices, please contact us:
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-[#F6CB5A]" />
                  <span className="text-[#3C2A1E]">privacy@debale.et</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-[#F6CB5A]" />
                  <span className="text-[#3C2A1E]">
                    Data Protection Officer
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#3C2A1E] mb-4">
                Changes to This Policy
              </h2>
              <p className="text-[#7F8C8D]">
                We may update this privacy policy from time to time. We will
                notify you of any changes by posting the new policy on this page
                and updating the "Last Updated" date.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#F6CB5A] to-[#E6B84A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3C2A1E] mb-4">
            Questions About Privacy?
          </h2>
          <p className="text-xl text-[#3C2A1E] mb-8 opacity-90">
            Our team is here to help with any privacy or security concerns
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-[#3C2A1E] hover:bg-[#2A1E14] text-[#FFFEF7] font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                Contact Us
              </Button>
            </Link>
            <Link href="/help">
              <Button className="bg-transparent border-2 border-[#3C2A1E] text-[#3C2A1E] hover:bg-[#3C2A1E] hover:text-[#FFFEF7] py-4 px-8 rounded-lg transition-all duration-200">
                Help Center
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
