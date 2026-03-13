"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { AcademicYear } from "@/types/schemas";
import { activateAcademicYearAction } from "@/actions/admin";
import { CheckCircle2, Calendar, Plus, X, Pencil, Check, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/api/api";
import { SAVE_ACADEMIC_YEAR_API, UPDATE_ACADEMIC_YEAR_API, SEED_STUDENTS_TO_YEAR_API } from "@/api/apiParams/admin";
import { seedStudentsToAcademicYearAction } from "@/actions/admin";

interface AcademicYearActionsProps {
    years: AcademicYear[];
}

interface FormData {
    year_label: string;
    start_date: string;
    end_date: string;
}

const emptyForm: FormData = { year_label: "", start_date: "", end_date: "" };

export default function AcademicYearActions({ years: initialYears }: AcademicYearActionsProps) {
    const router = useRouter();
    const [years, setYears] = useState<AcademicYear[]>(initialYears);

    // Create
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [createForm, setCreateForm] = useState<FormData>(emptyForm);
    const [creating, startCreate] = useTransition();

    // Edit
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<FormData>(emptyForm);
    const [saving, startSave] = useTransition();

    // Activate
    const [activating, startActivate] = useTransition();

    // Seed students
    const [seeding, startSeed] = useTransition();
    const [seedingId, setSeedingId] = useState<string | null>(null);

    function handleCreateChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCreateForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleEditChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function startEdit(year: AcademicYear) {
        setEditingId(year.id);
        setEditForm({
            year_label: year.year_label,
            start_date: year.start_date,
            end_date: year.end_date,
        });
    }

    function cancelEdit() {
        setEditingId(null);
        setEditForm(emptyForm);
    }

    function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        startCreate(async () => {
            try {
                const response = await api<AcademicYear>({
                    endpoint: { ...SAVE_ACADEMIC_YEAR_API, showToast: false },
                    payloadData: createForm,
                });
                if (response.error || !response.data) {
                    toast.error(response.message || "Failed to create academic year");
                    return;
                }
                toast.success(`Academic year "${response.data.year_label}" created`);
                setYears((prev) => [response.data!, ...prev]);
                setCreateForm(emptyForm);
                setShowCreateForm(false);
                router.refresh();
            } catch {
                toast.error("An unexpected error occurred");
            }
        });
    }

    function handleSaveEdit(yearId: string) {
        startSave(async () => {
            try {
                const response = await api<AcademicYear>({
                    endpoint: { ...UPDATE_ACADEMIC_YEAR_API, url: `api/v1/academic-years/${yearId}` },
                    payloadData: editForm,
                });
                if (response.error || !response.data) {
                    toast.error(response.message || "Failed to update academic year");
                    return;
                }
                toast.success(`Academic year "${response.data.year_label}" updated`);
                setYears((prev) => prev.map((y) => (y.id === yearId ? response.data! : y)));
                setEditingId(null);
                router.refresh();
            } catch {
                toast.error("An unexpected error occurred");
            }
        });
    }

    function handleActivate(yearId: string, yearLabel: string) {
        startActivate(async () => {
            const result = await activateAcademicYearAction(yearId);
            if (!result.success) {
                toast.error(result.error || "Failed to activate year");
                return;
            }
            toast.success(`"${yearLabel}" is now the active academic year`);
            setYears((prev) => prev.map((y) => ({ ...y, is_active: y.id === yearId })));
            router.refresh();
        });
    }

    function handleSeedStudents(yearId: string, yearLabel: string) {
        setSeedingId(yearId);
        startSeed(async () => {
            const result = await seedStudentsToAcademicYearAction(yearId);
            setSeedingId(null);
            if (!result.success) {
                toast.error(result.error || "Failed to sync students");
                return;
            }
            const { created, skipped } = result.data!;
            toast.success(`"${yearLabel}": ${created} student${created !== 1 ? "s" : ""} added, ${skipped} already enrolled`);
            router.refresh();
        });
    }

    const fmt = (d: string) =>
        new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(d));

    const inputCls = "w-full border border-gray-200 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-lamaSky bg-white";

    return (
        <div>
            {/* ── Top bar ────────────────────────────────────────────────── */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Academic Years</h1>
                <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                    <button
                        onClick={() => { setShowCreateForm((v) => !v); setEditingId(null); }}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow hover:bg-yellow-300 transition-colors"
                        title={showCreateForm ? "Cancel" : "New Academic Year"}
                    >
                        {showCreateForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* ── Create form ────────────────────────────────────────────── */}
            {showCreateForm && (
                <form
                    onSubmit={handleCreate}
                    className="mt-4 bg-lamaSkyLight border border-lamaSky rounded-md p-4 space-y-3"
                >
                    <h3 className="text-sm font-semibold text-gray-700">New Academic Year</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Year Label *</label>
                            <input
                                name="year_label" value={createForm.year_label}
                                onChange={handleCreateChange}
                                placeholder="e.g. 2025-2026" required
                                className={inputCls}
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Start Date *</label>
                            <input
                                type="date" name="start_date" value={createForm.start_date}
                                onChange={handleCreateChange} required
                                className={inputCls}
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">End Date *</label>
                            <input
                                type="date" name="end_date" value={createForm.end_date}
                                onChange={handleCreateChange} required
                                className={inputCls}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit" disabled={creating}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium disabled:opacity-50 transition-colors"
                        >
                            {creating ? "Saving..." : "Save"}
                        </button>
                        <button
                            type="button" onClick={() => setShowCreateForm(false)}
                            className="px-4 py-1.5 rounded-md text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* ── Table ──────────────────────────────────────────────────── */}
            {years.length === 0 ? (
                <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-md text-center">
                    <Calendar className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium mb-1">No academic years yet.</p>
                    <p className="text-gray-500 text-sm">Click + above to create the first academic year.</p>
                </div>
            ) : (
                <table className="w-full mt-4">
                    <thead>
                        <tr className="text-left text-gray-500 text-sm">
                            <th className="p-2 font-medium">Year Label</th>
                            <th className="p-2 font-medium hidden sm:table-cell">Start Date</th>
                            <th className="p-2 font-medium hidden sm:table-cell">End Date</th>
                            <th className="p-2 font-medium">Status</th>
                            <th className="p-2 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {years.map((year) =>
                            editingId === year.id ? (
                                // ── Edit row ──
                                <tr key={year.id} className="border-b border-gray-200 bg-lamaYellowLight text-sm">
                                    <td className="p-2">
                                        <input
                                            name="year_label" value={editForm.year_label}
                                            onChange={handleEditChange}
                                            placeholder="Year Label"
                                            className={inputCls}
                                        />
                                    </td>
                                    <td className="p-2 hidden sm:table-cell">
                                        <input
                                            type="date" name="start_date" value={editForm.start_date}
                                            onChange={handleEditChange}
                                            className={inputCls}
                                        />
                                    </td>
                                    <td className="p-2 hidden sm:table-cell">
                                        <input
                                            type="date" name="end_date" value={editForm.end_date}
                                            onChange={handleEditChange}
                                            className={inputCls}
                                        />
                                    </td>
                                    <td className="p-2">
                                        {year.is_active ? (
                                            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                                                <CheckCircle2 className="w-3 h-3" /> Active
                                            </span>
                                        ) : (
                                            <span className="text-xs text-gray-400">Inactive</span>
                                        )}
                                    </td>
                                    <td className="p-2">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleSaveEdit(year.id)}
                                                disabled={saving}
                                                className="w-7 h-7 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 text-green-700 transition-colors disabled:opacity-50"
                                                title="Save changes"
                                            >
                                                <Check className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                                                title="Cancel"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                // ── View row ──
                                <tr key={year.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
                                    <td className="p-2 font-medium">{year.year_label}</td>
                                    <td className="p-2 text-gray-500 hidden sm:table-cell">{fmt(year.start_date)}</td>
                                    <td className="p-2 text-gray-500 hidden sm:table-cell">{fmt(year.end_date)}</td>
                                    <td className="p-2">
                                        {year.is_active ? (
                                            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                                                <CheckCircle2 className="w-3 h-3" /> Active
                                            </span>
                                        ) : (
                                            <span className="text-xs text-gray-400">Inactive</span>
                                        )}
                                    </td>
                                    <td className="p-2">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => startEdit(year)}
                                                className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky hover:bg-blue-200 transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                            </button>
                                            {!year.is_active && (
                                                <button
                                                    onClick={() => handleActivate(year.id, year.year_label)}
                                                    disabled={activating}
                                                    className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple hover:bg-purple-200 transition-colors disabled:opacity-50"
                                                    title="Set as Active Year"
                                                >
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleSeedStudents(year.id, year.year_label)}
                                                disabled={seeding && seedingId === year.id}
                                                className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaYellow hover:bg-yellow-300 transition-colors disabled:opacity-50"
                                                title="Sync current students into this academic year"
                                            >
                                                <Users className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}
