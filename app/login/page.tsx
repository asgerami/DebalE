"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Coffee, Eye, EyeOff, Mail, Lock, ArrowRight, Shield, CheckCircle, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      console.log("Login attempt:", formData)
      // Handle Supabase authentication here
    }, 2000)
  }

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
              <h1 className="text-4xl font-bold text-[#3C2A1E] leading-tight">Welcome back to your housing journey</h1>
              <p className="text-xl text-[#7F8C8D] leading-relaxed">
                Connect with trusted roommates and find your perfect living situation in Ethiopia
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
              <span className="text-[#3C2A1E]">Available in 15+ Ethiopian cities</span>
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
              <div className="text-sm font-semibold text-[#3C2A1E]">🇪🇹 Made for Ethiopia</div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="bg-[#FFFEF7]/95 backdrop-blur-sm border-2 border-[#ECF0F1] rounded-2xl shadow-2xl">
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="lg:hidden">
                  <Link href="/" className="flex items-center justify-center space-x-2 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#F6CB5A] to-[#E6B84A] rounded-lg flex items-center justify-center">
                      <Coffee className="w-6 h-6 text-[#3C2A1E]" />
                    </div>
                    <span className="text-2xl font-bold text-[#3C2A1E]">DebalE</span>
                  </Link>
                </div>
                <h2 className="text-2xl font-bold text-[#3C2A1E]">Sign in to your account</h2>
                <p className="text-[#7F8C8D]">Welcome back! Please enter your details.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="font-semibold text-[#7F8C8D] text-sm">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7F8C8D]" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-[#7F8C8D] text-sm">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7F8C8D]" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 pr-10 bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7F8C8D] hover:text-[#3C2A1E] transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                      className="rounded border-[#BDC3C7] text-[#F6CB5A] focus:ring-[#F6CB5A]"
                    />
                    <span className="text-sm text-[#3C2A1E]">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-[#F6CB5A] hover:text-[#E6B84A] font-medium">
                    Forgot password?
                  </Link>
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

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#ECF0F1]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#FFFEF7] text-[#7F8C8D]">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  className="border-2 border-[#ECF0F1] text-[#3C2A1E] hover:bg-[#FDF8F0] hover:border-[#F6CB5A] py-3 px-4 rounded-xl transition-all duration-200"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=327&q=80"
                    alt="Google"
                    width={20}
                    height={20}
                    className="mr-2 rounded"
                  />
                  Google
                </Button>
                <Button
                  type="button"
                  className="border-2 border-[#ECF0F1] text-[#3C2A1E] hover:bg-[#FDF8F0] hover:border-[#F6CB5A] py-3 px-4 rounded-xl transition-all duration-200"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Phone
                </Button>
              </div>

              <div className="text-center">
                <span className="text-[#7F8C8D]">Don't have an account? </span>
                <Link href="/register" className="text-[#F6CB5A] hover:text-[#E6B84A] font-semibold">
                  Sign up for free
                </Link>
              </div>

              <div className="bg-[#E3F2FD] border border-[#2196F3] rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Shield className="w-5 h-5 text-[#2196F3] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-[#1976D2]">
                    <strong>Your data is secure.</strong> We use industry-standard encryption to protect your
                    information.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
