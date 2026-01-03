"use client";

import { useAuth } from "@/contexts/authContext";
import React from "react";

interface Profile {
  email?: string;
  [key: string]: any;
}

interface DashboardParentComponentProps {
  profile: Profile;
}

const DashboardParentComponent: React.FC<DashboardParentComponentProps> = ({ profile }) => {
  const { user, role } = useAuth();

  console.log("auth user:", user, role);
  console.log("profile:", profile);

  return (
    <div>
      Welcome {user?.name}!
      <br />
      Profile Email: {profile?.email}
    </div>
  );
};

export default DashboardParentComponent;