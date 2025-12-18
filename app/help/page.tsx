"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  ChevronRight,
  Shield,
  Users,
  Home,
  CreditCard,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const faqCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: HelpCircle,
    questions: [
      {
        question: "How do I create an account on DebalE?",
        answer:
          "Creating an account is simple! Click 'Get Started' on our homepage, choose whether you're looking for a room or have a room to rent, then follow our step-by-step onboarding process. You'll need to provide basic information, verify your phone number, and complete your profile.",
      },
      {
        question: "Is DebalE free to use?",
        answer:
          "Yes! Creating an account, browsing listings, and messaging other users is completely free. We may introduce premium features in the future, but our core matching service will always remain free for Ethiopian students and young professionals.",
      },
      {
        question: "What cities does DebalE serve?",
        answer:
          "DebalE currently serves 15+ major Ethiopian cities including Addis Ababa, Dire Dawa, Mekelle, Bahir Dar, Hawassa, Jimma, and more. We're constantly expanding to new cities based on user demand.",
      },
    ],
  },
  {
    id: "safety",
    title: "Safety & Security",
    icon: Shield,
    questions: [
      {
        question: "How does DebalE verify users?",
        answer:
          "We use a multi-step verification process including phone number verification, email confirmation, and optional ID verification. Students can verify with their student ID, and professionals can provide employment letters. All photos are manually reviewed.",
      },
      {
        question: "What safety measures should I take when meeting potential roommates?",
        answer:
          "Always meet in public places first, bring a friend if possible, trust your instincts, and never share personal financial information until you're ready to move forward. Use our in-app messaging system for initial communications.",
      },
      {
        question: "How do I report suspicious behavior?",
        answer:
          "You can report any user by clicking the 'Report' button on their profile or in your message thread. Our team reviews all reports within 24 hours and takes appropriate action to maintain community safety.",
      },
    ],
  },
  {
    id: "matching",
    title: "Finding Roommates",
    icon: Users,
    questions: [
      {
        question: "How does the matching algorithm work?",
        answer:
          "Our algorithm considers location preferences, budget range, lifestyle compatibility, age preferences, occupation, and cultural factors to suggest the most compatible matches. The more complete your profile, the better your matches will be.",
      },
      {
        question: "Can I filter matches by specific criteria?",
        answer:
          "Yes! You can filter by location, budget range, room type, gender preference, age range, occupation (student/professional), and lifestyle factors like smoking, pets, and cleanliness preferences.",
      },
      {
        question: "What if I don't find good matches?",
        answer:
          "Try expanding your search criteria, updating your profile with more details, or adjusting your budget range. Our team can also provide personalized matching assistance - just contact support.",
      },
    ],
  },
  {
    id: "listings",
    title: "Room Listings",
    icon: Home,
    questions: [
      {
        question: "How do I create a room listing?",
        answer:
          "Click 'List Your Room' and follow our guided process. You'll add photos, describe your space, set your price, specify house rules, and describe your ideal roommate. High-quality photos and detailed descriptions get more responses.",
      },
      {
        question: "How much should I charge for rent?",
        answer:
          "Research similar listings in your area. Consider what's included (utilities, WiFi, cleaning), room size, amenities, and location. Our platform shows average prices in your neighborhood to help you price competitively.",
      },
      {
        question: "Can I edit my listing after posting?",
        answer:
          "Yes! You can edit your listing anytime from your dashboard. Update photos, change the price, modify the description, or mark it as unavailable when you find a tenant.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments & Pricing",
    icon: CreditCard,
    questions: [
      {
        question: "Does DebalE handle rent payments?",
        answer:
          "Currently, rent payments are handled directly between roommates and landlords. We're working on integrated payment solutions to make transactions safer and more convenient.",
      },
      {
        question: "What are typical deposit requirements in Ethiopia?",
        answer:
          "Most landlords require 2-3 months rent as deposit, paid upfront along with the first month's rent. This varies by location and property type. Always clarify deposit terms before committing.",
      },
      {
        question: "Are there any hidden fees?",
        answer:
          "No hidden fees! DebalE is free to use. You only pay rent and deposits directly to your landlord or roommate as agreed. We're transparent about any future premium features we may introduce.",
      },
    ],
  },
]

import Header from "@/components/header";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategory, setExpandedCategory] = useState<string | null>("getting-started")
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0 || searchQuery === "")

  return (
    <div className="min-h-screen bg-[#FFFEF7] flex flex-col">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#3C2A1E] mb-4">How can we help you?</h1>
          <p className="text-xl text-[#7F8C8D] mb-8">
            Find answers to common questions or get in touch with our support team
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7F8C8D]" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-4 text-[#3C2A1E] placeholder-[#7F8C8D] text-lg"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#3C2A1E] mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {filteredCategories.map((category) => (
                <Card key={category.id} className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm">
                  <CardHeader
                    className="cursor-pointer hover:bg-[#FDF8F0] transition-colors duration-200"
                    onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#F6CB5A] rounded-lg flex items-center justify-center">
                          <category.icon className="w-5 h-5 text-[#3C2A1E]" />
                        </div>
                        <CardTitle className="text-lg font-bold text-[#3C2A1E]">{category.title}</CardTitle>
                      </div>
                      {expandedCategory === category.id ? (
                        <ChevronDown className="w-5 h-5 text-[#7F8C8D]" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-[#7F8C8D]" />
                      )}
                    </div>
                  </CardHeader>

                  {expandedCategory === category.id && (
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {category.questions.map((faq, index) => (
                          <div key={index} className="border-l-2 border-[#F6CB5A] pl-4">
                            <button
                              onClick={() =>
                                setExpandedQuestion(
                                  expandedQuestion === `${category.id}-${index}` ? null : `${category.id}-${index}`,
                                )
                              }
                              className="text-left w-full p-3 hover:bg-[#FDF8F0] rounded-lg transition-colors duration-200"
                            >
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-[#3C2A1E]">{faq.question}</h4>
                                {expandedQuestion === `${category.id}-${index}` ? (
                                  <ChevronDown className="w-4 h-4 text-[#7F8C8D] flex-shrink-0 ml-2" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-[#7F8C8D] flex-shrink-0 ml-2" />
                                )}
                              </div>
                            </button>

                            {expandedQuestion === `${category.id}-${index}` && (
                              <div className="mt-2 p-3 bg-[#FDF8F0] rounded-lg">
                                <p className="text-[#3C2A1E] leading-relaxed">{faq.answer}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <Card className="bg-gradient-to-br from-[#FDF8F0] to-[#FFFEF7] border-2 border-[#F6CB5A] rounded-xl shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#3C2A1E]">Need More Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-[#FFFEF7] rounded-lg">
                    <MessageCircle className="w-5 h-5 text-[#F6CB5A]" />
                    <div>
                      <div className="font-semibold text-[#3C2A1E]">Live Chat</div>
                      <div className="text-sm text-[#7F8C8D]">Available 9 AM - 6 PM</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-[#FFFEF7] rounded-lg">
                    <Phone className="w-5 h-5 text-[#F6CB5A]" />
                    <div>
                      <div className="font-semibold text-[#3C2A1E]">+251 11 123 4567</div>
                      <div className="text-sm text-[#7F8C8D]">Mon-Fri, 9 AM - 6 PM</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-[#FFFEF7] rounded-lg">
                    <Mail className="w-5 h-5 text-[#F6CB5A]" />
                    <div>
                      <div className="font-semibold text-[#3C2A1E]">support@debale.et</div>
                      <div className="text-sm text-[#7F8C8D]">We reply within 24 hours</div>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-3 rounded-lg transition-all duration-200">
                  Start Live Chat
                </Button>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#3C2A1E]">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-semibold text-[#7F8C8D] text-sm">Name</label>
                    <Input
                      placeholder="Your name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-3 py-2 text-[#3C2A1E] placeholder-[#7F8C8D]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-semibold text-[#7F8C8D] text-sm">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-3 py-2 text-[#3C2A1E] placeholder-[#7F8C8D]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-[#7F8C8D] text-sm">Subject</label>
                  <Input
                    placeholder="What's this about?"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-3 py-2 text-[#3C2A1E] placeholder-[#7F8C8D]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-[#7F8C8D] text-sm">Message</label>
                  <Textarea
                    placeholder="Tell us how we can help..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-3 py-2 text-[#3C2A1E] placeholder-[#7F8C8D] min-h-[100px]"
                  />
                </div>

                <Button className="w-full bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-3 rounded-lg transition-all duration-200">
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="bg-[#E3F2FD] border border-[#2196F3] rounded-xl">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-[#2196F3]" />
                  <div>
                    <div className="font-semibold text-[#1976D2]">Average Response Time</div>
                    <div className="text-sm text-[#1976D2]">
                      We typically respond within 2-4 hours during business hours
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Popular Resources */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#3C2A1E] mb-8 text-center">Popular Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6 text-center space-y-4">
                <Image
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1126&q=80"
                  alt="Safety guide"
                  width={300}
                  height={200}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <h3 className="text-lg font-bold text-[#3C2A1E]">Safety Guide</h3>
                <p className="text-[#7F8C8D] text-sm">
                  Essential tips for safe roommate searching and meeting potential matches
                </p>
                <Link href="/safety">
                  <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                    Read Guide
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6 text-center space-y-4">
                <Image
                  src="https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1126&q=80"
                  alt="Pricing guide"
                  width={300}
                  height={200}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <h3 className="text-lg font-bold text-[#3C2A1E]">Pricing Guide</h3>
                <p className="text-[#7F8C8D] text-sm">
                  Understand rental prices across Ethiopian cities and how to budget effectively
                </p>
                <Link href="/pricing-guide">
                  <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                    View Prices
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6 text-center space-y-4">
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1184&q=80"
                  alt="Community guidelines"
                  width={300}
                  height={200}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <h3 className="text-lg font-bold text-[#3C2A1E]">Community Guidelines</h3>
                <p className="text-[#7F8C8D] text-sm">
                  Learn about our community standards and how to be a great DebalE member
                </p>
                <Link href="/community">
                  <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                    Read Guidelines
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
