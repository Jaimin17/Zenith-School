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

const Menu: React.FC = () => {
  const { role, logout, loading } = useAuth();
  const pathname = usePathname();

  const homeHref =
    role && homeRouteMap[role as UserRole]
      ? homeRouteMap[role as UserRole]
      : "/";

  const isActive = (itemLabel: string, itemHref: string): boolean => {
    const href = itemLabel === "Home" ? homeHref : itemHref;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Box mt={2} fontSize="14px">
      {menuItems.map((section) => (
        <Box key={section.title} display="flex" flexDirection="column" gap={1}>
          {/* SECTION TITLE */}
          <Typography
            variant="body2"
            color="gray"
            sx={{ display: { xs: "none", lg: "block" }, mt: 2, mb: 1 }}
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
                      onClick={handleLogout}
                      disabled={loading}
                      sx={{
                        borderRadius: "8px",
                        px: 2,
                        py: 1,
                        backgroundColor: "transparent",
                        color: "gray",
                        "&:hover": {
                          backgroundColor: "rgba(0, 150, 255, 0.1)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 32, color: "inherit" }}>
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
                          display: { xs: "none", lg: "block" },
                          color: "inherit",
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
                    sx={{
                      borderRadius: "8px",
                      px: 2,
                      py: 1,
                      backgroundColor: active ? "rgba(0, 150, 255, 0.2)" : "transparent",
                      color: active ? "#0096FF" : "gray",
                      "&:hover": {
                        backgroundColor: active ? "rgba(0, 150, 255, 0.2)" : "rgba(0, 150, 255, 0.1)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32, color: "inherit" }}>
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
                        display: { xs: "none", lg: "block" },
                        color: "inherit",
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