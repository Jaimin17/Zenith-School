"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ChildItem } from "@/types/schemas";
import { getStudentImageUrl } from "@/utils/imageHelpers";

interface ChildSelectorProps {
    children: ChildItem[];
    /** The currently-selected child id (from URL params, passed down by the server page) */
    selectedChildId: string | null;
}

export default function ChildSelector({ children, selectedChildId }: ChildSelectorProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    if (children.length <= 1) return null;

    function handleSelect(childId: string) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("childId", childId);
        // Reset yearId when switching children so the default active year is used
        params.delete("yearId");
        router.push(`?${params.toString()}`);
    }

    return (
        <div className="bg-white p-3 rounded-md flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-600 mr-1">View child:</span>
            {children.map((child) => {
                const isSelected = child.id === selectedChildId;
                return (
                    <button
                        key={child.id}
                        onClick={() => handleSelect(child.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-colors ${
                            isSelected
                                ? "bg-lamaSky border-lamaSky text-white"
                                : "bg-white border-gray-200 text-gray-700 hover:border-lamaSky hover:text-lamaSky"
                        }`}
                    >
                        <Image
                            src={getStudentImageUrl(child.img)}
                            alt={`${child.first_name} ${child.last_name}`}
                            width={22}
                            height={22}
                            className="rounded-full object-cover"
                        />
                        <span>
                            {child.first_name} {child.last_name}
                        </span>
                        {child.status === "graduated" && (
                            <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                                Graduated
                            </span>
                        )}
                        {child.status === "inactive" && (
                            <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
                                Inactive
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
