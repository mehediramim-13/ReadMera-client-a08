"use client";

import type { ReactNode } from "react";

import { useAuth } from "@/hooks/use-auth";

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { isLoading } = useAuth();

  void isLoading;

  return <>{children}</>;
}
