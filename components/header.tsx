"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coffee, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileNav from "@/components/mobile-nav";

export default function Header() {
    const { user, signOut } = useAuth();
    const pathname = usePathname();

    const handleSignOut = async () => {
        try {
            await signOut();
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

    const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";
    const userType = user?.user_metadata?.user_type || "seeker";

    const navLinks = [
        { href: "/dashboard", label: "Dashboard", private: true },
        { href: "/search", label: "Find Rooms" },
        { href: "/messages", label: "Messages", private: true },
        { href: "/list-room", label: "List Room" },
        { href: "/how-it-works", label: "How It Works" },
    ];

    // Logic to determine which links to show
    const filteredLinks = navLinks.filter(link => {
        if (link.private && !user) return false;
        return true;
    });

    return (
        <header className="bg-[#FFFEF7] border-b border-[#ECF0F1] shadow-sm px-6 py-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-12">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#F6CB5A] to-[#E6B84A] rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                            <Coffee className="w-6 h-6 text-[#3C2A1E]" />
                        </div>
                        <span className="text-2xl font-bold text-[#3C2A1E]">DebalE</span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8">
                        {filteredLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`${isActive
                                            ? "text-[#3C2A1E] font-bold transition-colors border-b-2 border-[#F6CB5A] pb-0.5"
                                            : "text-[#7F8C8D] hover:text-[#3C2A1E] font-medium transition-colors"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="hidden md:flex items-center space-x-5">
                    {user ? (
                        <>
                            <div className="flex flex-col items-end mr-1">
                                <span className="text-sm font-bold text-[#3C2A1E] line-clamp-1">{fullName}</span>
                                <Badge className="bg-[#FDF8F0] text-[#F6CB5A] border-[#F6CB5A]/30 text-[10px] py-0 px-2 h-4 uppercase tracking-wider font-bold">
                                    {userType}
                                </Badge>
                            </div>
                            <Link href="/profile">
                                <Avatar className={`h-10 w-10 border-2 border-[#F6CB5A] cursor-pointer hover:opacity-80 transition-opacity ${pathname === '/profile' ? 'ring-2 ring-[#F6CB5A]' : ''}`}>
                                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                                    <AvatarFallback className="bg-[#F6CB5A] text-[#3C2A1E] font-bold">
                                        {getUserInitials(fullName)}
                                    </AvatarFallback>
                                </Avatar>
                            </Link>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleSignOut}
                                className="rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors"
                            >
                                <LogOut className="h-5 w-5" />
                            </Button>
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

                <div className="md:hidden">
                    <MobileNav isAuthenticated={!!user} />
                </div>
            </div>
        </header>
    );
}
