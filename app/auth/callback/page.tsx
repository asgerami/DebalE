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
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          setStatus("error");
          setMessage("Authentication failed. Please try again.");
          return;
        }

        if (data.session) {
          setStatus("success");
          setMessage(
            "Email verified successfully! Redirecting to dashboard..."
          );

          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        } else {
          setStatus("error");
          setMessage("No session found. Please try logging in again.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An unexpected error occurred. Please try again.");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFEF7] to-[#FDF8F0] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-[#FFFEF7]/95 backdrop-blur-sm border-2 border-[#ECF0F1] rounded-2xl shadow-2xl">
          <CardHeader className="text-center pb-4">
            {status === "loading" && (
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F6CB5A]/20">
                <Loader2 className="h-6 w-6 animate-spin text-[#F6CB5A]" />
              </div>
            )}
            {status === "success" && (
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            )}
            {status === "error" && (
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            )}

            <CardTitle className="text-[#3C2A1E]">
              {status === "loading" && "Verifying Email..."}
              {status === "success" && "Email Verified!"}
              {status === "error" && "Verification Failed"}
            </CardTitle>

            <CardDescription className="text-[#7F8C8D]">
              {message}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {status === "error" && (
              <div className="space-y-3">
                <Link href="/login">
                  <Button className="w-full bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
                    Go to Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E] py-3 rounded-xl transition-all duration-200"
                  >
                    Create New Account
                  </Button>
                </Link>
              </div>
            )}

            {status === "loading" && (
              <div className="text-center">
                <p className="text-sm text-[#7F8C8D]">
                  Please wait while we verify your email address...
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
