"use client";

import { useState } from "react";

import { getInitials } from "@/lib/format";
import { cn } from "@/lib/utils";

export function UserAvatar({ name, image, className }: { name: string; image: string; className?: string }) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  return (
    <span className={cn("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 font-semibold text-primary", className)}>
      {image && failedImage !== image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" referrerPolicy="no-referrer" onError={() => setFailedImage(image)} className="size-full object-cover" />
      ) : (
        getInitials(name || "Reader")
      )}
    </span>
  );
}
