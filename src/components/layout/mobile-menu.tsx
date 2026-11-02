"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  CalendarCheck,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  User,
  X,
} from "lucide-react";
import { useEffect } from "react";

import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { MEMBER_NAV, PRIMARY_NAV } from "@/lib/constants";
import type { AppUser } from "@/types";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  user: AppUser | null;
  isLoading: boolean;
  onLogout: () => void;
}

const ACCOUNT_LINKS = [
  { href: "/add-book", label: "Add Book", icon: Plus },
  { href: "/my-books", label: "My Books", icon: LayoutDashboard },
  { href: "/my-borrows", label: "My Borrows", icon: CalendarCheck },
  { href: "/profile", label: "My Profile", icon: User },
] as const;

export function MobileMenu({
  open,
  onClose,
  user,
  isLoading,
  onLogout,
}: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            key="mobile-menu-backdrop"
            aria-hidden="true"
            className="fixed inset-x-0 top-16 bottom-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            key="mobile-menu-panel"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed top-16 right-0 bottom-0 z-[70] flex w-[88%] max-w-sm flex-col overflow-y-auto border-l border-border bg-background p-5 shadow-2xl md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 36 }}
          >
            <div className="flex items-center justify-between">
              <Logo href="/" size="sm" onClick={onClose} />
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close menu"
                className="size-10 rounded-full"
              >
                <X aria-hidden="true" />
              </Button>
            </div>

            <Button
              variant="outline"
              className="mt-6 h-11 w-full justify-start gap-2.5 rounded-full text-muted-foreground"
              render={<Link href="/books" onClick={onClose} />}
              nativeButton={false}
            >
              <Search aria-hidden="true" />
              Find a book
            </Button>

            <nav aria-label="Mobile primary" className="mt-6 flex flex-col">
              {[...PRIMARY_NAV, ...(user ? MEMBER_NAV : [])].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between border-b border-border/60 py-3.5 font-heading text-lg font-semibold text-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                  <ArrowUpRight className="size-4 text-muted-foreground" aria-hidden="true" />
                </Link>
              ))}
            </nav>

            <div className="mt-6">
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <Skeleton className="size-11 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3.5 w-32 rounded" />
                    <Skeleton className="h-3 w-44 rounded" />
                  </div>
                </div>
              ) : user ? (
                <>
                  <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-3">
                    <UserAvatar name={user.name} image={user.image} className="size-11 text-sm" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {ACCOUNT_LINKS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className="flex min-h-10 items-center gap-1.5 rounded-xl border border-border/70 bg-surface/60 px-2.5 py-2.5 text-[13px] leading-tight font-medium transition-colors hover:border-primary/30 hover:bg-primary/5"
                      >
                        <item.icon className="size-4 text-primary" aria-hidden="true" />
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="mt-3 min-h-10 w-full justify-start gap-2 rounded-xl text-destructive hover:text-destructive"
                    onClick={onLogout}
                  >
                    <LogOut aria-hidden="true" />
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button
                    render={<Link href="/login" onClick={onClose} />}
                    nativeButton={false}
                    className="h-11 w-full"
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    render={<Link href="/register" onClick={onClose} />}
                    nativeButton={false}
                    className="h-11 w-full"
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
