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
  Settings,
  LogOut,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Zap,
  Sparkles,
  ChevronRight,
  TrendingUp,
  LayoutDashboard,
  PlusCircle,
  Coffee,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#FDF8F0] dark:bg-gray-950 font-sans selection:bg-[#F6CB5A]/30">
        <DashboardContent />
      </div>
    </AuthGuard>
  );
}

function DashboardContent() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";
  const userType = user?.user_metadata?.user_type || "seeker";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3 group transition-transform hover:scale-105 active:scale-95">
              <div className="w-10 h-10 bg-[#F6CB5A] rounded-xl flex items-center justify-center shadow-lg shadow-[#F6CB5A]/20">
                <Coffee className="w-6 h-6 text-[#3C2A1E]" />
              </div>
              <span className="text-2xl font-black text-[#3C2A1E] dark:text-white tracking-tight">DebalE</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-1">
              {[
                { label: "Dashboard", icon: LayoutDashboard, active: true },
                { label: "Find Rooms", icon: Search, active: false },
                { label: "Messages", icon: MessageSquare, active: false },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${item.active
                      ? "bg-[#3C2A1E] text-white shadow-lg"
                      : "text-gray-500 hover:text-[#3C2A1E] hover:bg-gray-100"
                    }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-5">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-sm font-bold text-[#3C2A1E] dark:text-white line-clamp-1">{fullName}</span>
              <Badge className="bg-[#FDF8F0] text-[#3C2A1E] border-[#F6CB5A]/30 text-[10px] py-0 h-4">
                {userType === "seeker" ? "Room Seeker" : "Room Provider"}
              </Badge>
            </div>
            <Avatar className="h-10 w-10 border-2 border-[#F6CB5A] ring-4 ring-[#F6CB5A]/10 cursor-pointer hover:opacity-80 transition-opacity">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-[#F6CB5A] text-[#3C2A1E] font-bold">
                {getUserInitials(fullName)}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 space-y-10">

        {/* Hero Welcome */}
        <div className="relative overflow-hidden bg-[#3C2A1E] rounded-[40px] p-10 lg:p-16 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#F6CB5A]/20 to-transparent pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#F6CB5A]/10 blur-[100px] rounded-full" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-2">
                <Sparkles className="w-4 h-4 text-[#F6CB5A]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#F6CB5A]">Personalized for you</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-black leading-tight">
                Welcome home, <br />
                <span className="text-[#F6CB5A] underline decoration-4 underline-offset-8">{fullName.split(' ')[0]}!</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/70 max-w-lg leading-relaxed font-medium">
                Ready to find your next great living experience? Browse matches or manage your listings.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/search">
                  <Button size="lg" className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-black h-14 rounded-2xl px-8 shadow-xl hover:translate-y-[-2px] transition-all duration-300">
                    Start Exploring
                    <Search className="ml-2 w-5 h-5 font-bold" />
                  </Button>
                </Link>
                <Link href="/list-room">
                  <Button size="lg" variant="outline" className="bg-transparent border-2 border-white/20 hover:bg-white/10 text-white font-bold h-14 rounded-2xl px-8 transition-all">
                    Post a Listing
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:w-1/3">
              {[
                { label: "Matches", value: "24", icon: TrendingUp },
                { label: "Messages", value: "12", icon: MessageSquare },
                { label: "Views", value: "1.2k", icon: Zap },
                { label: "Favorites", value: "8", icon: Sparkles },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                  <stat.icon className="w-6 h-6 text-[#F6CB5A] mb-3" />
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-xs font-bold text-white/50 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* User Side Profile */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="rounded-[32px] border-none shadow-xl overflow-hidden group">
              <div className="h-32 bg-gradient-to-r from-[#3C2A1E] to-[#F6CB5A] relative">
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="px-8 pb-8 -mt-16 relative">
                <Avatar className="h-32 w-32 border-8 border-white dark:border-gray-950 shadow-2xl shadow-black/10 mx-auto lg:mx-0">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-[#F6CB5A] text-[#3C2A1E] text-4xl font-black">
                    {getUserInitials(fullName)}
                  </AvatarFallback>
                </Avatar>

                <div className="mt-6 text-center lg:text-left space-y-4">
                  <div>
                    <h2 className="text-2xl font-black text-[#3C2A1E] dark:text-white leading-tight">{fullName}</h2>
                    <p className="text-[#3C2A1E]/60 dark:text-white/60 font-medium">User ID: #{user?.id.slice(0, 8)}</p>
                  </div>

                  <div className="space-y-3 py-4 border-y border-gray-100 dark:border-gray-800">
                    <div className="flex items-center space-x-3 text-[#3C2A1E]/80 dark:text-white/80 font-bold">
                      <Mail className="w-4 h-4 text-[#F6CB5A]" />
                      <span className="text-sm line-clamp-1">{user?.email}</span>
                    </div>
                    {user?.user_metadata?.phone && (
                      <div className="flex items-center space-x-3 text-[#3C2A1E]/80 dark:text-white/80 font-bold">
                        <Phone className="w-4 h-4 text-[#F6CB5A]" />
                        <span className="text-sm">{user.user_metadata.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-3 text-[#3C2A1E]/80 dark:text-white/80 font-bold">
                      <MapPin className="w-4 h-4 text-[#F6CB5A]" />
                      <span className="text-sm">{user?.user_metadata?.current_location || "Addis Ababa, Ethiopia"}</span>
                    </div>
                  </div>

                  <Link href="/profile" className="block">
                    <Button className="w-full bg-[#FDF8F0] hover:bg-[#F6CB5A] text-[#3C2A1E] border-2 border-[#F6CB5A]/20 hover:border-[#F6CB5A] font-black h-12 rounded-2xl transition-all">
                      <User className="h-4 w-4 mr-2" />
                      Edit Public Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            <Card className="rounded-[32px] border-none shadow-xl p-8 bg-gradient-to-br from-white to-[#FDF8F0]">
              <h3 className="text-xl font-black text-[#3C2A1E] mb-6">Quick Actions</h3>
              <div className="grid gap-3">
                {[
                  { label: "My Listings", icon: Home, color: "bg-blue-50 text-blue-600", href: "/my-listings" },
                  { label: "Saved Rooms", icon: Sparkles, color: "bg-orange-50 text-orange-600", href: "/saved" },
                  { label: "Active Matches", icon: Zap, color: "bg-yellow-50 text-yellow-600", href: "/matches" },
                  { label: "Verification", icon: ShieldCheck, color: "bg-green-50 text-green-600", href: "/verify" },
                ].map((item) => (
                  <Link key={item.label} href={item.href}>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white hover:bg-white/50 border border-gray-100 hover:border-[#F6CB5A]/30 transition-all group">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${item.color}`}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-[#3C2A1E]/80 group-hover:text-[#3C2A1E] transition-colors">{item.label}</span>
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
                <div className="flex items-center space-x-6 p-6 bg-white rounded-[32px] shadow-lg shadow-black/5 hover:translate-y-[-4px] transition-transform duration-300 group border border-transparent hover:border-[#F6CB5A]/10">
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

                <div className="bg-white/50 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[32px] p-12 text-center">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-10 h-10 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-black text-[#3C2A1E]/80 dark:text-white/80">Nothing more here yet</h3>
                  <p className="text-[#3C2A1E]/50 dark:text-white/50 font-medium max-w-xs mx-auto mt-2">Start exploring rooms in your area to see matches and updates here!</p>
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
      </main>

      <footer className="mt-auto py-10 text-center text-gray-400 font-bold text-sm">
        <p>&copy; 2025 DebalE &bull; Made with ☕ in Ethiopia</p>
      </footer>
    </div>
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
