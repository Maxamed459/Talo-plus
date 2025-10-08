"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ShowPass } from "../register/page";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
}

const Loginpage = () => {
  const { login, error, authUser, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (authUser) {
      router.push("/dashboard");
    }
  }, [authUser, router]);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState<ShowPass>({ condition: false });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login(formData);
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <button className="flex items-center gap-1 absolute right-5 md:right-96 bg-[#000b58] text-white rounded top-15 p-2">
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

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            {error && (
              <div className="bg-red-200 text-red-800 border-1 border-red-800 p-4">
                <p className="text-sm">{error}</p>
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-xs">
                Email
              </Label>
              <Input
                onChange={handleChange}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2 relative">
              <Label htmlFor="password" className="text-xs">
                Password
              </Label>
              <Input
                onChange={handleChange}
                id="password"
                type={showPass.condition ? "text" : "password"}
                required
              />

              {showPass.condition ? (
                <FaEye
                  className="absolute right-3 top-8.5 cursor-pointer"
                  onClick={() => setShowPass({ condition: false })}
                />
              ) : (
                <FaEyeSlash
                  className="absolute right-3 top-8.5 cursor-pointer"
                  onClick={() => setShowPass({ condition: true })}
                />
              )}
            </div>
            <div className="grid gap-2">
              <Button
                type="submit"
                className="w-full bg-[#000b58] hover:bg-[rgba(0,10,88,0.94)] disabled:opacity-50"
                disabled={loading}
              >
                Login
              </Button>
            </div>
          </div>
        </form>
        <div className="flex items-center gap-1">
          {" "}
          <p className="my-4 text-sm">Don`t have an account? </p>
          <button className="text-[#000b58] text-sm font-medium">
            <Link href="/register">register</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
