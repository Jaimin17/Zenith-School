"use client";

import React, { useState, useEffect } from "react";
import { Palette, Sun, Moon, Globe } from "lucide-react";

const AppearanceSection = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [language, setLanguage] = useState("en");
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Default to system
      setTheme("system");
      applyTheme("system");
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const applyTheme = (themeToApply: "light" | "dark" | "system") => {
    const htmlElement = document.documentElement;

    if (themeToApply === "dark") {
      htmlElement.classList.add("dark");
    } else if (themeToApply === "light") {
      htmlElement.classList.remove("dark");
    } else {
      // System theme
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
      }
    }
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  // Prevent flash of unstyled content
  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Theme Selection */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 transition-colors">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          Theme
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Light Theme */}
          <div
            onClick={() => handleThemeChange("light")}
            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${theme === "light"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-white border border-gray-300 flex items-center justify-center shadow-sm">
                <Sun className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Light</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Bright and clean</p>
              </div>
            </div>
            {theme === "light" && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>

          {/* Dark Theme */}
          <div
            onClick={() => handleThemeChange("dark")}
            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${theme === "dark"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center shadow-sm">
                <Moon className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Dark</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Easy on the eyes</p>
              </div>
            </div>
            {theme === "dark" && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>

          {/* System Theme */}
          <div
            onClick={() => handleThemeChange("system")}
            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${theme === "system"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white to-gray-900 flex items-center justify-center shadow-sm border border-gray-300">
                <span className="text-xs font-bold text-gray-600">AUTO</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">System</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Match your device</p>
              </div>
            </div>
            {theme === "system" && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
        </div>

        {/* Theme Preview */}
        <div className="mt-6 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
          <div className="space-y-2">
            <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded"></div>
            <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded w-3/4"></div>
            <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      {/* Language Selection */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 transition-colors">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          Language
        </h3>

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg mb-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            Language customization is currently disabled. English is the default language.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            disabled
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed focus:outline-none"
          >
            <option value="en">English (Default)</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="pt">Portuguese</option>
          </select>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            This feature will be available in future updates.
          </p>
        </div>
      </div>

      {/* Display Preferences */}
      {/* <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Display Preferences</h3>

        <div className="space-y-4"> */}
      {/* Items Per Page */}
      {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Items Per Page
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" defaultValue="25">
              <option value="10">10 items</option>
              <option value="25">
                25 items
              </option>
              <option value="50">50 items</option>
              <option value="100">100 items</option>
            </select>
          </div> */}

      {/* Compact View */}
      {/* <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Compact View</p>
              <p className="text-sm text-gray-500">Display more items in a compact layout</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div> */}

      {/* Show Animations */}
      {/* <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Show Animations</p>
              <p className="text-sm text-gray-500">Enable smooth transitions and animations</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>
        </div>
      </div> */}

      {/* Save Button */}
      <button
        onClick={() => {
          // Save preferences (already saved via localStorage)
          alert("Preferences saved successfully!");
        }}
        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-sm hover:shadow-md"
      >
        Save Preferences
      </button>
    </div>
  );
};

export default AppearanceSection;