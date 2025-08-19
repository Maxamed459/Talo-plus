// app/dashboard/DashboardShell.tsx  (client component)
"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import Sidebar from "../_components/Sidebar";
import Loading from "../_components/Loading";
import { Menu, X } from "lucide-react";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!authUser) return <Loading />;

  return (
    <div className="w-full flex h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 bg-slate-50 overflow-auto">{children}</div>
      {sidebarOpen ? (
        <X
          className="absolute top-3 right-3 p-2 z-50 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : (
        <Menu
          className="absolute top-3 right-3 p-2 z-50 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden"
          onClick={() => setSidebarOpen(true)}
        />
      )}
    </div>
  );
}
