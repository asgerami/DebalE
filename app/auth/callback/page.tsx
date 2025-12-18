"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, ArrowRight, ShieldCheck, Coffee } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Verifying your credentials...");

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Wait a small bit to ensure session is processed
        await new Promise(r => setTimeout(r, 1000));

        const { data, error } = await supabase.auth.getSession();

        if (error) {
          setStatus("error");
          setMessage("Authentiction link may have expired or is invalid.");
          return;
        }

        if (data.session) {
          setStatus("success");
          setMessage(
            "Welcome to DebalE! Your email has been verified. We're getting your dashboard ready..."
          );

          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push("/dashboard");
          }, 2500);
        } else {
          setStatus("error");
          setMessage("We couldn't find an active session. Please try logging in.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An unexpected error occurred during verification.");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image src="/auth-bg.png" alt="bg" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="flex justify-center mb-10">
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/20">
            <div className="w-10 h-10 bg-[#F6CB5A] rounded-xl flex items-center justify-center shadow-lg">
              <Coffee className="w-6 h-6 text-[#3C2A1E]" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">DebalE</span>
          </div>
        </div>

        <Card className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[40px] shadow-2xl overflow-hidden">
          <CardHeader className="text-center pt-12 pb-6 px-10">
            {status === "loading" && (
              <div className="mx-auto mb-8 relative">
                <div className="absolute inset-0 bg-[#F6CB5A] blur-3xl opacity-20 rounded-full animate-pulse" />
                <div className="relative w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                  <Loader2 className="h-12 w-12 animate-spin text-[#F6CB5A]" />
                </div>
              </div>
            )}
            {status === "success" && (
              <div className="mx-auto mb-8 relative">
                <div className="absolute inset-0 bg-green-500 blur-3xl opacity-20 rounded-full" />
                <div className="relative w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                  <ShieldCheck className="h-12 w-12 text-green-400" />
                </div>
              </div>
            )}
            {status === "error" && (
              <div className="mx-auto mb-8 relative">
                <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 rounded-full" />
                <div className="relative w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30">
                  <XCircle className="h-12 w-12 text-red-400" />
                </div>
              </div>
            )}

            <CardTitle className="text-3xl font-bold text-white">
              {status === "loading" && "Authenticating"}
              {status === "success" && "Verification Success"}
              {status === "error" && "Something went wrong"}
            </CardTitle>

            <CardDescription className="text-white/70 text-lg mt-4 max-w-sm mx-auto leading-relaxed">
              {message}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-10 pb-12">
            {status === "error" && (
              <div className="space-y-4">
                <Link href="/login" className="block">
                  <Button className="w-full bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-bold h-14 rounded-2xl shadow-xl transition-all">
                    Try Logging In
                  </Button>
                </Link>
                <Link href="/register" className="block">
                  <Button
                    variant="ghost"
                    className="w-full text-white hover:bg-white/5 h-14 rounded-2xl border border-white/10"
                  >
                    Create New Account
                  </Button>
                </Link>
              </div>
            )}

            {status === "loading" && (
              <div className="space-y-6">
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#F6CB5A] w-1/3 animate-progress rounded-full" />
                </div>
                <p className="text-center text-sm text-white/40 font-medium uppercase tracking-widest">
                  Secure processing
                </p>
              </div>
            )}

            {status === "success" && (
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-2 text-[#F6CB5A] animate-bounce">
                  <span className="font-bold">Redirecting you now</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center mt-10 text-white/40 text-sm font-medium">
          DebalE Security &bull; Ethiopia Living Community
        </p>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .animate-progress {
          animation: progress 2s infinite linear;
        }
      `}</style>
    </div>
  );
}
