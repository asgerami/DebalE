"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Coffee, Home, Upload, MapPin, DollarSign, Users, Calendar, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { AuthGuard } from "@/components/auth-guard"
import { roomListingService } from "@/lib/database"
import { useRouter } from "next/navigation"

export default function ListRoomPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    roomType: "",
    location: "",
    address: "",
    areaSqm: "",
    availableFrom: "",
    availableUntil: "",
    maxTenants: "1",
    preferredTenantType: "",
    utilitiesIncluded: false,
    internetIncluded: false,
    parkingAvailable: false,
    petFriendly: false,
    smokingAllowed: false,
    amenities: [] as string[],
    houseRules: [] as string[],
  })

  const { user } = useAuth()
  const router = useRouter()

  const amenityOptions = [
    { id: "wifi", label: "WiFi" },
    { id: "kitchen", label: "Kitchen Access" },
    { id: "laundry", label: "Laundry" },
    { id: "security", label: "Security" },
    { id: "study", label: "Study Area" },
    { id: "gym", label: "Gym" },
    { id: "balcony", label: "Balcony" },
    { id: "ac", label: "Air Conditioning" },
    { id: "heating", label: "Heating" },
    { id: "elevator", label: "Elevator" },
  ]

  const houseRuleOptions = [
    "No smoking",
    "No pets",
    "Quiet hours 10 PM - 7 AM",
    "Clean common areas after use",
    "No overnight guests",
    "No parties",
    "Respect shared spaces",
    "Pay utilities on time",
  ]

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleAmenityChange = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  const handleHouseRuleChange = (rule: string) => {
    setFormData(prev => ({
      ...prev,
      houseRules: prev.houseRules.includes(rule)
        ? prev.houseRules.filter(r => r !== rule)
        : [...prev.houseRules, rule]
    }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    if (!user) {
      setError("User not authenticated")
      setIsLoading(false)
      return
    }

    try {
      const listingData = {
        owner_id: user.id,
        title: formData.title,
        description: formData.description,
        price: parseInt(formData.price),
        room_type: formData.roomType as any,
        location: formData.location,
        address: formData.address,
        area_sqm: formData.areaSqm ? parseInt(formData.areaSqm) : null,
        available_from: formData.availableFrom || null,
        available_until: formData.availableUntil || null,
        max_tenants: parseInt(formData.maxTenants),
        preferred_tenant_type: formData.preferredTenantType as any || null,
        utilities_included: formData.utilitiesIncluded,
        internet_included: formData.internetIncluded,
        parking_available: formData.parkingAvailable,
        pet_friendly: formData.petFriendly,
        smoking_allowed: formData.smokingAllowed,
        amenities: formData.amenities,
        house_rules: formData.houseRules,
      }

      const newListing = await roomListingService.createRoomListing(listingData)
      
      if (newListing) {
        // Redirect to the new listing page
        router.push(`/listing/${newListing.id}`)
      } else {
        setError('Failed to create listing. Please try again.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#FFFEF7]">
        {/* Header */}
        <header className="bg-[#FFFEF7] shadow-sm border-b border-[#ECF0F1] px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#F6CB5A] to-[#E6B84A] rounded-lg flex items-center justify-center">
                <Coffee className="w-5 h-5 text-[#3C2A1E]" />
              </div>
              <span className="text-xl font-bold text-[#3C2A1E]">DebalE</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-[#7F8C8D] hover:text-[#3C2A1E]">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Bar */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-[#3C2A1E]">List Your Room</h1>
              <span className="text-[#7F8C8D]">Step {currentStep} of 3</span>
            </div>
            <div className="w-full bg-[#ECF0F1] rounded-full h-2">
              <div
                className="bg-[#F6CB5A] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}

          <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm">
            <CardContent className="p-8">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <CardHeader className="p-0">
                    <CardTitle className="text-2xl font-bold text-[#3C2A1E]">Basic Information</CardTitle>
                    <p className="text-[#7F8C8D]">Tell us about your room</p>
                  </CardHeader>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="font-semibold text-[#7F8C8D] text-sm">Room Title *</label>
                      <Input
                        placeholder="e.g., Modern Room in Bole, Student Housing Near AAU"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-semibold text-[#7F8C8D] text-sm">Description</label>
                      <Textarea
                        placeholder="Describe your room, the neighborhood, nearby amenities, and what makes it special..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] min-h-[120px]"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Monthly Rent (Birr) *</label>
                        <Input
                          type="number"
                          placeholder="e.g., 2000"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Room Type *</label>
                        <select
                          value={formData.roomType}
                          onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                          className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                          required
                        >
                          <option value="">Select room type</option>
                          <option value="single">Single Room</option>
                          <option value="shared">Shared Room</option>
                          <option value="studio">Studio</option>
                          <option value="apartment">Apartment</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Location *</label>
                        <Input
                          placeholder="e.g., Bole, Addis Ababa"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Area (sqm)</label>
                        <Input
                          type="number"
                          placeholder="e.g., 20"
                          value={formData.areaSqm}
                          onChange={(e) => setFormData({ ...formData, areaSqm: e.target.value })}
                          className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-semibold text-[#7F8C8D] text-sm">Full Address</label>
                      <Input
                        placeholder="Enter the complete address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Availability & Preferences */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <CardHeader className="p-0">
                    <CardTitle className="text-2xl font-bold text-[#3C2A1E]">Availability & Preferences</CardTitle>
                    <p className="text-[#7F8C8D]">When is the room available and who are you looking for?</p>
                  </CardHeader>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Available From</label>
                        <Input
                          type="date"
                          value={formData.availableFrom}
                          onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
                          className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Available Until</label>
                        <Input
                          type="date"
                          value={formData.availableUntil}
                          onChange={(e) => setFormData({ ...formData, availableUntil: e.target.value })}
                          className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Maximum Tenants</label>
                        <select
                          value={formData.maxTenants}
                          onChange={(e) => setFormData({ ...formData, maxTenants: e.target.value })}
                          className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                        >
                          <option value="1">1 person</option>
                          <option value="2">2 people</option>
                          <option value="3">3 people</option>
                          <option value="4">4+ people</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Preferred Tenant Type</label>
                        <select
                          value={formData.preferredTenantType}
                          onChange={(e) => setFormData({ ...formData, preferredTenantType: e.target.value })}
                          className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                        >
                          <option value="">Any</option>
                          <option value="student">Students</option>
                          <option value="professional">Professionals</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-[#3C2A1E]">What's Included</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.utilitiesIncluded}
                            onChange={(e) => setFormData({ ...formData, utilitiesIncluded: e.target.checked })}
                            className="rounded border-[#BDC3C7] text-[#F6CB5A] focus:ring-[#F6CB5A]"
                          />
                          <span className="text-[#3C2A1E] text-sm">Utilities</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.internetIncluded}
                            onChange={(e) => setFormData({ ...formData, internetIncluded: e.target.checked })}
                            className="rounded border-[#BDC3C7] text-[#F6CB5A] focus:ring-[#F6CB5A]"
                          />
                          <span className="text-[#3C2A1E] text-sm">Internet</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.parkingAvailable}
                            onChange={(e) => setFormData({ ...formData, parkingAvailable: e.target.checked })}
                            className="rounded border-[#BDC3C7] text-[#F6CB5A] focus:ring-[#F6CB5A]"
                          />
                          <span className="text-[#3C2A1E] text-sm">Parking</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.petFriendly}
                            onChange={(e) => setFormData({ ...formData, petFriendly: e.target.checked })}
                            className="rounded border-[#BDC3C7] text-[#F6CB5A] focus:ring-[#F6CB5A]"
                          />
                          <span className="text-[#3C2A1E] text-sm">Pet Friendly</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.smokingAllowed}
                            onChange={(e) => setFormData({ ...formData, smokingAllowed: e.target.checked })}
                            className="rounded border-[#BDC3C7] text-[#F6CB5A] focus:ring-[#F6CB5A]"
                          />
                          <span className="text-[#3C2A1E] text-sm">Smoking Allowed</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Amenities & Rules */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <CardHeader className="p-0">
                    <CardTitle className="text-2xl font-bold text-[#3C2A1E]">Amenities & House Rules</CardTitle>
                    <p className="text-[#7F8C8D]">What amenities are available and what are your house rules?</p>
                  </CardHeader>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-[#3C2A1E]">Available Amenities</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {amenityOptions.map((amenity) => (
                          <label key={amenity.id} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.amenities.includes(amenity.id)}
                              onChange={() => handleAmenityChange(amenity.id)}
                              className="rounded border-[#BDC3C7] text-[#F6CB5A] focus:ring-[#F6CB5A]"
                            />
                            <span className="text-[#3C2A1E] text-sm">{amenity.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-[#3C2A1E]">House Rules</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {houseRuleOptions.map((rule) => (
                          <label key={rule} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.houseRules.includes(rule)}
                              onChange={() => handleHouseRuleChange(rule)}
                              className="rounded border-[#BDC3C7] text-[#F6CB5A] focus:ring-[#F6CB5A]"
                            />
                            <span className="text-[#3C2A1E] text-sm">{rule}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#FDF8F0] border border-[#F6CB5A] rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <input type="checkbox" className="mt-1" required />
                        <div className="text-sm text-[#3C2A1E]">
                          I confirm that all information provided is accurate and I agree to DebalE's{" "}
                          <Link href="/terms" className="text-[#F6CB5A] hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-[#F6CB5A] hover:underline">
                            Privacy Policy
                          </Link>
                          .
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t border-[#ECF0F1]">
                <Button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="border-2 border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E] py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < 3 ? (
                  <Button
                    onClick={handleNext}
                    className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Next Step
                    <ArrowLeft className="ml-2 w-5 h-5 rotate-180" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-[#2ECC71] hover:bg-[#27AE60] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating...</span>
                      </div>
                    ) : (
                      <>
                        Create Listing
                        <CheckCircle className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  )
}
