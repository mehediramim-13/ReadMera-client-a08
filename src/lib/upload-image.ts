export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  const response = await fetch("/api/upload", { method: "POST", body: formData });
  const result = (await response.json()) as { success: boolean; url?: string; message?: string };
  if (!response.ok || !result.success || !result.url) {
    throw new Error(result.message || "Image upload failed. Please try again.");
  }
  return result.url;
}
