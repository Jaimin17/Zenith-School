"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AcademicYear } from "@/types/schemas";
import { ChevronDown } from "lucide-react";

interface AcademicYearSelectorProps {
    years: AcademicYear[];
    /** Currently selected year id (from URL params, passed down by server page) */
    selectedYearId: string | null;
}

export default function AcademicYearSelector({ years, selectedYearId }: AcademicYearSelectorProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    if (years.length === 0) return null;

    const activeYear = years.find((y) => y.is_active);
    const effectiveSelectedId = selectedYearId ?? activeYear?.id ?? years[0]?.id;

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const yearId = e.target.value;
        const params = new URLSearchParams(searchParams.toString());
        params.set("yearId", yearId);
        router.push(`?${params.toString()}`);
    }

    return (
        <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600 whitespace-nowrap">
                Academic Year:
            </label>
            <div className="relative">
                <select
                    value={effectiveSelectedId ?? ""}
                    onChange={handleChange}
                    className="appearance-none bg-white border border-gray-200 rounded-md pl-3 pr-8 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-lamaSky cursor-pointer"
                >
                    {years.map((year) => (
                        <option key={year.id} value={year.id}>
                            {year.year_label}
                            {year.is_active ? " (Current)" : ""}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
        </div>
    );
}
