import Link from "next/link";

import { BookImage } from "@/components/book-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Book } from "@/types";

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lift">
      <BookImage src={book.image} alt={`Cover of ${book.title}`} />
      <div className="flex flex-1 flex-col p-5">
        <Badge variant="secondary" className="mb-3 w-fit">{book.category}</Badge>
        <h3 className="line-clamp-2 font-heading text-lg font-bold text-foreground">{book.title}</h3>
        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">by {book.author}</p>
        <Button
          render={<Link href={`/books/${encodeURIComponent(book._id)}`} />}
          nativeButton={false}
          className="mt-auto w-full rounded-xl"
        >
          View Details
        </Button>
      </div>
    </article>
  );
}
