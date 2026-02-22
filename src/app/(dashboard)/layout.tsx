import { AdminProvider } from "@/contexts/adminContext";
import DashboardShell from "../../components/DashboardShell";
import AuthGuard from "../../hocs/AuthGuard";
import { ReactNode } from "react";
import { Toaster } from "sonner";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <AuthGuard>
            <AdminProvider>
                <Toaster position="top-right" richColors />
                <DashboardShell>{children}</DashboardShell>
            </AdminProvider>
        </AuthGuard>
    );
}