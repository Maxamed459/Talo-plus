"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

// Types
interface User {
  fullname: string;
  email: string;
  username: string;
  role: string;
}

interface authUser extends User {
  _id: string;
}

interface UserData extends User {
  password: string;
}
interface LoginUserData {
  email: string;
  password: string;
}

interface AuthContextType {
  authUser: authUser | null;
  error: string | null;
  loading: boolean;
  registerUser: (userData: UserData) => Promise<void>;
  login: (userData: LoginUserData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const [authUser, setAuthUser] = useState<User | null>(null);
  const [authUser, setAuthUser] = useState<authUser | null>(() => {
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
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAuthUser(user);
    }
  }, []);

  const registerUser = async (userData: UserData) => {
    try {
      setLoading(true)
      const { data } = await axios.post(`${url}/api/user/signUp`, userData);
      if (data.success) {
        console.log(data);
        setAuthUser(data.newUser);
        localStorage.setItem("user", JSON.stringify(data.newUser));
        setError(null);
        router.push("/dashboard"); // or homepage
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError?.response?.data?.message || "Registration failed");
    } finally{
      setLoading(false)
    }
  };

  const login = async (userData: LoginUserData) => {
    try {
      setLoading(true)
      const { data } = await axios.post(`${url}/api/user/signIn`, userData, {
        withCredentials: true,
      });

      if (data.success) {
        console.log(data);
        setAuthUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setError(null);
        router.push("/dashboard");
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError?.response?.data?.message || "Login failed");
    }finally{
      setLoading(false)
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post(
        `${url}/api/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        localStorage.removeItem("user");
        setAuthUser(null);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        error,
        loading,
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
