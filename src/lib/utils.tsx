import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
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
    const originalStart = new Date(item.start);
    const originalEnd = new Date(item.end);

    // Get day number from day name (case-insensitive)
    const dayName = item.day.toLowerCase();
    const dayOfWeek = dayNameToNumber[dayName] ?? originalStart.getDay();

    // Extract time components from original start and end times
    const startHours = originalStart.getHours();
    const startMinutes = originalStart.getMinutes();
    const startSeconds = originalStart.getSeconds();
    
    const endHours = originalEnd.getHours();
    const endMinutes = originalEnd.getMinutes();
    const endSeconds = originalEnd.getSeconds();

    // Create new start date for current week
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() + dayOfWeek);
    newStart.setHours(startHours, startMinutes, startSeconds, 0);

    // Create new end date for current week (same day)
    const newEnd = new Date(currentWeekStart);
    newEnd.setDate(currentWeekStart.getDate() + dayOfWeek);
    newEnd.setHours(endHours, endMinutes, endSeconds, 0);

    return {
      title: item.title,
      start: newStart,
      end: newEnd,
    };
  });
}