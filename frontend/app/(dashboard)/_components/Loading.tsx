"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Loading = ({ height = "100vh" }) => {
  const { authUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!authUser) {
      router.push("/login");
    }
  }, [authUser, router]);
  return (
    <div
      style={{ height }}
      className="flex items-center justify-center h-screen"
    >
      <div className="w-10 h-10 rounded-full border-3 border-[#000b58] border-t-transparent animate-spin"></div>
    </div>
  );
};

export default Loading;
