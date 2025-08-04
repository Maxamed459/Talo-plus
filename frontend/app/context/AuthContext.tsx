"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { userAgent } from "next/server";

// Types
interface User {
  fullname: string;
  email: string;
  username: string;
  role: string;
}

interface AuthContextType {
  authUser: User | null;
  error: string | null;
  registerUser: (userData: any) => Promise<void>;
  login: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const [authUser, setAuthUser] = useState<User | null>(null);
  const [authUser, setAuthUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      try {
        return stored ? JSON.parse(stored) : null;
      } catch (err) {
        console.error("Invalid JSON in localStorage:", err);
        return null;
      }
    }
    return null;
  });

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAuthUser(user);
    }
  }, []);

  const registerUser = async (userData: any) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3002/api/user/signUp",
        userData
      );
      if (data.success) {
        console.log(data);
        setAuthUser(data.newUser);
        localStorage.setItem("user", JSON.stringify(data.newUser));
        setError(null);
        router.push("/"); // or homepage
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  const login = async (userData: any) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3002/api/user/signIn",
        userData,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        console.log(data);
        setAuthUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setError(null);
        router.push("/");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setAuthUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        error,
        registerUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside an AuthProvider");
  return context;
};
