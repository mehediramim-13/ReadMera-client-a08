const libraryDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  timeZone: "Asia/Dhaka",
  year: "numeric",
});

export function formatLibraryDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : libraryDateFormatter.format(date);
}
