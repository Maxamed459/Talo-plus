"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Types
interface User {
  fullname: string;
  email: string;
  username: string;
  role: string;
  profilePic?: string;
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
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
      console.log(storedUser);
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
