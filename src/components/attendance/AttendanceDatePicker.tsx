"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AttendanceDatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  onClose: () => void;
}

const AttendanceDatePicker = ({
  selectedDate,
  onDateChange,
  onClose,
}: AttendanceDatePickerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const currentDate = new Date(selectedDate);
  const today = new Date();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    newDate.setDate(1);
    onDateChange(newDate.toISOString().split('T')[0]);
  };

  const selectDay = (day: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(day);
    onDateChange(newDate.toISOString().split('T')[0]);
  };

  const isToday = (day: number) => {
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    const selected = new Date(selectedDate);
    return (
      selected.getDate() === day &&
      selected.getMonth() === currentDate.getMonth() &&
      selected.getFullYear() === currentDate.getFullYear()
    );
  };

  const isFuture = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date > today;
  };

  const days = [];
  for (let i = 0; i < startingDay; i++) {
    days.push(<div key={`empty-${i}`} className="w-9 h-9" />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const future = isFuture(day);
    days.push(
      <button
        key={day}
        onClick={() => !future && selectDay(day)}
        disabled={future}
        className={`w-9 h-9 rounded-full text-sm font-medium transition-colors
          ${isSelected(day) ? "bg-blue-500 text-white" : ""}
          ${isToday(day) && !isSelected(day) ? "bg-blue-100 text-blue-600" : ""}
          ${!isSelected(day) && !isToday(day) && !future ? "hover:bg-gray-100" : ""}
          ${future ? "text-gray-300 cursor-not-allowed" : "text-gray-700"}
        `}
      >
        {day}
      </button>
    );
  }

  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Quick date buttons
  const quickDates = [
    { label: "Today", date: today },
    { label: "Yesterday", date: new Date(today.getTime() - 86400000) },
    { label: "Last Week", date: new Date(today.getTime() - 7 * 86400000) },
  ];

  return (
    <div
      ref={ref}
      className="absolute right-0 top-12 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-80"
    >
      {/* Quick Date Buttons */}
      <div className="flex gap-2 mb-4">
        {quickDates.map((qd) => (
          <button
            key={qd.label}
            onClick={() => onDateChange(qd.date.toISOString().split('T')[0])}
            className="flex-1 px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {qd.label}
          </button>
        ))}
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <span className="font-semibold text-gray-800">{monthYear}</span>
        <button
          onClick={() => changeMonth(1)}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="w-9 h-9 flex items-center justify-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
    </div>
  );
};

export default AttendanceDatePicker;
