"use client";

import { useAuth } from "@/contexts/authContext";

export default function DashboardParentComponent({ profile }) {
    const { user, userRole } = useAuth();

    console.log("auth user:", user, userRole);
    console.log("profile:", profile);

    return (
        <div>
            Welcome {user?.name}!
            <br />
            Profile Email: {profile?.email}
        </div>
    );
}
