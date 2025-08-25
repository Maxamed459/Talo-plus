"use client";
import Link from "next/link";
import React from "react";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { authUser, logout } = useAuth();
  return (
    <>
      <div className="flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold text-[#000b58] cursor-pointer">
            Talo+
          </h1>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-4 text-[#000b58] text-[18px]">
            {authUser && (
              <li>
                <Link href="/dashboard">dashboard</Link>
              </li>
            )}
            <li>
              <Link href="/">About</Link>
            </li>
            <li>
              <Link href="/">Contact</Link>
            </li>
          </ul>
        </nav>
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          {authUser ? (
            <>
              <button
                className="px-4 py-2 bg-gradient-to-r from-[#000b58] to-purple-700 text-white rounded"
                onClick={() => logout()}
              >
                <Link href="/register">Logout</Link>
              </button>
            </>
          ) : (
            <>
              <button className="px-4 py-2 bg-gradient-to-r from-[#000b58] to-purple-700 text-white rounded">
                <Link href="/login">Login</Link>
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-[#000b58] to-purple-700 text-white rounded">
                <Link href="/register">Sign Up</Link>
              </button>
            </>
          )}
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            type="button"
            className="text-[#000b58] focus:outline-none"
            aria-label="Open menu"
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              if (menu) menu.classList.toggle("hidden");
            }}
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div id="mobile-menu" className="md:hidden hidden mt-4">
        <ul className="flex flex-col space-y-2 text-[#000b58] text-[18px]">
          {authUser && (
            <li>
              <Link
                href="/dashboard"
                onClick={() =>
                  document
                    .getElementById("mobile-menu")
                    ?.classList.add("hidden")
                }
              >
                dashboard
              </Link>
            </li>
          )}
          <li>
            <Link
              href="/"
              onClick={() =>
                document.getElementById("mobile-menu")?.classList.add("hidden")
              }
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/"
              onClick={() =>
                document.getElementById("mobile-menu")?.classList.add("hidden")
              }
            >
              Contact
            </Link>
          </li>
        </ul>
        <div className="flex flex-col space-y-2 mt-4">
          {authUser ? (
            <>
              <button
                className="px-4 py-2 bg-gradient-to-r from-[#000b58] to-purple-700 text-white rounded cursor-pointer"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="px-4 py-2 bg-gradient-to-r from-[#000b58] to-purple-700 text-white rounded cursor-pointer">
                <Link href="/login">Login</Link>
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-[#000b58] to-purple-700 text-white rounded cursor-pointer">
                <Link href="/register">Sign Up</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
