import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function adjustScheduleToCurrentWeek(
  schedule: { title: string; start: string; end: string }[]
): { title: string; start: Date; end: Date }[] {
  const now = new Date();
  const currentWeekStart = new Date(now);
  currentWeekStart.setDate(now.getDate() - now.getDay()); // Start of week (Sunday)
  currentWeekStart.setHours(0, 0, 0, 0);

  return schedule.map((item) => {
    const originalStart = new Date(item.start);
    const originalEnd = new Date(item.end);

    // Calculate the day of week (0 = Sunday, 1 = Monday, etc.)
    const dayOfWeek = originalStart.getDay();
    const hours = originalStart.getHours();
    const minutes = originalStart.getMinutes();
    const seconds = originalStart.getSeconds();

    // Set to current week's same day and time
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() + dayOfWeek);
    newStart.setHours(hours, minutes, seconds, 0);

    // Calculate duration
    const duration = originalEnd.getTime() - originalStart.getTime();
    const newEnd = new Date(newStart.getTime() + duration);

    return {
      title: item.title,
      start: newStart,
      end: newEnd,
    };
  });
}