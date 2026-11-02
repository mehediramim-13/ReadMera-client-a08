"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { BookImage } from "@/components/book-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BOOK_CATEGORIES, type Book, type BookCategory, type CreateBookInput } from "@/types";
import { uploadImage } from "@/lib/upload-image";

interface BookFormProps {
  user: { name: string; email: string };
  initialBook?: Book;
  submitLabel: string;
  onSubmit: (input: CreateBookInput) => Promise<void>;
}

const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function BookForm({ user, initialBook, submitLabel, onSubmit }: BookFormProps) {
  const [title, setTitle] = useState(initialBook?.title ?? "");
  const [author, setAuthor] = useState(initialBook?.author ?? "");
  const [category, setCategory] = useState<BookCategory>(initialBook?.category ?? BOOK_CATEGORIES[0]);
  const [totalCopies, setTotalCopies] = useState(String(initialBook?.totalCopies ?? 1));
  const [description, setDescription] = useState(initialBook?.description ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(initialBook?.image ?? "");
  const [busy, setBusy] = useState(false);
  const previewUrlRef = useRef<string | null>(null);
  const submittingRef = useRef(false);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;
    if (!title.trim() || !author.trim() || !description.trim() || !Number.isInteger(Number(totalCopies)) || Number(totalCopies) < 1) {
      toast.error("Complete each book field with valid information.");
      return;
    }
    if (!initialBook && !file) {
      toast.error("Choose a book cover image.");
      return;
    }
    if (file && (!allowedTypes.includes(file.type) || file.size > 4 * 1024 * 1024)) {
      toast.error("Choose a JPG, PNG, WebP, or GIF image under 4 MB.");
      return;
    }

    const toastId = toast.loading(file ? "Uploading cover image..." : "Saving book...");
    submittingRef.current = true;
    setBusy(true);
    try {
      const image = file ? await uploadImage(file) : initialBook?.image ?? "";
      await onSubmit({
        title: title.trim(),
        author: author.trim(),
        category,
        image,
        description: description.trim(),
        totalCopies: Number(totalCopies),
      });
      toast.success(initialBook ? "Book updated successfully." : "Book added to the library.", { id: toastId });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The book could not be added.", { id: toastId });
    } finally {
      submittingRef.current = false;
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5 rounded-2xl border border-border/70 bg-card p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5"><Label htmlFor="book-title">Book Title</Label><Input id="book-title" value={title} onChange={(event) => setTitle(event.target.value)} required /></div>
        <div className="space-y-1.5"><Label htmlFor="book-author">Author Name</Label><Input id="book-author" value={author} onChange={(event) => setAuthor(event.target.value)} required /></div>
        <div className="space-y-1.5"><Label htmlFor="book-category">Category</Label><select id="book-category" value={category} onChange={(event) => setCategory(event.target.value as BookCategory)} className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm">{BOOK_CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select></div>
        <div className="space-y-1.5"><Label htmlFor="book-copies">Total Copies</Label><Input id="book-copies" type="number" min={1} step={1} value={totalCopies} onChange={(event) => setTotalCopies(event.target.value)} required /></div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="book-image">Book Image</Label>
        <Input id="book-image" type="file" accept={allowedTypes.join(",")} onChange={(event) => {
          const nextFile = event.target.files?.[0] ?? null;
          setFile(nextFile);
          if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
          previewUrlRef.current = nextFile ? URL.createObjectURL(nextFile) : null;
          setPreview(previewUrlRef.current ?? initialBook?.image ?? "");
        }} />
        {preview ? <BookImage src={preview} alt="Book cover preview" className="mt-3 max-w-xs rounded-xl" /> : null}
      </div>
      <div className="space-y-1.5"><Label htmlFor="book-description">Short Description</Label><Textarea id="book-description" value={description} onChange={(event) => setDescription(event.target.value)} rows={5} required /></div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5"><Label htmlFor="book-user-name">Your Name</Label><Input id="book-user-name" value={user.name} readOnly /></div>
        <div className="space-y-1.5"><Label htmlFor="book-user-email">Your Email</Label><Input id="book-user-email" value={user.email} readOnly /></div>
      </div>
      <Button type="submit" disabled={busy} className="h-11 w-full rounded-xl">
        {busy ? <><LoaderCircle className="size-4 animate-spin" />Uploading and saving...</> : submitLabel}
      </Button>
    </form>
  );
}
