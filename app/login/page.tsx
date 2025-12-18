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
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<"signin" | "forgot">("signin");
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const { signIn, resetPassword } = useAuth();
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
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
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/auth-bg.png"
          alt="Ethiopian Modern Living"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-0 bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20">

        {/* Left Side - Hero Content */}
        <div className="hidden lg:flex flex-col justify-between p-12 text-white bg-gradient-to-br from-[#F6CB5A]/20 to-transparent border-r border-white/10">
          <div className="space-y-8">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-[#F6CB5A] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Coffee className="w-7 h-7 text-[#3C2A1E]" />
              </div>
              <span className="text-3xl font-bold tracking-tight">DebalE</span>
            </Link>

            <div className="space-y-6">
              <h1 className="text-5xl font-extrabold leading-tight">
                Your next home <br />
                <span className="text-[#F6CB5A]">starts here.</span>
              </h1>
              <p className="text-xl text-white/80 max-w-md leading-relaxed">
                Join the largest community of students and young professionals finding safe, affordable rooms in Ethiopia.
              </p>
            </div>

            <div className="space-y-4 pt-8">
              {[
                "100% Verified Profiles",
                "Direct Messaging with Providers",
                "Cultural-aware Matching",
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3 bg-white/5 p-3 rounded-2xl border border-white/5 backdrop-blur-sm">
                  <div className="w-6 h-6 bg-[#2ECC71]/20 rounded-full flex items-center justify-center border border-[#2ECC71]/30">
                    <CheckCircle className="w-4 h-4 text-[#2ECC71]" />
                  </div>
                  <span className="text-sm font-medium text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4 pt-12">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white/20 bg-gray-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                </div>
              ))}
            </div>
            <p className="text-sm text-white/60">
              <span className="text-white font-bold">500+</span> people joined today
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-[#FFFEF7] p-8 lg:p-14 flex flex-col justify-center">
          <div className="lg:hidden mb-8 self-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#F6CB5A] to-[#E6B84A] rounded-lg flex items-center justify-center shadow-md">
                <Coffee className="w-6 h-6 text-[#3C2A1E]" />
              </div>
              <span className="text-2xl font-bold text-[#3C2A1E]">DebalE</span>
            </Link>
          </div>

          {view === "signin" ? (
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-[#3C2A1E]">Welcome back!</h2>
                <p className="text-[#7F8C8D]">Sign in to access your dashboard and messages.</p>
              </div>

              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800 rounded-2xl">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSignIn} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold text-[#3C2A1E] text-sm ml-1">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7F8C8D] group-focus-within:text-[#F6CB5A] transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="alex@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 bg-[#FDF8F0]/30 border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/10 rounded-2xl h-14 text-[#3C2A1E] font-medium transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <Label htmlFor="password" className="font-semibold text-[#3C2A1E] text-sm">
                      Password
                    </Label>
                    <button
                      type="button"
                      onClick={() => setView("forgot")}
                      className="text-sm font-semibold text-[#F6CB5A] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7F8C8D] group-focus-within:text-[#F6CB5A] transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 pr-12 bg-[#FDF8F0]/30 border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/10 rounded-2xl h-14 text-[#3C2A1E] font-medium transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7F8C8D] hover:text-[#3C2A1E] transition-colors p-1"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-bold text-lg h-14 rounded-2xl shadow-[0_8px_20px_rgba(246,203,90,0.3)] hover:shadow-[0_12px_24px_rgba(246,203,90,0.4)] transition-all duration-300 group"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Sign in</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="pt-4 text-center">
                <span className="text-[#7F8C8D]">New to DebalE? </span>
                <Link href="/register" className="text-[#3C2A1E] hover:text-[#F6CB5A] font-bold underline underline-offset-4 decoration-[#F6CB5A] decoration-2">
                  Create an account
                </Link>
              </div>

              <div className="mt-8 flex items-center space-x-2 bg-[#FDF8F0] p-4 rounded-2xl border border-[#F6CB5A]/10">
                <Shield className="w-5 h-5 text-[#F6CB5A]" />
                <p className="text-xs text-[#3C2A1E]/70 font-medium">
                  Secure login with end-to-end encryption. Your privacy is our priority.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <button
                onClick={() => setView("signin")}
                className="flex items-center text-sm font-semibold text-[#7F8C8D] hover:text-[#3C2A1E] transition-colors group"
              >
                <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                Back to Sign in
              </button>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-[#3C2A1E] leading-tight">Reset your password</h2>
                <p className="text-[#7F8C8D]">We&apos;ll send a recovery link to your inbox.</p>
              </div>

              {resetEmailSent && (
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-2xl space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="font-bold">Email Sent!</p>
                  </div>
                  <p className="text-sm">Check your inbox for instructions to reset your password.</p>
                </div>
              )}

              {!resetEmailSent && (
                <form onSubmit={handleResetPassword} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email" className="font-semibold text-[#3C2A1E] text-sm ml-1">
                      Email Address
                    </Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7F8C8D] group-focus-within:text-[#F6CB5A] transition-colors" />
                      <Input
                        id="reset-email"
                        type="email"
                        placeholder="alex@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-12 bg-[#FDF8F0]/30 border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/10 rounded-2xl h-14 text-[#3C2A1E] font-medium"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#3C2A1E] hover:bg-[#2A1E14] text-white font-bold text-lg h-14 rounded-2xl shadow-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      "Send Recovery Link"
                    )}
                  </Button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
