export function getInitials(name?: string | null): string {
  if (!name || !name.trim()) return "U";
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
  return initials || "U";
}
