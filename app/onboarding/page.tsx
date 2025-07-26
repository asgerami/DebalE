"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Coffee,
  Home,
  Users,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Calendar,
  DollarSign,
  Heart,
  Shield,
  Camera,
  Upload,
  Wifi,
  Car,
  Utensils,
  Bed,
} from "lucide-react"
import Link from "next/link"

const amenityOptions = [
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "parking", label: "Parking", icon: Car },
  { id: "kitchen", label: "Kitchen Access", icon: Utensils },
  { id: "laundry", label: "Laundry", icon: Home },
  { id: "security", label: "Security", icon: Shield },
  { id: "study", label: "Study Area", icon: Bed },
  { id: "gym", label: "Gym", icon: Heart },
  { id: "balcony", label: "Balcony", icon: Home },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [userType, setUserType] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const [formData, setFormData] = useState({
    // Basic Info
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    currentLocation: "",
    preferredAreas: [],

    // Budget & Timeline (Seekers)
    budgetMin: "",
    budgetMax: "",
    moveInDate: "",
    depositCapacity: "",

    // Lifestyle Preferences
    livingStyle: "",
    smoking: "",
    pets: "",
    cleanliness: "",
    agePreference: "",
    genderPreference: "",
    religiousConsiderations: "",

    // Must-Haves (Seekers)
    roomType: "",
    essentialAmenities: [],
    transportationNeeds: "",

    // Property Basics (Providers)
    propertyLocation: "",
    neighborhood: "",
    roomSize: "",
    availableDate: "",

    // Rental Details (Providers)
    monthlyRent: "",
    whatsIncluded: [],
    depositRequired: "",
    leaseTerms: "",

    // Property Features (Providers)
    photos: [],
    amenities: [],
    houseRules: "",

    // Ideal Roommate (Providers)
    preferredAge: "",
    preferredGender: "",
    preferredOccupation: "",
    dealBreakers: "",
  })

  const handleNext = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentStep(currentStep + 1)
      setIsAnimating(false)
    }, 300)
  }

  const handlePrevious = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentStep(currentStep - 1)
      setIsAnimating(false)
    }, 300)
  }

  const handleUserTypeSelect = (type: string) => {
    setUserType(type)
    handleNext()
  }

  const toggleArrayItem = (array: string[], item: string, field: string) => {
    const newArray = array.includes(item) ? array.filter((i) => i !== item) : [...array, item]
    setFormData({ ...formData, [field]: newArray })
  }

  const getTotalSteps = () => (userType ? 5 : 1)
  const getStepTitle = () => {
    if (currentStep === 1) return "Welcome to DebalE"
    if (userType === "seeker") {
      switch (currentStep) {
        case 2:
          return "Tell us about yourself"
        case 3:
          return "Budget & Timeline"
        case 4:
          return "Lifestyle Preferences"
        case 5:
          return "Must-Haves"
        default:
          return ""
      }
    } else {
      switch (currentStep) {
        case 2:
          return "Property Basics"
        case 3:
          return "Rental Details"
        case 4:
          return "Property Features"
        case 5:
          return "Ideal Roommate"
        default:
          return ""
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFEF7] to-[#FDF8F0]">
      {/* Header */}
      <header className="bg-[#FFFEF7]/80 backdrop-blur-sm shadow-sm border-b border-[#ECF0F1] px-6 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#F6CB5A] to-[#E6B84A] rounded-lg flex items-center justify-center">
              <Coffee className="w-5 h-5 text-[#3C2A1E]" />
            </div>
            <span className="text-xl font-bold text-[#3C2A1E]">DebalE</span>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-[#7F8C8D]">
              Step {currentStep} of {getTotalSteps()}
            </div>
            <Link href="/login" className="text-[#F6CB5A] hover:text-[#E6B84A] font-medium">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        {userType && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              {Array.from({ length: getTotalSteps() - 1 }, (_, i) => i + 2).map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      step <= currentStep
                        ? "bg-[#F6CB5A] text-[#3C2A1E] shadow-lg scale-110"
                        : step === currentStep + 1
                          ? "bg-[#FDF8F0] border-2 border-[#F6CB5A] text-[#F6CB5A] animate-pulse"
                          : "bg-[#ECF0F1] text-[#7F8C8D]"
                    } font-semibold`}
                  >
                    {step < currentStep ? <CheckCircle className="w-6 h-6" /> : step - 1}
                  </div>
                  {step < getTotalSteps() && (
                    <div
                      className={`w-16 h-2 mx-2 rounded-full transition-all duration-500 ${
                        step < currentStep ? "bg-[#F6CB5A]" : "bg-[#ECF0F1]"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div
          className={`transition-all duration-300 ${
            isAnimating ? "opacity-0 transform translate-x-4" : "opacity-100 transform translate-x-0"
          }`}
        >
          <Card className="bg-[#FFFEF7]/90 backdrop-blur-sm border border-[#ECF0F1] rounded-2xl shadow-xl">
            <CardContent className="p-8 md:p-12">
              {/* Step 1: Initial Question */}
              {currentStep === 1 && (
                <div className="text-center space-y-8">
                  <div className="space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#F6CB5A] to-[#E6B84A] rounded-full flex items-center justify-center mx-auto animate-bounce">
                      <Heart className="w-10 h-10 text-[#3C2A1E]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#3C2A1E] leading-tight">
                      What brings you to DebalE today?
                    </h1>
                    <p className="text-xl text-[#7F8C8D] max-w-2xl mx-auto">
                      Let's find the perfect housing solution for you in Ethiopia
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <Card
                      className="group bg-gradient-to-br from-[#FFFEF7] to-[#FDF8F0] border-2 border-[#ECF0F1] hover:border-[#F6CB5A] rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105"
                      onClick={() => handleUserTypeSelect("seeker")}
                    >
                      <CardContent className="p-0 text-center space-y-6">
                        <div className="w-16 h-16 bg-[#F6CB5A] rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                          <Home className="w-8 h-8 text-[#3C2A1E]" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-[#3C2A1E] mb-3">I'm looking for a room to rent</h3>
                          <p className="text-[#7F8C8D] leading-relaxed">
                            Find the perfect room and compatible roommates that match your lifestyle and budget
                          </p>
                        </div>
                        <div className="space-y-2">
                          {["Smart matching", "Verified listings", "Safe messaging"].map((feature, index) => (
                            <div key={index} className="flex items-center justify-center text-sm text-[#3C2A1E]">
                              <CheckCircle className="w-4 h-4 text-[#2ECC71] mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card
                      className="group bg-gradient-to-br from-[#FFFEF7] to-[#FDF8F0] border-2 border-[#ECF0F1] hover:border-[#F6CB5A] rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105"
                      onClick={() => handleUserTypeSelect("provider")}
                    >
                      <CardContent className="p-0 text-center space-y-6">
                        <div className="w-16 h-16 bg-[#F6CB5A] rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                          <Users className="w-8 h-8 text-[#3C2A1E]" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-[#3C2A1E] mb-3">I have a room and need a roommate</h3>
                          <p className="text-[#7F8C8D] leading-relaxed">
                            List your room and find trustworthy tenants through our comprehensive screening process
                          </p>
                        </div>
                        <div className="space-y-2">
                          {["Verified tenants", "Easy management", "Secure payments"].map((feature, index) => (
                            <div key={index} className="flex items-center justify-center text-sm text-[#3C2A1E]">
                              <CheckCircle className="w-4 h-4 text-[#2ECC71] mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Room Seeker Steps */}
              {userType === "seeker" && (
                <>
                  {/* Step 2: Basic Info */}
                  {currentStep === 2 && (
                    <div className="space-y-8">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-[#F6CB5A] rounded-2xl flex items-center justify-center mx-auto">
                          <Users className="w-8 h-8 text-[#3C2A1E]" />
                        </div>
                        <h2 className="text-3xl font-bold text-[#3C2A1E]">{getStepTitle()}</h2>
                        <p className="text-[#7F8C8D]">Help us create your profile and find the best matches</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Full Name *</label>
                          <Input
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Age *</label>
                          <Input
                            type="number"
                            placeholder="Your age"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            className="bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Gender *</label>
                          <div className="grid grid-cols-3 gap-3">
                            {["Male", "Female", "Other"].map((gender) => (
                              <button
                                key={gender}
                                onClick={() => setFormData({ ...formData, gender: gender.toLowerCase() })}
                                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                                  formData.gender === gender.toLowerCase()
                                    ? "border-[#F6CB5A] bg-[#FDF8F0] text-[#3C2A1E] shadow-md"
                                    : "border-[#ECF0F1] bg-[#FFFEF7] text-[#7F8C8D] hover:border-[#F6CB5A]"
                                }`}
                              >
                                {gender}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Phone Number *</label>
                          <Input
                            placeholder="+251 9XX XXX XXX"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Current Location</label>
                          <Input
                            placeholder="e.g., Addis Ababa, Bole"
                            value={formData.currentLocation}
                            onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                            className="bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Preferred Areas</label>
                          <div className="grid grid-cols-2 gap-2">
                            {["Bole", "Sidist Kilo", "CMC", "Piazza", "Kazanchis", "Merkato"].map((area) => (
                              <button
                                key={area}
                                onClick={() => toggleArrayItem(formData.preferredAreas, area, "preferredAreas")}
                                className={`p-2 rounded-lg border-2 text-sm transition-all duration-200 ${
                                  formData.preferredAreas.includes(area)
                                    ? "border-[#F6CB5A] bg-[#FDF8F0] text-[#3C2A1E]"
                                    : "border-[#ECF0F1] bg-[#FFFEF7] text-[#7F8C8D] hover:border-[#F6CB5A]"
                                }`}
                              >
                                {area}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Budget & Timeline */}
                  {currentStep === 3 && (
                    <div className="space-y-8">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-[#F6CB5A] rounded-2xl flex items-center justify-center mx-auto">
                          <DollarSign className="w-8 h-8 text-[#3C2A1E]" />
                        </div>
                        <h2 className="text-3xl font-bold text-[#3C2A1E]">{getStepTitle()}</h2>
                        <p className="text-[#7F8C8D]">Let's understand your budget and timeline</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Minimum Budget (Birr/month) *</label>
                          <Input
                            type="number"
                            placeholder="e.g., 1000"
                            value={formData.budgetMin}
                            onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                            className="bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Maximum Budget (Birr/month) *</label>
                          <Input
                            type="number"
                            placeholder="e.g., 2500"
                            value={formData.budgetMax}
                            onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                            className="bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Preferred Move-in Date</label>
                          <Input
                            type="date"
                            value={formData.moveInDate}
                            onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                            className="bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] transition-all duration-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Deposit Capacity (Birr)</label>
                          <select
                            value={formData.depositCapacity}
                            onChange={(e) => setFormData({ ...formData, depositCapacity: e.target.value })}
                            className="w-full bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] transition-all duration-200"
                          >
                            <option value="">Select deposit capacity</option>
                            <option value="1-month">1 month rent</option>
                            <option value="2-months">2 months rent</option>
                            <option value="3-months">3 months rent</option>
                            <option value="flexible">Flexible</option>
                          </select>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-[#FDF8F0] to-[#FFFEF7] border-2 border-[#F6CB5A] rounded-2xl p-6">
                        <h4 className="font-bold text-[#3C2A1E] mb-3 flex items-center">
                          <Calendar className="w-5 h-5 mr-2" />
                          Budget Tip
                        </h4>
                        <p className="text-sm text-[#3C2A1E]">
                          Consider additional costs like utilities, internet, and transportation when setting your
                          budget. Most landlords in Ethiopia require 2-3 months advance payment.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Lifestyle Preferences */}
                  {currentStep === 4 && (
                    <div className="space-y-8">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-[#F6CB5A] rounded-2xl flex items-center justify-center mx-auto">
                          <Heart className="w-8 h-8 text-[#3C2A1E]" />
                        </div>
                        <h2 className="text-3xl font-bold text-[#3C2A1E]">{getStepTitle()}</h2>
                        <p className="text-[#7F8C8D]">Help us find compatible roommates for you</p>
                      </div>

                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <label className="font-semibold text-[#7F8C8D] text-sm">Living Style</label>
                            <div className="space-y-2">
                              {[
                                { value: "quiet", label: "Quiet & Studious" },
                                { value: "social", label: "Social & Outgoing" },
                                { value: "balanced", label: "Balanced" },
                              ].map((option) => (
                                <button
                                  key={option.value}
                                  onClick={() => setFormData({ ...formData, livingStyle: option.value })}
                                  className={`w-full p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                                    formData.livingStyle === option.value
                                      ? "border-[#F6CB5A] bg-[#FDF8F0] text-[#3C2A1E] shadow-md"
                                      : "border-[#ECF0F1] bg-[#FFFEF7] text-[#7F8C8D] hover:border-[#F6CB5A]"
                                  }`}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <label className="font-semibold text-[#7F8C8D] text-sm">Smoking Preference</label>
                            <div className="space-y-2">
                              {[
                                { value: "non-smoker", label: "Non-smoker" },
                                { value: "smoker", label: "Smoker" },
                                { value: "no-preference", label: "No preference" },
                              ].map((option) => (
                                <button
                                  key={option.value}
                                  onClick={() => setFormData({ ...formData, smoking: option.value })}
                                  className={`w-full p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                                    formData.smoking === option.value
                                      ? "border-[#F6CB5A] bg-[#FDF8F0] text-[#3C2A1E] shadow-md"
                                      : "border-[#ECF0F1] bg-[#FFFEF7] text-[#7F8C8D] hover:border-[#F6CB5A]"
                                  }`}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <label className="font-semibold text-[#7F8C8D] text-sm">Pet Preference</label>
                            <div className="space-y-2">
                              {[
                                { value: "no-pets", label: "No pets" },
                                { value: "pets-ok", label: "Pets are okay" },
                                { value: "have-pets", label: "I have pets" },
                              ].map((option) => (
                                <button
                                  key={option.value}
                                  onClick={() => setFormData({ ...formData, pets: option.value })}
                                  className={`w-full p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                                    formData.pets === option.value
                                      ? "border-[#F6CB5A] bg-[#FDF8F0] text-[#3C2A1E] shadow-md"
                                      : "border-[#ECF0F1] bg-[#FFFEF7] text-[#7F8C8D] hover:border-[#F6CB5A]"
                                  }`}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <label className="font-semibold text-[#7F8C8D] text-sm">Cleanliness Level</label>
                            <div className="space-y-2">
                              {[
                                { value: "very-clean", label: "Very clean" },
                                { value: "moderately-clean", label: "Moderately clean" },
                                { value: "relaxed", label: "Relaxed" },
                              ].map((option) => (
                                <button
                                  key={option.value}
                                  onClick={() => setFormData({ ...formData, cleanliness: option.value })}
                                  className={`w-full p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                                    formData.cleanliness === option.value
                                      ? "border-[#F6CB5A] bg-[#FDF8F0] text-[#3C2A1E] shadow-md"
                                      : "border-[#ECF0F1] bg-[#FFFEF7] text-[#7F8C8D] hover:border-[#F6CB5A]"
                                  }`}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="font-semibold text-[#7F8C8D] text-sm">Age Preference for Roommates</label>
                            <select
                              value={formData.agePreference}
                              onChange={(e) => setFormData({ ...formData, agePreference: e.target.value })}
                              className="w-full bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] transition-all duration-200"
                            >
                              <option value="">No preference</option>
                              <option value="18-22">18-22 years</option>
                              <option value="23-27">23-27 years</option>
                              <option value="28-32">28-32 years</option>
                              <option value="similar-age">Similar to my age</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="font-semibold text-[#7F8C8D] text-sm">Gender Preference</label>
                            <select
                              value={formData.genderPreference}
                              onChange={(e) => setFormData({ ...formData, genderPreference: e.target.value })}
                              className="w-full bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] transition-all duration-200"
                            >
                              <option value="">No preference</option>
                              <option value="same-gender">Same gender</option>
                              <option value="male-only">Male only</option>
                              <option value="female-only">Female only</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">
                            Religious/Cultural Considerations
                          </label>
                          <Textarea
                            placeholder="Any specific religious or cultural preferences you'd like to mention..."
                            value={formData.religiousConsiderations}
                            onChange={(e) => setFormData({ ...formData, religiousConsiderations: e.target.value })}
                            className="bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] min-h-[100px] transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Must-Haves */}
                  {currentStep === 5 && (
                    <div className="space-y-8">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-[#F6CB5A] rounded-2xl flex items-center justify-center mx-auto">
                          <CheckCircle className="w-8 h-8 text-[#3C2A1E]" />
                        </div>
                        <h2 className="text-3xl font-bold text-[#3C2A1E]">{getStepTitle()}</h2>
                        <p className="text-[#7F8C8D]">What are your non-negotiable requirements?</p>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-3">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Room Type Preference</label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                              { value: "private", label: "Private Room" },
                              { value: "shared", label: "Shared Room" },
                              { value: "master", label: "Master Bedroom" },
                              { value: "studio", label: "Studio" },
                            ].map((option) => (
                              <button
                                key={option.value}
                                onClick={() => setFormData({ ...formData, roomType: option.value })}
                                className={`p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                                  formData.roomType === option.value
                                    ? "border-[#F6CB5A] bg-[#FDF8F0] text-[#3C2A1E] shadow-md"
                                    : "border-[#ECF0F1] bg-[#FFFEF7] text-[#7F8C8D] hover:border-[#F6CB5A]"
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Essential Amenities</label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {amenityOptions.map((amenity) => (
                              <button
                                key={amenity.id}
                                onClick={() =>
                                  toggleArrayItem(formData.essentialAmenities, amenity.id, "essentialAmenities")
                                }
                                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                                  formData.essentialAmenities.includes(amenity.id)
                                    ? "border-[#F6CB5A] bg-[#FDF8F0] text-[#3C2A1E] shadow-md"
                                    : "border-[#ECF0F1] bg-[#FFFEF7] text-[#7F8C8D] hover:border-[#F6CB5A]"
                                }`}
                              >
                                <amenity.icon className="w-5 h-5 mx-auto mb-1" />
                                <div className="text-xs font-medium">{amenity.label}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Transportation Needs</label>
                          <Textarea
                            placeholder="e.g., Close to AAU campus, near bus station, walking distance to work..."
                            value={formData.transportationNeeds}
                            onChange={(e) => setFormData({ ...formData, transportationNeeds: e.target.value })}
                            className="bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] min-h-[100px] transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Room Provider Steps */}
              {userType === "provider" && (
                <>
                  {/* Step 2: Property Basics */}
                  {currentStep === 2 && (
                    <div className="space-y-8">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-[#F6CB5A] rounded-2xl flex items-center justify-center mx-auto">
                          <Home className="w-8 h-8 text-[#3C2A1E]" />
                        </div>
                        <h2 className="text-3xl font-bold text-[#3C2A1E]">{getStepTitle()}</h2>
                        <p className="text-[#7F8C8D]">Tell us about your property</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Property Location *</label>
                          <Input
                            placeholder="e.g., Bole, Addis Ababa"
                            value={formData.propertyLocation}
                            onChange={(e) => setFormData({ ...formData, propertyLocation: e.target.value })}
                            className="bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Neighborhood Description</label>
                          <Input
                            placeholder="e.g., Quiet residential area, close to shops"
                            value={formData.neighborhood}
                            onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                            className="bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Room Size *</label>
                          <select
                            value={formData.roomSize}
                            onChange={(e) => setFormData({ ...formData, roomSize: e.target.value })}
                            className="w-full bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] transition-all duration-200"
                          >
                            <option value="">Select room size</option>
                            <option value="small">Small (&lt; 15 sqm)</option>
                            <option value="medium">Medium (15-25 sqm)</option>
                            <option value="large">Large (&gt; 25 sqm)</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Available From</label>
                          <Input
                            type="date"
                            value={formData.availableDate}
                            onChange={(e) => setFormData({ ...formData, availableDate: e.target.value })}
                            className="bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Rental Details */}
                  {currentStep === 3 && (
                    <div className="space-y-8">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-[#F6CB5A] rounded-2xl flex items-center justify-center mx-auto">
                          <DollarSign className="w-8 h-8 text-[#3C2A1E]" />
                        </div>
                        <h2 className="text-3xl font-bold text-[#3C2A1E]">{getStepTitle()}</h2>
                        <p className="text-[#7F8C8D]">Set your rental terms and pricing</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Monthly Rent (Birr) *</label>
                          <Input
                            type="number"
                            placeholder="e.g., 2000"
                            value={formData.monthlyRent}
                            onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                            className="bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Deposit Required</label>
                          <select
                            value={formData.depositRequired}
                            onChange={(e) => setFormData({ ...formData, depositRequired: e.target.value })}
                            className="w-full bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] transition-all duration-200"
                          >
                            <option value="">Select deposit requirement</option>
                            <option value="1-month">1 month rent</option>
                            <option value="2-months">2 months rent</option>
                            <option value="3-months">3 months rent</option>
                            <option value="negotiable">Negotiable</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">What's Included in Rent</label>
                          <div className="grid grid-cols-2 gap-2">
                            {["Utilities", "WiFi", "Cleaning", "Security", "Water", "Electricity"].map((item) => (
                              <button
                                key={item}
                                onClick={() => toggleArrayItem(formData.whatsIncluded, item, "whatsIncluded")}
                                className={`p-2 rounded-lg border-2 text-sm transition-all duration-200 ${
                                  formData.whatsIncluded.includes(item)
                                    ? "border-[#F6CB5A] bg-[#FDF8F0] text-[#3C2A1E]"
                                    : "border-[#ECF0F1] bg-[#FFFEF7] text-[#7F8C8D] hover:border-[#F6CB5A]"
                                }`}
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Lease Terms</label>
                          <select
                            value={formData.leaseTerms}
                            onChange={(e) => setFormData({ ...formData, leaseTerms: e.target.value })}
                            className="w-full bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] transition-all duration-200"
                          >
                            <option value="">Select lease terms</option>
                            <option value="6-months">6 months minimum</option>
                            <option value="1-year">1 year minimum</option>
                            <option value="flexible">Flexible</option>
                            <option value="month-to-month">Month to month</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Property Features */}
                  {currentStep === 4 && (
                    <div className="space-y-8">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-[#F6CB5A] rounded-2xl flex items-center justify-center mx-auto">
                          <Camera className="w-8 h-8 text-[#3C2A1E]" />
                        </div>
                        <h2 className="text-3xl font-bold text-[#3C2A1E]">{getStepTitle()}</h2>
                        <p className="text-[#7F8C8D]">Showcase your property with photos and amenities</p>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-3">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Property Photos</label>
                          <div className="border-2 border-dashed border-[#F6CB5A] rounded-2xl p-8 text-center bg-gradient-to-br from-[#FDF8F0] to-[#FFFEF7] hover:from-[#FDF8F0] hover:to-[#FDF8F0] transition-all duration-300">
                            <Camera className="w-12 h-12 text-[#F6CB5A] mx-auto mb-4" />
                            <h4 className="text-lg font-semibold text-[#3C2A1E] mb-2">Upload Property Photos</h4>
                            <p className="text-[#7F8C8D] mb-4">Add at least 5 photos to attract more tenants</p>
                            <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
                              <Upload className="w-5 h-5 mr-2" />
                              Choose Photos
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Available Amenities</label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {amenityOptions.map((amenity) => (
                              <button
                                key={amenity.id}
                                onClick={() => toggleArrayItem(formData.amenities, amenity.id, "amenities")}
                                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                                  formData.amenities.includes(amenity.id)
                                    ? "border-[#F6CB5A] bg-[#FDF8F0] text-[#3C2A1E] shadow-md"
                                    : "border-[#ECF0F1] bg-[#FFFEF7] text-[#7F8C8D] hover:border-[#F6CB5A]"
                                }`}
                              >
                                <amenity.icon className="w-5 h-5 mx-auto mb-1" />
                                <div className="text-xs font-medium">{amenity.label}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">House Rules</label>
                          <Textarea
                            placeholder="e.g., No smoking inside, Quiet hours 10 PM - 7 AM, Clean common areas after use..."
                            value={formData.houseRules}
                            onChange={(e) => setFormData({ ...formData, houseRules: e.target.value })}
                            className="bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] min-h-[120px] transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Ideal Roommate */}
                  {currentStep === 5 && (
                    <div className="space-y-8">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-[#F6CB5A] rounded-2xl flex items-center justify-center mx-auto">
                          <Users className="w-8 h-8 text-[#3C2A1E]" />
                        </div>
                        <h2 className="text-3xl font-bold text-[#3C2A1E]">{getStepTitle()}</h2>
                        <p className="text-[#7F8C8D]">Help us find the perfect tenant for you</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Preferred Age Range</label>
                          <select
                            value={formData.preferredAge}
                            onChange={(e) => setFormData({ ...formData, preferredAge: e.target.value })}
                            className="w-full bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] transition-all duration-200"
                          >
                            <option value="">No preference</option>
                            <option value="18-22">18-22 years</option>
                            <option value="23-27">23-27 years</option>
                            <option value="28-32">28-32 years</option>
                            <option value="33+">33+ years</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Gender Preference</label>
                          <select
                            value={formData.preferredGender}
                            onChange={(e) => setFormData({ ...formData, preferredGender: e.target.value })}
                            className="w-full bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] transition-all duration-200"
                          >
                            <option value="">No preference</option>
                            <option value="male">Male only</option>
                            <option value="female">Female only</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Preferred Occupation</label>
                          <select
                            value={formData.preferredOccupation}
                            onChange={(e) => setFormData({ ...formData, preferredOccupation: e.target.value })}
                            className="w-full bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] transition-all duration-200"
                          >
                            <option value="">No preference</option>
                            <option value="student">Students only</option>
                            <option value="professional">Professionals only</option>
                            <option value="mixed">Students & Professionals</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Deal Breakers</label>
                        <Textarea
                          placeholder="What behaviors or situations would be unacceptable? e.g., smoking, loud parties, pets..."
                          value={formData.dealBreakers}
                          onChange={(e) => setFormData({ ...formData, dealBreakers: e.target.value })}
                          className="bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] min-h-[100px] transition-all duration-200"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Navigation Buttons */}
              {currentStep > 1 && (
                <div className="flex justify-between pt-8 border-t border-[#ECF0F1]">
                  <Button
                    onClick={handlePrevious}
                    className="border-2 border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E] py-3 px-6 rounded-xl transition-all duration-200 group"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                    Previous
                  </Button>

                  {currentStep < getTotalSteps() ? (
                    <Button
                      onClick={handleNext}
                      className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group"
                    >
                      Next Step
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        console.log("Onboarding completed:", formData)
                        // Handle completion - redirect to dashboard
                      }}
                      className="bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#229954] text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
                    >
                      Complete Setup
                      <CheckCircle className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform duration-200" />
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Progress Indicator */}
        {userType && (
          <div className="text-center mt-8">
            <div className="text-sm text-[#7F8C8D]">
              {Math.round(((currentStep - 1) / (getTotalSteps() - 1)) * 100)}% Complete
            </div>
            <div className="w-full bg-[#ECF0F1] rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-[#F6CB5A] to-[#E6B84A] h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (getTotalSteps() - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
