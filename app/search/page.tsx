"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Coffee, 
  Search, 
  MapPin, 
  DollarSign, 
  Users, 
  Filter, 
  Heart, 
  Eye,
  SlidersHorizontal,
  X,
  Star
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { AuthGuard } from "@/components/auth-guard"
import { roomListingService, savedRoomsService } from "@/lib/database"

interface FilterState {
  priceMin: string
  priceMax: string
  roomType: string
  location: string
  amenities: string[]
  petFriendly: boolean
  smokingAllowed: boolean
  utilitiesIncluded: boolean
  internetIncluded: boolean
  parkingAvailable: boolean
}

export default function SearchPage() {
  const [listings, setListings] = useState<any[]>([])
  const [filteredListings, setFilteredListings] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [savedRooms, setSavedRooms] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    priceMin: "",
    priceMax: "",
    roomType: "",
    location: "",
    amenities: [],
    petFriendly: false,
    smokingAllowed: false,
    utilitiesIncluded: false,
    internetIncluded: false,
    parkingAvailable: false,
  })

  const { user } = useAuth()

  const amenityOptions = [
    { id: "wifi", label: "WiFi" },
    { id: "kitchen", label: "Kitchen" },
    { id: "laundry", label: "Laundry" },
    { id: "security", label: "Security" },
    { id: "study", label: "Study Area" },
    { id: "gym", label: "Gym" },
    { id: "balcony", label: "Balcony" },
    { id: "ac", label: "AC" },
    { id: "heating", label: "Heating" },
    { id: "elevator", label: "Elevator" },
  ]

  const roomTypeOptions = [
    { value: "single", label: "Single Room" },
    { value: "shared", label: "Shared Room" },
    { value: "studio", label: "Studio" },
    { value: "apartment", label: "Apartment" },
  ]

  const locationOptions = [
    "Bole", "CMC", "Sidist Kilo", "Piazza", "Merkato", 
    "Kazanchis", "Meskel Square", "Addisu Gebeya", "Other"
  ]

  // Load listings and saved rooms
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const [listingsData, savedRoomsData] = await Promise.all([
          roomListingService.getAvailableListings(),
          user ? savedRoomsService.getSavedRooms() : []
        ])

        setListings(listingsData)
        setFilteredListings(listingsData)
        
        if (user && savedRoomsData) {
          const savedRoomIds = savedRoomsData.map((saved: any) => saved.room_id)
          setSavedRooms(savedRoomIds)
        }
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [user])

  // Apply filters
  useEffect(() => {
    let filtered = listings

    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(listing =>
        listing.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.location?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Price filter
    if (filters.priceMin) {
      filtered = filtered.filter(listing => listing.price >= parseInt(filters.priceMin))
    }
    if (filters.priceMax) {
      filtered = filtered.filter(listing => listing.price <= parseInt(filters.priceMax))
    }

    // Room type filter
    if (filters.roomType) {
      filtered = filtered.filter(listing => listing.room_type === filters.roomType)
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(listing => 
        listing.location?.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(listing =>
        filters.amenities.every(amenity => 
          listing.amenities?.includes(amenity)
        )
      )
    }

    // Boolean filters
    if (filters.petFriendly) {
      filtered = filtered.filter(listing => listing.pet_friendly)
    }
    if (filters.smokingAllowed) {
      filtered = filtered.filter(listing => listing.smoking_allowed)
    }
    if (filters.utilitiesIncluded) {
      filtered = filtered.filter(listing => listing.utilities_included)
    }
    if (filters.internetIncluded) {
      filtered = filtered.filter(listing => listing.internet_included)
    }
    if (filters.parkingAvailable) {
      filtered = filtered.filter(listing => listing.parking_available)
    }

    setFilteredListings(filtered)
  }, [listings, searchQuery, filters])

  const handleSaveRoom = async (roomId: string) => {
    if (!user) return

    try {
      if (savedRooms.includes(roomId)) {
        await savedRoomsService.removeSavedRoom(roomId)
        setSavedRooms(prev => prev.filter(id => id !== roomId))
      } else {
        await savedRoomsService.saveRoom(roomId)
        setSavedRooms(prev => [...prev, roomId])
      }
    } catch (error) {
      console.error('Error saving/removing room:', error)
    }
  }

  const handleAmenityFilter = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  const clearFilters = () => {
    setFilters({
      priceMin: "",
      priceMax: "",
      roomType: "",
      location: "",
      amenities: [],
      petFriendly: false,
      smokingAllowed: false,
      utilitiesIncluded: false,
      internetIncluded: false,
      parkingAvailable: false,
    })
    setSearchQuery("")
  }

  const hasActiveFilters = () => {
    return searchQuery || 
           filters.priceMin || 
           filters.priceMax || 
           filters.roomType || 
           filters.location || 
           filters.amenities.length > 0 ||
           filters.petFriendly ||
           filters.smokingAllowed ||
           filters.utilitiesIncluded ||
           filters.internetIncluded ||
           filters.parkingAvailable
  }

  return (
    <AuthGuard>
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

            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-[#7F8C8D] hover:text-[#3C2A1E]">
                  Dashboard
                </Button>
              </Link>
              <Link href="/list-room">
                <Button className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold">
                  List a Room
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#3C2A1E] mb-4">Find Your Perfect Room</h1>
            
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7F8C8D]" />
              <Input
                placeholder="Search by location, room type, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D]"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E]"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>

              {hasActiveFilters() && (
                <Button
                  onClick={clearFilters}
                  variant="ghost"
                  className="text-[#7F8C8D] hover:text-[#3C2A1E]"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              )}

              <div className="text-[#7F8C8D]">
                {filteredListings.length} room{filteredListings.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            {showFilters && (
              <div className="lg:col-span-1">
                <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-[#3C2A1E] flex items-center">
                      <Filter className="w-5 h-5 mr-2" />
                      Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Price Range */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-[#3C2A1E] text-sm">Price Range (Birr)</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Min"
                          type="number"
                          value={filters.priceMin}
                          onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                          className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-3 py-2 text-sm"
                        />
                        <Input
                          placeholder="Max"
                          type="number"
                          value={filters.priceMax}
                          onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                          className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-3 py-2 text-sm"
                        />
                      </div>
                    </div>

                    {/* Room Type */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-[#3C2A1E] text-sm">Room Type</h4>
                      <select
                        value={filters.roomType}
                        onChange={(e) => setFilters({ ...filters, roomType: e.target.value })}
                        className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-3 py-2 text-sm"
                      >
                        <option value="">All Types</option>
                        {roomTypeOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Location */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-[#3C2A1E] text-sm">Location</h4>
                      <select
                        value={filters.location}
                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                        className="w-full bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-3 py-2 text-sm"
                      >
                        <option value="">All Locations</option>
                        {locationOptions.map(location => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Amenities */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-[#3C2A1E] text-sm">Amenities</h4>
                      <div className="space-y-2">
                        {amenityOptions.map(amenity => (
                          <label key={amenity.id} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={filters.amenities.includes(amenity.id)}
                              onChange={() => handleAmenityFilter(amenity.id)}
                              className="rounded border-[#BDC3C7] text-[#F6CB5A] focus:ring-[#F6CB5A]"
                            />
                            <span className="text-[#3C2A1E] text-sm">{amenity.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Other Filters */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-[#3C2A1E] text-sm">Other</h4>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.petFriendly}
                            onChange={(e) => setFilters({ ...filters, petFriendly: e.target.checked })}
                            className="rounded border-[#BDC3C7] text-[#F6CB5A] focus:ring-[#F6CB5A]"
                          />
                          <span className="text-[#3C2A1E] text-sm">Pet Friendly</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.smokingAllowed}
                            onChange={(e) => setFilters({ ...filters, smokingAllowed: e.target.checked })}
                            className="rounded border-[#BDC3C7] text-[#F6CB5A] focus:ring-[#F6CB5A]"
                          />
                          <span className="text-[#3C2A1E] text-sm">Smoking Allowed</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.utilitiesIncluded}
                            onChange={(e) => setFilters({ ...filters, utilitiesIncluded: e.target.checked })}
                            className="rounded border-[#BDC3C7] text-[#F6CB5A] focus:ring-[#F6CB5A]"
                          />
                          <span className="text-[#3C2A1E] text-sm">Utilities Included</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.internetIncluded}
                            onChange={(e) => setFilters({ ...filters, internetIncluded: e.target.checked })}
                            className="rounded border-[#BDC3C7] text-[#F6CB5A] focus:ring-[#F6CB5A]"
                          />
                          <span className="text-[#3C2A1E] text-sm">Internet Included</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.parkingAvailable}
                            onChange={(e) => setFilters({ ...filters, parkingAvailable: e.target.checked })}
                            className="rounded border-[#BDC3C7] text-[#F6CB5A] focus:ring-[#F6CB5A]"
                          />
                          <span className="text-[#3C2A1E] text-sm">Parking Available</span>
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Results */}
            <div className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="w-8 h-8 border-2 border-[#F6CB5A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-[#7F8C8D]">Loading rooms...</p>
                </div>
              ) : filteredListings.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-[#7F8C8D] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#3C2A1E] mb-2">No rooms found</h3>
                  <p className="text-[#7F8C8D] mb-4">Try adjusting your search criteria or filters</p>
                  <Button onClick={clearFilters} className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E]">
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredListings.map((listing) => (
                    <Card key={listing.id} className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                      <CardContent className="p-0">
                        {/* Image */}
                        <div className="relative">
                          <Image
                            src={listing.images?.[0] || "/placeholder.svg"}
                            alt={listing.title}
                            width={400}
                            height={250}
                            className="w-full h-48 object-cover rounded-t-xl"
                          />
                          <div className="absolute top-3 right-3 flex space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleSaveRoom(listing.id)}
                              className={`w-8 h-8 p-0 rounded-full ${
                                savedRooms.includes(listing.id)
                                  ? 'bg-red-500 text-white hover:bg-red-600'
                                  : 'bg-white/80 text-[#3C2A1E] hover:bg-white'
                              }`}
                            >
                              <Heart className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="absolute bottom-3 left-3">
                            <Badge className="bg-[#F6CB5A] text-[#3C2A1E] font-semibold">
                              {listing.room_type}
                            </Badge>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-[#3C2A1E] line-clamp-1">
                              {listing.title}
                            </h3>
                          </div>

                          <div className="flex items-center text-[#7F8C8D] text-sm mb-3">
                            <MapPin className="w-4 h-4 mr-1" />
                            {listing.location}
                          </div>

                          <div className="flex items-center justify-between mb-3">
                            <div className="text-2xl font-bold text-[#F6CB5A]">
                              {listing.price} Birr
                            </div>
                            <div className="text-sm text-[#7F8C8D]">per month</div>
                          </div>

                          <p className="text-[#7F8C8D] text-sm mb-4 line-clamp-2">
                            {listing.description}
                          </p>

                          {/* Amenities */}
                          {listing.amenities && listing.amenities.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {listing.amenities.slice(0, 3).map((amenity: string) => (
                                <Badge key={amenity} variant="outline" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                              {listing.amenities.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{listing.amenities.length - 3} more
                                </Badge>
                              )}
                            </div>
                          )}

                          {/* Owner Info */}
                          {listing.user_profiles && (
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-[#F6CB5A] rounded-full flex items-center justify-center">
                                  <span className="text-[#3C2A1E] font-bold text-xs">
                                    {listing.user_profiles.full_name?.[0]?.toUpperCase() || 'U'}
                                  </span>
                                </div>
                                <span className="text-sm text-[#3C2A1E]">
                                  {listing.user_profiles.full_name || 'Anonymous'}
                                </span>
                                {listing.user_profiles.is_verified && (
                                  <Star className="w-4 h-4 text-[#F6CB5A]" />
                                )}
                              </div>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex space-x-2">
                            <Link href={`/listing/${listing.id}`} className="flex-1">
                              <Button className="w-full bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
