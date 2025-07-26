"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Coffee,
  Plus,
  MessageCircle,
  Heart,
  Eye,
  MapPin,
  Users,
  Settings,
  Bell,
  Search,
  TrendingUp,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const mockUserData = {
  name: "Sara Mengistu",
  profileComplete: 85,
  memberSince: "March 2024",
  verified: true,
  savedRooms: 12,
  messages: 5,
  viewsThisWeek: 23,
}

const mockSavedRooms = [
  {
    id: 1,
    title: "Modern Room in Bole",
    location: "Bole, Addis Ababa",
    price: 2200,
    image: "/placeholder.svg?height=150&width=200",
    status: "Available",
  },
  {
    id: 2,
    title: "Student Housing Near AAU",
    location: "Sidist Kilo, Addis Ababa",
    price: 1500,
    image: "/placeholder.svg?height=150&width=200",
    status: "Available",
  },
  {
    id: 3,
    title: "Shared Apartment",
    location: "Piazza, Addis Ababa",
    price: 1800,
    image: "/placeholder.svg?height=150&width=200",
    status: "Contacted",
  },
]

const mockRecentActivity = [
  { type: "message", text: "New message from Meron about the room in Bole", time: "2 hours ago" },
  { type: "view", text: "Your profile was viewed by 3 people", time: "5 hours ago" },
  { type: "match", text: "New room match found in your preferred area", time: "1 day ago" },
  { type: "save", text: "Room saved: Modern Studio in Kazanchis", time: "2 days ago" },
]

