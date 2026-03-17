"use client";

import { useAuth } from "@/contexts/authContext";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type UserRole = "admin" | "teacher" | "student" | "parent";

interface MenuItem {
  icon: string;
  label: string;
  href: string;
  visible: UserRole[];
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuItems: MenuSection[] = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Holidays",
        href: "/list/holidays",
        visible: ["admin", "teacher", "student", "parent"],
      },
      // {
      //   icon: "/message.png",
      //   label: "Messages",
      //   href: "/list/messages",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Banners",
        href: "/list/banners",
        visible: ["admin"],
      },
      {
        icon: "/announcement.png",
        label: "Photo Gallery",
        href: "/list/photo-gallery",
        visible: ["admin"],
      },
      {
        icon: "/announcement.png",
        label: "Testimonials",
        href: "/list/testimonials",
        visible: ["admin", "student"],
      },
      {
        icon: "/subject.png",
        label: "Academic Years",
        href: "/list/academic-years",
        visible: ["admin"],
      },
      {
        icon: "/student.png",
        label: "Bulk Promote",
        href: "/list/students/bulk-promote",
        visible: ["admin"],
      },
      {
        icon: "/announcement.png",
        label: "Achievements",
        href: "/list/achievements",
        visible: ["admin"],
      },
      {
        icon: "/announcement.png",
        label: "Sports Programs",
        href: "/list/sports-programs",
        visible: ["admin"],
      },
      {
        icon: "/announcement.png",
        label: "Job Openings",
        href: "/list/job-openings",
        visible: ["admin"],
      },
      {
        icon: "/announcement.png",
        label: "Job Applications",
        href: "/list/job-applications",
        visible: ["admin"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const homeRouteMap: Record<UserRole, string> = {
  admin: "/admin",
  teacher: "/teacher",
  student: "/student",
  parent: "/parent",
};

interface MenuProps {
  onNavigate?: () => void;
  /** When true, always show labels (e.g. in mobile drawer) */
  showLabels?: boolean;
}

const Menu: React.FC<MenuProps> = ({ onNavigate, showLabels = false }) => {
  const { role, logout, loading } = useAuth();
  const pathname = usePathname();

  const homeHref =
    role && homeRouteMap[role as UserRole]
      ? homeRouteMap[role as UserRole]
      : "/";

  const isActive = (itemLabel: string, itemHref: string): boolean => {
    const href = itemLabel === "Home" ? homeHref : itemHref;
    if (pathname === href) return true;
    return pathname.startsWith(href + "/");
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Box sx={{ mt: 2, fontSize: "14px", flex: 1, overflowY: "auto", minHeight: 0 }}>
      {menuItems.map((section) => (
        <Box key={section.title} sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {/* SECTION TITLE */}
          <Typography
            variant="body2"
            sx={{
              display: showLabels ? "block" : { xs: "none", lg: "block" },
              mt: 2,
              mb: 0.5,
              px: 2,
              fontWeight: 600,
              color: "text.secondary",
              letterSpacing: "0.08em",
              fontSize: "0.7rem",
            }}
          >
            {section.title}
          </Typography>

          <List disablePadding>
            {section.items.map((item) => {
              if (!item.visible.includes(role as UserRole)) return null;

              const href = item.label === "Home" ? homeHref : item.href;
              const active = isActive(item.label, item.href);

              // Handle logout differently
              if (item.label === "Logout") {
                return (
                  <ListItem key={item.label} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        onNavigate?.();
                        handleLogout();
                      }}
                      disabled={loading}
                      sx={{
                        borderRadius: "10px",
                        px: 2,
                        py: 1.25,
                        backgroundColor: "transparent",
                        color: "text.secondary",
                        "&:hover": {
                          backgroundColor: "action.hover",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                        <Image
                          src={item.icon}
                          alt={item.label}
                          width={20}
                          height={20}
                        />
                      </ListItemIcon>

                      <ListItemText
                        primary={loading ? "Logging out..." : item.label}
                        sx={{
                          display: showLabels ? "block" : { xs: "none", lg: "block" },
                          color: "inherit",
                          "& .MuiListItemText-primary": { fontWeight: 500 },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              }

              return (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton
                    component={Link}
                    href={href}
                    onClick={onNavigate}
                    sx={{
                      borderRadius: "10px",
                      px: 2,
                      py: 1.25,
                      backgroundColor: active ? "rgba(0, 150, 255, 0.12)" : "transparent",
                      color: active ? "#0096FF" : "text.secondary",
                      "&:hover": {
                        backgroundColor: active ? "rgba(0, 150, 255, 0.18)" : "rgba(0, 150, 255, 0.08)",
                        color: active ? "#0096FF" : "#0096FF",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                      <Image
                        src={item.icon}
                        alt={item.label}
                        width={20}
                        height={20}
                      />
                    </ListItemIcon>

                    <ListItemText
                      primary={item.label}
                      sx={{
                        display: showLabels ? "block" : { xs: "none", lg: "block" },
                        color: "inherit",
                        "& .MuiListItemText-primary": { fontWeight: 500 },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      ))}
    </Box>
  );
};

export default Menu;