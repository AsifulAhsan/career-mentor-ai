"use client";
import React from "react";
import { useAuth } from "@/components/AuthContext";
import SignedOutScreen from "@/components/SignedOutScreen";
import DashboardScreen from "@/components/DashboardScreen";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {isAuthenticated ? <DashboardScreen /> : <SignedOutScreen />}
    </div>
  );
}