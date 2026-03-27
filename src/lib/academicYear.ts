import { fetchAcademicYearsAllAction } from "@/actions/admin";
import type { AcademicYear } from "@/types/schemas";

export interface ResolvedAcademicYearContext {
  years: AcademicYear[];
  activeYear: AcademicYear | null;
  selectedYear: AcademicYear | null;
  resolvedYearId: string | null;
  fromDate?: string;
  toDate?: string;
}

export async function resolveAcademicYearContext(
  selectedYearId?: string | null,
): Promise<ResolvedAcademicYearContext> {
  const yearsResult = await fetchAcademicYearsAllAction();
  const years = yearsResult.data ?? [];
  const activeYear = years.find((year) => year.is_active) ?? years[0] ?? null;

  const selectedYear =
    (selectedYearId ? years.find((year) => year.id === selectedYearId) : null) ??
    activeYear;

  return {
    years,
    activeYear,
    selectedYear,
    resolvedYearId: selectedYear?.id ?? null,
    fromDate: selectedYear?.start_date,
    toDate: selectedYear?.end_date,
  };
}