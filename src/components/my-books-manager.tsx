"use client";

import { useState } from "react";
import Link from "next/link";
import { LoaderCircle, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { BookForm } from "@/components/book-form";
import { BookImage } from "@/components/book-image";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { deleteBook, updateBook } from "@/lib/api";
import type { AppUser, Book, CreateBookInput } from "@/types";

export function MyBooksManager({ initialBooks, user }: { initialBooks: Book[]; user: AppUser }) {
  const [books, setBooks] = useState(initialBooks);
  const [editing, setEditing] = useState<Book | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const save = async (input: CreateBookInput) => {
    if (!editing) return;
    try {
      const updated = await updateBook(editing._id, input);
      setBooks((current) => current.map((book) => book._id === updated._id ? updated : book));
      setEditing(null);
    } catch (error) {
      throw error;
    }
  };

  const remove = async (book: Book) => {
    setDeletingId(book._id);
    try {
      await deleteBook(book._id);
      setBooks((current) => current.filter((item) => item._id !== book._id));
      toast.success("Book deleted from your collection.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The book could not be deleted.");
    } finally {
      setDeletingId(null);
    }
  };

  if (!books.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border/70 bg-card p-6 text-center sm:p-12">
        <h2 className="font-heading text-xl font-bold">Your shelf is ready for its first book.</h2>
        <Button render={<Link href="/add-book" />} nativeButton={false} className="mt-5 rounded-xl">Add Book</Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4">
        {books.map((book) => (
          <article key={book._id} className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-4 md:flex-row md:items-center">
            <div className="flex min-w-0 items-start gap-3 md:flex-1">
              <div className="aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-xl md:aspect-[4/3] md:w-32">
                <BookImage
                  src={book.image}
                  alt={`Cover of ${book.title}`}
                  className="!h-full !w-full !aspect-[2/3] rounded-xl object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="break-words font-heading text-lg font-bold">{book.title}</h2>
                <p className="break-words text-sm text-muted-foreground">by {book.author} · {book.category}</p>
                <p className="mt-1 text-sm text-muted-foreground">Copies: {book.availableCopies} of {book.totalCopies}</p>
              </div>
            </div>
            <div className="flex w-full gap-2 md:w-auto">
              <Button variant="outline" onClick={() => setEditing(book)} className="min-h-10 flex-1 rounded-xl md:min-h-0 md:flex-none"><Pencil className="size-4" />Edit</Button>
              <AlertDialog>
                <AlertDialogTrigger render={<Button variant="outline" className="min-h-10 flex-1 rounded-xl text-destructive md:min-h-0 md:flex-none"><Trash2 className="size-4" />Delete</Button>} />
                <AlertDialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this book?</AlertDialogTitle>
                    <AlertDialogDescription>This removes “{book.title}” from the library.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={deletingId === book._id} onClick={() => void remove(book)}>
                      {deletingId === book._id ? <><LoaderCircle className="size-4 animate-spin" aria-hidden="true" />Deleting…</> : "Delete Book"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </article>
        ))}
      </div>
      <Dialog open={!!editing} onOpenChange={(open) => { if (!open) setEditing(null); }}>
        <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-2xl">
          <DialogHeader><DialogTitle>Edit Book</DialogTitle></DialogHeader>
          {editing ? <BookForm user={user} initialBook={editing} submitLabel="Save Changes" onSubmit={save} /> : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
