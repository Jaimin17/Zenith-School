"use client";

import { useAuth } from "@/contexts/authContext";
import { useAcademicYear } from "@/contexts/AcademicYearContext";
import { useChild } from "@/contexts/ChildContext";
import { getStudentImageUrl } from "@/utils/imageHelpers";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { Check, ChevronDown } from "lucide-react";

interface User {
  id: string;
  role: "admin" | "teacher" | "student" | "parent" | string;
}

const Navbar: React.FC = () => {
  const { user, role, logout, loading } = useAuth();
  const { years, selectedYearId, setYear } = useAcademicYear();
  const { children, selectedChildId, selectedChild, setChild, loading: childLoading } = useChild();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChildDropdownOpen, setIsChildDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const childDropdownRef = useRef<HTMLDivElement>(null);

  const userDetail: User = {
    id: `${user?.id}`,
    role: role || "admin",
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (childDropdownRef.current && !childDropdownRef.current.contains(event.target as Node)) {
        setIsChildDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const isParent = role === "parent";
  const showChildSelector = isParent && !childLoading && children.length > 0;
  const hasMultipleChildren = children.length > 1;

  return (
    <div className="flex items-center justify-between p-4">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="Search" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>

      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        {/* YEAR SELECTOR */}
        {years.length > 0 && (
          <select
            value={selectedYearId ?? ""}
            onChange={(e) => setYear(e.target.value)}
            className="text-xs border border-gray-300 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-lamaPurple cursor-pointer"
          >
            {years.map((y) => (
              <option key={y.id} value={y.id}>
                {y.year_label}{y.is_active ? " ★" : ""}
              </option>
            ))}
          </select>
        )}

        {showChildSelector && (
          <div className="relative" ref={childDropdownRef}>
            <button
              type="button"
              onClick={() => hasMultipleChildren && setIsChildDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-2.5 rounded-full border px-2.5 py-1.5 text-sm ${
                hasMultipleChildren ? "cursor-pointer" : "cursor-default"
              } bg-lamaPurpleLight border-lamaPurple/60 hover:bg-lamaPurple/30 transition-colors`}
            >
              <Image
                src={getStudentImageUrl(selectedChild?.img)}
                alt={selectedChild ? `${selectedChild.first_name} ${selectedChild.last_name}` : "Selected child"}
                width={26}
                height={26}
                className="rounded-full object-cover"
              />
              <div className="hidden sm:flex flex-col items-start leading-tight max-w-[140px]">
                <span className="text-[11px] text-gray-500">Viewing Child</span>
                <span className="text-xs font-semibold text-gray-800 truncate">
                  {selectedChild ? `${selectedChild.first_name} ${selectedChild.last_name}` : "Select Child"}
                </span>
              </div>
              {hasMultipleChildren && <ChevronDown className="w-4 h-4 text-gray-600" />}
            </button>

            {hasMultipleChildren && isChildDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 py-1.5 z-50">
                {children.map((child) => {
                  const isSelected = child.id === selectedChildId;
                  return (
                    <button
                      key={child.id}
                      type="button"
                      onClick={() => {
                        setChild(child.id);
                        setIsChildDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                        isSelected ? "bg-lamaSkyLight" : "hover:bg-gray-50"
                      }`}
                    >
                      <Image
                        src={getStudentImageUrl(child.img)}
                        alt={`${child.first_name} ${child.last_name}`}
                        width={34}
                        height={34}
                        className="rounded-full object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {child.first_name} {child.last_name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">@{child.username}</p>
                      </div>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full ${
                          child.status === "graduated"
                            ? "bg-green-100 text-green-700"
                            : child.status === "inactive"
                            ? "bg-gray-100 text-gray-600"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {child.status}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-green-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <Image src="/message.png" alt="Messages" width={20} height={20} />
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Image
            src="/announcement.png"
            alt="Announcements"
            width={20}
            height={20}
          />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
            1
          </div>
        </div>

        {/* USER PROFILE WITH DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={toggleDropdown}
          >
            <div className="flex flex-col">
              <span className="text-xs leading-3 font-medium">
                {user?.username}
              </span>
              <span className="text-[10px] text-gray-500 text-right capitalize">
                {userDetail?.role}
              </span>
            </div>
            <Image 
              src="/avatar.png" 
              alt="" 
              width={36} 
              height={36} 
              className="rounded-full"
            />
          </div>

          {/* DROPDOWN MENU */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              {/* Profile Option */}
              <button
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setIsDropdownOpen(false);
                  // Add navigation to profile page if needed
                }}
              >
                <PersonIcon sx={{ fontSize: 18 }} />
                <span>Profile</span>
              </button>

              {/* Settings Option */}
              <button
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setIsDropdownOpen(false);
                  // Add navigation to settings page if needed
                }}
              >
                <SettingsIcon sx={{ fontSize: 18 }} />
                <span>Settings</span>
              </button>

              {/* Divider */}
              <div className="border-t border-gray-200 my-1"></div>

              {/* Logout Option */}
              <button
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                onClick={handleLogout}
                disabled={loading}
              >
                <LogoutIcon sx={{ fontSize: 18 }} />
                <span>{loading ? 'Logging out...' : 'Logout'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;