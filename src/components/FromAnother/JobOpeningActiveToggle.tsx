"use client";

import { useOptimistic, useTransition } from "react";
import { toggleJobOpeningStatus } from "@/lib/actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const JobOpeningActiveToggle = ({
  openingId,
  isActive,
}: {
  openingId: string;
  isActive: boolean;
}) => {
  const [optimisticActive, setOptimisticActive] = useOptimistic(isActive);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      setOptimisticActive(!optimisticActive);
      const result = await toggleJobOpeningStatus(openingId);
      if (result.error) {
        toast.error(result.message || "Failed to update status");
      } else {
        toast.success(`Job opening ${!optimisticActive ? "activated" : "deactivated"}`);
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      title={optimisticActive ? "Deactivate" : "Activate"}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        optimisticActive ? "bg-green-500" : "bg-gray-300"
      } ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 text-white absolute left-1/2 -translate-x-1/2 animate-spin" />
      ) : (
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
            optimisticActive ? "translate-x-6" : "translate-x-1"
          }`}
        />
      )}
    </button>
  );
};

export default JobOpeningActiveToggle;
