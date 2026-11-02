"use client";

import Link from "next/link";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { BookImage } from "@/components/book-image";
import { Button } from "@/components/ui/button";
import { formatLibraryDate } from "@/lib/format-library-date";
import { returnBook } from "@/lib/api";
import type { Borrow } from "@/types";

export function MyBorrowsList({ initialBorrows }: { initialBorrows: Borrow[] }) {
  const router = useRouter();
  const [borrows, setBorrows] = useState(initialBorrows);
  const [returningId, setReturningId] = useState<string | null>(null);

  const handleReturn = async (borrow: Borrow) => {
    setReturningId(borrow._id);
    try {
      await returnBook(borrow._id);
      setBorrows((current) => current.filter((item) => item._id !== borrow._id));
      toast.success("Book returned successfully.");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The book could not be returned.");
    } finally {
      setReturningId(null);
    }
  };

  const returnButton = (borrow: Borrow, className = "") => (
    <Button
      size="sm"
      disabled={returningId === borrow._id}
      onClick={() => void handleReturn(borrow)}
      className={`rounded-lg ${className}`}
    >
      {returningId === borrow._id ? (
        <><LoaderCircle className="size-4 animate-spin" aria-hidden="true" />Returning…</>
      ) : "Return Book"}
    </Button>
  );

  if (!borrows.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border/70 bg-card p-6 text-center sm:p-12">
        <h2 className="font-heading text-xl font-bold">You have not borrowed any book yet.</h2>
        <Button render={<Link href="/books" />} nativeButton={false} className="mt-5 rounded-xl">Browse Books</Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-3 md:hidden">
        {borrows.map((borrow) => (
          <article key={borrow._id} className="rounded-2xl border border-border/70 bg-card p-4">
            <div className="flex min-w-0 items-start gap-3">
              <div className="aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-lg">
                <BookImage
                  src={borrow.bookImage}
                  alt={`Cover of ${borrow.bookTitle}`}
                  className="!h-full !w-full !aspect-[2/3] rounded-lg object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="line-clamp-2 break-words font-heading font-semibold">{borrow.bookTitle}</h2>
                <p className="mt-2 text-sm text-muted-foreground">Borrowed: {formatLibraryDate(borrow.borrowDate)}</p>
                <p className="mt-1 text-sm text-muted-foreground">Return by: {formatLibraryDate(borrow.returnDate)}</p>
              </div>
            </div>
            {returnButton(borrow, "mt-4 min-h-10 w-full")}
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border border-border/70 bg-card md:block">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="border-b bg-muted/40 text-muted-foreground">
            <tr>{["Image", "Title", "Borrow Date", "Return Date", "Action"].map((heading) => <th key={heading} className="px-4 py-3 font-semibold">{heading}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {borrows.map((borrow) => (
              <tr key={borrow._id}>
                <td className="px-4 py-3"><BookImage src={borrow.bookImage} alt={`Cover of ${borrow.bookTitle}`} className="w-16 rounded-lg" /></td>
                <td className="px-4 py-3 font-medium">{borrow.bookTitle}</td>
                <td className="px-4 py-3">{formatLibraryDate(borrow.borrowDate)}</td>
                <td className="px-4 py-3">{formatLibraryDate(borrow.returnDate)}</td>
                <td className="px-4 py-3">{returnButton(borrow)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
