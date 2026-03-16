"use client";

import { useState, useTransition } from "react";
import { updateJobApplicationStatus } from "@/lib/actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { ApplicationStatus } from "@/types/schemas";

const STATUS_CONFIG: Record<
  ApplicationStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  pending: {
    label: "Pending",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    dot: "bg-yellow-400",
  },
  reviewed: {
    label: "Reviewed",
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-400",
  },
  accepted: {
    label: "Accepted",
    bg: "bg-green-50",
    text: "text-green-700",
    dot: "bg-green-500",
  },
  rejected: {
    label: "Rejected",
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-400",
  },
};

const ALL_STATUSES: ApplicationStatus[] = ["pending", "reviewed", "accepted", "rejected"];

const JobApplicationStatusSelect = ({
  applicationId,
  currentStatus,
}: {
  applicationId: string;
  currentStatus: ApplicationStatus;
}) => {
  const [status, setStatus] = useState<ApplicationStatus>(currentStatus);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const cfg = STATUS_CONFIG[status];

  const handleSelect = (newStatus: ApplicationStatus) => {
    if (newStatus === status) {
      setOpen(false);
      return;
    }
    setOpen(false);
    startTransition(async () => {
      const prev = status;
      setStatus(newStatus);
      const result = await updateJobApplicationStatus(applicationId, newStatus);
      if (result.error) {
        setStatus(prev);
        toast.error(result.message || "Failed to update status");
      } else {
        toast.success(`Status updated to "${STATUS_CONFIG[newStatus].label}"`);
      }
    });
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text} border border-transparent hover:border-current transition-colors`}
      >
        {isPending ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
        )}
        {cfg.label}
        <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 z-20 bg-white rounded-xl shadow-lg border border-gray-100 min-w-[130px] py-1 overflow-hidden">
            {ALL_STATUSES.map((s) => {
              const c = STATUS_CONFIG[s];
              return (
                <button
                  key={s}
                  onClick={() => handleSelect(s)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors hover:bg-gray-50 ${
                    s === status ? `${c.text} ${c.bg}` : "text-gray-700"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                  {c.label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default JobApplicationStatusSelect;
