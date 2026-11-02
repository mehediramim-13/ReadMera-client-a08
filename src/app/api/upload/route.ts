import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_FILE_SIZE = 4 * 1024 * 1024;
const FAILURE_MESSAGE = "Image upload failed. Please try again.";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ success: false, message: "Please sign in to upload a book cover." }, { status: 401 });
  }

  const formData = await request.formData();
  const image = formData.get("image");
  if (!(image instanceof File) || !IMAGE_TYPES.has(image.type) || image.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { success: false, message: "Choose a JPG, PNG, WebP, or GIF image under 4 MB." },
      { status: 400 },
    );
  }

  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ success: false, message: FAILURE_MESSAGE }, { status: 502 });
  }

  const uploadData = new FormData();
  uploadData.append("image", image);
  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: uploadData,
      cache: "no-store",
    });
    const payload = (await response.json()) as { success?: boolean; data?: { url?: string } };
    if (!response.ok || !payload.success || !payload.data?.url) {
      return NextResponse.json({ success: false, message: FAILURE_MESSAGE }, { status: 502 });
    }
    return NextResponse.json({ success: true, url: payload.data.url });
  } catch {
    return NextResponse.json({ success: false, message: FAILURE_MESSAGE }, { status: 502 });
  }
}
