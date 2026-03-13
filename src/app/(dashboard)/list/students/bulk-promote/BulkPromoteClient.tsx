"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { AcademicYear, BulkPromoteResponse, PromoteStudentResult } from "@/types/schemas";
import { bulkPromoteStudentsAction } from "@/actions/admin";
import { GraduationCap, ArrowRight, CheckCircle2, AlertCircle, SkipForward, XCircle } from "lucide-react";

interface BulkPromoteClientProps {
    years: AcademicYear[];
}

const statusIcon: Record<PromoteStudentResult["action"], React.ReactNode> = {
    promoted: <CheckCircle2 className="w-4 h-4 text-green-500" />,
    graduated: <GraduationCap className="w-4 h-4 text-blue-500" />,
    skipped: <SkipForward className="w-4 h-4 text-gray-400" />,
    error: <XCircle className="w-4 h-4 text-red-500" />,
};

const statusColor: Record<PromoteStudentResult["action"], string> = {
    promoted: "text-green-700",
    graduated: "text-blue-700",
    skipped: "text-gray-500",
    error: "text-red-600",
};

export default function BulkPromoteClient({ years }: BulkPromoteClientProps) {
    const activeYear = years.find((y) => y.is_active);
    const [fromYearId, setFromYearId] = useState(activeYear?.id ?? years[0]?.id ?? "");
    const [toYearId, setToYearId] = useState(years.find((y) => !y.is_active)?.id ?? "");
    const [isDryRun, setIsDryRun] = useState(true);
    const [result, setResult] = useState<BulkPromoteResponse | null>(null);
    const [pending, startTransition] = useTransition();

    const toYearOptions = years.filter((y) => y.id !== fromYearId);

    function handleRun() {
        if (!fromYearId || !toYearId) {
            toast.error("Please select both From and To academic years");
            return;
        }
        if (fromYearId === toYearId) {
            toast.error("From and To years must be different");
            return;
        }
        startTransition(async () => {
            const res = await bulkPromoteStudentsAction({
                from_year_id: fromYearId,
                to_year_id: toYearId,
                dry_run: isDryRun,
            });
            if (!res.success || !res.data) {
                toast.error(res.error || "Promotion failed");
                return;
            }
            console.log(res.data);
            setResult(res.data);
            console.log("Promotion results:", res.data);
            if (isDryRun) {
                toast.info(`Dry run complete — ${res.data.total} students would be processed`);
            } else {
                toast.success(`Promotion complete — ${res.data.promoted_count} promoted, ${res.data.graduated_count} graduated`);
            }
        });
    }

    return (
        <div className="space-y-6">
            {/* Configuration */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">From Academic Year</label>
                        <select
                            value={fromYearId}
                            onChange={(e) => setFromYearId(e.target.value)}
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-lamaSky"
                        >
                            <option value="">Select year...</option>
                            {years.map((y) => (
                                <option key={y.id} value={y.id}>
                                    {y.year_label}
                                    {y.is_active ? " (Current)" : ""}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">To Academic Year</label>
                        <select
                            value={toYearId}
                            onChange={(e) => setToYearId(e.target.value)}
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-lamaSky"
                        >
                            <option value="">Select year...</option>
                            {toYearOptions.map((y) => (
                                <option key={y.id} value={y.id}>
                                    {y.year_label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="dry-run"
                        checked={isDryRun}
                        onChange={(e) => setIsDryRun(e.target.checked)}
                        className="rounded border-gray-300 text-lamaSky focus:ring-lamaSky"
                    />
                    <label htmlFor="dry-run" className="text-sm text-gray-600">
                        Dry run (preview only, no changes saved)
                    </label>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleRun}
                        disabled={pending || !fromYearId || !toYearId}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 transition-colors ${
                            isDryRun
                                ? "bg-lamaYellow hover:bg-yellow-300"
                                : "bg-lamaSky text-white hover:bg-blue-400"
                        }`}
                    >
                        <ArrowRight className="w-4 h-4" />
                        {pending ? "Running..." : isDryRun ? "Preview Promotion" : "Execute Promotion"}
                    </button>
                    {!isDryRun && (
                        <span className="text-xs text-amber-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            This will permanently update student records
                        </span>
                    )}
                </div>
            </div>

            {/* Results */}
            {result && (
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <h2 className="font-medium text-sm">{isDryRun ? "Preview Results" : "Promotion Results"}</h2>
                        {isDryRun && (
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                                Dry Run
                            </span>
                        )}
                    </div>

                    {/* Summary badges */}
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            Total: {result.promoted_count + result.graduated_count + result.skipped_count + result.error_count}
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            Promoted: {result.promoted_count}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            Graduated: {result.graduated_count}
                        </span>
                        <span className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded border">
                            Skipped: {result.skipped_count}
                        </span>
                        {result.error_count > 0 && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                                Errors: {result.error_count}
                            </span>
                        )}
                    </div>

                    {/* Per-student table */}
                    <div className="border border-gray-200 rounded-md overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-xs text-gray-500">
                                    <th className="text-left py-2 px-3 font-medium">Student</th>
                                    <th className="text-left py-2 px-3 font-medium hidden sm:table-cell">From</th>
                                    <th className="text-left py-2 px-3 font-medium hidden sm:table-cell">To</th>
                                    <th className="text-left py-2 px-3 font-medium">Status</th>
                                    <th className="text-left py-2 px-3 font-medium hidden md:table-cell">Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.results.map((r) => (
                                    <tr key={r.student_id} className="border-t border-gray-100 hover:bg-gray-50">
                                        <td className="py-2 px-3">{r.student_name}</td>
                                        <td className="py-2 px-3 text-gray-500 hidden sm:table-cell">
                                            {r.previous_class_name ?? "—"}
                                        </td>
                                        <td className="py-2 px-3 text-gray-500 hidden sm:table-cell">
                                            {r.class_assigned ?? "—"}
                                        </td>
                                        <td className="py-2 px-3">
                                            <span className={`flex items-center gap-1 ${statusColor[r.action]}`}>
                                                {statusIcon[r.action]}
                                                <span className="capitalize">{r.action}</span>
                                            </span>
                                        </td>
                                        <td className="py-2 px-3 text-gray-400 text-xs hidden md:table-cell">
                                            {r.detail ?? "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
