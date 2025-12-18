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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
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
