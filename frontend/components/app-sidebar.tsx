"use client";
import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  CirclePlus,
  Command,
  File,
  GalleryVerticalEnd,
  Settings2,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/app/context/AuthContext";
// This is sample data.
const data = {
  navMain: [
    {
      title: "Ask question",
      url: "/post",
      icon: CirclePlus,
      isActive: true,
    },
    {
      title: "My questions",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Answers",
      url: "#",
      icon: File,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
};
interface User {
  name: string | undefined;
  email: string | undefined;
  avatar: string | undefined;
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { authUser } = useAuth();

  const user: User = {
    name: authUser?.username,
    email: authUser?.email,
    avatar: "/avatars/shadcn.jpg",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="flex items-center justify-center py-2">
        <img src="/dash-logo-02.png" alt="" className="max-w-[70%]" />
      </div>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
