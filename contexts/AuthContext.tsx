"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import {
  AuthState,
  signIn,
  signUp,
  signOut,
  resetPassword,
  updatePassword,
  resendVerificationEmail,
  isEmailVerified,
  updateProfile,
} from "../lib/auth";

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    full_name: string,
    user_type: "seeker" | "provider",
    phone?: string,
    occupation?: string,
    current_location?: string,
    age?: string,
    gender?: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  resendVerificationEmail: (email: string) => Promise<void>;
  isEmailVerified: (user: User | null) => boolean;
  updateProfile: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Get initial session with timeout
    const getInitialSession = async () => {
      try {
        // Add a timeout to prevent infinite loading
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Session timeout")), 5000);
        });

        const sessionPromise = supabase.auth.getSession();

        const { data: { session } } = await Promise.race([
          sessionPromise,
          timeoutPromise,
        ]) as { data: { session: Session | null } };

        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error getting session:", error);
        if (mounted) {
          setSession(null);
          setUser(null);
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      await signIn({ email, password });
    } catch (error) {
      throw error;
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    full_name: string,
    user_type: "seeker" | "provider",
    phone?: string,
    occupation?: string,
    current_location?: string,
    age?: string,
    gender?: string
  ) => {
    try {
      await signUp({
        email,
        password,
        full_name,
        user_type,
        phone,
        occupation,
        current_location,
        age,
        gender
      });
    } catch (error) {
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      throw error;
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      await resetPassword({ email });
    } catch (error) {
      throw error;
    }
  };

  const handleUpdatePassword = async (newPassword: string) => {
    try {
      await updatePassword(newPassword);
    } catch (error) {
      throw error;
    }
  };

  const handleResendVerificationEmail = async (email: string) => {
    try {
      await resendVerificationEmail(email);
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateProfile = async (data: any) => {
    try {
      await updateProfile(data);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    resetPassword: handleResetPassword,
    updatePassword: handleUpdatePassword,
    resendVerificationEmail: handleResendVerificationEmail,
    isEmailVerified,
    updateProfile: handleUpdateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
