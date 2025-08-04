"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "../../context/AuthContext"; // 👈 import your context
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

interface FormData {
  fullname: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

const Registerpage = () => {
  const { registerUser, error } = useAuth(); // 👈 get from context
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [formData, setFormData] = useState<Omit<FormData, "fullname">>({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fullNameCombined = `${firstName} ${lastName}`;

    const finalFormData = {
      ...formData,
      fullname: fullNameCombined,
    };

    registerUser(finalFormData); // 👈 call context function
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 relative">
      <button className="flex items-center gap-1 absolute right-5 lg:right-51 bg-[#000b58] text-white rounded top-3 p-2">
        <IoIosArrowBack />
        <Link href="/">Back to home</Link>
      </button>
      <div className="flex items-center shadow-lg border-1 mt-10 border-gray-700/10 overflow-hidden">
        <div className="w/12">
          <Image
            src="/form-img.jpg"
            height={400}
            width={380}
            className="w-full hidden md:block"
            alt="form image"
          />
        </div>

        <div className="p-6 w-full md:w-1/2">
          <div className="space-y-1 mb-6">
            <h1 className="text-center text-2xl font-medium">
              Create an account
            </h1>
            <p className="text-center text-[15px] text-gray-600">
              Enter your details below to create your account
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              {error && (
                <div className="bg-red-200 text-red-800 border-1 border-red-800 p-4">
                  <p className="text-sm">{error}</p>
                </div>
              )}
              <div className="flex items-center gap-5">
                <div className="space-y-1">
                  <Label htmlFor="firstName" className="text-xs">
                    First name
                  </Label>
                  <Input
                    onChange={(e) => setFirstName(e.target.value)}
                    id="firstName"
                    type="text"
                    placeholder="mohamed"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName" className="text-xs">
                    Last name
                  </Label>
                  <Input
                    onChange={(e) => setLastName(e.target.value)}
                    id="lastName"
                    type="text"
                    placeholder="mahdi"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="username" className="text-xs">
                  Username
                </Label>
                <Input
                  onChange={handleChange}
                  id="username"
                  type="text"
                  placeholder="yourusername"
                  required
                />
              </div>

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

              <div className="grid gap-2">
                <Label htmlFor="role" className="text-xs">
                  Role
                </Label>
                <Select onValueChange={handleSelect}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="nurse">Nurse</SelectItem>
                      <SelectItem value="medical_student">
                        Medical Student
                      </SelectItem>
                      <SelectItem value="coach">Coach</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-xs">
                  Password
                </Label>
                <Input
                  onChange={handleChange}
                  id="password"
                  type="password"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Button
                  type="submit"
                  className="w-full bg-[#000b58] hover:bg-[rgba(0,10,88,0.94)]"
                >
                  Create account
                </Button>
              </div>
            </div>
          </form>

          <div className="flex items-center gap-1 mt-4">
            <p className="text-sm">Already have an account?</p>
            <button className="text-[#000b58] text-sm">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registerpage;
