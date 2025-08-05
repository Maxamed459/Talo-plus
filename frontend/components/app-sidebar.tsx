"use client";

import * as React from "react";

import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarFooter, SidebarRail } from "@/components/ui/sidebar";
import { useAuth } from "@/app/context/AuthContext";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { authUser } = useAuth();
  // This is sample data.
  const data = {
    user: {
      name: authUser?.username,
      email: authUser?.email,
      avatar: "/avatars/shadcn.jpg",
    },
  };
  console.log(authUser);
  return (
    <Sidebar collapsible="icon" {...props}>
      <h1 className="text-3xl font-bold text-center py-4">Talo +</h1>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
