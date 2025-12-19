"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth-guard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  User,
  Home,
  Shield,
  BedDouble,
  MapPin,
  Search,
  MessageSquare,
  ChevronRight,
  Sparkles,
  Calendar,
  Briefcase,
  Smartphone,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";

export default function ProfilePage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#FFFEF7] font-sans selection:bg-[#F6CB5A]/30 flex flex-col">
        <Header />
        <ProfileContent />
      </div>
    </AuthGuard>
  );
}

function ProfileContent() {
  const { user } = useAuth();

  const getUserInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";
  const userType = user?.user_metadata?.user_type || "seeker";
  const location = user?.user_metadata?.current_location || "Not specified";
  const phone = user?.user_metadata?.phone || "Not specified";
  const occupation = user?.user_metadata?.occupation || "Not specified";
  const age = user?.user_metadata?.age || "N/A";
  const gender = user?.user_metadata?.gender || "Not specified";

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editFormData, setEditFormData] = useState({
    full_name: fullName,
    phone: phone !== "Not specified" ? phone : "",
    occupation: occupation !== "Not specified" ? occupation : "",
    current_location: location !== "Not specified" ? location : "",
    age: age !== "N/A" ? age : "",
    gender: gender !== "Not specified" ? gender : "",
    user_type: userType,
    bio: user?.user_metadata?.bio || "",
  });

  const { updateProfile } = useAuth();

  useEffect(() => {
    if (user) {
      setEditFormData({
        full_name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User",
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

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateProfile(editFormData);
      toast.success("Profile updated successfully!");
      setIsEditDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 space-y-12">
        {/* Profile Header Card */}
        <div className="relative group">
          <Card className="relative bg-white border border-[#ECF0F1] rounded-[32px] shadow-lg overflow-hidden">
            <div className="h-48 bg-[#3C2A1E] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#3C2A1E] via-[#F6CB5A]/10 to-[#3C2A1E]" />
              <div className="absolute top-0 right-0 p-8">
                <Badge className="bg-[#FDF8F0] text-[#F6CB5A] font-bold px-4 py-1.5 rounded-full border border-[#F6CB5A]/20">
                  {userType === "seeker" ? "ROOM SEEKER" : "ROOM PROVIDER"}
                </Badge>
              </div>
            </div>
            <div className="px-10 pb-12 -mt-20 relative">
              <div className="flex flex-col md:flex-row md:items-end gap-8 text-center md:text-left">
                <Avatar className="h-40 w-40 border-8 border-white shadow-2xl mx-auto md:mx-0">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-[#F6CB5A] text-[#3C2A1E] text-5xl font-bold">
                    {getUserInitials(fullName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 pb-2">
                  <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                    <h1 className="text-4xl font-bold text-[#3C2A1E]">{fullName}</h1>
                    <Badge className="bg-green-50 text-green-600 border-green-100 px-3 py-1 text-xs">
                      Verified Member
                    </Badge>
                  </div>
                  <p className="text-lg font-medium text-[#7F8C8D] flex items-center justify-center md:justify-start">
                    <MapPin className="w-4 h-4 mr-2 text-[#F6CB5A]" />
                    {location}
                  </p>
                </div>
                <div className="pb-2">
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-bold h-12 rounded-xl px-8 shadow-md transition-all">
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white border-[#ECF0F1] rounded-3xl max-w-lg sm:max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-[#3C2A1E]">Edit Profile</DialogTitle>
                        <DialogDescription>
                          Update your personal information and preferences.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleUpdateProfile} className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="full_name" className="text-sm font-bold text-[#3C2A1E]">Full Name</Label>
                            <Input
                              id="full_name"
                              value={editFormData.full_name}
                              onChange={(e) => setEditFormData({ ...editFormData, full_name: e.target.value })}
                              className="bg-white border-[#BDC3C7] text-[#3C2A1E] placeholder:text-[#7F8C8D] rounded-xl focus:ring-[#F6CB5A] focus:border-[#F6CB5A]"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-bold text-[#3C2A1E]">Phone Number</Label>
                            <Input
                              id="phone"
                              value={editFormData.phone}
                              onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                              className="bg-white border-[#BDC3C7] text-[#3C2A1E] placeholder:text-[#7F8C8D] rounded-xl focus:ring-[#F6CB5A] focus:border-[#F6CB5A]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="occupation" className="text-sm font-bold text-[#3C2A1E]">Occupation</Label>
                            <Input
                              id="occupation"
                              value={editFormData.occupation}
                              onChange={(e) => setEditFormData({ ...editFormData, occupation: e.target.value })}
                              className="bg-white border-[#BDC3C7] text-[#3C2A1E] placeholder:text-[#7F8C8D] rounded-xl focus:ring-[#F6CB5A] focus:border-[#F6CB5A]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="current_location" className="text-sm font-bold text-[#3C2A1E]">Location</Label>
                            <Input
                              id="current_location"
                              value={editFormData.current_location}
                              onChange={(e) => setEditFormData({ ...editFormData, current_location: e.target.value })}
                              className="bg-white border-[#BDC3C7] text-[#3C2A1E] placeholder:text-[#7F8C8D] rounded-xl focus:ring-[#F6CB5A] focus:border-[#F6CB5A]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="age" className="text-sm font-bold text-[#3C2A1E]">Age</Label>
                            <Input
                              id="age"
                              type="number"
                              value={editFormData.age}
                              onChange={(e) => setEditFormData({ ...editFormData, age: e.target.value })}
                              className="bg-white border-[#BDC3C7] text-[#3C2A1E] placeholder:text-[#7F8C8D] rounded-xl focus:ring-[#F6CB5A] focus:border-[#F6CB5A]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="gender" className="text-sm font-bold text-[#3C2A1E]">Gender</Label>
                            <Select
                              value={editFormData.gender}
                              onValueChange={(value) => setEditFormData({ ...editFormData, gender: value })}
                            >
                              <SelectTrigger className="bg-white border-[#BDC3C7] text-[#3C2A1E] rounded-xl focus:ring-[#F6CB5A] focus:border-[#F6CB5A]">
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent className="bg-white border-[#ECF0F1] text-[#3C2A1E]">
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="prefernotto">Prefer not to say</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="user_type" className="text-sm font-bold text-[#3C2A1E]">I am a...</Label>
                            <Select
                              value={editFormData.user_type}
                              onValueChange={(value: "seeker" | "provider") => setEditFormData({ ...editFormData, user_type: value })}
                            >
                              <SelectTrigger className="bg-white border-[#BDC3C7] text-[#3C2A1E] rounded-xl focus:ring-[#F6CB5A] focus:border-[#F6CB5A]">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent className="bg-white border-[#ECF0F1] text-[#3C2A1E]">
                                <SelectItem value="seeker">Room Seeker</SelectItem>
                                <SelectItem value="provider">Room Provider</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="bio" className="text-sm font-bold text-[#3C2A1E]">Bio</Label>
                            <Textarea
                              id="bio"
                              value={editFormData.bio}
                              onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                              placeholder="Tell people about yourself..."
                              className="bg-white border-[#BDC3C7] text-[#3C2A1E] placeholder:text-[#7F8C8D] rounded-xl focus:ring-[#F6CB5A] focus:border-[#F6CB5A] h-32"
                            />
                          </div>
                        </div>
                        <DialogFooter className="pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditDialogOpen(false)}
                            className="rounded-xl border-[#ECF0F1]"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            disabled={isUpdating}
                            className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-bold rounded-xl px-8"
                          >
                            {isUpdating ? "Updating..." : "Save Changes"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Info Section */}
          <div className="lg:col-span-2 space-y-10">
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-[#3C2A1E] flex items-center">
                <User className="w-6 h-6 mr-3 text-[#F6CB5A]" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Email Address", value: user?.email, icon: Mail },
                  { label: "Phone Number", value: phone, icon: Smartphone },
                  { label: "Current Occupation", value: occupation, icon: Briefcase },
                  { label: "Current Location", value: location, icon: MapPin },
                  { label: "Age", value: age, icon: Calendar },
                  { label: "Gender", value: gender, icon: User },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-[#ECF0F1] shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-xs font-bold text-[#7F8C8D] uppercase tracking-widest mb-2">{item.label}</p>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-[#FDF8F0] rounded-xl text-[#F6CB5A]">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-[#3C2A1E]">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-[#3C2A1E] flex items-center">
                <Sparkles className="w-6 h-6 mr-3 text-[#F6CB5A]" />
                Bio & Expectations
              </h2>
              <div className="bg-white p-8 rounded-2xl border border-[#ECF0F1] shadow-sm italic text-[#7F8C8D] font-medium leading-relaxed">
                &ldquo;{user?.user_metadata?.bio || "No bio added yet. Tell people about yourself and what you're looking for in a roommate!"}&rdquo;
              </div>
            </section>
          </div>

          {/* Stats/Side Section */}
          <div className="lg:col-span-1 space-y-10">
            <Card className="rounded-[32px] border-none shadow-xl p-8 bg-[#3C2A1E] text-white">
              <h3 className="text-xl font-bold mb-6">Discovery Stats</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <Search className="w-5 h-5 text-[#F6CB5A]" />
                    </div>
                    <span className="font-bold text-white/70">Searches</span>
                  </div>
                  <span className="text-2xl font-bold">124</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-[#F6CB5A]" />
                    </div>
                    <span className="font-bold text-white/70">Requests</span>
                  </div>
                  <span className="text-2xl font-bold">12</span>
                </div>
              </div>
            </Card>

            <div className="bg-[#F6CB5A] rounded-[32px] p-8 shadow-xl shadow-[#F6CB5A]/10">
              <h3 className="text-xl font-bold text-[#3C2A1E] mb-2 text-center">Ready to Move?</h3>
              <p className="text-[#3C2A1E]/70 font-medium text-sm text-center mb-6">Upgrade to Premium to see who viewed your profile.</p>
              <Button className="w-full bg-[#3C2A1E] hover:bg-[#2A1E14] text-white font-bold h-12 rounded-xl shadow-lg transition-all">
                Get Premium
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-10 text-center text-gray-400 font-bold text-sm">
        <p>&copy; 2025 DebalE &bull; Secure Ethiopian Living</p>
      </footer>
    </div>
  );
}
