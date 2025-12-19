"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  Coffee,
  LogOut,
  User,
  LayoutDashboard,
  MessageCircle,
  Home,
  Settings,
  ChevronDown,
  Plus,
  Search,
  Heart,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileNav from "@/components/mobile-nav";

export default function Header() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setUserMenuOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getUserInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const fullName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const userType = user?.user_metadata?.user_type || "seeker";

  // Simplified main navigation - only essential public links
  const mainNavLinks = [
    { href: "/search", label: "Find Rooms", icon: Search },
    { href: "/how-it-works", label: "How It Works" },
  ];

  // User dropdown menu items
  const userMenuItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/messages", label: "Messages", icon: MessageCircle },
    { href: "/profile", label: "My Profile", icon: User },
    { href: "/my-listings", label: "My Listings", icon: Home },
    { href: "/saved", label: "Saved Rooms", icon: Heart },
  ];

  return (
    <header className="bg-[#FFFEF7] border-b border-[#ECF0F1] shadow-sm px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-[#F6CB5A] to-[#E6B84A] rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <Coffee className="w-6 h-6 text-[#3C2A1E]" />
          </div>
          <span className="text-2xl font-bold text-[#3C2A1E]">DebalE</span>
        </Link>

        {/* Main Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          {mainNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  isActive
                    ? "text-[#3C2A1E] font-bold border-b-2 border-[#F6CB5A] pb-0.5"
                    : "text-[#7F8C8D] hover:text-[#3C2A1E] font-medium"
                } transition-colors`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              {/* List Room CTA - Always visible for logged in users */}
              <Link href="/list-room">
                <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  List Room
                </Button>
              </Link>

              {/* User Menu Dropdown */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-[#FDF8F0] transition-colors"
                >
                  <Avatar className="h-9 w-9 border-2 border-[#F6CB5A]">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-[#F6CB5A] text-[#3C2A1E] font-bold text-sm">
                      {getUserInitials(fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:flex flex-col items-start">
                    <span className="text-sm font-semibold text-[#3C2A1E] line-clamp-1">
                      {fullName.split(" ")[0]}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#7F8C8D] transition-transform ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#FFFEF7] rounded-xl shadow-lg border border-[#ECF0F1] py-2 z-50">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-[#ECF0F1]">
                      <p className="font-semibold text-[#3C2A1E]">{fullName}</p>
                      <p className="text-sm text-[#7F8C8D] truncate">
                        {user?.email}
                      </p>
                      <Badge className="mt-2 bg-[#FDF8F0] text-[#F6CB5A] border-[#F6CB5A]/30 text-[10px] uppercase tracking-wider font-bold">
                        {userType}
                      </Badge>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setUserMenuOpen(false)}
                          className={`flex items-center space-x-3 px-4 py-2.5 hover:bg-[#FDF8F0] transition-colors ${
                            pathname === item.href
                              ? "bg-[#FDF8F0] text-[#3C2A1E]"
                              : "text-[#7F8C8D]"
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Sign Out */}
                    <div className="border-t border-[#ECF0F1] pt-2">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-3 px-4 py-2.5 w-full hover:bg-red-50 text-[#E74C3C] transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[#7F8C8D] hover:text-[#3C2A1E] font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link href="/register">
                <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-bold rounded-xl shadow-md transition-all">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileNav isAuthenticated={!!user} />
        </div>
      </div>
    </header>
  );
}
