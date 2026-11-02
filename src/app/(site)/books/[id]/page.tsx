import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";

import { BookDetailsActions } from "@/components/book-details-actions";
import { BookImage } from "@/components/book-image";
import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { LibraryFetchError } from "@/components/library-fetch-error";
import { ApiError, getBookById, getMyBorrows } from "@/lib/api";
import { SITE_NAME } from "@/lib/constants";
import { formatLibraryDate } from "@/lib/format-library-date";
import { getServerToken } from "@/lib/token";
import { requireUser } from "@/lib/server-auth";
import type { Book, Borrow } from "@/types";
import Loading from "./loading";

type Props = { params: Promise<{ id: string }> };

type BookDetailsResult = { book: Book; token: string } | { error: unknown };

const loadBookDetails = cache(async (id: string): Promise<BookDetailsResult> => {
  try {
    const token = await getServerToken();
    const book = await getBookById(id, token);
    return { book, token };
  } catch (error) {
    return { error };
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const result = await loadBookDetails(id);
  if ("error" in result) {
    return { title: { absolute: `${SITE_NAME} | Book Details` } };
  }
  return {
    title: { absolute: `${SITE_NAME} | ${result.book.title}` },
    description: result.book.description.slice(0, 150),
  };
}

async function BookDetails({ params }: Props) {
  const { id } = await params;
  const user = await requireUser(`/books/${encodeURIComponent(id)}`);
  const result = await loadBookDetails(id);
  if ("error" in result && result.error instanceof ApiError && (result.error.status === 400 || result.error.status === 404)) {
    notFound();
  }
  if ("error" in result) {
    return (
      <section className="py-16">
        <Container>
          <LibraryFetchError
            title="Book details are unavailable"
            message={result.error instanceof Error ? result.error.message : "Please try again in a little while."}
          />
        </Container>
      </section>
    );
  }
  const { book, token } = result;

  let borrows: Borrow[];
  try {
    borrows = await getMyBorrows(token);
  } catch (error) {
    return (
      <section className="py-16">
        <Container>
          <LibraryFetchError
            title="Borrow status is unavailable"
            message={error instanceof Error ? error.message : "Please try again in a little while."}
          />
        </Container>
      </section>
    );
  }
  const alreadyBorrowed = borrows.some((borrow) => borrow.bookId === book._id);

  const addedDate = formatLibraryDate(book.createdAt);

  return (
    <section className="py-12 md:py-16">
      <Container>
        <article className="grid gap-8 rounded-3xl border border-border/70 bg-card p-5 shadow-sm md:grid-cols-2 md:gap-10 md:p-8">
          <BookImage src={book.image} alt={`Cover of ${book.title}`} className="rounded-2xl" />
          <div className="flex flex-col items-start">
            <Badge variant="secondary">{book.category}</Badge>
            <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">{book.title}</h1>
            <p className="mt-2 text-lg text-muted-foreground">by {book.author}</p>
            <p className="mt-6 whitespace-pre-line leading-relaxed text-muted-foreground">{book.description}</p>
            <dl className="mt-6 grid w-full gap-3 rounded-xl bg-muted/40 p-4 text-sm sm:grid-cols-2">
              <div><dt className="text-muted-foreground">Added by</dt><dd className="mt-1 font-semibold">{book.userName}</dd></div>
              <div><dt className="text-muted-foreground">Date Added</dt><dd className="mt-1 font-semibold">{addedDate}</dd></div>
              <div className="sm:col-span-2"><dt className="text-muted-foreground">Copies available</dt><dd className="mt-1 font-semibold">{book.availableCopies} of {book.totalCopies} available</dd></div>
            </dl>
            <div className="mt-6 w-full"><BookDetailsActions book={book} user={user} alreadyBorrowed={alreadyBorrowed} /></div>
          </div>
        </article>
      </Container>
    </section>
  );
}

export default function BookDetailsPage(props: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <BookDetails params={props.params} />
    </Suspense>
  );
}
