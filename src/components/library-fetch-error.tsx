"use client";

import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function LibraryFetchError({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  const router = useRouter();

  return (
    <div className="rounded-2xl border border-dashed border-border/70 bg-card p-6 text-center sm:p-12">
      <h2 className="font-heading text-xl font-bold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      <Button onClick={() => router.refresh()} className="mt-5 rounded-xl">
        <RefreshCw aria-hidden="true" />
        Try again
      </Button>
    </div>
  );
}
