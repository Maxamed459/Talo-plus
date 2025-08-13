import { useRouter } from "next/navigation";
import React from "react";
import Menuitems from "../_components/Menuitems";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { LogOut } from "lucide-react";

export interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { authUser, logout } = useAuth();
  const router = useRouter();
  return (
    <div
      className={`w-60 xl:w-72 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-0 bottom-0 z-20 ${
        sidebarOpen ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="w-full">
        <Image
          src="/dash-logo-02.png"
          onClick={() => router.push("/")}
          alt="dashboard logo"
          height={140}
          width={140}
          className="mx-auto my-2 cursor-pointer"
        />
        <hr className="border-gray-300 mb-8" />
        <Menuitems setSidebarOpen={setSidebarOpen} />
      </div>
      <div className="border-t border-gray-200 p-4 px-7 flex items-center justify-between">
        <div className="flex gap-2 items-center justify-between cursor-pointer">
          <div className="w-7 h-7 md:w-10 md:h-10 bg-[#6967FB] rounded-full  flex items-center justify-center">
            <p className="text-xl md:text-3xl text-white mb-2 text-center font-medium">
              {authUser?.username.charAt(0)}
            </p>
          </div>
          <div className="-space-y-1 text-sm">
            <p>{authUser?.username}</p>
            <p>{authUser?.email}</p>
          </div>
          <form
            action={() => {
              logout();
            }}
          >
            <button type="submit">
              <LogOut className="w-5 h-5 text-gray-400 hover:text-gray-600 ml-5 mt-3" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
