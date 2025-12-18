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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Eye,
  EyeOff,
  CheckCircle,
  Coffee,
  User,
  Home,
  ArrowRight,
  Shield,
  CheckCircle2,
  ChevronLeft,
  Briefcase,
  MapPin,
  Smartphone,
  Mail,
  Lock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    full_name: "",
    user_type: "" as "seeker" | "provider" | "",
    phone: "",
    age: "",
    gender: "" as "male" | "female" | "any" | "",
    occupation: "",
    current_location: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { signUp } = useAuth();
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (!formData.email || !formData.password || !formData.confirmPassword) {
          setError("All fields are required to proceed.");
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match.");
          return false;
        }
        if (formData.password.length < 8) {
          setError("Password must be at least 8 characters.");
          return false;
        }
        break;
      case 2:
        if (!formData.full_name || !formData.user_type) {
          setError("Full name and account type are required.");
          return false;
        }
        break;
      case 3:
        if (!formData.phone || !formData.current_location) {
          setError("Phone and location are required for verification.");
          return false;
        }
        break;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If not on the last step, just move to the next one
    if (currentStep < 3) {
      nextStep();
      return;
    }

    // On the last step, perform final validation and submit
    if (!validateStep(3)) return;

    setIsLoading(true);
    setError("");

    try {
      await signUp(
        formData.email,
        formData.password,
        formData.full_name,
        formData.user_type as "seeker" | "provider",
        formData.phone,
        formData.occupation,
        formData.current_location,
        formData.age,
        formData.gender
      );
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="absolute inset-0 z-0">
          <Image src="/auth-bg.png" alt="bg" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </div>
        <Card className="relative z-10 w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border-none">
          <CardHeader className="text-center pt-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 ring-8 ring-green-50">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-[#3C2A1E]">Welcome to the Community!</CardTitle>
            <CardDescription className="text-[#7F8C8D] text-lg px-6">
              We&apos;ve sent a verification email to <br /><span className="text-[#3C2A1E] font-bold">{formData.email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="bg-[#FDF8F0] border border-[#F6CB5A]/20 rounded-2xl p-5 flex items-start space-x-3">
              <Shield className="w-5 h-5 text-[#F6CB5A] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#3C2A1E]/80">
                Please verify your email within 24 hours to access all features.
              </p>
            </div>
            <div className="space-y-4 pt-4">
              <Link href="/login">
                <Button className="w-full bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-bold h-14 rounded-2xl shadow-lg">
                  Back to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 py-12 overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image src="/auth-bg.png" alt="bg" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 bg-white/10 backdrop-blur-xl rounded-[40px] overflow-hidden shadow-2xl border border-white/20">

        {/* Left Side Info */}
        <div className="hidden lg:flex flex-col justify-between p-16 text-white bg-gradient-to-br from-[#F6CB5A]/30 via-transparent to-transparent">
          <div className="space-y-12">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-[#F6CB5A] rounded-2xl flex items-center justify-center shadow-2xl">
                <Coffee className="w-8 h-8 text-[#3C2A1E]" />
              </div>
              <span className="text-3xl font-bold">DebalE</span>
            </Link>

            <div className="space-y-6">
              <h1 className="text-6xl font-black leading-[1.1]">
                Find your <br />
                <span className="text-[#F6CB5A]">perfect</span> <br />
                roommate.
              </h1>
              <p className="text-xl text-white/80 max-w-md font-medium">
                Ethopia&apos;s first trusted platform for shared living. Safe, verified, and community-driven.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                { icon: Shield, text: "Privacy-first approach" },
                { icon: CheckCircle2, text: "Background verified listings" },
                { icon: User, text: "Smart preference matching" },
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4 bg-white/5 p-4 rounded-3xl border border-white/10">
                  <item.icon className="w-6 h-6 text-[#F6CB5A]" />
                  <span className="font-semibold">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-12">
            <div className="bg-[#3C2A1E]/80 backdrop-blur-md p-6 rounded-[32px] border border-white/5">
              <p className="text-white/90 italic text-lg leading-relaxed">
                &quot;I found my best friend and a great room in Bole through DebalE. It completely changed my college life!&quot;
              </p>
              <div className="mt-4 flex items-center space-x-3">
                <img src="https://i.pravatar.cc/150?u=tsion" className="w-10 h-10 rounded-full border-2 border-[#F6CB5A]" alt="user" />
                <div>
                  <p className="font-bold text-sm">Tsion M.</p>
                  <p className="text-white/60 text-xs">Medical Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="bg-[#FFFEF7] p-8 lg:p-20 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="space-y-8 mb-12">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-4xl font-extrabold text-[#3C2A1E]">Create Account</h2>
                  <p className="text-[#7F8C8D] mt-2 font-medium">Join our growing community today.</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-[#F6CB5A]">{currentStep}/3</p>
                  <p className="text-[10px] font-bold text-[#7F8C8D] uppercase tracking-widest">Step</p>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="flex space-x-2">
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${s <= currentStep ? "bg-[#F6CB5A]" : "bg-[#ECF0F1]"}`} />
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800 rounded-2xl">
                  <AlertDescription className="font-medium">{error}</AlertDescription>
                </Alert>
              )}

              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-[#7F8C8D] ml-1">Email Address</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7F8C8D] group-focus-within:text-[#F6CB5A] transition-colors" />
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-12 h-14 rounded-2xl border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/10 text-[#3C2A1E] font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-[#7F8C8D] ml-1">Choose Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7F8C8D] group-focus-within:text-[#F6CB5A] transition-colors" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 8 characters"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="pl-12 h-14 rounded-2xl border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/10 text-[#3C2A1E] font-medium"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7F8C8D]">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-[#7F8C8D] ml-1">Confirm Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7F8C8D] group-focus-within:text-[#F6CB5A] transition-colors" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Repeat your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="pl-12 h-14 rounded-2xl border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/10 text-[#3C2A1E] font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-[#7F8C8D] ml-1">What&apos;s your name?</Label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7F8C8D] group-focus-within:text-[#F6CB5A] transition-colors" />
                      <Input
                        type="text"
                        placeholder="Full Name"
                        value={formData.full_name}
                        onChange={(e) => handleInputChange("full_name", e.target.value)}
                        className="pl-12 h-14 rounded-2xl border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/10 text-[#3C2A1E] font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-xs font-bold uppercase tracking-wider text-[#7F8C8D] ml-1">I am looking to:</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => handleInputChange("user_type", "seeker")}
                        className={`p-5 rounded-[24px] border-2 transition-all flex flex-col items-center space-y-3 ${formData.user_type === "seeker" ? "border-[#F6CB5A] bg-[#FDF8F0] shadow-md" : "border-[#ECF0F1] hover:border-[#F6CB5A]/40"}`}
                      >
                        <User className={`w-8 h-8 ${formData.user_type === "seeker" ? "text-[#F6CB5A]" : "text-[#7F8C8D]"}`} />
                        <span className="font-bold text-sm">Find a Room</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInputChange("user_type", "provider")}
                        className={`p-5 rounded-[24px] border-2 transition-all flex flex-col items-center space-y-3 ${formData.user_type === "provider" ? "border-[#F6CB5A] bg-[#FDF8F0] shadow-md" : "border-[#ECF0F1] hover:border-[#F6CB5A]/40"}`}
                      >
                        <Home className={`w-8 h-8 ${formData.user_type === "provider" ? "text-[#F6CB5A]" : "text-[#7F8C8D]"}`} />
                        <span className="font-bold text-sm">Rent my Room</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-[#7F8C8D] ml-1">Phone Number</Label>
                    <div className="relative group">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7F8C8D] group-focus-within:text-[#F6CB5A] transition-colors" />
                      <Input
                        type="tel"
                        placeholder="0911..."
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="pl-12 h-14 rounded-2xl border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/10 text-[#3C2A1E] font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-[#7F8C8D] ml-1">Your Location</Label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7F8C8D] group-focus-within:text-[#F6CB5A] transition-colors" />
                      <Input
                        type="text"
                        placeholder="City, Area"
                        value={formData.current_location}
                        onChange={(e) => handleInputChange("current_location", e.target.value)}
                        className="pl-12 h-14 rounded-2xl border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/10 text-[#3C2A1E] font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wider text-[#7F8C8D] ml-1">Age</Label>
                      <Input
                        type="number"
                        placeholder="e.g. 21"
                        value={formData.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        className="h-14 rounded-2xl border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/10 text-[#3C2A1E] font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wider text-[#7F8C8D] ml-1">Gender</Label>
                      <Select value={formData.gender} onValueChange={(val) => handleInputChange("gender", val)}>
                        <SelectTrigger className="h-14 rounded-2xl border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/10 text-[#3C2A1E] font-medium">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-2 border-[#ECF0F1]">
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="any">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-[#7F8C8D] ml-1">What do you do?</Label>
                    <div className="relative group">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7F8C8D] group-focus-within:text-[#F6CB5A] transition-colors" />
                      <Input
                        type="text"
                        placeholder="e.g. Student, Accountant"
                        value={formData.occupation}
                        onChange={(e) => handleInputChange("occupation", e.target.value)}
                        className="pl-12 h-14 rounded-2xl border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/10 text-[#3C2A1E] font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col space-y-4 pt-6">
                <div className="flex space-x-4">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="h-14 flex-1 rounded-2xl border-2 border-[#ECF0F1] font-bold text-[#3C2A1E] hover:bg-[#FDF8F0]"
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={`h-14 flex-[2] rounded-2xl font-bold transition-all shadow-xl ${currentStep === 3 ? "bg-[#3C2A1E] hover:bg-[#2A1E14]" : "bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E]"}`}
                  >
                    {isLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>{currentStep === 3 ? "Create Account" : "Next Step"}</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </div>

                <div className="text-center py-4">
                  <p className="text-[#7F8C8D] text-sm font-medium">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#3C2A1E] font-black underline decoration-[#F6CB5A] decoration-4 underline-offset-4">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
