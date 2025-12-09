import DashboardParentComponent from "@/components/dashboard/DashboardParentComponent";
import { api } from "@/api/api";
import { GET_PROFILE_DETAILS } from "@/api/apiParams/auth";

export default async function DashboardPage() {
    const profile = await api({
        endpoint: GET_PROFILE_DETAILS,
        payloadData: {},
        isServer: true, // optional if you detect automatically
    });

    return <DashboardParentComponent profile={profile?.data} />;
}
