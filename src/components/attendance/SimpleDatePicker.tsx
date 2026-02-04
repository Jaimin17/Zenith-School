"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SimpleDatePickerProps {
  currentDate: string;
  baseUrl: string;
}

const SimpleDatePicker = ({ currentDate, baseUrl }: SimpleDatePickerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleDateChange = (newDate: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("date", newDate);
    router.push(`${baseUrl}?${params.toString()}`);
  };

  const navigateDay = (delta: number) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + delta);
    handleDateChange(date.toISOString().split("T")[0]);
  };

  const formattedDate = new Date(currentDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isToday = currentDate === new Date().toISOString().split("T")[0];

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => navigateDay(-1)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        title="Previous day"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>

      <div className="flex items-center gap-3">
        <input
          type="date"
          value={currentDate}
          onChange={(e) => handleDateChange(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <span className="text-sm text-gray-600 hidden md:block">{formattedDate}</span>
        {isToday && (
          <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded">
            Today
          </span>
        )}
      </div>

      <button
        onClick={() => navigateDay(1)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        title="Next day"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>

      {!isToday && (
        <button
          onClick={() => handleDateChange(new Date().toISOString().split("T")[0])}
          className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
        >
          Today
        </button>
      )}
    </div>
  );
};

export default SimpleDatePicker;
