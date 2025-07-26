"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Coffee,
  ArrowLeft,
  User,
  Edit,
  Camera,
  Shield,
  CheckCircle,
  Star,
  MapPin,
  Phone,
  Mail,
  Heart,
  Settings,
  Bell,
  Lock,
} from "lucide-react"
import Link from "next/link"

const mockUserProfile = {
  id: "user_123",
  fullName: "Sara Mengistu",
  email: "sara.mengistu@email.com",
  phone: "+251 911 123 456",
  age: 22,
  gender: "female",
  occupation: "Student",
  university: "Addis Ababa University",
  currentLocation: "Sidist Kilo, Addis Ababa",
  preferredAreas: ["Bole", "Sidist Kilo", "CMC"],
  budget: { min: 1000, max: 2500 },
  bio: "Engineering student at AAU looking for a quiet, clean living environment. I enjoy reading, coffee, and studying. Looking for like-minded roommates who value cleanliness and respect.",
  languages: ["Amharic", "English", "Oromo"],
  lifestyle: {
    smoking: "non-smoker",
    pets: "no-pets",
    cleanliness: "very-clean",
    socialLevel: "moderately-social",
  },
  preferences: {
    roomType: "private",
    genderPreference: "female-only",
    agePreference: "18-25",
  },
  verification: {
    phone: true,
    email: true,
    studentId: true,
    nationalId: false,
  },
  profileImage: "/placeholder.svg?height=150&width=150",
  joinDate: "March 2024",
  rating: 4.8,
  reviewCount: 12,
  completionPercentage: 85,
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [profileData, setProfileData] = useState(mockUserProfile)

  const handleSave = () => {
    setIsEditing(false)
    // Handle save to Supabase
    console.log("Saving profile:", profileData)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setProfileData(mockUserProfile) // Reset to original data
  }

  return (
    <div className="min-h-screen bg-[#FFFEF7]">
      {/* Header */}
      <header className="bg-[#FFFEF7] shadow-sm border-b border-[#ECF0F1] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-[#7F8C8D]" />
              <span className="text-[#7F8C8D] hover:text-[#3C2A1E]">Back to Dashboard</span>
            </Link>
          </div>

          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#F6CB5A] to-[#E6B84A] rounded-lg flex items-center justify-center">
              <Coffee className="w-5 h-5 text-[#3C2A1E]" />
            </div>
            <span className="text-xl font-bold text-[#3C2A1E]">DebalE</span>
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm sticky top-8">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#F6CB5A] to-[#E6B84A] rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl font-bold text-[#3C2A1E]">
                        {profileData.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <button className="absolute bottom-0 right-0 bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] p-2 rounded-full shadow-md transition-all duration-200">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#3C2A1E]">{profileData.fullName}</h3>
                    <p className="text-[#7F8C8D]">{profileData.occupation}</p>
                    <div className="flex items-center justify-center space-x-1 mt-2">
                      <Star className="w-4 h-4 fill-[#F6CB5A] text-[#F6CB5A]" />
                      <span className="text-sm font-medium text-[#3C2A1E]">{profileData.rating}</span>
                      <span className="text-sm text-[#7F8C8D]">({profileData.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#7F8C8D]">Profile Complete</span>
                      <span className="font-bold text-[#F6CB5A]">{profileData.completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-[#ECF0F1] rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#F6CB5A] to-[#E6B84A] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${profileData.completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveTab("profile")}
                      className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === "profile"
                          ? "bg-[#FDF8F0] border-2 border-[#F6CB5A] text-[#3C2A1E]"
                          : "text-[#7F8C8D] hover:bg-[#FDF8F0]"
                      }`}
                    >
                      <User className="w-4 h-4 inline mr-2" />
                      Profile Info
                    </button>
                    <button
                      onClick={() => setActiveTab("preferences")}
                      className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === "preferences"
                          ? "bg-[#FDF8F0] border-2 border-[#F6CB5A] text-[#3C2A1E]"
                          : "text-[#7F8C8D] hover:bg-[#FDF8F0]"
                      }`}
                    >
                      <Heart className="w-4 h-4 inline mr-2" />
                      Preferences
                    </button>
                    <button
                      onClick={() => setActiveTab("verification")}
                      className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === "verification"
                          ? "bg-[#FDF8F0] border-2 border-[#F6CB5A] text-[#3C2A1E]"
                          : "text-[#7F8C8D] hover:bg-[#FDF8F0]"
                      }`}
                    >
                      <Shield className="w-4 h-4 inline mr-2" />
                      Verification
                    </button>
                    <button
                      onClick={() => setActiveTab("settings")}
                      className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === "settings"
                          ? "bg-[#FDF8F0] border-2 border-[#F6CB5A] text-[#3C2A1E]"
                          : "text-[#7F8C8D] hover:bg-[#FDF8F0]"
                      }`}
                    >
                      <Settings className="w-4 h-4 inline mr-2" />
                      Settings
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Info Tab */}
            {activeTab === "profile" && (
              <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-[#3C2A1E]">Profile Information</CardTitle>
                    {!isEditing ? (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button
                          onClick={handleCancel}
                          className="border-2 border-[#ECF0F1] text-[#7F8C8D] hover:bg-[#FDF8F0] py-2 px-4 rounded-lg transition-all duration-200"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSave}
                          className="bg-[#2ECC71] hover:bg-[#27AE60] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                        >
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[#3C2A1E] border-b border-[#ECF0F1] pb-2">
                      Basic Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Full Name</label>
                        {isEditing ? (
                          <Input
                            value={profileData.fullName}
                            onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                            className="bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-lg px-4 py-3 text-[#3C2A1E]"
                          />
                        ) : (
                          <p className="text-[#3C2A1E] p-3 bg-[#FDF8F0] rounded-lg">{profileData.fullName}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Age</label>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={profileData.age}
                            onChange={(e) => setProfileData({ ...profileData, age: Number.parseInt(e.target.value) })}
                            className="bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-lg px-4 py-3 text-[#3C2A1E]"
                          />
                        ) : (
                          <p className="text-[#3C2A1E] p-3 bg-[#FDF8F0] rounded-lg">{profileData.age} years old</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Email</label>
                        <div className="flex items-center space-x-2">
                          <p className="text-[#3C2A1E] p-3 bg-[#FDF8F0] rounded-lg flex-1">{profileData.email}</p>
                          {profileData.verification.email && <CheckCircle className="w-5 h-5 text-[#2ECC71]" />}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Phone</label>
                        <div className="flex items-center space-x-2">
                          {isEditing ? (
                            <Input
                              value={profileData.phone}
                              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                              className="bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-lg px-4 py-3 text-[#3C2A1E] flex-1"
                            />
                          ) : (
                            <p className="text-[#3C2A1E] p-3 bg-[#FDF8F0] rounded-lg flex-1">{profileData.phone}</p>
                          )}
                          {profileData.verification.phone && <CheckCircle className="w-5 h-5 text-[#2ECC71]" />}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Occupation</label>
                        {isEditing ? (
                          <select
                            value={profileData.occupation}
                            onChange={(e) => setProfileData({ ...profileData, occupation: e.target.value })}
                            className="w-full bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-lg px-4 py-3 text-[#3C2A1E]"
                          >
                            <option value="Student">Student</option>
                            <option value="Professional">Working Professional</option>
                            <option value="Freelancer">Freelancer</option>
                            <option value="Entrepreneur">Entrepreneur</option>
                          </select>
                        ) : (
                          <p className="text-[#3C2A1E] p-3 bg-[#FDF8F0] rounded-lg">{profileData.occupation}</p>
                        )}
                      </div>

                      {profileData.occupation === "Student" && (
                        <div className="space-y-2">
                          <label className="font-semibold text-[#7F8C8D] text-sm">University</label>
                          {isEditing ? (
                            <Input
                              value={profileData.university}
                              onChange={(e) => setProfileData({ ...profileData, university: e.target.value })}
                              className="bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-lg px-4 py-3 text-[#3C2A1E]"
                            />
                          ) : (
                            <p className="text-[#3C2A1E] p-3 bg-[#FDF8F0] rounded-lg">{profileData.university}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Location & Languages */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[#3C2A1E] border-b border-[#ECF0F1] pb-2">
                      Location & Languages
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Current Location</label>
                        {isEditing ? (
                          <Input
                            value={profileData.currentLocation}
                            onChange={(e) => setProfileData({ ...profileData, currentLocation: e.target.value })}
                            className="bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-lg px-4 py-3 text-[#3C2A1E]"
                          />
                        ) : (
                          <p className="text-[#3C2A1E] p-3 bg-[#FDF8F0] rounded-lg flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {profileData.currentLocation}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-[#7F8C8D] text-sm">Languages</label>
                        <div className="flex flex-wrap gap-2">
                          {profileData.languages.map((lang, index) => (
                            <Badge key={index} className="bg-[#F6CB5A] text-[#3C2A1E] px-3 py-1 rounded-full text-sm">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* About */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[#3C2A1E] border-b border-[#ECF0F1] pb-2">About Me</h3>
                    {isEditing ? (
                      <Textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-lg px-4 py-3 text-[#3C2A1E] min-h-[120px]"
                        placeholder="Tell potential roommates about yourself..."
                      />
                    ) : (
                      <p className="text-[#3C2A1E] p-4 bg-[#FDF8F0] rounded-lg leading-relaxed">{profileData.bio}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-[#3C2A1E]">Housing Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-[#3C2A1E]">Budget & Location</h3>
                      <div className="space-y-3">
                        <div className="p-4 bg-[#FDF8F0] rounded-lg">
                          <div className="text-sm text-[#7F8C8D] mb-1">Budget Range</div>
                          <div className="text-[#3C2A1E] font-semibold">
                            {profileData.budget.min} - {profileData.budget.max} Birr/month
                          </div>
                        </div>
                        <div className="p-4 bg-[#FDF8F0] rounded-lg">
                          <div className="text-sm text-[#7F8C8D] mb-2">Preferred Areas</div>
                          <div className="flex flex-wrap gap-2">
                            {profileData.preferredAreas.map((area, index) => (
                              <Badge key={index} className="bg-[#F6CB5A] text-[#3C2A1E] px-2 py-1 rounded-full text-xs">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-[#3C2A1E]">Room Preferences</h3>
                      <div className="space-y-3">
                        <div className="p-4 bg-[#FDF8F0] rounded-lg">
                          <div className="text-sm text-[#7F8C8D] mb-1">Room Type</div>
                          <div className="text-[#3C2A1E] font-semibold capitalize">
                            {profileData.preferences.roomType} Room
                          </div>
                        </div>
                        <div className="p-4 bg-[#FDF8F0] rounded-lg">
                          <div className="text-sm text-[#7F8C8D] mb-1">Gender Preference</div>
                          <div className="text-[#3C2A1E] font-semibold capitalize">
                            {profileData.preferences.genderPreference.replace("-", " ")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[#3C2A1E]">Lifestyle</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 bg-[#FDF8F0] rounded-lg text-center">
                        <div className="text-sm text-[#7F8C8D] mb-1">Smoking</div>
                        <div className="text-[#3C2A1E] font-semibold capitalize">
                          {profileData.lifestyle.smoking.replace("-", " ")}
                        </div>
                      </div>
                      <div className="p-4 bg-[#FDF8F0] rounded-lg text-center">
                        <div className="text-sm text-[#7F8C8D] mb-1">Pets</div>
                        <div className="text-[#3C2A1E] font-semibold capitalize">
                          {profileData.lifestyle.pets.replace("-", " ")}
                        </div>
                      </div>
                      <div className="p-4 bg-[#FDF8F0] rounded-lg text-center">
                        <div className="text-sm text-[#7F8C8D] mb-1">Cleanliness</div>
                        <div className="text-[#3C2A1E] font-semibold capitalize">
                          {profileData.lifestyle.cleanliness.replace("-", " ")}
                        </div>
                      </div>
                      <div className="p-4 bg-[#FDF8F0] rounded-lg text-center">
                        <div className="text-sm text-[#7F8C8D] mb-1">Social Level</div>
                        <div className="text-[#3C2A1E] font-semibold capitalize">
                          {profileData.lifestyle.socialLevel.replace("-", " ")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-2 px-6 rounded-lg transition-all duration-200">
                      <Edit className="w-4 h-4 mr-2" />
                      Update Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Verification Tab */}
            {activeTab === "verification" && (
              <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-[#3C2A1E]">Account Verification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-[#E3F2FD] border border-[#2196F3] rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-6 h-6 text-[#2196F3] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-[#1976D2] mb-1">Why Verify Your Account?</h4>
                        <p className="text-sm text-[#1976D2]">
                          Verification builds trust in our community and helps you get better matches. Verified users
                          are 3x more likely to find compatible roommates.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#FDF8F0] rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-[#F6CB5A]" />
                        <div>
                          <div className="font-semibold text-[#3C2A1E]">Phone Number</div>
                          <div className="text-sm text-[#7F8C8D]">Verify your phone number via SMS</div>
                        </div>
                      </div>
                      {profileData.verification.phone ? (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-[#2ECC71]" />
                          <span className="text-sm font-medium text-[#2ECC71]">Verified</span>
                        </div>
                      ) : (
                        <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] text-sm py-2 px-4 rounded-lg">
                          Verify
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#FDF8F0] rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-[#F6CB5A]" />
                        <div>
                          <div className="font-semibold text-[#3C2A1E]">Email Address</div>
                          <div className="text-sm text-[#7F8C8D]">Confirm your email address</div>
                        </div>
                      </div>
                      {profileData.verification.email ? (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-[#2ECC71]" />
                          <span className="text-sm font-medium text-[#2ECC71]">Verified</span>
                        </div>
                      ) : (
                        <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] text-sm py-2 px-4 rounded-lg">
                          Verify
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#FDF8F0] rounded-lg">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-[#F6CB5A]" />
                        <div>
                          <div className="font-semibold text-[#3C2A1E]">Student ID</div>
                          <div className="text-sm text-[#7F8C8D]">Upload your student ID for verification</div>
                        </div>
                      </div>
                      {profileData.verification.studentId ? (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-[#2ECC71]" />
                          <span className="text-sm font-medium text-[#2ECC71]">Verified</span>
                        </div>
                      ) : (
                        <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] text-sm py-2 px-4 rounded-lg">
                          Upload
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#FDF8F0] rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-[#F6CB5A]" />
                        <div>
                          <div className="font-semibold text-[#3C2A1E]">National ID</div>
                          <div className="text-sm text-[#7F8C8D]">Upload your national ID for full verification</div>
                        </div>
                      </div>
                      {profileData.verification.nationalId ? (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-[#2ECC71]" />
                          <span className="text-sm font-medium text-[#2ECC71]">Verified</span>
                        </div>
                      ) : (
                        <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] text-sm py-2 px-4 rounded-lg">
                          Upload
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#FDF8F0] border border-[#F6CB5A] rounded-lg p-4">
                    <h4 className="font-semibold text-[#3C2A1E] mb-2">Verification Benefits</h4>
                    <ul className="space-y-1 text-sm text-[#3C2A1E]">
                      <li>• Higher visibility in search results</li>
                      <li>• Access to verified-only listings</li>
                      <li>• Increased trust from other users</li>
                      <li>• Priority customer support</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-[#3C2A1E]">Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Privacy Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[#3C2A1E] border-b border-[#ECF0F1] pb-2">
                      Privacy Settings
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-[#FDF8F0] rounded-lg">
                        <div>
                          <div className="font-semibold text-[#3C2A1E]">Profile Visibility</div>
                          <div className="text-sm text-[#7F8C8D]">Who can see your profile</div>
                        </div>
                        <select className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-lg px-3 py-2 text-[#3C2A1E]">
                          <option>Everyone</option>
                          <option>Verified users only</option>
                          <option>Private</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#FDF8F0] rounded-lg">
                        <div>
                          <div className="font-semibold text-[#3C2A1E]">Show Online Status</div>
                          <div className="text-sm text-[#7F8C8D]">Let others see when you're online</div>
                        </div>
                        <button className="w-12 h-6 bg-[#F6CB5A] rounded-full relative">
                          <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-all duration-200"></div>
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#FDF8F0] rounded-lg">
                        <div>
                          <div className="font-semibold text-[#3C2A1E]">Contact Information</div>
                          <div className="text-sm text-[#7F8C8D]">Show phone number to matched users</div>
                        </div>
                        <button className="w-12 h-6 bg-[#ECF0F1] rounded-full relative">
                          <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 transition-all duration-200"></div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[#3C2A1E] border-b border-[#ECF0F1] pb-2">
                      Notification Settings
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-[#FDF8F0] rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Bell className="w-5 h-5 text-[#F6CB5A]" />
                          <div>
                            <div className="font-semibold text-[#3C2A1E]">New Messages</div>
                            <div className="text-sm text-[#7F8C8D]">Get notified of new messages</div>
                          </div>
                        </div>
                        <button className="w-12 h-6 bg-[#F6CB5A] rounded-full relative">
                          <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-all duration-200"></div>
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#FDF8F0] rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Heart className="w-5 h-5 text-[#F6CB5A]" />
                          <div>
                            <div className="font-semibold text-[#3C2A1E]">New Matches</div>
                            <div className="text-sm text-[#7F8C8D]">Get notified of potential matches</div>
                          </div>
                        </div>
                        <button className="w-12 h-6 bg-[#F6CB5A] rounded-full relative">
                          <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-all duration-200"></div>
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#FDF8F0] rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-[#F6CB5A]" />
                          <div>
                            <div className="font-semibold text-[#3C2A1E]">Email Updates</div>
                            <div className="text-sm text-[#7F8C8D]">Receive weekly email updates</div>
                          </div>
                        </div>
                        <button className="w-12 h-6 bg-[#ECF0F1] rounded-full relative">
                          <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 transition-all duration-200"></div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[#3C2A1E] border-b border-[#ECF0F1] pb-2">
                      Security Settings
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-[#FDF8F0] rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Lock className="w-5 h-5 text-[#F6CB5A]" />
                          <div>
                            <div className="font-semibold text-[#3C2A1E]">Change Password</div>
                            <div className="text-sm text-[#7F8C8D]">Update your account password</div>
                          </div>
                        </div>
                        <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] text-sm py-2 px-4 rounded-lg">
                          Change
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#FDF8F0] rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-[#F6CB5A]" />
                          <div>
                            <div className="font-semibold text-[#3C2A1E]">Two-Factor Authentication</div>
                            <div className="text-sm text-[#7F8C8D]">Add extra security to your account</div>
                          </div>
                        </div>
                        <Button className="border-2 border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E] text-sm py-2 px-4 rounded-lg">
                          Enable
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[#E74C3C] border-b border-[#ECF0F1] pb-2">Danger Zone</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-[#FDEDEC] border border-[#E74C3C] rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-[#E74C3C]">Deactivate Account</div>
                            <div className="text-sm text-[#C0392B]">Temporarily disable your account</div>
                          </div>
                          <Button className="bg-[#E74C3C] hover:bg-[#C0392B] text-white text-sm py-2 px-4 rounded-lg">
                            Deactivate
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-[#FDEDEC] border border-[#E74C3C] rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-[#E74C3C]">Delete Account</div>
                            <div className="text-sm text-[#C0392B]">Permanently delete your account and data</div>
                          </div>
                          <Button className="bg-[#E74C3C] hover:bg-[#C0392B] text-white text-sm py-2 px-4 rounded-lg">
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
