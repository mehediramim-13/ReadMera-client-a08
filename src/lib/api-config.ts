export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/+$/, "").replace(/\/api$/i, "");
  if (!url) throw new Error("The book service is not configured.");
  return url;
}