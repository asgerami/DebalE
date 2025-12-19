"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Users,
  Home,
  Shield,
  AlertTriangle,
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Ban,
  UserCheck,
  BarChart3,
  Settings,
  FileText,
  Loader2,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type AdminTab = "overview" | "verifications" | "users" | "listings" | "reports";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAdminStatus() {
      if (loading) return;
      
      if (!user) {
        router.push("/login");
        setChecking(false);
        return;
      }

      try {
        // Check if user is admin from profiles table
        const { data, error } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        if (data?.is_admin) {
          setIsAdmin(true);
        } else {
          router.push("/dashboard");
        }
      } catch (err) {
        console.error("Error checking admin status:", err);
        router.push("/dashboard");
      } finally {
        setChecking(false);
      }
    }

    checkAdminStatus();
  }, [user, loading, router]);

  if (loading || checking) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#F6CB5A]" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return <AdminDashboard />;
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalListings: 0,
    pendingVerifications: 0,
    activeListings: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      // Fetch user count
      const { count: userCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // Fetch listing counts
      const { count: listingCount } = await supabase
        .from("listings")
        .select("*", { count: "exact", head: true });

      const { count: activeCount } = await supabase
        .from("listings")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      setStats({
        totalUsers: userCount || 0,
        totalListings: listingCount || 0,
        pendingVerifications: 0, // Will be fetched from auth metadata
        activeListings: activeCount || 0,
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "verifications", label: "Verifications", icon: Shield },
    { id: "users", label: "Users", icon: Users },
    { id: "listings", label: "Listings", icon: Home },
    { id: "reports", label: "Reports", icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-[#3C2A1E] text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-[#F6CB5A]" />
            <div>
              <h1 className="text-xl font-bold">DebalE Admin</h1>
              <p className="text-sm text-white/70">Management Dashboard</p>
            </div>
          </div>
          <Button
            onClick={() => window.location.href = "/dashboard"}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            Exit Admin
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#3C2A1E] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && <OverviewTab stats={stats} loading={loadingStats} />}
        {activeTab === "verifications" && <VerificationsTab />}
        {activeTab === "users" && <UsersTab />}
        {activeTab === "listings" && <ListingsTab />}
        {activeTab === "reports" && <ReportsTab />}
      </div>
    </div>
  );
}

// Overview Tab
function OverviewTab({ stats, loading }: { stats: any; loading: boolean }) {
  const statCards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "bg-blue-500" },
    { label: "Total Listings", value: stats.totalListings, icon: Home, color: "bg-green-500" },
    { label: "Active Listings", value: stats.activeListings, icon: CheckCircle, color: "bg-emerald-500" },
    { label: "Pending Verifications", value: stats.pendingVerifications, icon: Shield, color: "bg-yellow-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.label} className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-white">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-auto py-4 flex-col bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E]">
              <UserCheck className="w-6 h-6 mb-2" />
              <span>Review Verifications</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col">
              <FileText className="w-6 h-6 mb-2" />
              <span>View Reports</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col">
              <Users className="w-6 h-6 mb-2" />
              <span>Manage Users</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col">
              <Settings className="w-6 h-6 mb-2" />
              <span>Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Verifications Tab
function VerificationsTab() {
  const [verifications, setVerifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingVerifications();
  }, []);

  const fetchPendingVerifications = async () => {
    setLoading(true);
    try {
      // Fetch profiles with pending verification
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setVerifications(data || []);
    } catch (err) {
      console.error("Error fetching verifications:", err);
      toast.error("Failed to load verifications");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId: string) => {
    setProcessing(userId);
    try {
      // Update user metadata via admin API (requires service role key)
      // For now, we'll update the profiles table
      const { error } = await supabase
        .from("profiles")
        .update({ phone_verified: true })
        .eq("id", userId);

      if (error) throw error;
      
      toast.success("User verified successfully!");
      fetchPendingVerifications();
    } catch (err: any) {
      console.error("Error approving:", err);
      toast.error(err.message || "Failed to approve");
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (userId: string) => {
    setProcessing(userId);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ phone_verified: false })
        .eq("id", userId);

      if (error) throw error;
      
      toast.success("Verification rejected");
      fetchPendingVerifications();
    } catch (err: any) {
      console.error("Error rejecting:", err);
      toast.error(err.message || "Failed to reject");
    } finally {
      setProcessing(null);
    }
  };

  const getVerificationDocs = async (userId: string) => {
    try {
      const { data } = await supabase.storage
        .from("verification-docs")
        .list(userId);
      return data || [];
    } catch {
      return [];
    }
  };

  const getDocUrl = (userId: string, fileName: string) => {
    const { data } = supabase.storage
      .from("verification-docs")
      .getPublicUrl(`${userId}/${fileName}`);
    return data.publicUrl;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Verification Requests</h2>
        <Button onClick={fetchPendingVerifications} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : verifications.length === 0 ? (
        <Card className="bg-white">
          <CardContent className="p-12 text-center">
            <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No pending verifications</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {verifications.map((user) => (
            <Card key={user.id} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#F6CB5A] rounded-full flex items-center justify-center">
                      <span className="text-[#3C2A1E] font-bold">
                        {user.full_name?.[0] || "?"}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{user.full_name || "Unknown"}</h3>
                      <p className="text-sm text-gray-500">{user.id}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={user.phone_verified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                          {user.phone_verified ? "Verified" : "Pending"}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          Joined {new Date(user.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleApprove(user.id)}
                      disabled={processing === user.id || user.phone_verified}
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      {processing === user.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-1" />}
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(user.id)}
                      disabled={processing === user.id}
                      size="sm"
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// Users Tab
function UsersTab() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleBanUser = async (userId: string) => {
    if (!confirm("Are you sure you want to ban this user?")) return;
    
    setProcessing(userId);
    try {
      // In production, you'd use Supabase Admin API to ban the user
      // For now, we'll just mark them in the profiles table
      const { error } = await supabase
        .from("profiles")
        .update({ user_type: "banned" as any })
        .eq("id", userId);

      if (error) throw error;
      toast.success("User banned successfully");
      fetchUsers();
    } catch (err: any) {
      toast.error(err.message || "Failed to ban user");
    } finally {
      setProcessing(null);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button onClick={fetchUsers} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <Card className="bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#F6CB5A] rounded-full flex items-center justify-center">
                          <span className="text-[#3C2A1E] font-bold text-sm">
                            {user.full_name?.[0] || "?"}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.full_name || "Unknown"}</p>
                          <p className="text-sm text-gray-500">{user.phone || "No phone"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={user.user_type === "provider" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}>
                        {user.user_type || "seeker"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={user.phone_verified ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                        {user.phone_verified ? "Verified" : "Unverified"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="text-gray-600">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600"
                          onClick={() => handleBanUser(user.id)}
                          disabled={processing === user.id}
                        >
                          {processing === user.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Ban className="w-4 h-4" />}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

// Listings Tab
function ListingsTab() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (err) {
      console.error("Error fetching listings:", err);
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeatured = async (listingId: string, currentStatus: boolean) => {
    setProcessing(listingId);
    try {
      const { error } = await supabase
        .from("listings")
        .update({ featured: !currentStatus })
        .eq("id", listingId);

      if (error) throw error;
      toast.success(currentStatus ? "Removed from featured" : "Added to featured");
      fetchListings();
    } catch (err: any) {
      toast.error(err.message || "Failed to update");
    } finally {
      setProcessing(null);
    }
  };

  const handleDeleteListing = async (listingId: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    
    setProcessing(listingId);
    try {
      const { error } = await supabase
        .from("listings")
        .delete()
        .eq("id", listingId);

      if (error) throw error;
      toast.success("Listing deleted");
      fetchListings();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    } finally {
      setProcessing(null);
    }
  };

  const handleToggleActive = async (listingId: string, currentStatus: boolean) => {
    setProcessing(listingId);
    try {
      const { error } = await supabase
        .from("listings")
        .update({ is_active: !currentStatus })
        .eq("id", listingId);

      if (error) throw error;
      toast.success(currentStatus ? "Listing deactivated" : "Listing activated");
      fetchListings();
    } catch (err: any) {
      toast.error(err.message || "Failed to update");
    } finally {
      setProcessing(null);
    }
  };

  const filteredListings = listings.filter(
    (listing) =>
      listing.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.area?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Listing Management</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button onClick={fetchListings} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <Card className="bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Listing</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredListings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-1">{listing.title}</p>
                        <p className="text-sm text-gray-500">{listing.area}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-[#F6CB5A]">{listing.monthly_rent} Birr</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={listing.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                        {listing.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={listing.featured ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"}>
                        {listing.featured ? "Featured" : "Normal"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(listing.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => window.open(`/listing/${listing.id}`, "_blank")}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className={listing.featured ? "text-yellow-600" : "text-gray-600"}
                          onClick={() => handleToggleFeatured(listing.id, listing.featured)}
                          disabled={processing === listing.id}
                        >
                          ⭐
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className={listing.is_active ? "text-green-600" : "text-gray-600"}
                          onClick={() => handleToggleActive(listing.id, listing.is_active)}
                          disabled={processing === listing.id}
                        >
                          {listing.is_active ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600"
                          onClick={() => handleDeleteListing(listing.id)}
                          disabled={processing === listing.id}
                        >
                          {processing === listing.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

// Reports Tab
function ReportsTab() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, you'd fetch from a reports table
    setLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Reports & Flags</h2>
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Card className="bg-white">
        <CardContent className="p-12 text-center">
          <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">No Reports Yet</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            When users report listings or other users, they will appear here for review.
          </p>
        </CardContent>
      </Card>

      {/* Report Types Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900">Scam Reports</h3>
            </div>
            <p className="text-sm text-gray-500">Reports of fraudulent listings or users attempting scams.</p>
            <p className="text-2xl font-bold text-gray-900 mt-4">0</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="font-bold text-gray-900">Fake Listings</h3>
            </div>
            <p className="text-sm text-gray-500">Reports of listings with false information or photos.</p>
            <p className="text-2xl font-bold text-gray-900 mt-4">0</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900">User Complaints</h3>
            </div>
            <p className="text-sm text-gray-500">Reports of inappropriate behavior or harassment.</p>
            <p className="text-2xl font-bold text-gray-900 mt-4">0</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
