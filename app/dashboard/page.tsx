"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth-guard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  Search,
  MessageSquare,
  User,
  Sparkles,
  ChevronRight,
  Plus,
  Bell,
  Settings,
  Shield,
  MapPin,
  Calendar,
  Heart,
  Eye,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/header";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({ listings: 0, views: 0, messages: 0 });
  const fullName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const firstName = fullName.split(" ")[0];
  const location = user?.user_metadata?.current_location || "Addis Ababa";
  const userType = user?.user_metadata?.user_type || "seeker";

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      // Check admin status
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();
      setIsAdmin(profile?.is_admin || false);

      // Get user's listing count
      const { count } = await supabase
        .from("listings")
        .select("*", { count: "exact", head: true })
        .eq("provider_id", user.id);
      setStats((s) => ({ ...s, listings: count || 0 }));
    }
    fetchData();
  }, [user]);

  const getUserInitials = (name: string) => {
    if (!name) return "U";
    return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const quickActions = [
    { label: "Find Rooms", icon: Search, href: "/search", color: "bg-blue-500" },
    { label: "List Room", icon: Plus, href: "/list-room", color: "bg-green-500" },
    { label: "Messages", icon: MessageSquare, href: "/messages", color: "bg-purple-500" },
    { label: "My Listings", icon: Home, href: "/my-listings", color: "bg-orange-500" },
  ];

  const menuItems = [
    { label: "My Listings", icon: Home, href: "/my-listings", desc: "Manage your rooms" },
    { label: "Saved Rooms", icon: Heart, href: "/saved", desc: "Your favorites" },
    { label: "Messages", icon: MessageSquare, href: "/messages", desc: "Conversations" },
    { label: "Verification", icon: Shield, href: "/verify", desc: "Get verified" },
    { label: "Profile", icon: User, href: "/profile", desc: "Edit your info" },
    ...(isAdmin ? [{ label: "Admin Panel", icon: Settings, href: "/admin", desc: "Manage platform", isAdmin: true }] : []),
  ];

  return (
    <>
      {/* MOBILE LAYOUT */}
      <div className="lg:hidden min-h-screen bg-[#FFFEF7]">
        {/* Mobile Header */}
        <div className="bg-gradient-to-br from-[#3C2A1E] via-[#4A3728] to-[#3C2A1E] pt-12 pb-24 px-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#F6CB5A]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F6CB5A]/5 rounded-full blur-2xl" />
          
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11 border-2 border-[#F6CB5A]/30">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-[#F6CB5A] text-[#3C2A1E] font-bold">
                  {getUserInitials(fullName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white/60 text-xs">{getGreeting()}</p>
                <p className="text-white font-semibold">{firstName}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2.5 bg-white/10 rounded-xl">
                <Bell className="w-5 h-5 text-white" />
              </button>
              <Link href="/profile" className="p-2.5 bg-white/10 rounded-xl">
                <Settings className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-1">
              Welcome back! 👋
            </h1>
            <p className="text-white/60 text-sm flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {location}
            </p>
          </div>
        </div>

        {/* Stats Cards - Floating */}
        <div className="px-5 -mt-16 relative z-20 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#3C2A1E]">{stats.listings}</p>
              <p className="text-xs text-[#7F8C8D]">Listings</p>
            </div>
            <div className="text-center border-x border-[#ECF0F1]">
              <p className="text-2xl font-bold text-[#3C2A1E]">—</p>
              <p className="text-xs text-[#7F8C8D]">Views</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#3C2A1E]">—</p>
              <p className="text-xs text-[#7F8C8D]">Messages</p>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="px-5 mb-6">
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href} className="flex flex-col items-center">
                <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center mb-2 shadow-lg`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-[#3C2A1E] font-medium text-center">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Menu List */}
        <div className="px-5 mb-6">
          <h2 className="text-lg font-semibold text-[#3C2A1E] mb-3">Menu</h2>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {menuItems.map((item, i) => (
              <Link key={item.label} href={item.href}>
                <div className={`flex items-center justify-between p-4 ${i !== menuItems.length - 1 ? "border-b border-[#ECF0F1]" : ""}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.isAdmin ? "bg-red-100" : "bg-[#FDF8F0]"}`}>
                      <item.icon className={`w-5 h-5 ${item.isAdmin ? "text-red-500" : "text-[#F6CB5A]"}`} />
                    </div>
                    <div>
                      <p className={`font-medium ${item.isAdmin ? "text-red-600" : "text-[#3C2A1E]"}`}>{item.label}</p>
                      <p className="text-xs text-[#7F8C8D]">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#BDC3C7]" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="px-5 pb-8">
          <div className="bg-gradient-to-r from-[#3C2A1E] to-[#4A3728] rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#F6CB5A]/20 rounded-full blur-2xl" />
            <div className="relative z-10">
              <h3 className="text-white font-bold text-lg mb-1">
                {userType === "provider" ? "List your room" : "Find your room"}
              </h3>
              <p className="text-white/60 text-sm mb-4">
                {userType === "provider" ? "Reach thousands of seekers" : "Browse verified listings"}
              </p>
              <Link href={userType === "provider" ? "/list-room" : "/search"}>
                <Button className="bg-[#F6CB5A] hover:bg-[#E5BA49] text-[#3C2A1E] font-semibold h-10 rounded-xl px-6">
                  {userType === "provider" ? "Post Now" : "Search Now"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:block min-h-screen bg-gradient-to-br from-[#FFFEF7] to-[#FDF8F0]">
        <Header />
        
        <main className="max-w-7xl mx-auto px-8 py-10">
          {/* Hero Section */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#3C2A1E] via-[#4A3728] to-[#3C2A1E] rounded-3xl p-10 mb-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#F6CB5A]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#F6CB5A]/5 rounded-full blur-2xl" />
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                  <Sparkles className="w-4 h-4 text-[#F6CB5A]" />
                  <span className="text-white/80 text-sm font-medium">{getGreeting()}</span>
                </div>
                <h1 className="text-5xl font-bold text-white">
                  Welcome back, <span className="text-[#F6CB5A]">{firstName}!</span>
                </h1>
                <p className="text-white/60 text-lg max-w-md">
                  Your next great Ethiopian living experience starts here.
                </p>
                <div className="flex gap-4 pt-4">
                  <Link href="/search">
                    <Button className="bg-[#F6CB5A] hover:bg-[#E5BA49] text-[#3C2A1E] font-semibold h-12 px-8 rounded-xl">
                      <Search className="w-4 h-4 mr-2" />
                      Find Rooms
                    </Button>
                  </Link>
                  <Link href="/list-room">
                    <Button variant="outline" className="border-2 border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E] h-12 px-8 rounded-xl bg-transparent">
                      <Plus className="w-4 h-4 mr-2" />
                      Post Listing
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="flex gap-4">
                <StatCard icon={Home} label="Listings" value={stats.listings} />
                <StatCard icon={Eye} label="Views" value="—" />
                <StatCard icon={MessageSquare} label="Messages" value="—" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Profile Card */}
            <div className="col-span-1 space-y-6">
              <div className="bg-white rounded-3xl shadow-sm border border-[#ECF0F1] overflow-hidden">
                <div className="h-20 bg-gradient-to-r from-[#F6CB5A] to-[#E5BA49]" />
                <div className="px-6 pb-6">
                  <div className="-mt-10 mb-4 flex justify-center">
                    <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                      <AvatarImage src={user?.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-[#3C2A1E] text-[#F6CB5A] text-xl font-bold">
                        {getUserInitials(fullName)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-center mb-4">
                    <h2 className="text-xl font-bold text-[#3C2A1E]">{fullName}</h2>
                    <p className="text-[#7F8C8D] text-sm flex items-center justify-center gap-1">
                      <MapPin className="w-3 h-3" /> {location}
                    </p>
                  </div>
                  <Link href="/profile">
                    <Button variant="outline" className="w-full rounded-xl h-10 border-[#ECF0F1] text-[#3C2A1E] hover:bg-[#FDF8F0]">
                      <User className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-3xl shadow-sm border border-[#ECF0F1] p-6">
                <h3 className="font-semibold text-[#3C2A1E] mb-4">Quick Links</h3>
                <div className="space-y-2">
                  {menuItems.map((item) => (
                    <Link key={item.label} href={item.href}>
                      <div className={`flex items-center gap-3 p-3 rounded-xl hover:bg-[#FDF8F0] transition-colors ${item.isAdmin ? "bg-red-50" : ""}`}>
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.isAdmin ? "bg-red-100" : "bg-[#FDF8F0]"}`}>
                          <item.icon className={`w-4 h-4 ${item.isAdmin ? "text-red-500" : "text-[#F6CB5A]"}`} />
                        </div>
                        <span className={`font-medium text-sm ${item.isAdmin ? "text-red-600" : "text-[#3C2A1E]"}`}>{item.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Activity */}
            <div className="col-span-2 space-y-6">
              {/* Recent Activity */}
              <div className="bg-white rounded-3xl shadow-sm border border-[#ECF0F1] p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#3C2A1E]">Recent Activity</h3>
                  <span className="text-sm text-[#7F8C8D]">Last 7 days</span>
                </div>

                <div className="space-y-4">
                  {/* Activity Item */}
                  <div className="flex items-center gap-4 p-4 bg-[#FAFAFA] rounded-2xl">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#3C2A1E]">Account Created</p>
                      <p className="text-sm text-[#7F8C8D]">Welcome to SafeRoom!</p>
                    </div>
                    <span className="text-xs text-[#7F8C8D]">
                      {new Date(user?.created_at || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>

                  {/* Empty State */}
                  <div className="text-center py-10 border-2 border-dashed border-[#ECF0F1] rounded-2xl">
                    <div className="w-16 h-16 bg-[#FDF8F0] rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-[#F6CB5A]" />
                    </div>
                    <h4 className="font-semibold text-[#3C2A1E] mb-1">No recent activity</h4>
                    <p className="text-sm text-[#7F8C8D] mb-4">Start exploring to see your activity here</p>
                    <Link href="/search">
                      <Button className="bg-[#3C2A1E] hover:bg-[#2A1E14] text-white rounded-xl h-10 px-6">
                        Browse Rooms
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tips Card */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                  <Search className="w-8 h-8 mb-3 opacity-80" />
                  <h4 className="font-bold text-lg mb-1">Looking for a room?</h4>
                  <p className="text-white/70 text-sm mb-4">Browse verified listings in your area</p>
                  <Link href="/search">
                    <Button className="bg-white text-blue-600 hover:bg-blue-50 rounded-xl h-9 px-4 text-sm font-semibold">
                      Search Now
                    </Button>
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                  <Home className="w-8 h-8 mb-3 opacity-80" />
                  <h4 className="font-bold text-lg mb-1">Have a room to share?</h4>
                  <p className="text-white/70 text-sm mb-4">List it and reach thousands of seekers</p>
                  <Link href="/list-room">
                    <Button className="bg-white text-green-600 hover:bg-green-50 rounded-xl h-9 px-4 text-sm font-semibold">
                      Post Listing
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// Stat Card Component for Desktop
function StatCard({ icon: Icon, label, value }: { icon: any; label: string; value: number | string }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-5 min-w-[140px]">
      <Icon className="w-6 h-6 text-[#F6CB5A] mb-2" />
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-white/60 text-sm">{label}</p>
    </div>
  );
}
