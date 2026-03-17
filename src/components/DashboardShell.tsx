"use client";

import Menu from "@/components/Menu";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Menu as MenuIcon } from "lucide-react";
import { Drawer, IconButton, useMediaQuery } from "@mui/material";

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Tailwind `lg` starts at 1024px; keep JS and CSS breakpoints in sync.
  const isDesktop = useMediaQuery("(min-width:1024px)");

  const openDrawer = () => {
    if (!isDesktop) setDrawerOpen(true);
  };
  const closeDrawer = () => setDrawerOpen(false);

  useEffect(() => {
    // Ensure the mobile drawer never overlays the desktop fixed sidebar.
    if (isDesktop && drawerOpen) {
      setDrawerOpen(false);
    }
  }, [isDesktop, drawerOpen]);

  return (
    <div className="h-screen flex bg-[#F7F8FA]">
      {/* Desktop sidebar - visible lg and up */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 xl:w-72 flex-shrink-0 bg-white border-r border-gray-200/80 p-4 overflow-y-auto shadow-sm">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2 flex-shrink-0"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold text-gray-800">SchooLama</span>
        </Link>
        <Menu />
      </aside>


      {/* Mobile drawer - only below lg (1024px); Tailwind breakpoint matches sidebar */}
      <div className="lg:hidden">
        <Drawer
          anchor="left"
          open={!isDesktop && drawerOpen}
          onClose={closeDrawer}
          PaperProps={{
            sx: {
              width: 280,
              maxWidth: "85vw",
              borderRight: "1px solid",
              borderColor: "divider",
              boxSizing: "border-box",
            },
          }}
          ModalProps={{
            keepMounted: false,
            slotProps: { backdrop: { sx: { backgroundColor: "rgba(0,0,0,0.3)" } } },
          }}
        >
          <div className="flex flex-col h-full p-4 pt-6 bg-white overflow-y-auto">
            <Link
              href="/"
              className="flex items-center gap-2 flex-shrink-0 mb-2"
              onClick={closeDrawer}
            >
              <Image src="/logo.png" alt="logo" width={32} height={32} />
              <span className="font-bold text-gray-800">SchooLama</span>
            </Link>
            <Menu onNavigate={closeDrawer} showLabels />
          </div>
        </Drawer>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar: hamburger (mobile/tablet) + Sidebar */}
        <div className="flex items-center flex-shrink-0 bg-white border-b border-gray-200/80 shadow-sm">
          {!isDesktop && (
            <IconButton
              onClick={openDrawer}
              className="ml-1 mr-0.5"
              aria-label="Open menu"
            >
              <MenuIcon className="w-6 h-6 text-gray-600" />
            </IconButton>
          )}
          <div className="flex-1 min-w-0">
            <Sidebar />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
