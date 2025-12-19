"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
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
import { Listing } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AuthGuard } from "@/components/auth-guard";

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

import Header from "@/components/header";

export default function ListRoomPage() {
  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen">
        <Header />
        <ListRoomContent />
      </div>
    </AuthGuard>
  );
}

function ListRoomContent() {
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
    if (!user) {
      setSubmitError("You must be logged in to create a listing");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Debug: Check the current auth state
      const { supabase } = await import("@/lib/supabase");
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      console.log("Context user.id:", user.id);
      console.log("Supabase auth.getUser() id:", authUser?.id);
      
      if (!authUser) {
        throw new Error("Not authenticated with Supabase. Please log in again.");
      }

      // Use the authenticated user's ID from Supabase directly
      const listingData: Partial<Listing> = {
        provider_id: authUser.id,
        title: formData.title,
        description: formData.description || null,
        monthly_rent: parseFloat(formData.price) || 0,
        area: formData.location,
        room_type: formData.roomType,
        house_rules: formData.houseRules || null,
        available_from: formData.availability || null,
        preferred_tenant_gender: (formData.genderPreference as "male" | "female" | "any") || "any",
        preferred_tenant_occupation: formData.occupation ? [formData.occupation] : [],
        wifi: selectedAmenities.includes("wifi"),
        parking: selectedAmenities.includes("parking"),
        kitchen_access: selectedAmenities.includes("kitchen"),
        laundry: selectedAmenities.includes("laundry"),
        security: selectedAmenities.includes("security"),
        is_active: true,
      };

      const listing = await createListing(listingData);

      if (!listing?.id) {
        throw new Error("Failed to create listing - no ID returned");
      }

      // Upload photos if any
      if (uploadedPhotos.length > 0) {
        for (const photo of uploadedPhotos) {
          await uploadListing(photo, listing.id);
        }
      }

      router.push(`/listing/${listing.id}`);
    } catch (err: any) {
      console.error("Error creating listing:", err);
      setSubmitError(err.message || "Failed to create listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1">

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

          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step <= currentStep
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
                <span className="text-xs text-[#7F8C8D] mt-1">
                  {step === 1 && "Basic Info"}
                  {step === 2 && "Details"}
                  {step === 3 && "Photos"}
                  {step === 4 && "Review"}
                </span>
                {step < 4 && (
                  <div
                    className={`w-16 h-1 mt-2 ${step < currentStep ? "bg-[#F6CB5A]" : "bg-[#ECF0F1]"
                      }`}
                  ></div>
                )}
              </div>
            ))}
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
                          className={`p-3 rounded-lg border-2 transition-all duration-200 ${selectedAmenities.includes(amenity.id)
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
                        {photoUrls.length > 0 ? (
                          photoUrls.slice(0, 3).map((url, index) => (
                            <Image
                              key={index}
                              src={url}
                              alt={`Room preview ${index + 1}`}
                              width={150}
                              height={100}
                              className="w-full h-20 object-cover rounded-md"
                            />
                          ))
                        ) : (
                          <div className="col-span-3 text-center text-[#7F8C8D] py-4">
                            No photos uploaded yet
                          </div>
                        )}
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
