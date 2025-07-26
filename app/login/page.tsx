"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Eye,
  EyeOff,
  Coffee,
  Mail,
  Lock,
  ArrowRight,
  Shield,
  CheckCircle,
  Phone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const { signIn, resetPassword } = useAuth();
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signIn(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await resetPassword(email);
      setResetEmailSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFEF7] to-[#FDF8F0] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F6CB5A] to-[#E6B84A] rounded-xl flex items-center justify-center">
                <Coffee className="w-7 h-7 text-[#3C2A1E]" />
              </div>
              <span className="text-3xl font-bold text-[#3C2A1E]">DebalE</span>
            </Link>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-[#3C2A1E] leading-tight">
                Welcome back to your housing journey
              </h1>
              <p className="text-xl text-[#7F8C8D] leading-relaxed">
                Connect with trusted roommates and find your perfect living
                situation in Ethiopia
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#2ECC71] rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-[#3C2A1E]">5,000+ verified users</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#2ECC71] rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-[#3C2A1E]">1,200+ successful matches</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#2ECC71] rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-[#3C2A1E]">
                Available in 15+ Ethiopian cities
              </span>
            </div>
          </div>

          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Ethiopian students using DebalE platform"
              width={400}
              height={300}
              className="rounded-2xl shadow-xl object-cover"
            />
            <div className="absolute -bottom-4 -right-4 bg-[#F6CB5A] rounded-lg p-3 shadow-lg">
              <div className="text-sm font-semibold text-[#3C2A1E]">
                🇪🇹 Made for Ethiopia
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="bg-[#FFFEF7]/95 backdrop-blur-sm border-2 border-[#ECF0F1] rounded-2xl shadow-2xl">
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="lg:hidden">
                  <Link
                    href="/"
                    className="flex items-center justify-center space-x-2 mb-6"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#F6CB5A] to-[#E6B84A] rounded-lg flex items-center justify-center">
                      <Coffee className="w-6 h-6 text-[#3C2A1E]" />
                    </div>
                    <span className="text-2xl font-bold text-[#3C2A1E]">
                      DebalE
                    </span>
                  </Link>
                </div>
                <h2 className="text-2xl font-bold text-[#3C2A1E]">
                  Sign in to your account
                </h2>
                <p className="text-[#7F8C8D]">
                  Welcome back! Please enter your details.
                </p>
              </div>

              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-[#FDF8F0] p-1 rounded-xl">
                  <TabsTrigger
                    value="signin"
                    className="data-[state=active]:bg-[#F6CB5A] data-[state=active]:text-[#3C2A1E] rounded-lg"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger
                    value="reset"
                    className="data-[state=active]:bg-[#F6CB5A] data-[state=active]:text-[#3C2A1E] rounded-lg"
                  >
                    Reset Password
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="space-y-4">
                  {error && (
                    <Alert
                      variant="destructive"
                      className="bg-red-50 border-red-200 text-red-800"
                    >
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="font-semibold text-[#7F8C8D] text-sm"
                      >
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7F8C8D]" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-white border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="password"
                        className="font-semibold text-[#7F8C8D] text-sm"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7F8C8D]" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10 bg-white border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7F8C8D] hover:text-[#3C2A1E] transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-[#3C2A1E] border-t-transparent rounded-full animate-spin"></div>
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <span>Sign in</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      )}
                    </Button>
                  </form>

                  <div className="text-center">
                    <span className="text-[#7F8C8D]">
                      Don't have an account?{" "}
                    </span>
                    <Link
                      href="/register"
                      className="text-[#F6CB5A] hover:text-[#E6B84A] font-semibold"
                    >
                      Sign up for free
                    </Link>
                  </div>
                </TabsContent>

                <TabsContent value="reset" className="space-y-4">
                  {error && (
                    <Alert
                      variant="destructive"
                      className="bg-red-50 border-red-200 text-red-800"
                    >
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {resetEmailSent && (
                    <Alert className="bg-green-50 border-green-200 text-green-800">
                      <AlertDescription>
                        Password reset email sent! Check your inbox.
                      </AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="reset-email"
                        className="font-semibold text-[#7F8C8D] text-sm"
                      >
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7F8C8D]" />
                        <Input
                          id="reset-email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-white border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-[#3C2A1E] border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        "Send Reset Email"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="bg-[#E3F2FD] border border-[#2196F3] rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Shield className="w-5 h-5 text-[#2196F3] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-[#1976D2]">
                    <strong>Your data is secure.</strong> We use
                    industry-standard encryption to protect your information.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
