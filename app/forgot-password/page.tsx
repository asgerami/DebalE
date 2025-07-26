"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Coffee, Mail, ArrowLeft, CheckCircle, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate email sending
    setTimeout(() => {
      setIsLoading(false)
      setIsEmailSent(true)
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
              <h1 className="text-4xl font-bold text-[#3C2A1E] leading-tight">Reset your password securely</h1>
              <p className="text-xl text-[#7F8C8D] leading-relaxed">
                We'll help you get back to finding your perfect roommate in Ethiopia
              </p>
            </div>
          </div>

          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Secure password reset"
              width={400}
              height={300}
              className="rounded-2xl shadow-xl object-cover"
            />
            <div className="absolute -bottom-4 -right-4 bg-[#2ECC71] rounded-lg p-3 shadow-lg">
              <div className="text-sm font-semibold text-white flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                Secure Reset
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Reset Form */}
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

                {!isEmailSent ? (
                  <>
                    <h2 className="text-2xl font-bold text-[#3C2A1E]">Forgot your password?</h2>
                    <p className="text-[#7F8C8D]">
                      No worries! Enter your email and we'll send you reset instructions.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-[#2ECC71] rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#3C2A1E]">Check your email</h2>
                    <p className="text-[#7F8C8D]">We've sent password reset instructions to {email}</p>
                  </>
                )}
              </div>

              {!isEmailSent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="font-semibold text-[#7F8C8D] text-sm">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7F8C8D]" />
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-[#FFFEF7] border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
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
                      "Send Reset Instructions"
                    )}
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="bg-[#E8F5E8] border border-[#2ECC71] rounded-lg p-4">
                    <p className="text-sm text-[#2ECC71]">
                      <strong>Email sent successfully!</strong> Check your inbox and spam folder for the reset link.
                    </p>
                  </div>

                  <Button
                    onClick={() => {
                      setIsEmailSent(false)
                      setEmail("")
                    }}
                    className="w-full border-2 border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E] py-3 px-6 rounded-xl transition-all duration-200"
                  >
                    Try Different Email
                  </Button>
                </div>
              )}

              <div className="text-center">
                <Link
                  href="/login"
                  className="flex items-center justify-center space-x-2 text-[#7F8C8D] hover:text-[#3C2A1E] font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Sign In</span>
                </Link>
              </div>

              <div className="bg-[#E3F2FD] border border-[#2196F3] rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Shield className="w-5 h-5 text-[#2196F3] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-[#1976D2]">
                    <strong>Security Notice:</strong> Reset links expire in 1 hour for your protection.
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
