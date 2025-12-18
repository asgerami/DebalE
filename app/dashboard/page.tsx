"use client";

import { useAuth } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth-guard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  Search,
  MessageSquare,
  User,
  Zap,
  Sparkles,
  ChevronRight,
  TrendingUp,
  LayoutDashboard,
  Coffee,
  Calendar,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/header";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#FFFEF7] font-sans selection:bg-[#F6CB5A]/30 flex flex-col">
        <Header />
        <DashboardContent />
      </div>
    </AuthGuard>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";

  const getUserInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 space-y-10">
      {/* Hero Welcome */}
      <div className="relative overflow-hidden bg-[#3C2A1E] rounded-[40px] p-10 lg:p-16 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#F6CB5A]/20 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#F6CB5A]/10 blur-[100px] rounded-full" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="space-y-6 max-w-2xl">
            <div className="flex flex-col space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full w-fit">
                <Sparkles className="w-4 h-4 text-[#F6CB5A]" />
                <span className="text-sm font-bold tracking-wide uppercase">Welcome Back</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-none mb-4">
                Salam, <span className="text-[#F6CB5A]">{fullName.split(' ')[0]}!</span>
              </h1>
              <p className="text-xl text-white/70 font-medium max-w-md">
                Your next great Ethiopian living experience starts right here.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/search">
                <Button size="lg" className="bg-[#F6CB5A] hover:bg-white text-[#3C2A1E] font-black h-14 rounded-xl px-8 shadow-md transition-all duration-300">
                  Find Rooms
                  <Search className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/list-room">
                <Button size="lg" variant="outline" className="bg-transparent border-2 border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E] h-14 rounded-xl px-8 transition-all">
                  Post a Listing
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-4 translate-x-10 rotate-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-32 h-32 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center p-4">
                {i === 1 && <Coffee className="w-10 h-10 text-[#F6CB5A]" />}
                {i === 2 && <TrendingUp className="w-10 h-10 text-white/40" />}
                {i === 3 && <Home className="w-10 h-10 text-[#F6CB5A]/40" />}
                {i === 4 && <Search className="w-10 h-10 text-white" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column - User Info & Stats */}
        <div className="lg:col-span-1 space-y-10">
          <Card className="rounded-[40px] bg-white border border-[#ECF0F1] shadow-lg overflow-hidden relative group">
            <div className="h-32 bg-gradient-to-br from-[#F6CB5A] to-[#E6B84A]" />
            <div className="px-8 pb-8">
              <div className="relative -mt-16 mb-6 flex justify-center">
                <div className="p-2 bg-white rounded-[32px] shadow-2xl shadow-black/20">
                  <Avatar className="h-28 w-28 rounded-[24px] border-4 border-white">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-[#3C2A1E] text-[#F6CB5A] font-black text-3xl">
                      {getUserInitials(fullName)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="text-center space-y-1 mb-8">
                <h2 className="text-2xl font-bold text-[#3C2A1E] leading-tight">{fullName}</h2>
                <p className="text-[#7F8C8D] font-medium">Verified Account</p>
              </div>

              <div className="space-y-3 py-4 border-y border-[#ECF0F1]">
                <div className="flex items-center space-x-3 text-[#3C2A1E] font-medium">
                  <Mail className="w-4 h-4 text-[#F6CB5A]" />
                  <span className="text-sm line-clamp-1">{user?.email}</span>
                </div>
                {user?.user_metadata?.phone && (
                  <div className="flex items-center space-x-3 text-[#3C2A1E] font-medium">
                    <Phone className="w-4 h-4 text-[#F6CB5A]" />
                    <span className="text-sm">{user.user_metadata.phone}</span>
                  </div>
                )}
                <div className="flex items-center space-x-3 text-[#3C2A1E] font-medium">
                  <MapPin className="w-4 h-4 text-[#F6CB5A]" />
                  <span className="text-sm">{user?.user_metadata?.current_location || "Addis Ababa, Ethiopia"}</span>
                </div>
              </div>

              <Link href="/profile" className="block mt-6">
                <Button className="w-full bg-[#FDF8F0] hover:bg-[#F6CB5A] text-[#F6CB5A] hover:text-[#3C2A1E] border-2 border-[#F6CB5A]/20 hover:border-[#F6CB5A] font-bold h-12 rounded-xl transition-all">
                  <User className="h-4 w-4 mr-2" />
                  View Public Profile
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="rounded-[40px] bg-white border border-[#ECF0F1] shadow-lg p-8">
            <h3 className="text-xl font-bold text-[#3C2A1E] mb-6">Quick Actions</h3>
            <div className="grid gap-3">
              {[
                { label: "My Listings", icon: Home, color: "bg-[#FDF8F0] text-[#F6CB5A]", href: "/my-listings" },
                { label: "Saved Rooms", icon: Sparkles, color: "bg-[#FDF8F0] text-[#F6CB5A]", href: "/saved" },
                { label: "Active Matches", icon: Zap, color: "bg-[#FDF8F0] text-[#F6CB5A]", href: "/matches" },
                { label: "Verification", icon: ShieldCheck, color: "bg-[#FDF8F0] text-[#F6CB5A]", href: "/verify" },
              ].map((item) => (
                <Link key={item.label} href={item.href}>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FFFEF7] hover:bg-[#FDF8F0] border border-[#ECF0F1] hover:border-[#F6CB5A]/30 transition-all group">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${item.color}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-[#3C2A1E] transition-colors">{item.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#F6CB5A] group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Dashboard Feed */}
        <div className="lg:col-span-2 space-y-10">
          {/* Recent Activity */}
          <div className="space-y-6">
            <div className="flex justify-between items-end px-2">
              <div>
                <h2 className="text-3xl font-black text-[#3C2A1E]">Recent Activity</h2>
                <p className="text-[#3C2A1E]/50 font-bold">Your latest housing updates</p>
              </div>
              <Link href="/activity" className="text-sm font-black text-[#F6CB5A] hover:underline">View All</Link>
            </div>

            <div className="grid gap-4">
              <div className="flex items-center space-x-6 p-6 bg-white rounded-[40px] shadow-lg shadow-black/5 hover:translate-y-[-4px] transition-transform duration-300 group border border-transparent hover:border-[#F6CB5A]/10">
                <div className="w-16 h-16 bg-[#F6CB5A]/10 rounded-3xl flex items-center justify-center group-hover:bg-[#F6CB5A] transition-colors">
                  <Calendar className="w-8 h-8 text-[#F6CB5A] group-hover:text-[#3C2A1E] transition-colors" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-black text-[#3C2A1E]">Account successfully verified</p>
                  <p className="text-[#3C2A1E]/50 font-bold text-sm">Your profile is now verified and trusted by roommates.</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="text-xs bg-[#FDF8F0] px-3 py-1 rounded-full font-bold text-[#3C2A1E]/60">{new Date(user?.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span className="text-xs font-bold text-green-500 flex items-center"><ShieldCheck className="w-3 h-3 mr-1" /> SECURE</span>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-200" />
              </div>

              <div className="bg-white rounded-[40px] p-12 text-center border-2 border-dashed border-[#ECF0F1]">
                <div className="w-20 h-20 bg-[#FDF8F0] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-[#F6CB5A]" />
                </div>
                <h3 className="text-xl font-black text-[#3C2A1E]/80">Nothing more here yet</h3>
                <p className="text-[#3C2A1E]/50 font-medium max-w-xs mx-auto mt-2">Start exploring rooms in your area to see matches and updates here!</p>
                <Link href="/search">
                  <Button className="mt-8 bg-[#3C2A1E] hover:bg-[#2A1E14] text-white font-black px-8 py-6 rounded-2xl shadow-xl transition-all scale-100 hover:scale-105 active:scale-95">
                    Browse Rooms Nearby
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Verification Banner */}
          {!user?.email_confirmed_at && (
            <div className="bg-white rounded-[40px] p-8 border-2 border-[#F6CB5A] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <ShieldCheck className="w-32 h-32 text-[#F6CB5A]" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 bg-[#F6CB5A] rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-[#F6CB5A]/20">
                  <Mail className="w-10 h-10 text-[#3C2A1E]" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-black text-[#3C2A1E]">Action Required: Verify Email</h3>
                  <p className="text-[#3C2A1E]/70 font-bold mt-1">Please verify your email address to unlock all features including direct messaging.</p>
                  <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                    <Button className="bg-[#3C2A1E] hover:bg-[#2A1E14] text-white font-black rounded-2xl px-6 h-12 shadow-xl transition-all active:scale-95">
                      Resend Verification
                    </Button>
                    <Button variant="ghost" className="text-[#3C2A1E] font-black h-12 rounded-2xl hover:bg-[#FDF8F0]">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className="mt-auto py-10 text-center text-gray-400 font-bold text-sm">
        <p>&copy; 2025 DebalE &bull; Made with ☕ in Ethiopia</p>
      </footer>
    </main>
  );
}

// Simple internal icon for verification
function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
