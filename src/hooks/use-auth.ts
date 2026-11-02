"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/better-auth-client";
import { updateProfile as updateProfileRequest } from "@/lib/api";
import type { AppUser, ProfileUpdateInput } from "@/types";

export interface UseAuthResult {
  user: AppUser | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  updateProfile: (data: ProfileUpdateInput) => Promise<AppUser>;
  login?: () => Promise<void>;
  register?: () => Promise<void>;
}

export function useAuth(): UseAuthResult {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user: AppUser | null = session?.user
    ? {
        id: session.user.id,
        name: session.user.name ?? "",
        email: session.user.email ?? "",
        image: session.user.image ?? "",
      }
    : null;

  const logout = useCallback(async () => {
    try {
      await authClient.signOut();
      toast.success("Signed out successfully");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Could not sign out. Please try again.");
    }
  }, [router]);

  const updateProfile = useCallback(
    async (data: ProfileUpdateInput) => {
      const updated = await updateProfileRequest(data);
      return updated;
    },
    [],
  );

  return {
    user,
    isLoading: isPending,
    logout,
    updateProfile,
  };
}