const mockRecommendations = [
  {
    id: 4,
    title: "Perfect Match for You",
    location: "CMC, Addis Ababa",
    price: 1600,
    image: "/placeholder.svg?height=150&width=200",
    matchScore: 95,
  },
  {
    id: 5,
    title: "Great Value Option",
    location: "Merkato, Addis Ababa",
    price: 1200,
    image: "/placeholder.svg?height=150&width=200",
    matchScore: 88,
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-[#FFFEF7]">
      {/* Header */}
      <header className="bg-[#FFFEF7] shadow-sm border-b border-[#ECF0F1] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#F6CB5A] to-[#E6B84A] rounded-lg flex items-center justify-center">
              <Coffee className="w-5 h-5 text-[#3C2A1E]" />
            </div>
            <span className="text-xl font-bold text-[#3C2A1E]">DebalE</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/search" className="text-[#7F8C8D] hover:text-[#3C2A1E] font-medium transition-colors">
              Find Rooms
            </Link>
            <Link
              href="/messages"
              className="text-[#7F8C8D] hover:text-[#3C2A1E] font-medium transition-colors relative"
            >
              Messages
              {mockUserData.messages > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-[#E74C3C] text-white text-xs px-1 min-w-[20px] h-5 flex items-center justify-center rounded-full">
                  {mockUserData.messages}
                </Badge>
              )}
            </Link>
            <Button variant="ghost" className="text-[#7F8C8D] hover:bg-[#FDF8F0] p-2 rounded-md">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="w-8 h-8 bg-[#F6CB5A] rounded-full flex items-center justify-center">
              <span className="text-[#3C2A1E] font-bold text-sm">{mockUserData.name[0]}</span>
            </div>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-[#3C2A1E]">Welcome back, {mockUserData.name.split(" ")[0]}! 👋</h1>
              <p className="text-[#7F8C8D]">Here's what's happening with your room search</p>
            </div>
            <Link href="/list-room">
              <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                <Plus className="w-5 h-5 mr-2" />
                List a Room
              </Button>
            </Link>
          </div>

          {/* Profile Completion */}
          <Card className="bg-gradient-to-r from-[#F6CB5A] to-[#E6B84A] border-0 rounded-xl p-6 text-[#3C2A1E]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1">Complete Your Profile</h3>
                <p className="opacity-90">Get better matches by completing your profile</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{mockUserData.profileComplete}%</div>
                <Link href="/profile" className="text-sm underline hover:no-underline">
                  Complete now
                </Link>
              </div>
            </div>
            <div className="mt-4 bg-[#3C2A1E]/20 rounded-full h-2">
              <div
                className="bg-[#3C2A1E] h-2 rounded-full transition-all duration-300"
                style={{ width: `${mockUserData.profileComplete}%` }}
              ></div>
            </div>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-0 flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#F6CB5A] rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#3C2A1E]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#3C2A1E]">{mockUserData.savedRooms}</div>
                <div className="text-sm text-[#7F8C8D]">Saved Rooms</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-0 flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#2ECC71] rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#3C2A1E]">{mockUserData.messages}</div>
                <div className="text-sm text-[#7F8C8D]">New Messages</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-0 flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#3498DB] rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#3C2A1E]">{mockUserData.viewsThisWeek}</div>
                <div className="text-sm text-[#7F8C8D]">Profile Views</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-0 flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#E67E22] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#3C2A1E]">12</div>
                <div className="text-sm text-[#7F8C8D]">Matches Found</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Saved Rooms */}
            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-[#3C2A1E]">Saved Rooms</CardTitle>
                  <Link href="/saved" className="text-[#F6CB5A] hover:text-[#E6B84A] text-sm font-medium">
                    View all →
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockSavedRooms.map((room) => (
                  <div key={room.id} className="flex items-center space-x-4 p-4 bg-[#FDF8F0] rounded-lg">
                    <Image
                      src={room.image || "/placeholder.svg"}
                      alt={room.title}
                      width={80}
                      height={60}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#3C2A1E]">{room.title}</h3>
                      <div className="flex items-center text-sm text-[#7F8C8D]">
                        <MapPin className="w-4 h-4 mr-1" />
                        {room.location}
                      </div>
                      <div className="text-[#F6CB5A] font-bold">{room.price} Birr/month</div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`${
                          room.status === "Available" ? "bg-[#2ECC71] text-white" : "bg-[#F6CB5A] text-[#3C2A1E]"
                        } px-2 py-1 text-xs`}
                      >
                        {room.status}
                      </Badge>
                      <div className="mt-2">
                        <Link href={`/listing/${room.id}`}>
                          <Button
                            size="sm"
                            className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] text-xs py-1 px-3 rounded"
                          >
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-[#3C2A1E]">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockRecentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 hover:bg-[#FDF8F0] rounded-lg transition-colors"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === "message"
                          ? "bg-[#2ECC71]"
                          : activity.type === "view"
                            ? "bg-[#3498DB]"
                            : activity.type === "match"
                              ? "bg-[#F6CB5A]"
                              : "bg-[#E67E22]"
                      }`}
                    >
                      {activity.type === "message" && <MessageCircle className="w-4 h-4 text-white" />}
                      {activity.type === "view" && <Eye className="w-4 h-4 text-white" />}
                      {activity.type === "match" && <Users className="w-4 h-4 text-[#3C2A1E]" />}
                      {activity.type === "save" && <Heart className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-[#3C2A1E] text-sm">{activity.text}</p>
                      <p className="text-[#7F8C8D] text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-[#3C2A1E]">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/search">
                  <Button className="w-full bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-3 rounded-lg transition-all duration-200">
                    <Search className="w-4 h-4 mr-2" />
                    Search Rooms
                  </Button>
                </Link>
                <Link href="/messages">
                  <Button className="w-full border-2 border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E] py-3 rounded-lg transition-all duration-200">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    View Messages
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button className="w-full text-[#7F8C8D] hover:bg-[#FDF8F0] py-3 rounded-lg transition-colors duration-200">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-gradient-to-br from-[#FDF8F0] to-[#FFFEF7] border-2 border-[#F6CB5A] rounded-xl shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-[#3C2A1E]">Recommended for You</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockRecommendations.map((room) => (
                  <div key={room.id} className="space-y-3">
                    <Image
                      src={room.image || "/placeholder.svg"}
                      alt={room.title}
                      width={200}
                      height={120}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-[#3C2A1E] text-sm">{room.title}</h3>
                        <Badge className="bg-[#2ECC71] text-white text-xs px-2 py-1">{room.matchScore}% match</Badge>
                      </div>
                      <div className="flex items-center text-xs text-[#7F8C8D] mb-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        {room.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#F6CB5A] font-bold text-sm">{room.price} Birr</span>
                        <Link href={`/listing/${room.id}`}>
                          <Button
                            size="sm"
                            className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] text-xs py-1 px-3 rounded"
                          >
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Profile Status */}
            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-[#3C2A1E]">Profile Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#3C2A1E]">Profile Complete</span>
                  <span className="text-sm font-bold text-[#F6CB5A]">{mockUserData.profileComplete}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#3C2A1E]">Verification</span>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#2ECC71] mr-1" />
                    <span className="text-sm text-[#2ECC71]">Verified</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#3C2A1E]">Member Since</span>
                  <span className="text-sm text-[#7F8C8D]">{mockUserData.memberSince}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
