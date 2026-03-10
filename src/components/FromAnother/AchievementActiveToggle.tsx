"use client";

import { useState, useTransition } from "react";
import { toggleAchievementActive } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AchievementActiveToggle = ({
  achievementId,
  isActive,
}: {
  achievementId: string;
  isActive: boolean;
}) => {
  const [active, setActive] = useState(isActive);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggle = () => {
    const newState = !active;
    setActive(newState);

    startTransition(async () => {
      const result = await toggleAchievementActive(achievementId);
      if (result.success) {
        toast.success(result.message || "Achievement status updated");
        router.refresh();
      } else {
        setActive(!newState);
        toast.error(result.message || "Failed to update achievement status");
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      title={active ? "Click to deactivate" : "Click to activate"}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed ${
        active ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm ${
          active ? "translate-x-6" : "translate-x-1"
        }`}
      />
      {isPending && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </span>
      )}
    </button>
  );
};

export default AchievementActiveToggle;
