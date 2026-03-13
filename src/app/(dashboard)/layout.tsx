import { AdminProvider } from "@/contexts/adminContext";
import { AcademicYearProvider } from "@/contexts/AcademicYearContext";
import DashboardShell from "../../components/DashboardShell";
import AuthGuard from "../../hocs/AuthGuard";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import TerminalChatbot from "@/components/chatbot/TerminalChatbot";
import { cookies } from "next/headers";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const cookieStore = await cookies();
    const selectedYearId = cookieStore.get("selected_year_id")?.value ?? null;

    return (
        <AuthGuard>
            <AdminProvider>
                <AcademicYearProvider initialYearId={selectedYearId}>
                    <Toaster position="top-right" richColors />
                    <DashboardShell>{children}</DashboardShell>
                    {/*
                    TerminalChatbot is rendered here — outside DashboardShell —
                    so it floats over ALL admin pages via `position: fixed`.
                    It will be visible no matter which admin route the user is on.
                    */}
                    <TerminalChatbot />
                </AcademicYearProvider>
            </AdminProvider>
        </AuthGuard>
    );
}