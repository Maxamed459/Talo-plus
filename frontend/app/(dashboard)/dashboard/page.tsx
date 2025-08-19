import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import { GrNotification } from "react-icons/gr";
import AllQuestions from "../_components/AllQuestions";

const DashboardPage = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between w-full">
        <form className="w-[95%] md:w-4/5">
          <div className="space-y-1 relative">
            <Search className="w-5 h-5 absolute top-2 left-2.5 text-gray-500" />
            <Input
              id="firstName"
              type="text"
              className="w-[85%] px-9"
              placeholder="Search"
              required
            />
          </div>
        </form>
        <div className="w-1/5 items-center gap-1 hidden md:flex cursor-pointer">
          <div className="w-7 h-7 bg-[#6967FB] rounded-full"></div>
          <GrNotification className="absolute right-49.5 text-white" />
          <span>Notification</span>
        </div>
      </div>
      <AllQuestions />
    </div>
  );
};

export default DashboardPage;
