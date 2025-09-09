"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Loading = () => {
  const { authUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!authUser) {
      router.push("/login");
    }
  }, [authUser, router]);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-28 w-28 border-b-4 border-b-[#CCF913] border-t-4 border-t-[#6A67FC]"></div>
    </div>
  );
};

export default Loading;
