"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Coffee, User, Home, ArrowRight, CheckCircle, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { AuthGuard } from "@/components/auth-guard"
import { userProfileService } from "@/lib/database"
import { useRouter } from "next/navigation"

export default function OnboardingPage() {
  const [userType, setUserType] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    // Basic Info
    fullName: "",
    phone: "",
    dateOfBirth: "",
    gender: "",

    // Profile Info
    occupation: "",
    university: "",
    bio: "",
    languages: [] as string[],

    // Preferences (for room seekers)
    budgetMin: "",
    budgetMax: "",
    preferredAreas: [] as string[],
    roomType: "",
    moveInDate: "",

    // Lifestyle
    smokingPreference: "",
    petsPreference: "",
    socialLevel: "",
    cleanlinessLevel: "",

    // Verification
    idType: "",
    studentId: "",
    employmentLetter: false,
  })

  const { user } = useAuth()
  const router = useRouter()

  // Load existing profile data if available
  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        const profile = await userProfileService.getCurrentUserProfile()
        if (profile) {
          setFormData({
            fullName: profile.full_name || "",
            phone: profile.phone || "",
            dateOfBirth: profile.date_of_birth || "",
            gender: profile.gender || "",
            occupation: profile.occupation || "",
            university: profile.university || "",
            bio: profile.bio || "",
            languages: profile.languages || [],
            budgetMin: profile.budget_min?.toString() || "",
            budgetMax: profile.budget_max?.toString() || "",
            preferredAreas: profile.preferred_areas || [],
            roomType: profile.room_type || "",
            moveInDate: profile.move_in_date || "",
            smokingPreference: profile.smoking_preference || "",
            petsPreference: profile.pets_preference || "",
            socialLevel: profile.social_level || "",
            cleanlinessLevel: profile.cleanliness_level || "",
            idType: profile.id_type || "",
            studentId: profile.student_id || "",
            employmentLetter: profile.employment_letter || false,
          })
        }
      }
    }

    loadProfile()
  }, [user])

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

    if (!user) {
      setError("User not authenticated")
      setIsLoading(false)
      return
    }

    try {
      const profileData = {
        id: user.id,
        full_name: formData.fullName,
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth || null,
        gender: formData.gender as any || null,
        occupation: formData.occupation,
        university: formData.university,
        bio: formData.bio,
        languages: formData.languages,
        budget_min: formData.budgetMin ? parseInt(formData.budgetMin) : null,
        budget_max: formData.budgetMax ? parseInt(formData.budgetMax) : null,
        preferred_areas: formData.preferredAreas,
        room_type: formData.roomType as any || null,
        move_in_date: formData.moveInDate || null,
        smoking_preference: formData.smokingPreference as any || null,
        pets_preference: formData.petsPreference as any || null,
        social_level: formData.socialLevel as any || null,
        cleanliness_level: formData.cleanlinessLevel as any || null,
        id_type: formData.idType,
        student_id: formData.studentId,
        employment_letter: formData.employmentLetter,
      }

      const updatedProfile = await userProfileService.upsertUserProfile(profileData)
      
      if (updatedProfile) {
        // Calculate profile completion
        const completionPercentage = userProfileService.calculateProfileCompletion(updatedProfile)
        
        // Update profile completion percentage
        await userProfileService.updateUserProfile({
          profile_complete_percentage: completionPercentage
        })

        // Redirect to dashboard
        router.push('/dashboard')
      } else {
        setError('Failed to save profile. Please try again.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLanguageChange = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }))
  }

  const handleAreaChange = (area: string) => {
    setFormData(prev => ({
      ...prev,
      preferredAreas: prev.preferredAreas.includes(area)
        ? prev.preferredAreas.filter(a => a !== area)
        : [...prev.preferredAreas, area]
    }))
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
              <span className="text-[#7F8C8D]">Complete your profile</span>
              <div className="w-8 h-8 bg-[#F6CB5A] rounded-full flex items-center justify-center">
                <span className="text-[#3C2A1E] font-bold text-sm">{user?.email?.[0]?.toUpperCase() || 'U'}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!userType ? (
            /* User Type Selection */
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-[#3C2A1E]">Welcome to DebalE! 🎉</h1>
                <p className="text-xl text-[#7F8C8D] max-w-2xl mx-auto">
                  Let's get to know you better to help you find the perfect living situation
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
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            /* Multi-step Form */
            <div className="space-y-8">
              {/* Progress Bar */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-[#3C2A1E]">Complete Your Profile</h1>
                  <span className="text-[#7F8C8D]">Step {currentStep} of 4</span>
                </div>
                <div className="w-full bg-[#ECF0F1] rounded-full h-2">
                  <div
                    className="bg-[#F6CB5A] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
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
                        <p className="text-[#7F8C8D]">Tell us about yourself</p>
                      </CardHeader>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Full Name *</label>
                          <Input
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Phone Number</label>
                          <Input
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Date of Birth</label>
                          <Input
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                            className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Gender</label>
                          <select
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer_not_to_say">Prefer not to say</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Profile Information */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <CardHeader className="p-0">
                        <CardTitle className="text-2xl font-bold text-[#3C2A1E]">Profile Information</CardTitle>
                        <p className="text-[#7F8C8D]">Tell us about your background</p>
                      </CardHeader>

                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="font-semibold text-[#7F8C8D] text-sm">Occupation</label>
                            <select
                              value={formData.occupation}
                              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                              className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                            >
                              <option value="">Select occupation</option>
                              <option value="student">Student</option>
                              <option value="professional">Professional</option>
                              <option value="freelancer">Freelancer</option>
                              <option value="other">Other</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="font-semibold text-[#7F8C8D] text-sm">University/Institution</label>
                            <Input
                              placeholder="Enter your university or institution"
                              value={formData.university}
                              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                              className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Bio</label>
                          <Textarea
                            placeholder="Tell us about yourself, your interests, and what you're looking for in a roommate..."
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] min-h-[100px]"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Languages You Speak</label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['Amharic', 'English', 'Oromo', 'Tigrinya', 'Somali', 'Afar', 'Other'].map((language) => (
                              <label key={language} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={formData.languages.includes(language)}
                                  onChange={() => handleLanguageChange(language)}
                                  className="rounded border-[#BDC3C7] text-[#F6CB5A] focus:ring-[#F6CB5A]"
                                />
                                <span className="text-[#3C2A1E] text-sm">{language}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Preferences */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <CardHeader className="p-0">
                        <CardTitle className="text-2xl font-bold text-[#3C2A1E]">Room Preferences</CardTitle>
                        <p className="text-[#7F8C8D]">Help us find the perfect match for you</p>
                      </CardHeader>

                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="font-semibold text-[#7F8C8D] text-sm">Budget Range (Birr/month)</label>
                            <div className="grid grid-cols-2 gap-3">
                              <Input
                                placeholder="Min"
                                type="number"
                                value={formData.budgetMin}
                                onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                                className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                              />
                              <Input
                                placeholder="Max"
                                type="number"
                                value={formData.budgetMax}
                                onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                                className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="font-semibold text-[#7F8C8D] text-sm">Preferred Room Type</label>
                            <select
                              value={formData.roomType}
                              onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                              className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                            >
                              <option value="">Select room type</option>
                              <option value="single">Single Room</option>
                              <option value="shared">Shared Room</option>
                              <option value="studio">Studio</option>
                              <option value="apartment">Apartment</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">Preferred Areas</label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {['Bole', 'CMC', 'Sidist Kilo', 'Piazza', 'Merkato', 'Kazanchis', 'Meskel Square', 'Addisu Gebeya', 'Other'].map((area) => (
                              <label key={area} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={formData.preferredAreas.includes(area)}
                                  onChange={() => handleAreaChange(area)}
                                  className="rounded border-[#BDC3C7] text-[#F6CB5A] focus:ring-[#F6CB5A]"
                                />
                                <span className="text-[#3C2A1E] text-sm">{area}</span>
                              </label>
                            ))}
                          </div>
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
                    </div>
                  )}

                  {/* Step 4: Lifestyle & Verification */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <CardHeader className="p-0">
                        <CardTitle className="text-2xl font-bold text-[#3C2A1E]">Lifestyle & Verification</CardTitle>
                        <p className="text-[#7F8C8D]">Help us match you with compatible roommates</p>
                      </CardHeader>

                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="font-semibold text-[#7F8C8D] text-sm">Smoking Preference</label>
                            <select
                              value={formData.smokingPreference}
                              onChange={(e) => setFormData({ ...formData, smokingPreference: e.target.value })}
                              className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                            >
                              <option value="">Select preference</option>
                              <option value="non_smoker">Non-smoker</option>
                              <option value="smoker">Smoker</option>
                              <option value="no_preference">No preference</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="font-semibold text-[#7F8C8D] text-sm">Pets Preference</label>
                            <select
                              value={formData.petsPreference}
                              onChange={(e) => setFormData({ ...formData, petsPreference: e.target.value })}
                              className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                            >
                              <option value="">Select preference</option>
                              <option value="no_pets">No pets</option>
                              <option value="have_pets">Have pets</option>
                              <option value="ok_with_pets">OK with pets</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="font-semibold text-[#7F8C8D] text-sm">Social Level</label>
                            <select
                              value={formData.socialLevel}
                              onChange={(e) => setFormData({ ...formData, socialLevel: e.target.value })}
                              className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                            >
                              <option value="">Select social level</option>
                              <option value="introvert">Introvert</option>
                              <option value="extrovert">Extrovert</option>
                              <option value="balanced">Balanced</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="font-semibold text-[#7F8C8D] text-sm">Cleanliness Level</label>
                            <select
                              value={formData.cleanlinessLevel}
                              onChange={(e) => setFormData({ ...formData, cleanlinessLevel: e.target.value })}
                              className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                            >
                              <option value="">Select cleanliness level</option>
                              <option value="very_clean">Very clean</option>
                              <option value="clean">Clean</option>
                              <option value="moderate">Moderate</option>
                              <option value="relaxed">Relaxed</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-[#3C2A1E]">Verification (Optional)</h4>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="font-semibold text-[#7F8C8D] text-sm">ID Type</label>
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
                      <ArrowLeft className="w-4 h-4 mr-2" />
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
                        disabled={isLoading}
                        className="bg-[#2ECC71] hover:bg-[#27AE60] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Saving...</span>
                          </div>
                        ) : (
                          <>
                            Complete Profile
                            <CheckCircle className="ml-2 w-5 h-5" />
                          </>
                        )}
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
