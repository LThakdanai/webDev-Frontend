import React, { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation } from "react-router-dom";
import "../styles/Header.css";

const pageTitles = {
  "/": "Dashboard",
  "/monitoring": "Monitoring",
  "/reports": "Reports",
  "/cycletime": "Cycle Time Analysis",
  "/production_overview": "Production Overview",
};

export default function Header() {
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || "Over All Dashboard";

  const userId = localStorage.getItem("userId");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchName = async (id) => {
      try {
        const url = `http://localhost:5431/api/users/${id}`;
        const response = await fetch(url);
        const result = await response.json();
        setName(result.data?.name || "Unknown");
      } catch (err) {
        console.error(err.message);
        setName("Error");
      }
    };

    if (userId) {
      fetchName(userId);
    }
  }, [userId]);

  return (
    <header className="flex justify-between items-center px-6 py-3 top-0 z-20 w-full h-[65px]">
      {/* Page Title */}
      <h1 className="header-title">{pageTitle}</h1>

      {/* Actions Section */}
      <div className="flex items-center gap-5 ml-auto">
        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded px-5 py-3 w-full max-w-3xl mr-auto hidden sm:flex">
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search something......"
            className="ml-3 w-full outline-none placeholder-gray-400 text-lg"
          />
        </div>

        {/* Vertical Divider */}
        <div className="vertical-divider"></div>

        {/* Mail Icon with Badge */}
        <div className="relative text-gray-600">
          <FaEnvelope className="text-xl" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-ping" />
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4 sm:flex">
          <img
            src="/path/to/avatar.jpg" // Replace with actual path
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">{name}</span>
            <IoIosArrowDown className="text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
}
