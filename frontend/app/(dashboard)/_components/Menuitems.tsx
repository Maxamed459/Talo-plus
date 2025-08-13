import React from "react";
import { menuItemsData } from "../assets";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

interface Sideprops {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menuitems = ({ setSidebarOpen }: Sideprops) => {
  const pathname = usePathname();

  return (
    <div className="px-6 text-gray-600 space-y-1 font-medium">
      {menuItemsData.map(({ to, label, Icon }) => {
        const isActive = pathname === to;
        return (
          <Link
            key={to}
            href={to}
            onClick={() => setSidebarOpen(false)}
            className={`px-3.5 py-2 flex items-center gap-3 rounded-xl 
        ${isActive ? "bg-[#6967FB]/20 text-[#000b58]" : "hover:bg-gray-50"}`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        );
      })}
    </div>
  );
};

export default Menuitems;
