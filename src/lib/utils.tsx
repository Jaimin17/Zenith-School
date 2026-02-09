import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Parse a time string into { hours, minutes, seconds }.
 * Handles formats: "HH:MM", "HH:MM:SS", "HH:MM:SS.sssZ", or full ISO datetime.
 */
function parseTime(timeStr: string): { hours: number; minutes: number; seconds: number } {
  // If it's a full ISO datetime string (contains "T"), extract the time part
  const timePart = timeStr.includes("T") ? timeStr.split("T")[1] : timeStr;

  // Remove trailing "Z" or timezone offset, then split by ":"
  const cleaned = timePart.replace(/Z$/, "").replace(/[+-]\d{2}:\d{2}$/, "");
  const parts = cleaned.split(":");

  return {
    hours: parseInt(parts[0], 10) || 0,
    minutes: parseInt(parts[1], 10) || 0,
    seconds: parseInt(parts[2], 10) || 0, // "45.482" → parseInt gives 45
  };
}

export function adjustScheduleToCurrentWeek(
  schedule: { title: string; day: string; start: string; end: string }[]
): { title: string; start: Date; end: Date }[] {
  const now = new Date();
  const currentWeekStart = new Date(now);
  
  // Get start of current week (Sunday = 0)
  currentWeekStart.setDate(now.getDate() - now.getDay());
  currentWeekStart.setHours(0, 0, 0, 0);

  // Map day names to day numbers (0 = Sunday, 1 = Monday, etc.)
  const dayNameToNumber: { [key: string]: number } = {
    'monday': 1,
    'tuesday': 2,
    'wednesday': 3,
    'thursday': 4,
    'friday': 5,
    'saturday': 6,
    'sunday': 7,
  };

  return schedule?.map((item) => {
    // Get day number from day name (case-insensitive)
    const dayName = item.day.toLowerCase();
    const dayOfWeek = dayNameToNumber[dayName] ?? 1;

    // Parse time components from time strings (handles "HH:MM:SS.sssZ" etc.)
    const startTime = parseTime(item.start);
    const endTime = parseTime(item.end);

    // Create new start date for current week
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() + dayOfWeek);
    newStart.setHours(startTime.hours, startTime.minutes, startTime.seconds, 0);

    // Create new end date for current week (same day)
    const newEnd = new Date(currentWeekStart);
    newEnd.setDate(currentWeekStart.getDate() + dayOfWeek);
    newEnd.setHours(endTime.hours, endTime.minutes, endTime.seconds, 0);

    return {
      title: item.title,
      start: newStart,
      end: newEnd,
    };
  });
}