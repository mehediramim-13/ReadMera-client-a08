"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { borrowBook } from "@/lib/api";
import type { AppUser, Book } from "@/types";

export function BookDetailsActions({
  book,
  user,
  alreadyBorrowed: initialAlreadyBorrowed,
}: {
  book: Book;
  user: AppUser;
  alreadyBorrowed: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [alreadyBorrowed, setAlreadyBorrowed] = useState(initialAlreadyBorrowed);
  const submitting = useRef(false);

  const submit = async () => {
    if (submitting.current || alreadyBorrowed || book.availableCopies < 1) return;
    submitting.current = true;
    setBusy(true);
    try {
      await borrowBook(book._id);
      setAlreadyBorrowed(true);
      toast.success("Book borrowed successfully.");
      setOpen(false);
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "The book could not be borrowed.";
      toast.error(message);
      if (message.toLowerCase().includes("already borrowed")) {
        setAlreadyBorrowed(true);
        setOpen(false);
      }
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  };

  const unavailable = book.availableCopies < 1;
  const disabled = alreadyBorrowed || unavailable;

  return (
    <>
      <div className="flex w-full flex-col gap-3">
        <Button
          variant={alreadyBorrowed ? "secondary" : "default"}
          disabled={disabled}
          onClick={() => {
            if (!disabled) setOpen(true);
          }}
          className="h-11 w-full rounded-xl disabled:cursor-not-allowed"
        >
          {alreadyBorrowed ? "Already Borrowed" : unavailable ? "Not Available" : "Borrow This Book"}
        </Button>
        <Button
          render={<Link href="/books" />}
          nativeButton={false}
          variant="outline"
          className="h-11 w-full rounded-xl"
        >
          <ArrowLeft aria-hidden="true" />
          Back to All Books
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm your borrow</DialogTitle>
            <DialogDescription>Review your library account details before borrowing this book.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <label className="block space-y-1.5 text-sm font-medium">Name<Input value={user.name} readOnly /></label>
            <label className="block space-y-1.5 text-sm font-medium">Email<Input value={user.email} readOnly /></label>
          </div>
          <DialogFooter>
            <Button disabled={busy} onClick={() => void submit()} className="rounded-xl">{busy ? "Borrowing..." : "Confirm Borrow"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
