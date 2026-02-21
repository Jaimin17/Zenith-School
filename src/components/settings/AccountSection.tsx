"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/authContext";
import { fetchUserProfileAction, updateProfileDetails, updateProfilePictureDetails } from "@/actions/admin";
import { getTeacherImageUrl, getStudentImageUrl } from "@/utils/imageHelpers";
import { api } from "@/api/api";
import { UPDATE_PROFILE_API } from "@/api/apiParams/auth";
import { toast } from "sonner";
import { User, Upload, Loader } from "lucide-react";
import type { UserProfile, TeacherProfile, StudentProfile, ParentProfile, AdminProfile } from "@/types/schemas";

const AccountSection = () => {
  const { role, user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const result = await fetchUserProfileAction();
        if (result.success && result.data) {
          setProfile(result.data);
          const baseProfile = result.data as ParentProfile | TeacherProfile | StudentProfile;
          if ("first_name" in baseProfile) {
            setFormData({
              first_name: baseProfile.first_name || "",
              last_name: baseProfile.last_name || "",
              email: baseProfile.email || "",
              phone: baseProfile.phone || "",
              address: baseProfile.address || "",
            });
          }
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    loadProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const response = await updateProfileDetails(formData);

      console.log("Update profile response:", response);

      if (!response.error && response.data) {
        toast.success(response.data || "Profile updated successfully");
        const result = await fetchUserProfileAction();
        if (result.success && result.data) {
          setProfile(result.data);
        }
      } else {
        toast.error(response.data || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file); // Backend expects 'file' as the field name

      const response = await updateProfilePictureDetails(uploadFormData);

      if (!response.error && response.data) {
        toast.success(response.data || "Profile picture updated successfully");
        const result = await fetchUserProfileAction();
        if (result.success && result.data) {
          setProfile(result.data);
        }
      } else {
        toast.error(response.error ? response.error : (response.data || "Failed to update profile picture"));
      }
    } catch (error: any) {
      console.error("Error uploading profile picture:", error);
      if (error?.response?.data?.detail) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("An error occurred while uploading profile picture");
      }
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const getProfileImage = () => {
    if (!profile) return "/noAvatar.png";
    if (role === "teacher" && "img" in profile) {
      return getTeacherImageUrl((profile as TeacherProfile).img);
    }
    if (role === "student" && "img" in profile) {
      return getStudentImageUrl((profile as StudentProfile).img);
    }
    return "/noAvatar.png";
  };

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateStr));
  };

  const baseProfile = profile as ParentProfile | TeacherProfile | StudentProfile | AdminProfile;
  const isAdmin = role === "admin";

  return (
    <div className="space-y-6">
      {/* Profile Picture Section */}
      {!isAdmin && (role === "teacher" || role === "student") && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-gray-400" />
            Profile Picture
          </h3>
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white border-2 border-gray-200">
              <Image
                src={getProfileImage()}
                alt="Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-3">Upload a new profile picture</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
              >
                {uploading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload Picture
                  </>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfileImageUpload}
                className="hidden"
              />
              <p className="text-xs text-gray-400 mt-2">Max file size: 5MB</p>
            </div>
          </div>
        </div>
      )}

      {/* Personal Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>

        <div className="space-y-4">
          {!isAdmin && role !== "admin" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {/* Username (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={isAdmin ? (baseProfile as AdminProfile)?.username || "" : (baseProfile as any)?.username || ""}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Account Creation Date (Read-only) */}
          {baseProfile && "created_at" in baseProfile && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Member Since
              </label>
              <input
                type="text"
                value={formatDate((baseProfile as any).created_at)}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>
          )}
        </div>

        {!isAdmin && role !== "admin" && (
          <button
            onClick={handleSaveProfile}
            disabled={loading}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors flex items-center gap-2" style={{
              marginTop: 15
            }}
          >
            {loading && <Loader className="w-4 h-4 animate-spin" />}
            {loading ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AccountSection;
