"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Upload,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Shield,
  CreditCard,
  User,
  Loader2,
  RefreshCw,
  X,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth-guard";
import Header from "@/components/header";
import { toast } from "sonner";

type VerificationStep = "intro" | "id-upload" | "selfie" | "review" | "complete";
type IdType = "fayda" | "kebele" | null;

export default function VerifyPage() {
  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen bg-[#FFFEF7]">
        <Header />
        <VerifyContent />
      </div>
    </AuthGuard>
  );
}

function VerifyContent() {
  const { user, updateProfile } = useAuth();
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState<VerificationStep>("intro");
  const [idType, setIdType] = useState<IdType>(null);
  const [idImage, setIdImage] = useState<string | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const [selfieBlob, setSelfieBlob] = useState<Blob | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  // Camera refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Check if already verified
  const isVerified = user?.user_metadata?.id_verified === true;

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Start camera for selfie
  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error("Camera error:", err);
      setCameraError("Unable to access camera. Please allow camera permissions.");
    }
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  // Capture selfie from video
  const captureSelfie = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    if (!ctx) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL("image/jpeg", 0.8);
    setSelfieImage(imageData);
    
    canvas.toBlob((blob) => {
      if (blob) setSelfieBlob(blob);
    }, "image/jpeg", 0.8);
    
    stopCamera();
  }, [stopCamera]);

  // Handle ID image upload
  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be less than 10MB");
      return;
    }
    
    setIdFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setIdImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Handle step navigation
  const goToStep = (step: VerificationStep) => {
    if (step === "selfie") {
      startCamera();
    } else {
      stopCamera();
    }
    setCurrentStep(step);
  };

  // Retake selfie
  const retakeSelfie = () => {
    setSelfieImage(null);
    setSelfieBlob(null);
    startCamera();
  };

  // Submit verification
  const handleSubmit = async () => {
    if (!user || !idFile || !selfieBlob) return;
    
    setIsSubmitting(true);
    try {
      const { supabase } = await import("@/lib/supabase");
      
      // Upload ID document
      const idPath = `${user.id}/id_${Date.now()}.jpg`;
      const { error: idError } = await supabase.storage
        .from("verification-docs")
        .upload(idPath, idFile);
      
      if (idError) throw idError;
      
      // Upload selfie
      const selfiePath = `${user.id}/selfie_${Date.now()}.jpg`;
      const { error: selfieError } = await supabase.storage
        .from("verification-docs")
        .upload(selfiePath, selfieBlob);
      
      if (selfieError) throw selfieError;
      
      // Update user metadata
      await updateProfile({
        id_type: idType,
        id_document_path: idPath,
        selfie_path: selfiePath,
        verification_status: "pending",
        verification_submitted_at: new Date().toISOString(),
      });
      
      setCurrentStep("complete");
      toast.success("Verification submitted successfully!");
    } catch (err: any) {
      console.error("Verification error:", err);
      toast.error(err.message || "Failed to submit verification");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Progress indicator
  const steps = [
    { id: "intro", label: "Start" },
    { id: "id-upload", label: "ID Document" },
    { id: "selfie", label: "Selfie" },
    { id: "review", label: "Review" },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  // Already verified view
  if (isVerified) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white border-2 border-[#2ECC71] rounded-3xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-[#2ECC71] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#3C2A1E] mb-2">Already Verified!</h2>
            <p className="text-[#7F8C8D] mb-6">Your identity has been verified.</p>
            <Badge className="bg-[#2ECC71] text-white px-4 py-2 text-sm">
              <Shield className="w-4 h-4 mr-2" />
              ID Verified
            </Badge>
            <Button onClick={() => router.push("/dashboard")} className="w-full mt-6 bg-[#F6CB5A] text-[#3C2A1E]">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        {currentStep !== "complete" && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index <= currentStepIndex 
                      ? "bg-[#F6CB5A] text-[#3C2A1E]" 
                      : "bg-[#ECF0F1] text-[#7F8C8D]"
                  }`}>
                    {index < currentStepIndex ? <CheckCircle className="w-5 h-5" /> : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 sm:w-20 h-1 mx-1 ${
                      index < currentStepIndex ? "bg-[#F6CB5A]" : "bg-[#ECF0F1]"
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-[#7F8C8D]">
              {steps.map(step => (
                <span key={step.id} className="text-center">{step.label}</span>
              ))}
            </div>
          </div>
        )}

        {/* Step: Intro */}
        {currentStep === "intro" && (
          <Card className="bg-white border border-[#ECF0F1] rounded-3xl shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-[#F6CB5A] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-10 h-10 text-[#3C2A1E]" />
                </div>
                <h1 className="text-3xl font-bold text-[#3C2A1E] mb-3">Verify Your Identity</h1>
                <p className="text-[#7F8C8D] max-w-md mx-auto">
                  Build trust with other users by verifying your identity. Verified users get more responses and better matches.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-4 p-4 bg-[#FDF8F0] rounded-xl">
                  <CreditCard className="w-6 h-6 text-[#F6CB5A] mt-1" />
                  <div>
                    <h3 className="font-bold text-[#3C2A1E]">Step 1: Upload ID Document</h3>
                    <p className="text-sm text-[#7F8C8D]">Take a clear photo of your Fayda ID or Kebele ID</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-[#FDF8F0] rounded-xl">
                  <Camera className="w-6 h-6 text-[#F6CB5A] mt-1" />
                  <div>
                    <h3 className="font-bold text-[#3C2A1E]">Step 2: Take a Selfie</h3>
                    <p className="text-sm text-[#7F8C8D]">We'll match your face with your ID photo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-[#FDF8F0] rounded-xl">
                  <CheckCircle className="w-6 h-6 text-[#F6CB5A] mt-1" />
                  <div>
                    <h3 className="font-bold text-[#3C2A1E]">Step 3: Get Verified</h3>
                    <p className="text-sm text-[#7F8C8D]">Review takes 24-48 hours. You'll be notified once verified.</p>
                  </div>
                </div>
              </div>

              <Button onClick={() => goToStep("id-upload")} className="w-full bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-bold h-14 rounded-xl">
                Start Verification
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step: ID Upload */}
        {currentStep === "id-upload" && (
          <Card className="bg-white border border-[#ECF0F1] rounded-3xl shadow-lg">
            <CardContent className="p-8">
              <button onClick={() => goToStep("intro")} className="flex items-center text-[#7F8C8D] hover:text-[#3C2A1E] mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-[#3C2A1E] mb-2">Upload Your ID</h2>
                <p className="text-[#7F8C8D]">Choose your ID type and upload a clear photo</p>
              </div>

              {/* ID Type Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setIdType("fayda")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    idType === "fayda" 
                      ? "border-[#F6CB5A] bg-[#FDF8F0]" 
                      : "border-[#ECF0F1] hover:border-[#F6CB5A]"
                  }`}
                >
                  <CreditCard className={`w-8 h-8 mx-auto mb-2 ${idType === "fayda" ? "text-[#F6CB5A]" : "text-[#7F8C8D]"}`} />
                  <p className="font-bold text-[#3C2A1E]">Fayda ID</p>
                  <p className="text-xs text-[#7F8C8D]">National Digital ID</p>
                </button>
                <button
                  onClick={() => setIdType("kebele")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    idType === "kebele" 
                      ? "border-[#F6CB5A] bg-[#FDF8F0]" 
                      : "border-[#ECF0F1] hover:border-[#F6CB5A]"
                  }`}
                >
                  <CreditCard className={`w-8 h-8 mx-auto mb-2 ${idType === "kebele" ? "text-[#F6CB5A]" : "text-[#7F8C8D]"}`} />
                  <p className="font-bold text-[#3C2A1E]">Kebele ID</p>
                  <p className="text-xs text-[#7F8C8D]">Resident ID Card</p>
                </button>
              </div>

              {/* Upload Area */}
              {idType && (
                <div className="mb-6">
                  {!idImage ? (
                    <label className="block cursor-pointer">
                      <div className="border-2 border-dashed border-[#F6CB5A] rounded-xl p-8 text-center bg-[#FDF8F0] hover:bg-[#F6CB5A]/10 transition-colors">
                        <Upload className="w-12 h-12 text-[#F6CB5A] mx-auto mb-4" />
                        <p className="font-bold text-[#3C2A1E] mb-2">Upload {idType === "fayda" ? "Fayda" : "Kebele"} ID Photo</p>
                        <p className="text-sm text-[#7F8C8D]">Take a clear photo showing all details</p>
                      </div>
                      <input type="file" accept="image/*" capture="environment" onChange={handleIdUpload} className="hidden" />
                    </label>
                  ) : (
                    <div className="relative">
                      <Image src={idImage} alt="ID Document" width={400} height={250} className="w-full h-64 object-contain rounded-xl bg-gray-100" />
                      <button
                        onClick={() => { setIdImage(null); setIdFile(null); }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <h4 className="font-bold text-blue-800 mb-2">Tips for a good photo:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Make sure all text is readable</li>
                  <li>• Avoid glare and shadows</li>
                  <li>• Include all four corners of the ID</li>
                  <li>• Photo should be in focus</li>
                </ul>
              </div>

              <Button
                onClick={() => goToStep("selfie")}
                disabled={!idImage || !idType}
                className="w-full bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-bold h-14 rounded-xl disabled:opacity-50"
              >
                Continue to Selfie
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step: Selfie */}
        {currentStep === "selfie" && (
          <Card className="bg-white border border-[#ECF0F1] rounded-3xl shadow-lg">
            <CardContent className="p-8">
              <button onClick={() => { stopCamera(); goToStep("id-upload"); }} className="flex items-center text-[#7F8C8D] hover:text-[#3C2A1E] mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-[#3C2A1E] mb-2">Take a Selfie</h2>
                <p className="text-[#7F8C8D]">Position your face in the frame and take a clear photo</p>
              </div>

              {/* Camera View */}
              <div className="relative mb-6">
                {!selfieImage ? (
                  <div className="relative bg-black rounded-xl overflow-hidden aspect-[4/3]">
                    {cameraError ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                        <AlertCircle className="w-12 h-12 mb-4 text-red-400" />
                        <p className="text-center mb-4">{cameraError}</p>
                        <Button onClick={startCamera} variant="outline" className="text-white border-white">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Try Again
                        </Button>
                      </div>
                    ) : (
                      <>
                        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                        {/* Face guide overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-48 h-64 border-4 border-white/50 rounded-full" />
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="relative">
                    <Image src={selfieImage} alt="Selfie" width={400} height={300} className="w-full rounded-xl" />
                    <button onClick={retakeSelfie} className="absolute top-2 right-2 bg-white/90 text-[#3C2A1E] px-4 py-2 rounded-full hover:bg-white flex items-center">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Retake
                    </button>
                  </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div>

              {/* Capture/Continue Button */}
              {!selfieImage ? (
                <Button onClick={captureSelfie} disabled={!!cameraError} className="w-full bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-bold h-14 rounded-xl">
                  <Camera className="w-5 h-5 mr-2" />
                  Take Photo
                </Button>
              ) : (
                <Button onClick={() => goToStep("review")} className="w-full bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-bold h-14 rounded-xl">
                  Continue to Review
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}

              {/* Tips */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-bold text-blue-800 mb-2">Selfie tips:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Look directly at the camera</li>
                  <li>• Ensure good lighting on your face</li>
                  <li>• Remove glasses or hats</li>
                  <li>• Keep a neutral expression</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step: Review */}
        {currentStep === "review" && (
          <Card className="bg-white border border-[#ECF0F1] rounded-3xl shadow-lg">
            <CardContent className="p-8">
              <button onClick={() => goToStep("selfie")} className="flex items-center text-[#7F8C8D] hover:text-[#3C2A1E] mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-[#3C2A1E] mb-2">Review & Submit</h2>
                <p className="text-[#7F8C8D]">Make sure both photos are clear before submitting</p>
              </div>

              {/* Review Images */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm font-bold text-[#7F8C8D] mb-2 text-center">ID Document</p>
                  {idImage && (
                    <Image src={idImage} alt="ID" width={200} height={150} className="w-full h-40 object-contain rounded-xl bg-gray-100" />
                  )}
                  <Badge className="mt-2 w-full justify-center bg-[#FDF8F0] text-[#3C2A1E]">
                    {idType === "fayda" ? "Fayda ID" : "Kebele ID"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#7F8C8D] mb-2 text-center">Your Selfie</p>
                  {selfieImage && (
                    <Image src={selfieImage} alt="Selfie" width={200} height={150} className="w-full h-40 object-cover rounded-xl" />
                  )}
                  <Badge className="mt-2 w-full justify-center bg-[#FDF8F0] text-[#3C2A1E]">
                    Live Photo
                  </Badge>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-[#FDF8F0] border border-[#F6CB5A] rounded-xl p-4 mb-6">
                <p className="text-sm text-[#3C2A1E]">
                  <strong>Privacy Notice:</strong> Your documents are securely stored and only used for identity verification. 
                  We do not share your information with third parties.
                </p>
              </div>

              <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-[#2ECC71] hover:bg-[#27AE60] text-white font-bold h-14 rounded-xl">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Submit for Verification
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step: Complete */}
        {currentStep === "complete" && (
          <Card className="bg-white border-2 border-[#2ECC71] rounded-3xl shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-[#2ECC71] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#3C2A1E] mb-2">Verification Submitted!</h2>
              <p className="text-[#7F8C8D] mb-6">
                Your documents have been submitted for review. We'll notify you once your identity is verified (usually within 24-48 hours).
              </p>
              
              <Badge className="bg-[#FDF8F0] text-[#F6CB5A] px-4 py-2 mb-6">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Pending Review
              </Badge>

              <div className="space-y-3">
                <Button onClick={() => router.push("/dashboard")} className="w-full bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-bold h-12 rounded-xl">
                  Go to Dashboard
                </Button>
                <Button onClick={() => router.push("/search")} variant="outline" className="w-full border-[#ECF0F1] text-[#7F8C8D] h-12 rounded-xl">
                  Browse Rooms
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
