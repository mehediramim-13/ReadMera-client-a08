"use client";

import { useRouter } from "next/navigation";

import { BookForm } from "@/components/book-form";
import { createBook } from "@/lib/api";
import type { AppUser } from "@/types";

export function AddBookForm({ user }: { user: AppUser }) {
  const router = useRouter();
  return (
    <BookForm
      user={user}
      submitLabel="Add Book"
      onSubmit={async (input) => {
        await createBook(input);
        router.push("/my-books");
        router.refresh();
      }}
    />
  );
}
