import Link from "next/link";

import { SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg";

const sizes: Record<LogoSize, { mark: string; text: string }> = {
  sm: { mark: "size-7", text: "text-lg" },
  md: { mark: "size-9", text: "text-xl" },
  lg: { mark: "size-12", text: "text-2xl" },
};

interface LogoProps {
  size?: LogoSize;
  showWordmark?: boolean;
  tone?: "default" | "inverse";
  className?: string;
  href?: string;
  priority?: boolean;
  onClick?: () => void;
}

export function Logo({
  size = "md",
  showWordmark = true,
  tone = "default",
  className,
  href,
  onClick,
}: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        className={cn(sizes[size].mark, "shrink-0 text-primary")}
      >
        <path d="M24 13.5c-5.3-3.1-11.2-3.4-17-1.6v23.8c5.8-1.8 11.7-1.5 17 1.6m0-23.8c5.3-3.1 11.2-3.4 17-1.6v23.8c-5.8-1.8-11.7-1.5-17 1.6m0-23.8v23.8" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32.5 16v12l-3.2-2-3.3 2V15" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {showWordmark ? (
        <span className={cn("font-heading leading-none font-extrabold tracking-tight", sizes[size].text, tone === "inverse" ? "text-white" : "text-foreground")}>
          {SITE_NAME}
        </span>
      ) : null}
    </span>
  );

  if (!href) return content;
  return (
    <Link
      href={href}
      aria-label={`${SITE_NAME} home`}
      onClick={onClick}
      className="inline-flex rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      {content}
    </Link>
  );
}
