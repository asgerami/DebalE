"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Coffee,
  Upload,
  MapPin,
  Home,
  Wifi,
  Car,
  Shield,
  Camera,
  X,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useStorageUpload } from "@/hooks/useStorageUpload";
import { createListing, getProfile, createProfile } from "@/lib/supabase-crud";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const amenityOptions = [
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "parking", label: "Parking", icon: Car },
  { id: "kitchen", label: "Kitchen Access", icon: Home },
  { id: "laundry", label: "Laundry", icon: Home },
  { id: "security", label: "Security", icon: Shield },
  { id: "study", label: "Study Area", icon: Home },
  { id: "gym", label: "Gym", icon: Home },
  { id: "balcony", label: "Balcony", icon: Home },
];

export default function ListRoomPage() {
  const { uploading, error, url, uploadListing } = useStorageUpload();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    roomType: "",
    amenities: [],
    houseRules: "",
    photos: [],
    availability: "",
    genderPreference: "",
    ageRange: "",
    occupation: "",
  });

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  // Debug useEffect to monitor user state
  useEffect(() => {
    console.log("User state changed:", { user, loading });
  }, [user, loading]);

  const handleAmenityToggle = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos = Array.from(files);
      setUploadedPhotos((prev) => [...prev, ...newPhotos]);

      // Create preview URLs
      newPhotos.forEach((file) => {
        const url = URL.createObjectURL(file);
        setPhotoUrls((prev) => [...prev, url]);
      });
    }
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    console.log("Submit clicked, user:", user); // Debug log
    console.log("User ID:", user?.id); // Debug log
    console.log("Loading state:", loading); // Debug log

    if (!user) {
      setSubmitError("You must be logged in to create a listing");
      return;
    }

    if (!user.id) {
      setSubmitError("User ID is missing. Please try logging in again.");
      return;
    }

    // Capture user ID at the beginning to avoid race conditions
    const userId = user.id;
    console.log("Captured user ID:", userId); // Debug log

    setIsSubmitting(true);
    setSubmitError("");

    try {
      console.log("About to check profile for user ID:", userId); // Debug log

      // Check if user has a profile, create one if not
      let userProfile;
      try {
        userProfile = await getProfile(userId);
        console.log("Profile found:", userProfile); // Debug log
      } catch (error) {
        console.log(
          "Profile not found, creating new profile for user ID:",
          userId
        ); // Debug log
        // Profile doesn't exist, create one
        userProfile = await createProfile({
          id: userId,
          user_type: "provider",
          full_name:
            user.user_metadata?.full_name ||
            user.email?.split("@")[0] ||
            "User",
          age: null,
          gender: null,
          phone: null,
          phone_verified: false,
          avatar_url: null,
          occupation: null,
          languages: [],
          current_location: null,
          bio: null,
        });
        console.log("New profile created:", userProfile); // Debug log
      }

      // Double-check user is still valid before creating listing
      if (!user || !user.id) {
        throw new Error("User session expired. Please log in again.");
      }

      const listingData = {
        provider_id: userId,
        title: formData.title,
        description: formData.description,
        area: formData.location,
        monthly_rent: parseInt(formData.price) || 0,
        room_type: formData.roomType,
        house_rules: formData.houseRules,
        available_from: formData.availability,
        preferred_tenant_gender:
          (formData.genderPreference as "male" | "female" | "any") || "any",
        preferred_tenant_age_min: formData.ageRange
          ? parseInt(formData.ageRange.split("-")[0])
          : 18,
        preferred_tenant_age_max: formData.ageRange
          ? parseInt(formData.ageRange.split("-")[1])
          : 99,
        preferred_tenant_occupation: formData.occupation
          ? [formData.occupation]
          : [],
        is_active: true,
        // Set default values for required fields
        utilities_included: false,
        furnished: false,
        private_bathroom: false,
        wifi: selectedAmenities.includes("wifi"),
        kitchen_access: selectedAmenities.includes("kitchen"),
        laundry: selectedAmenities.includes("laundry"),
        parking: selectedAmenities.includes("parking"),
        security: selectedAmenities.includes("security"),
        current_roommates: 0,
        max_roommates: 4,
        featured: false,
      };

      console.log("Creating listing with data:", listingData); // Debug log
      const newListing = await createListing(listingData);
      console.log("Listing created successfully:", newListing);

      // Upload photos if any were selected
      if (uploadedPhotos.length > 0) {
        try {
          for (let i = 0; i < uploadedPhotos.length; i++) {
            await uploadListing(uploadedPhotos[i], newListing.id);
          }
          console.log("Photos uploaded successfully");
        } catch (photoError) {
          console.error("Error uploading photos:", photoError);
          // Continue with redirect even if photo upload fails
        }
      }

      // Redirect to the listing page or show success message
      router.push(`/listing/${newListing.id}`);
    } catch (err: any) {
      console.error("Error creating listing:", err);
      setSubmitError(err.message || "Failed to create listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while auth is being checked
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFEF7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F6CB5A] mx-auto mb-4"></div>
          <p className="text-[#7F8C8D]">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FFFEF7]">
      {/* Header */}
      <header className="bg-[#FFFEF7] shadow-sm border-b border-[#ECF0F1] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-[#7F8C8D]" />
              <span className="text-[#7F8C8D] hover:text-[#3C2A1E]">
                Back to Home
              </span>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-[#3C2A1E]">
              List Your Room
            </h1>
            <div className="text-sm text-[#7F8C8D]">
              Step {currentStep} of 4
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step <= currentStep
                      ? "bg-[#F6CB5A] text-[#3C2A1E]"
                      : "bg-[#ECF0F1] text-[#7F8C8D]"
                  } font-semibold`}
                >
                  {step < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step
                  )}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      step < currentStep ? "bg-[#F6CB5A]" : "bg-[#ECF0F1]"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-2 text-xs text-[#7F8C8D]">
            <span>Basic Info</span>
            <span>Details</span>
            <span>Photos</span>
            <span>Review</span>
          </div>
        </div>

        {/* Form Steps */}
        <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm">
          <CardContent className="p-8">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#3C2A1E] mb-2">
                    Basic Information
                  </h2>
                  <p className="text-[#7F8C8D]">
                    Tell us about your room and location
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-semibold text-[#7F8C8D] text-sm">
                      Room Title *
                    </label>
                    <Input
                      placeholder="e.g., Cozy Room Near AAU Campus"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-semibold text-[#7F8C8D] text-sm">
                      Monthly Rent (Birr) *
                    </label>
                    <Input
                      placeholder="e.g., 1500"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-semibold text-[#7F8C8D] text-sm">
                      Location *
                    </label>
                    <Input
                      placeholder="e.g., Sidist Kilo, Addis Ababa"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-semibold text-[#7F8C8D] text-sm">
                      Room Type *
                    </label>
                    <select
                      value={formData.roomType}
                      onChange={(e) =>
                        setFormData({ ...formData, roomType: e.target.value })
                      }
                      className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                    >
                      <option value="">Select room type</option>
                      <option value="private">Private Room</option>
                      <option value="shared">Shared Room</option>
                      <option value="master">Master Bedroom</option>
                      <option value="studio">Studio Apartment</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-[#7F8C8D] text-sm">
                    Description *
                  </label>
                  <Textarea
                    placeholder="Describe your room, the house, neighborhood, and what makes it special..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] min-h-[120px]"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Details & Preferences */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#3C2A1E] mb-2">
                    Details & Preferences
                  </h2>
                  <p className="text-[#7F8C8D]">
                    Help us match you with the right roommate
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="font-semibold text-[#7F8C8D] text-sm mb-3 block">
                      Amenities
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {amenityOptions.map((amenity) => (
                        <button
                          key={amenity.id}
                          onClick={() => handleAmenityToggle(amenity.id)}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                            selectedAmenities.includes(amenity.id)
                              ? "border-[#F6CB5A] bg-[#FDF8F0] text-[#3C2A1E]"
                              : "border-[#ECF0F1] bg-[#FFFEF7] text-[#7F8C8D] hover:border-[#F6CB5A]"
                          }`}
                        >
                          <amenity.icon className="w-5 h-5 mx-auto mb-1" />
                          <div className="text-xs font-medium">
                            {amenity.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-semibold text-[#7F8C8D] text-sm">
                        Gender Preference
                      </label>
                      <select
                        value={formData.genderPreference}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            genderPreference: e.target.value,
                          })
                        }
                        className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                      >
                        <option value="">No preference</option>
                        <option value="male">Male only</option>
                        <option value="female">Female only</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="font-semibold text-[#7F8C8D] text-sm">
                        Preferred Age Range
                      </label>
                      <select
                        value={formData.ageRange}
                        onChange={(e) =>
                          setFormData({ ...formData, ageRange: e.target.value })
                        }
                        className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                      >
                        <option value="">Any age</option>
                        <option value="18-22">18-22 years</option>
                        <option value="23-27">23-27 years</option>
                        <option value="28-32">28-32 years</option>
                        <option value="33+">33+ years</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="font-semibold text-[#7F8C8D] text-sm">
                        Preferred Occupation
                      </label>
                      <select
                        value={formData.occupation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            occupation: e.target.value,
                          })
                        }
                        className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                      >
                        <option value="">No preference</option>
                        <option value="student">Students only</option>
                        <option value="professional">Professionals only</option>
                        <option value="mixed">Students & Professionals</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="font-semibold text-[#7F8C8D] text-sm">
                        Available From
                      </label>
                      <Input
                        type="date"
                        value={formData.availability}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            availability: e.target.value,
                          })
                        }
                        className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-semibold text-[#7F8C8D] text-sm">
                      House Rules
                    </label>
                    <Textarea
                      placeholder="e.g., No smoking, Quiet hours 10 PM - 7 AM, Clean common areas..."
                      value={formData.houseRules}
                      onChange={(e) =>
                        setFormData({ ...formData, houseRules: e.target.value })
                      }
                      className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Photos */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#3C2A1E] mb-2">
                    Add Photos
                  </h2>
                  <p className="text-[#7F8C8D]">
                    Great photos help your listing stand out
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-[#F6CB5A] rounded-xl p-8 text-center bg-[#FDF8F0] hover:bg-[#F6CB5A]/10 transition-colors duration-200">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Camera className="w-12 h-12 text-[#F6CB5A] mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-[#3C2A1E] mb-2">
                        Upload Room Photos
                      </h3>
                      <p className="text-[#7F8C8D] mb-4">
                        Add at least 3 photos of your room and common areas
                      </p>
                      <div className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-3 px-6 rounded-lg inline-flex items-center transition-colors duration-200">
                        <Upload className="w-5 h-5 mr-2" />
                        Choose Photos
                      </div>
                    </label>
                  </div>

                  {/* Uploaded photos */}
                  {uploadedPhotos.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {uploadedPhotos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={photoUrls[index]}
                            alt={`Room photo ${index + 1}`}
                            width={300}
                            height={200}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removePhoto(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                            Photo {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Placeholder when no photos */}
                  {uploadedPhotos.length === 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[1, 2, 3].map((index) => (
                        <div key={index} className="relative group">
                          <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Camera className="w-8 h-8 text-gray-400" />
                          </div>
                          <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                            No photo {index}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="bg-[#E3F2FD] border border-[#2196F3] rounded-lg p-4">
                    <h4 className="font-semibold text-[#1976D2] mb-2">
                      Photo Tips:
                    </h4>
                    <ul className="text-sm text-[#1976D2] space-y-1">
                      <li>
                        • Take photos during the day with good natural lighting
                      </li>
                      <li>
                        • Include photos of the room, common areas, and exterior
                      </li>
                      <li>• Make sure the space is clean and tidy</li>
                      <li>• Show unique features and amenities</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#3C2A1E] mb-2">
                    Review Your Listing
                  </h2>
                  <p className="text-[#7F8C8D]">
                    Make sure everything looks good before publishing
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Preview Card */}
                  <Card className="bg-gradient-to-br from-[#FDF8F0] to-[#FFFEF7] border-2 border-[#F6CB5A] rounded-xl shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#3C2A1E] mb-2">
                            {formData.title || "Room Title"}
                          </h3>
                          <div className="flex items-center text-[#7F8C8D] mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {formData.location || "Location"}
                          </div>
                          <Badge className="bg-[#F6CB5A] text-[#3C2A1E] px-2 py-1">
                            {formData.roomType || "Room Type"}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#F6CB5A]">
                            {formData.price || "0"} Birr
                          </div>
                          <div className="text-sm text-[#7F8C8D]">
                            per month
                          </div>
                        </div>
                      </div>

                      <p className="text-[#3C2A1E] mb-4">
                        {formData.description ||
                          "Room description will appear here..."}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedAmenities.map((amenityId) => {
                          const amenity = amenityOptions.find(
                            (a) => a.id === amenityId
                          );
                          return (
                            <Badge
                              key={amenityId}
                              className="bg-[#FDF8F0] text-[#7F8C8D] border-[#ECF0F1] px-2 py-1 text-xs"
                            >
                              {amenity?.label}
                            </Badge>
                          );
                        })}
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((index) => (
                          <Image
                            key={index}
                            src={`/placeholder.svg?height=100&width=150&query=Ethiopian room photo ${index}`}
                            alt={`Room preview ${index}`}
                            width={150}
                            height={100}
                            className="w-full h-20 object-cover rounded-md"
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Error Display */}
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="text-sm text-red-800">{submitError}</div>
                    </div>
                  )}

                  {/* Terms and Conditions */}
                  <div className="bg-[#FDF8F0] border border-[#F6CB5A] rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <input type="checkbox" className="mt-1" />
                      <div className="text-sm text-[#3C2A1E]">
                        I agree to DebalE's{" "}
                        <Link
                          href="/terms"
                          className="text-[#F6CB5A] hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and confirm that all information provided is accurate. I
                        understand that false information may result in account
                        suspension.
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
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-[#2ECC71] hover:bg-[#27AE60] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Publishing...</span>
                    </div>
                  ) : (
                    "Publish Listing"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
