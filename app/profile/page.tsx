"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth-guard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  User,
  Shield,
  Camera,
  Edit3,
  CheckCircle,
  Clock,
  ArrowLeft,
  Home,
  MessageSquare,
  Settings,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/header";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}

function ProfileContent() {
  const { user, updateProfile } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const fullName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const userType = user?.user_metadata?.user_type || "seeker";
  const location = user?.user_metadata?.current_location || "Not set";
  const phone = user?.user_metadata?.phone || "Not set";
  const occupation = user?.user_metadata?.occupation || "Not set";
  const age = user?.user_metadata?.age || "—";
  const gender = user?.user_metadata?.gender || "Not set";
  const bio = user?.user_metadata?.bio || "";

  const [editFormData, setEditFormData] = useState({
    full_name: fullName,
    phone: phone !== "Not set" ? phone : "",
    occupation: occupation !== "Not set" ? occupation : "",
    current_location: location !== "Not set" ? location : "",
    age: age !== "—" ? age : "",
    gender: gender !== "Not set" ? gender : "",
    user_type: userType,
    bio: bio,
  });

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setProfile(data);
    }
    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (user) {
      setEditFormData({
        full_name: user?.user_metadata?.full_name || "",
        phone: user?.user_metadata?.phone || "",
        occupation: user?.user_metadata?.occupation || "",
        current_location: user?.user_metadata?.current_location || "",
        age: user?.user_metadata?.age || "",
        gender: user?.user_metadata?.gender || "",
        user_type: user?.user_metadata?.user_type || "seeker",
        bio: user?.user_metadata?.bio || "",
      });
    }
  }, [user]);

  const getUserInitials = (name: string) => {
    if (!name) return "U";
    return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  };

  const isVerified = profile?.phone_verified === true;
  const verificationPending = user?.user_metadata?.verification_status === "pending" && !isVerified;

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setIsUploadingAvatar(true);
    try {
      const { uploadProfilePhoto } = await import("@/lib/supabase-crud");
      const result = await uploadProfilePhoto(file, user.id);
      const { data: urlData } = supabase.storage.from("profile-photos").getPublicUrl(result.path);
      await updateProfile({ avatar_url: urlData.publicUrl });
      toast.success("Photo updated!");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload");
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateProfile(editFormData);
      toast.success("Profile updated!");
      setIsEditDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update");
    } finally {
      setIsUpdating(false);
    }
  };

  const infoItems = [
    { icon: Mail, label: "Email", value: user?.email || "—" },
    { icon: Phone, label: "Phone", value: phone },
    { icon: Briefcase, label: "Work", value: occupation },
    { icon: MapPin, label: "Location", value: location },
    { icon: Calendar, label: "Age", value: age },
    { icon: User, label: "Gender", value: gender },
  ];

  return (
    <>
      {/* MOBILE LAYOUT */}
      <div className="lg:hidden min-h-screen bg-[#FFFEF7]">
        {/* Mobile Header with gradient */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-br from-[#3C2A1E] via-[#4A3728] to-[#3C2A1E]" />
          
          {/* Back button */}
          <Link href="/dashboard" className="absolute top-4 left-4 p-2 bg-white/10 backdrop-blur-sm rounded-full">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          
          {/* Settings */}
          <button className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full">
            <Settings className="w-5 h-5 text-white" />
          </button>

          {/* Avatar - overlapping */}
          <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">
            <div className="relative">
              <Avatar className="h-28 w-28 border-4 border-[#FFFEF7] shadow-xl">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-[#F6CB5A] text-[#3C2A1E] text-2xl font-bold">
                  {getUserInitials(fullName)}
                </AvatarFallback>
              </Avatar>
              <label className="absolute bottom-1 right-1 bg-[#F6CB5A] p-2 rounded-full cursor-pointer shadow-lg hover:scale-105 transition-transform">
                <Camera className="w-4 h-4 text-[#3C2A1E]" />
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              </label>
            </div>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="pt-16 px-5 pb-8">
          {/* Name & Badge */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#3C2A1E]">{fullName}</h1>
            <p className="text-[#7F8C8D] text-sm mt-1">{userType === "provider" ? "Room Provider" : "Room Seeker"}</p>
            <div className="flex justify-center mt-3">
              <VerificationBadge isVerified={isVerified} isPending={verificationPending} />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center gap-8 py-4 border-y border-[#ECF0F1] mb-6">
            <Link href="/my-listings" className="text-center">
              <p className="text-xl font-bold text-[#3C2A1E]">—</p>
              <p className="text-xs text-[#7F8C8D]">Listings</p>
            </Link>
            <Link href="/messages" className="text-center">
              <p className="text-xl font-bold text-[#3C2A1E]">—</p>
              <p className="text-xs text-[#7F8C8D]">Messages</p>
            </Link>
            <div className="text-center">
              <p className="text-xl font-bold text-[#3C2A1E]">{new Date(user?.created_at || "").getFullYear() || "—"}</p>
              <p className="text-xs text-[#7F8C8D]">Joined</p>
            </div>
          </div>

          {/* Info List - Mobile */}
          <div className="space-y-3 mb-6">
            {infoItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-[#ECF0F1] last:border-0">
                <div className="w-10 h-10 rounded-xl bg-[#FDF8F0] flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-[#F6CB5A]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#7F8C8D]">{item.label}</p>
                  <p className="text-[#3C2A1E] font-medium truncate">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bio - Mobile */}
          {bio && (
            <div className="bg-[#FDF8F0] rounded-2xl p-4 mb-6">
              <p className="text-xs text-[#7F8C8D] mb-2">About me</p>
              <p className="text-[#3C2A1E] text-sm leading-relaxed">{bio}</p>
            </div>
          )}

          {/* Actions - Mobile */}
          <div className="space-y-3">
            <EditProfileDialog
              isOpen={isEditDialogOpen}
              setIsOpen={setIsEditDialogOpen}
              formData={editFormData}
              setFormData={setEditFormData}
              onSubmit={handleUpdateProfile}
              isUpdating={isUpdating}
            />
            
            {!isVerified && !verificationPending && (
              <Link href="/verify" className="block">
                <Button variant="outline" className="w-full h-12 rounded-xl border-2 border-[#3C2A1E] text-[#3C2A1E] font-semibold">
                  <Shield className="w-4 h-4 mr-2" />
                  Verify Identity
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:block min-h-screen bg-gradient-to-br from-[#FFFEF7] to-[#FDF8F0]">
        <Header />
        
        <div className="max-w-5xl mx-auto px-8 py-10">
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Profile Card */}
            <div className="col-span-1">
              <div className="bg-white rounded-3xl shadow-sm border border-[#ECF0F1] overflow-hidden sticky top-8">
                {/* Card Header */}
                <div className="h-24 bg-gradient-to-r from-[#3C2A1E] to-[#4A3728] relative">
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                        <AvatarImage src={user?.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-[#F6CB5A] text-[#3C2A1E] text-2xl font-bold">
                          {getUserInitials(fullName)}
                        </AvatarFallback>
                      </Avatar>
                      <label className="absolute bottom-0 right-0 bg-[#F6CB5A] p-2 rounded-full cursor-pointer shadow-md hover:scale-110 transition-transform">
                        <Camera className="w-4 h-4 text-[#3C2A1E]" />
                        <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="pt-14 pb-6 px-6 text-center">
                  <h2 className="text-xl font-bold text-[#3C2A1E]">{fullName}</h2>
                  <p className="text-[#7F8C8D] text-sm">{userType === "provider" ? "Room Provider" : "Room Seeker"}</p>
                  
                  <div className="flex justify-center mt-3 mb-4">
                    <VerificationBadge isVerified={isVerified} isPending={verificationPending} />
                  </div>

                  <div className="flex items-center justify-center gap-1 text-[#7F8C8D] text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{location}</span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#ECF0F1]">
                    <EditProfileDialog
                      isOpen={isEditDialogOpen}
                      setIsOpen={setIsEditDialogOpen}
                      formData={editFormData}
                      setFormData={setEditFormData}
                      onSubmit={handleUpdateProfile}
                      isUpdating={isUpdating}
                    />
                  </div>

                  {!isVerified && !verificationPending && (
                    <Link href="/verify" className="block mt-3">
                      <Button variant="ghost" className="w-full text-[#7F8C8D] hover:text-[#3C2A1E]">
                        <Shield className="w-4 h-4 mr-2" />
                        Get Verified
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Info & Bio */}
            <div className="col-span-2 space-y-6">
              {/* Info Grid */}
              <div className="bg-white rounded-3xl shadow-sm border border-[#ECF0F1] p-6">
                <h3 className="text-lg font-semibold text-[#3C2A1E] mb-4">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  {infoItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-[#FAFAFA] rounded-xl">
                      <div className="w-10 h-10 rounded-xl bg-[#FDF8F0] flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-[#F6CB5A]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-[#7F8C8D]">{item.label}</p>
                        <p className="text-[#3C2A1E] font-medium truncate">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bio Section */}
              <div className="bg-white rounded-3xl shadow-sm border border-[#ECF0F1] p-6">
                <h3 className="text-lg font-semibold text-[#3C2A1E] mb-4">About Me</h3>
                {bio ? (
                  <p className="text-[#5D6D7E] leading-relaxed">{bio}</p>
                ) : (
                  <p className="text-[#7F8C8D] italic">No bio added yet. Click "Edit Profile" to add one.</p>
                )}
              </div>

              {/* Quick Links */}
              <div className="grid grid-cols-2 gap-4">
                <Link href="/my-listings" className="bg-white rounded-2xl shadow-sm border border-[#ECF0F1] p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FDF8F0] flex items-center justify-center">
                      <Home className="w-6 h-6 text-[#F6CB5A]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#3C2A1E]">My Listings</p>
                      <p className="text-sm text-[#7F8C8D]">Manage your rooms</p>
                    </div>
                  </div>
                </Link>
                <Link href="/messages" className="bg-white rounded-2xl shadow-sm border border-[#ECF0F1] p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FDF8F0] flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-[#F6CB5A]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#3C2A1E]">Messages</p>
                      <p className="text-sm text-[#7F8C8D]">View conversations</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Verification Badge Component
function VerificationBadge({ isVerified, isPending }: { isVerified: boolean; isPending: boolean }) {
  if (isVerified) {
    return (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 px-3 py-1">
        <CheckCircle className="w-3 h-3 mr-1" />
        Verified
      </Badge>
    );
  }
  if (isPending) {
    return (
      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 px-3 py-1">
        <Clock className="w-3 h-3 mr-1" />
        Pending Review
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-[#7F8C8D] px-3 py-1">
      <Shield className="w-3 h-3 mr-1" />
      Not Verified
    </Badge>
  );
}

// Edit Profile Dialog Component
function EditProfileDialog({
  isOpen,
  setIsOpen,
  formData,
  setFormData,
  onSubmit,
  isUpdating,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isUpdating: boolean;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-[#F6CB5A] hover:bg-[#E5BA49] text-[#3C2A1E] font-semibold rounded-xl h-11">
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your personal information</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="current_location">Location</Label>
              <Input
                id="current_location"
                value={formData.current_location}
                onChange={(e) => setFormData({ ...formData, current_location: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(v) => setFormData({ ...formData, gender: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="user_type">I am a</Label>
            <Select value={formData.user_type} onValueChange={(v) => setFormData({ ...formData, user_type: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seeker">Room Seeker</SelectItem>
                <SelectItem value="provider">Room Provider</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell others about yourself..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating} className="bg-[#F6CB5A] hover:bg-[#E5BA49] text-[#3C2A1E]">
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
