import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/better-auth-client";

export async function getClientToken(): Promise<string> {
  const { data, error } = await authClient.token();
  if (error || !data?.token) throw new Error("Please sign in again.");
  return data.token;
}

export async function getServerToken(): Promise<string> {
  const result = await auth.api.getToken({ headers: await headers() });
  if (!result?.token) throw new Error("Please sign in again.");
  return result.token;
}
