"use client";

import Link from "next/link";
import {
  LogOut,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import type { AppUser } from "@/types";

interface UserMenuProps {
  user: AppUser;
}

const MENU_LINKS = [
  { href: "/profile", label: "My Profile", icon: User },
] as const;

export function UserMenu({ user }: UserMenuProps) {
  const { logout } = useAuth();

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger render={<span className="inline-flex" />}>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon-lg"
                className="rounded-full p-0 ring-1 ring-border/70 transition-all hover:ring-primary/40"
                aria-label={`Account menu for ${user.name}`}
              />
            }
          >
            <UserAvatar name={user.name} image={user.image} className="size-8 text-[11px]" />
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">{user.name}</TooltipContent>
      </Tooltip>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex flex-col gap-0.5 px-3 py-2.5">
            <span className="text-sm font-semibold text-foreground">{user.name}</span>
            <span className="truncate text-xs font-normal text-muted-foreground">{user.email}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {MENU_LINKS.map((item) => (
            <DropdownMenuItem key={item.href} render={<Link href={item.href} />}>
              <item.icon aria-hidden="true" />
              {item.label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => {
              void logout();
            }}
          >
            <LogOut aria-hidden="true" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
