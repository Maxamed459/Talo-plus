import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <button className="flex items-center gap-1 absolute right-5 md:right-96 bg-[#000b58] text-white rounded top-18 p-2">
        <IoIosArrowBack />
        <Link href="/">Back to home</Link>
      </button>
      <div className="shadow-lg max-w-[90%] border-1 border-gray-700/10 p-6 w-lg">
        <div className="space-y-1 mb-6">
          <h1 className="text-2xl font-medium">Login</h1>
          <p className="text-[15px] text-gray-600">
            Enter your details below to login your account
          </p>
        </div>

        <form className="w-full">
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-xs">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-xs">
                Password
              </Label>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Button
                type="submit"
                className="w-full bg-[#000b58] hover:bg-[rgba(0,10,88,0.94)]"
              >
                Login
              </Button>
            </div>
          </div>
        </form>
        <div className="flex items-center gap-2">
          {" "}
          <p className="my-4 text-sm">have no account?</p>
          <button className="text-[#000b58] text-sm">Login</button>
        </div>
      </div>
    </div>
  );
};

export default page;
