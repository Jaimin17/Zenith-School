"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { fetchAcademicYearsAllAction, fetchVisibleAcademicYearsAction } from "@/actions/admin";
import type { AcademicYear } from "@/types/schemas";

interface AcademicYearContextType {
    years: AcademicYear[];
    selectedYearId: string | null;
    setYear: (id: string) => void;
}

const AcademicYearContext = createContext<AcademicYearContextType>({
    years: [],
    selectedYearId: null,
    setYear: () => {},
});

export function AcademicYearProvider({
    children,
    initialYearId,
    role,
}: {
    children: ReactNode;
    initialYearId: string | null;
    role: string | null;
}) {
    const router = useRouter();
    const [years, setYears] = useState<AcademicYear[]>([]);
    const [selectedYearId, setSelectedYearId] = useState<string | null>(initialYearId);

    useEffect(() => {
        const fetchYears = role === "admin" || role === "teacher"
            ? fetchAcademicYearsAllAction
            : fetchVisibleAcademicYearsAction;

        fetchYears().then((res) => {
            if (res.success && res.data) {
                setYears(res.data);
                const active = res.data.find((y) => y.is_active) ?? res.data[0];
                const hasValidSelectedYear = !!initialYearId && res.data.some((y) => y.id === initialYearId);

                if (hasValidSelectedYear) {
                    setSelectedYearId(initialYearId);
                    return;
                }

                if (active) {
                    document.cookie = `selected_year_id=${active.id}; path=/; max-age=31536000`;
                    setSelectedYearId(active.id);
                }
            }
        });
    }, [initialYearId, role]);

    const setYear = (id: string) => {
        document.cookie = `selected_year_id=${id}; path=/; max-age=31536000`;
        setSelectedYearId(id);
        router.refresh();
    };

    return (
        <AcademicYearContext.Provider value={{ years, selectedYearId, setYear }}>
            {children}
        </AcademicYearContext.Provider>
    );
}

export function useAcademicYear() {
    return useContext(AcademicYearContext);
}
