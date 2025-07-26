"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Coffee, User, Home, ArrowRight, CheckCircle, Shield } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"

export default function RegisterPage() {
  const [userType, setUserType] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    // Basic Info
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",

    // Profile Info
    occupation: "",
    university: "",
    bio: "",
    languages: [],

    // Preferences (for room seekers)
    budget: "",
    preferredAreas: "",
    roomType: "",
    moveInDate: "",

    // Lifestyle
    smoking: "",
    pets: "",
    socialLevel: "",
    cleanliness: "",

    // Verification
    idType: "",
    studentId: "",
    employmentLetter: false,
    // Authentication
    password: "",
    confirmPassword: "",
  })
  
  const { signUp } = useAuth()
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      setIsLoading(false)
      return
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      // Sign up with Supabase Auth
      const { error: authError } = await signUp(formData.email, formData.password)
      
      if (authError) {
        setError(authError.message)
        setIsLoading(false)
        return
      }

      // The user profile will be automatically created by the database trigger
      // We can redirect to onboarding to complete the profile
      router.push('/onboarding')
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthGuard requireAuth={false}>
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
            <span className="text-[#7F8C8D]">Already have an account?</span>
            <Link href="/login" className="text-[#F6CB5A] hover:text-[#E6B84A] font-medium">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!userType ? (
          /* User Type Selection */
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-[#3C2A1E]">Join DebalE</h1>
              <p className="text-xl text-[#7F8C8D] max-w-2xl mx-auto">
                Connect with trusted roommates and find your perfect living situation in Ethiopia
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card
                className="bg-[#FFFEF7] border-2 border-[#ECF0F1] hover:border-[#F6CB5A] rounded-xl p-8 cursor-pointer transition-all duration-200 hover:shadow-md"
                onClick={() => setUserType("seeker")}
              >
                <CardContent className="p-0 text-center space-y-6">
                  <div className="w-20 h-20 bg-[#F6CB5A] rounded-full flex items-center justify-center mx-auto">
                    <User className="w-10 h-10 text-[#3C2A1E]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#3C2A1E] mb-2">I'm Looking for a Room</h3>
                    <p className="text-[#7F8C8D]">
                      Find rooms and roommates that match your lifestyle, budget, and preferences
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-[#3C2A1E]">
                      <CheckCircle className="w-4 h-4 text-[#2ECC71] mr-2" />
                      Smart matching algorithm
                    </div>
                    <div className="flex items-center text-sm text-[#3C2A1E]">
                      <CheckCircle className="w-4 h-4 text-[#2ECC71] mr-2" />
                      Verified room providers
                    </div>
                    <div className="flex items-center text-sm text-[#3C2A1E]">
                      <CheckCircle className="w-4 h-4 text-[#2ECC71] mr-2" />
                      Safe messaging system
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="bg-[#FFFEF7] border-2 border-[#ECF0F1] hover:border-[#F6CB5A] rounded-xl p-8 cursor-pointer transition-all duration-200 hover:shadow-md"
                onClick={() => setUserType("provider")}
              >
                <CardContent className="p-0 text-center space-y-6">
                  <div className="w-20 h-20 bg-[#F6CB5A] rounded-full flex items-center justify-center mx-auto">
                    <Home className="w-10 h-10 text-[#3C2A1E]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#3C2A1E] mb-2">I Have a Room to Rent</h3>
                    <p className="text-[#7F8C8D]">
                      List your room and find trustworthy tenants through our verification system
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-[#3C2A1E]">
                      <CheckCircle className="w-4 h-4 text-[#2ECC71] mr-2" />
                      Verified tenant profiles
                    </div>
                    <div className="flex items-center text-sm text-[#3C2A1E]">
                      <CheckCircle className="w-4 h-4 text-[#2ECC71] mr-2" />
                      Easy listing management
                    </div>
                    <div className="flex items-center text-sm text-[#3C2A1E]">
                      <CheckCircle className="w-4 h-4 text-[#2ECC71] mr-2" />
                      Secure payment handling
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <div className="space-y-8">
            {/* Progress Bar */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-[#3C2A1E]">
                  Create Your {userType === "seeker" ? "Room Seeker" : "Room Provider"} Account
                </h1>
                <div className="text-sm text-[#7F8C8D]">Step {currentStep} of 4</div>
              </div>

              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step <= currentStep ? "bg-[#F6CB5A] text-[#3C2A1E]" : "bg-[#ECF0F1] text-[#7F8C8D]"
                      } font-semibold`}
                    >
                      {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                    </div>
                    {step < 4 && (
                      <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-[#F6CB5A]" : "bg-[#ECF0F1]"}`}></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-xs text-[#7F8C8D]">
                <span>Basic Info</span>
                <span>Profile</span>
                <span>Preferences</span>
                <span>Verification</span>
              </div>
            </div>

            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm">
              <CardContent className="p-8">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#3C2A1E] mb-2">Basic Information</h2>
                      <p className="text-[#7F8C8D]">Let's start with your basic details</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Full Name *</label>
                        <Input
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Email Address *</label>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Phone Number *</label>
                        <Input
                          placeholder="+251 9XX XXX XXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Date of Birth *</label>
                        <Input
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                          className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Gender *</label>
                        <select
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Password *</label>
                        <Input
                          type="password"
                          placeholder="Create a strong password"
                          className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Profile Information */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#3C2A1E] mb-2">Profile Information</h2>
                      <p className="text-[#7F8C8D]">Tell us more about yourself</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Occupation *</label>
                        <select
                          value={formData.occupation}
                          onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                          className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                        >
                          <option value="">Select occupation</option>
                          <option value="student">Student</option>
                          <option value="professional">Working Professional</option>
                          <option value="freelancer">Freelancer</option>
                          <option value="entrepreneur">Entrepreneur</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {formData.occupation === "student" && (
                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">University/Institution</label>
                          <Input
                            placeholder="e.g., Addis Ababa University"
                            value={formData.university}
                            onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                            className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Languages Spoken</label>
                        <div className="grid grid-cols-2 gap-2">
                          {["Amharic", "English", "Oromo", "Tigrinya"].map((lang) => (
                            <label key={lang} className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded border-[#BDC3C7]" />
                              <span className="text-sm text-[#3C2A1E]">{lang}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-semibold text-[#7F8C8D] text-sm">About You</label>
                      <Textarea
                        placeholder="Tell potential roommates about yourself, your interests, and what you're looking for..."
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] min-h-[120px]"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Preferences */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#3C2A1E] mb-2">
                        {userType === "seeker" ? "Housing Preferences" : "Tenant Preferences"}
                      </h2>
                      <p className="text-[#7F8C8D]">
                        {userType === "seeker"
                          ? "Help us find rooms that match your needs"
                          : "Tell us about your ideal tenant"}
                      </p>
                    </div>

                    {userType === "seeker" ? (
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Budget Range (Birr/month)</label>
                          <Input
                            placeholder="e.g., 1000 - 2500"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Preferred Areas</label>
                          <Input
                            placeholder="e.g., Bole, Sidist Kilo, CMC"
                            value={formData.preferredAreas}
                            onChange={(e) => setFormData({ ...formData, preferredAreas: e.target.value })}
                            className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Room Type Preference</label>
                          <select
                            value={formData.roomType}
                            onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                            className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                          >
                            <option value="">No preference</option>
                            <option value="private">Private Room</option>
                            <option value="shared">Shared Room</option>
                            <option value="master">Master Bedroom</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Move-in Date</label>
                          <Input
                            type="date"
                            value={formData.moveInDate}
                            onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                            className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Preferred Tenant Type</label>
                          <select className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]">
                            <option value="">No preference</option>
                            <option value="student">Students only</option>
                            <option value="professional">Professionals only</option>
                            <option value="mixed">Students & Professionals</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Gender Preference</label>
                          <select className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]">
                            <option value="">No preference</option>
                            <option value="male">Male only</option>
                            <option value="female">Female only</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Lifestyle Preferences */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-[#3C2A1E]">Lifestyle Preferences</h3>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Smoking</label>
                          <select
                            value={formData.smoking}
                            onChange={(e) => setFormData({ ...formData, smoking: e.target.value })}
                            className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                          >
                            <option value="">Select preference</option>
                            <option value="non-smoker">Non-smoker</option>
                            <option value="smoker">Smoker</option>
                            <option value="no-preference">No preference</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Pets</label>
                          <select
                            value={formData.pets}
                            onChange={(e) => setFormData({ ...formData, pets: e.target.value })}
                            className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                          >
                            <option value="">Select preference</option>
                            <option value="no-pets">No pets</option>
                            <option value="pets-ok">Pets OK</option>
                            <option value="have-pets">I have pets</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Social Level</label>
                          <select
                            value={formData.socialLevel}
                            onChange={(e) => setFormData({ ...formData, socialLevel: e.target.value })}
                            className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                          >
                            <option value="">Select preference</option>
                            <option value="very-social">Very social</option>
                            <option value="moderately-social">Moderately social</option>
                            <option value="quiet">Prefer quiet</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Cleanliness</label>
                          <select
                            value={formData.cleanliness}
                            onChange={(e) => setFormData({ ...formData, cleanliness: e.target.value })}
                            className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                          >
                            <option value="">Select preference</option>
                            <option value="very-clean">Very clean</option>
                            <option value="moderately-clean">Moderately clean</option>
                            <option value="relaxed">Relaxed about cleanliness</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Verification */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#3C2A1E] mb-2">Verification</h2>
                      <p className="text-[#7F8C8D]">Help build trust in our community</p>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-[#E3F2FD] border border-[#2196F3] rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <Shield className="w-6 h-6 text-[#2196F3] flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-[#1976D2] mb-1">Why Verification Matters</h4>
                            <p className="text-sm text-[#1976D2]">
                              Verification helps create a safer community by confirming identities and building trust
                              between users.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">ID Type *</label>
                          <select
                            value={formData.idType}
                            onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                            className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                          >
                            <option value="">Select ID type</option>
                            <option value="national-id">National ID</option>
                            <option value="passport">Passport</option>
                            <option value="drivers-license">Driver's License</option>
                          </select>
                        </div>

                        {formData.occupation === "student" && (
                          <div className="space-y-2">
                            <label className="font-semibold text-[#7F8C8D] text-sm">Student ID</label>
                            <Input
                              placeholder="Enter your student ID number"
                              value={formData.studentId}
                              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                              className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                            />
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-[#3C2A1E]">Additional Verification (Optional)</h4>

                        <div className="space-y-3">
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              className="rounded border-[#BDC3C7]"
                              checked={formData.employmentLetter}
                              onChange={(e) => setFormData({ ...formData, employmentLetter: e.target.checked })}
                            />
                            <span className="text-[#3C2A1E]">
                              I can provide an employment letter (for professionals)
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="bg-[#FDF8F0] border border-[#F6CB5A] rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <input type="checkbox" className="mt-1" required />
                          <div className="text-sm text-[#3C2A1E]">
                            I agree to DebalE's{" "}
                            <Link href="/terms" className="text-[#F6CB5A] hover:underline">
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-[#F6CB5A] hover:underline">
                              Privacy Policy
                            </Link>
                            . I confirm that all information provided is accurate and understand that false information
                            may result in account suspension.
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
                    Previous
                  </Button>

                  {currentStep < 4 ? (
                    <Button
                      onClick={handleNext}
                      className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Next Step
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      className="bg-[#2ECC71] hover:bg-[#27AE60] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Create Account
                      <CheckCircle className="ml-2 w-5 h-5" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
    </AuthGuard>
  )
}
