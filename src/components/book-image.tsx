"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";

interface BookImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function BookImage({ src, alt, className = "" }: BookImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return (
      <div className={`flex aspect-[4/3] items-center justify-center bg-muted text-muted-foreground ${className}`}>
        <BookOpen className="size-10" aria-hidden="true" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailedSrc(src)}
      className={`aspect-[4/3] w-full object-cover ${className}`}
    />
  );
}
