"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";

interface User {
  role?: string;
  [key: string]: any;
}

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Public routes (no login required)
  const publicRoutes: string[] = [
    "/",
    "/Home",
    "/about",
    "/academics",
    "/admissions",
    "/alumni",
    "/careers",
    "/contact-us",
    "/gallery",
    "/overview",
    "/sports",
    "/why-zenith-school",
    "/tribute-to-our-founders",
  ];

  useEffect(() => {
    const raw = localStorage.getItem("user");

    // ✅ Case 1: Public route → always allow
    if (publicRoutes.some((p) => pathname?.startsWith(p))) {
      setIsAuthenticated(true);
      return;
    }

    // ✅ Case 2: Not logged in & not public → send home
    if (!raw) {
      router.replace("/");
      return;
    }

    // ✅ Case 3: Logged in → check role access
    try {
      const parsed: User = JSON.parse(raw);
      const role = parsed?.role;

      const isAdmin = role === "admin";
      const onAdminRoute = pathname?.startsWith("/Admin");
      const onUserRoute = ["/UserDashboard", "/AddMore"].some((p) =>
        pathname?.startsWith(p)
      );

      // 🔒 Role-based restrictions
      if (isAdmin && onUserRoute) {
        router.replace("/AdminDashboard");
        return;
      }
      if (!isAdmin && onAdminRoute) {
        router.replace("/UserDashboard");
        return;
      }

      setIsAuthenticated(true);
    } catch {
      router.replace("/");
    }
  }, [router, pathname]);

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;