import { AdminProvider } from "@/contexts/adminContext";
import DashboardShell from "../../components/DashboardShell";
import AuthGuard from "../../hocs/AuthGuard";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import TerminalChatbot from "@/components/chatbot/TerminalChatbot";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <AuthGuard>
            <AdminProvider>
                <Toaster position="top-right" richColors />
                <DashboardShell>{children}</DashboardShell>
                {/*
                TerminalChatbot is rendered here — outside DashboardShell —
                so it floats over ALL admin pages via `position: fixed`.
                It will be visible no matter which admin route the user is on.
                */}
                <TerminalChatbot />
            </AdminProvider>
        </AuthGuard>
    );
}