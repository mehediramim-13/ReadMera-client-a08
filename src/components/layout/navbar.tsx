"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { UserMenu } from "@/components/layout/user-menu";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { MEMBER_NAV, PRIMARY_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const { user, isLoading, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    const frame = window.requestAnimationFrame(() => setMobileOpen(false));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 12;
    setScrolled((current) => (current === next ? current : next));
  });

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-300",
          scrolled
            ? "border-border/70 bg-background/80 shadow-[0_10px_40px_-26px_rgba(15,23,42,0.45)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/70"
            : "border-transparent bg-background/0",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-3 md:h-[4.5rem]">
          <div className="flex min-w-0 items-center gap-3 sm:gap-8">
            <Logo href="/" size="md" priority className="shrink-0 whitespace-nowrap" />
            <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
              {[...PRIMARY_NAV, ...(user ? MEMBER_NAV : [])].map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {link.label}
                    {active ? (
                      <motion.span
                        layoutId="primary-nav-active"
                        className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      />
                    ) : null}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1.5">
            <ThemeToggle />

            {isLoading ? (
              <Skeleton className="size-9 rounded-full" />
            ) : user ? (
              <>
                <UserMenu user={user} />
              </>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Button variant="ghost" render={<Link href="/login" />} nativeButton={false}>Login</Button>
                <Button render={<Link href="/register" />} nativeButton={false} className="h-9 rounded-full px-4 text-sm font-semibold">Register</Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="size-10 rounded-full md:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </Container>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        user={user}
        isLoading={isLoading}
        onLogout={() => {
          setMobileOpen(false);
          void logout();
        }}
      />
    </>
  );
}
