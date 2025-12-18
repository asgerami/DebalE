"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Coffee,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Shield,
  Users,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const contactMethods = [
  {
    title: "Email Support",
    description: "Get help with your account or general questions",
    contact: "support@debale.et",
    icon: Mail,
    responseTime: "Within 24 hours",
  },
  {
    title: "Phone Support",
    description: "Speak directly with our customer service team",
    contact: "+251 911 123 456",
    icon: Phone,
    responseTime: "Available 9 AM - 6 PM EAT",
  },
  {
    title: "Safety & Trust",
    description: "Report safety concerns or suspicious activity",
    contact: "safety@debale.et",
    icon: Shield,
    responseTime: "Within 2 hours",
  },
  {
    title: "Business Inquiries",
    description: "Partnership opportunities and business development",
    contact: "business@debale.et",
    icon: Users,
    responseTime: "Within 48 hours",
  },
];

const officeLocations = [
  {
    city: "Addis Ababa",
    address: "Bole, Addis Ababa, Ethiopia",
    phone: "+251 911 123 456",
    email: "addis@debale.et",
  },
  {
    city: "Dire Dawa",
    address: "Kezira, Dire Dawa, Ethiopia",
    phone: "+251 911 123 457",
    email: "diredawa@debale.et",
  },
];

import Header from "@/components/header";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-[#FFFEF7] flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[#FDF8F0] to-[#FFFEF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-[#FDF8F0] text-[#F6CB5A] border-[#F6CB5A] px-4 py-2 mb-6">
            🇪🇹 Get in Touch
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-[#3C2A1E] mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-[#7F8C8D] max-w-3xl mx-auto mb-8">
            We're here to help! Reach out to our team for support, questions, or
            feedback about your DebalE experience.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-[#7F8C8D]">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-[#2ECC71]" />
              <span>24/7 Support Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-[#2ECC71]" />
              <span>Quick Response Time</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-[#2ECC71]" />
              <span>Safe & Secure</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3C2A1E] mb-4">
              How Can We Help?
            </h2>
            <p className="text-xl text-[#7F8C8D]">
              Choose the best way to reach us
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-0 space-y-4">
                  <div className="w-12 h-12 bg-[#F6CB5A] rounded-lg flex items-center justify-center">
                    <method.icon className="w-6 h-6 text-[#3C2A1E]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#3C2A1E]">
                    {method.title}
                  </h3>
                  <p className="text-[#7F8C8D] text-sm">{method.description}</p>
                  <div className="space-y-2">
                    <p className="font-semibold text-[#3C2A1E]">
                      {method.contact}
                    </p>
                    <p className="text-sm text-[#7F8C8D]">
                      {method.responseTime}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-[#FDF8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3C2A1E] mb-4">
              Send Us a Message
            </h2>
            <p className="text-xl text-[#7F8C8D]">
              We'll get back to you as soon as possible
            </p>
          </div>

          <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-semibold text-[#7F8C8D] text-sm">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-[#7F8C8D] text-sm">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-[#7F8C8D] text-sm">
                  Subject
                </label>
                <Input
                  type="text"
                  placeholder="What can we help you with?"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-[#7F8C8D] text-sm">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="safety">Safety Concern</option>
                  <option value="billing">Billing Question</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-[#7F8C8D] text-sm">
                  Message
                </label>
                <Textarea
                  placeholder="Tell us more about your inquiry..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] min-h-[120px]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-4 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3C2A1E] mb-4">
              Our Offices
            </h2>
            <p className="text-xl text-[#7F8C8D]">Visit us in person</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {officeLocations.map((office, index) => (
              <Card
                key={index}
                className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#F6CB5A] rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#3C2A1E]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#3C2A1E]">
                      {office.city}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-[#7F8C8D]" />
                      <span className="text-[#3C2A1E]">{office.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-[#7F8C8D]" />
                      <span className="text-[#3C2A1E]">{office.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-[#7F8C8D]" />
                      <span className="text-[#3C2A1E]">{office.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#FDF8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#3C2A1E] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-[#7F8C8D] mb-8">
            Find quick answers to common questions
          </p>

          <Link href="/help">
            <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-3 px-6 rounded-lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              View FAQ
            </Button>
          </Link>
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
              © 2026 DebalE. Made with ❤️ All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
