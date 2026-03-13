import { fetchAcademicYearsAllAction } from "@/actions/admin";
import { requireAuth } from "@/lib/auth/serverAuth";
import BulkPromoteClient from "./BulkPromoteClient";

const BulkPromotePage = async () => {
    const auth = await requireAuth();

    if (auth.role !== "admin") {
        return (
            <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
                <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-md">
                    <h2 className="text-lg font-semibold text-red-700 mb-2">Access Denied</h2>
                    <p className="text-red-600 text-sm">Only admins can perform bulk promotions.</p>
                </div>
            </div>
        );
    }

    const yearsResult = await fetchAcademicYearsAllAction();
    const years = yearsResult.data;

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="mb-4">
                <h1 className="text-lg font-semibold">Bulk Student Promotion</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Promote all active students from one academic year to the next. Students in the
                    highest grade will be marked as graduated. Class assignment follows section
                    matching (e.g., 9-A → 10-A).
                </p>
            </div>
            <BulkPromoteClient years={years} />
        </div>
    );
};

export default BulkPromotePage;
