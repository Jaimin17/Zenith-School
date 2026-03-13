import { fetchAcademicYearsAction } from "@/actions/admin";
import { requireAuth } from "@/lib/auth/serverAuth";
import type { AcademicYear } from "@/types/schemas";
import { Suspense } from "react";
import AcademicYearActions from "./AcademicYearActions";

// ── Skeleton ──────────────────────────────────────────────────────────────────

const TableSkeleton = () => (
    <div className="space-y-3 mt-4">
        {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 p-4 border-b border-gray-200">
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
                <div className="w-20 h-8 bg-gray-200 rounded"></div>
            </div>
        ))}
    </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────

const AcademicYearsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
    const params = await searchParams;
    const auth = await requireAuth();

    if (auth.role !== "admin") {
        return (
            <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
                <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-md">
                    <h2 className="text-lg font-semibold text-red-700 mb-2">Access Denied</h2>
                    <p className="text-red-600 text-sm">Only admins can manage academic years.</p>
                </div>
            </div>
        );
    }

    const page = params.page ? parseInt(params.page) : 1;
    const result = await fetchAcademicYearsAction(page);
    const years: AcademicYear[] = result.data?.data ?? [];

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <Suspense fallback={<TableSkeleton />}>
                <AcademicYearActions years={years} />
            </Suspense>
        </div>
    );
};

export default AcademicYearsPage;
