/**
 * Formats a date to a long format (e.g., "January 15, 2024")
 * @param date - Date object or string to format
 * @returns Formatted date string
 */
export function formatLongDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formats a date to a short format (e.g., "Jan 2024")
 * @param date - Date object or string to format
 * @returns Formatted date string
 */
export function formatShortDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

