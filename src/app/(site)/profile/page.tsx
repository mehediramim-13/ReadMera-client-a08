import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { ProfileContent } from "@/app/(site)/profile/profile-content";
import { auth } from "@/lib/auth";

export const metadata: Metadata = { title: "My Profile", description: "View and update your ReadMera profile." };

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login?callbackUrl=%2Fprofile");
  return <ProfileContent />;
}
