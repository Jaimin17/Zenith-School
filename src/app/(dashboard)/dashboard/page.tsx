import DashboardParentComponent from "../../../components/dashboard/DashboardParentComponent";
import { api } from "../../../api/api";
import { GET_PROFILE_DETAILS } from "../../../api/apiParams/auth";
import { JSX } from "react";

interface ProfileData {
    data?: any;
}

export default async function DashboardPage(): Promise<JSX.Element> {
    const profile: ProfileData = await api({
        endpoint: GET_PROFILE_DETAILS,
        payloadData: {},
        isServer: true,
    });

    return <DashboardParentComponent profile={profile?.data} />;
}