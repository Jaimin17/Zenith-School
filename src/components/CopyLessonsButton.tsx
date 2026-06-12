"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Copy, AlertCircle } from "lucide-react";
import { copyLessonsFromPreviousYearAction } from "@/actions/admin";

interface CopyLessonsButtonProps {
    targetYearId: string;
}

export default function CopyLessonsButton({ targetYearId }: CopyLessonsButtonProps) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleCopy = () => {
        setError(null);
        startTransition(async () => {
            const result = await copyLessonsFromPreviousYearAction(targetYearId);
            if (result.success) {
                setShowConfirm(false);
                router.refresh();
            } else {
                setError(result.error || "Failed to copy lessons.");
            }
        });
    };

    return (
        <>
            <button
                onClick={() => { setShowConfirm(true); setError(null); }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
            >
                <Copy className="w-4 h-4" />
                Copy from Previous Year
            </button>

            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                <Copy className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                                <h2 className="text-base font-semibold text-gray-900">Copy Lessons from Previous Year</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    All lessons from the immediately previous academic year will be copied into this year.
                                    Only lessons whose teachers are still active will be copied.
                                </p>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-md">
                                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => { setShowConfirm(false); setError(null); }}
                                disabled={isPending}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCopy}
                                disabled={isPending}
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {isPending ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                        Copying...
                                    </>
                                ) : (
                                    "Yes, Copy Lessons"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
