'use client'

import { useAuth } from "@/contexts/authContext";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
    {
        title: "MENU",
        items: [
            {
                icon: "/home.png",
                label: "Home",
                href: "/", // based on the role i want to change the page like /teacher /admin /student or /parent
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
                icon: "/message.png",
                label: "Messages",
                href: "/list/messages",
                visible: ["admin", "teacher", "student", "parent"],
            },
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

const homeRouteMap = {
    admin: "/admin",
    teacher: "/teacher",
    student: "/student",
    parent: "/parent",
};

const Menu = () => {
    const { role } = useAuth();

    const homeHref =
        role && homeRouteMap[role]
            ? homeRouteMap[role]
            : "/";

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
                            if (!item.visible.includes(role)) return null;

                            const href =
                                item.label === "Home"
                                    ? homeHref
                                    : item.href;

                            return (
                                <ListItem key={item.label} disablePadding>
                                    <ListItemButton
                                        component={Link}
                                        href={href}
                                        sx={{
                                            borderRadius: "8px",
                                            px: 2,
                                            py: 1,
                                            "&:hover": {
                                                backgroundColor: "rgba(0, 150, 255, 0.1)",
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 32 }}>
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
                                                color: "gray",
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
