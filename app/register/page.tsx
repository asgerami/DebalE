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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const { signUp } = useAuth();
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (
          !formData.email ||
          !formData.password ||
          !formData.confirmPassword
        ) {
          setError("Please fill in all required fields");
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return false;
        }
        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters");
          return false;
        }
        break;
      case 2:
        if (!formData.full_name || !formData.user_type) {
          setError("Please fill in all required fields");
          return false;
        }
        break;
      case 3:
        // Optional fields, no validation needed
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

    // Only proceed with account creation if we're on the final step
    if (currentStep !== 3) {
      return;
    }

    if (!validateStep(currentStep)) return;

    setIsLoading(true);
    setError("");

    try {
      await signUp(
        formData.email,
        formData.password,
        formData.full_name,
        formData.user_type as "seeker" | "provider"
      );
      setSuccess(true);
      setVerificationSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFFEF7] to-[#FDF8F0] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="bg-[#FFFEF7]/95 backdrop-blur-sm border-2 border-[#ECF0F1] rounded-2xl shadow-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-[#3C2A1E]">Account Created!</CardTitle>
              <CardDescription className="text-[#7F8C8D]">
                We've sent a verification email to{" "}
                <strong>{formData.email}</strong>. Please check your inbox and
                click the verification link to activate your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-[#E3F2FD] border border-[#2196F3] rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Shield className="w-5 h-5 text-[#2196F3] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-[#1976D2]">
                    <strong>Email verification required.</strong> You'll need to
                    verify your email before you can access your account.
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Link href="/login">
                  <Button className="w-full bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
                    Go to Login
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E] py-3 rounded-xl transition-all duration-200"
                  >
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFEF7] to-[#FDF8F0]">
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
            <span className="text-[#7F8C8D]">Already have an account?</span>
            <Link
              href="/login"
              className="text-[#F6CB5A] hover:text-[#E6B84A] font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Branding */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-[#3C2A1E] leading-tight">
                  Join DebalE
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
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-[#3C2A1E]">Smart matching algorithm</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#2ECC71] rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-[#3C2A1E]">Verified room providers</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#2ECC71] rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-[#3C2A1E]">Safe messaging system</span>
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

          {/* Right Side - Registration Form */}
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
                    Create Your Account
                  </h2>
                  <p className="text-[#7F8C8D]">
                    Step {currentStep} of 3:{" "}
                    {currentStep === 1
                      ? "Account Details"
                      : currentStep === 2
                      ? "Basic Info"
                      : "Additional Info"}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center space-x-2">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step <= currentStep
                            ? "bg-[#F6CB5A] text-[#3C2A1E]"
                            : "bg-[#ECF0F1] text-[#7F8C8D]"
                        } font-semibold`}
                      >
                        {step < currentStep ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          step
                        )}
                      </div>
                      {step < 3 && (
                        <div
                          className={`w-16 h-1 mx-2 ${
                            step < currentStep ? "bg-[#F6CB5A]" : "bg-[#ECF0F1]"
                          }`}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <Alert
                      variant="destructive"
                      className="bg-red-50 border-red-200 text-red-800"
                    >
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {currentStep === 1 && (
                    <>
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="font-semibold text-[#7F8C8D] text-sm"
                        >
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="bg-white border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 pl-12 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="password"
                          className="font-semibold text-[#7F8C8D] text-sm"
                        >
                          Password *
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={(e) =>
                              handleInputChange("password", e.target.value)
                            }
                            className="pr-10 bg-white border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 pl-12 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
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

                      <div className="space-y-2">
                        <Label
                          htmlFor="confirmPassword"
                          className="font-semibold text-[#7F8C8D] text-sm"
                        >
                          Confirm Password *
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              handleInputChange(
                                "confirmPassword",
                                e.target.value
                              )
                            }
                            className="pr-10 bg-white border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 pl-12 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
                            required
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7F8C8D] hover:text-[#3C2A1E] transition-colors"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      <div className="space-y-2">
                        <Label
                          htmlFor="full_name"
                          className="font-semibold text-[#7F8C8D] text-sm"
                        >
                          Full Name *
                        </Label>
                        <Input
                          id="full_name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.full_name}
                          onChange={(e) =>
                            handleInputChange("full_name", e.target.value)
                          }
                          className="bg-white border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="user_type"
                          className="font-semibold text-[#7F8C8D] text-sm"
                        >
                          I am a *
                        </Label>
                        <Select
                          value={formData.user_type}
                          onValueChange={(value) =>
                            handleInputChange("user_type", value)
                          }
                        >
                          <SelectTrigger className="bg-white border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E]">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="seeker">
                              Looking for a room
                            </SelectItem>
                            <SelectItem value="provider">
                              Offering a room
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {currentStep === 3 && (
                    <>
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="font-semibold text-[#7F8C8D] text-sm"
                        >
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="bg-white border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="age"
                            className="font-semibold text-[#7F8C8D] text-sm"
                          >
                            Age
                          </Label>
                          <Input
                            id="age"
                            type="number"
                            placeholder="Age"
                            value={formData.age}
                            onChange={(e) =>
                              handleInputChange("age", e.target.value)
                            }
                            className="bg-white border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="gender"
                            className="font-semibold text-[#7F8C8D] text-sm"
                          >
                            Gender
                          </Label>
                          <Select
                            value={formData.gender}
                            onValueChange={(value) =>
                              handleInputChange("gender", value)
                            }
                          >
                            <SelectTrigger className="bg-white border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E]">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="any">Any</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="occupation"
                          className="font-semibold text-[#7F8C8D] text-sm"
                        >
                          Occupation
                        </Label>
                        <Input
                          id="occupation"
                          type="text"
                          placeholder="What do you do?"
                          value={formData.occupation}
                          onChange={(e) =>
                            handleInputChange("occupation", e.target.value)
                          }
                          className="bg-white border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="current_location"
                          className="font-semibold text-[#7F8C8D] text-sm"
                        >
                          Current Location
                        </Label>
                        <Input
                          id="current_location"
                          type="text"
                          placeholder="City, Ethiopia"
                          value={formData.current_location}
                          onChange={(e) =>
                            handleInputChange(
                              "current_location",
                              e.target.value
                            )
                          }
                          className="bg-white border-2 border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-4 focus:ring-[#F6CB5A]/20 rounded-xl px-4 py-3 text-[#3C2A1E] placeholder-[#7F8C8D] transition-all duration-200"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex justify-between pt-4">
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="border-2 border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E] py-3 px-6 rounded-xl transition-all duration-200"
                      >
                        Previous
                      </Button>
                    )}

                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="ml-auto bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="ml-auto bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 border-2 border-[#3C2A1E] border-t-transparent rounded-full animate-spin"></div>
                            <span>Creating Account...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2">
                            <span>Create Account</span>
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        )}
                      </Button>
                    )}
                  </div>
                </form>

                <div className="text-center">
                  <span className="text-[#7F8C8D]">
                    Already have an account?{" "}
                  </span>
                  <Link
                    href="/login"
                    className="text-[#F6CB5A] hover:text-[#E6B84A] font-semibold"
                  >
                    Sign in
                  </Link>
                </div>

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
    </div>
  );
}
