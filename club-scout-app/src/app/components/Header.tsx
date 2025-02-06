"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react"; // Icons for light/dark mode

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left: Logo & Home Button */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-10 cursor-pointer"
            />
          </Link>
          <Link href="/" className="text-lg font-semibold hover:underline">
            Home
          </Link>
        </div>

        {/* Right: Sign Up & Dark Mode Toggle */}
        <div className="flex items-center gap-4">
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-white">
            Sign Up
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)} // Toggle dark mode
            className="p-2 rounded-full hover:bg-gray-700"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
