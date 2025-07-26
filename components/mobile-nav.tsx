"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Coffee,
  Menu,
  X,
  Search,
  Home,
  User,
  MessageCircle,
  Settings,
  LogOut,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

interface MobileNavProps {
  isAuthenticated?: boolean;
}

export default function MobileNav({ isAuthenticated = false }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: "/search", label: "Find Rooms", icon: Search },
    { href: "/list-room", label: "List Room", icon: Home },
    { href: "/how-it-works", label: "How It Works", icon: HelpCircle },
  ];

  const authMenuItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/messages", label: "Messages", icon: MessageCircle },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/help", label: "Help", icon: HelpCircle },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden p-2">
          <Menu className="w-6 h-6 text-[#3C2A1E]" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] bg-[#FFFEF7] border-l border-[#ECF0F1]"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#ECF0F1]">
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#F6CB5A] to-[#E6B84A] rounded-lg flex items-center justify-center">
                <Coffee className="w-5 h-5 text-[#3C2A1E]" />
              </div>
              <span className="text-xl font-bold text-[#3C2A1E]">DebalE</span>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5 text-[#3C2A1E]" />
            </Button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2">
            {isAuthenticated ? (
              <>
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-[#7F8C8D] uppercase tracking-wide mb-3">
                    Account
                  </h3>
                  {authMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-3 p-3 rounded-lg text-[#3C2A1E] hover:bg-[#FDF8F0] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-5 h-5 text-[#F6CB5A]" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>

                <div className="border-t border-[#ECF0F1] pt-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-start p-3 text-[#E74C3C] hover:bg-[#E74C3C]/10"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-[#7F8C8D] uppercase tracking-wide mb-3">
                    Navigation
                  </h3>
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-3 p-3 rounded-lg text-[#3C2A1E] hover:bg-[#FDF8F0] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-5 h-5 text-[#F6CB5A]" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>

                <div className="border-t border-[#ECF0F1] pt-4 space-y-3">
                  <Link
                    href="/login"
                    className="block w-full p-3 text-center text-[#3C2A1E] font-medium hover:bg-[#FDF8F0] rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full p-3 text-center bg-[#F6CB5A] text-[#3C2A1E] font-semibold rounded-lg hover:bg-[#E6B84A] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </>
            )}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[#ECF0F1]">
            <div className="text-center text-sm text-[#7F8C8D]">
              <p>© 2024 DebalE</p>
              <p className="mt-1">Made with ❤️ for Ethiopia</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
