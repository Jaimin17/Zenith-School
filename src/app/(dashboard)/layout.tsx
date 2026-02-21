import { AdminProvider } from "@/contexts/adminContext";
import Menu from "../../components/Menu";
import Sidebar from "../../components/Sidebar";
import AuthGuard from "../../hocs/AuthGuard";
import Image from "next/image";
import Link from "next/link";
import { JSX, ReactNode } from "react";
import { Toaster } from "sonner";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <AuthGuard>
            <AdminProvider>
                <Toaster position="top-right" richColors />
                <div className="h-screen flex">
                    {/* LEFT */}
                    <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 overflow-y-auto">
                        <Link
                            href="/"
                            className="flex items-center justify-center lg:justify-start gap-2"
                        >
                            <Image src="/logo.png" alt="logo" width={32} height={32} />
                            <span className="hidden lg:block font-bold">SchooLama</span>
                        </Link>
                        <Menu />
                    </div>
                    {/* RIGHT */}
                    <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
                        <Sidebar />
                        {children}
                    </div>
                </div>
            </AdminProvider>
        </AuthGuard>
    );
}