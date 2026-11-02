import { Suspense } from "react";

import { BooksBrowser } from "@/components/books-browser";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { LibraryFetchError } from "@/components/library-fetch-error";
import { getBooks } from "@/lib/api";
import { BOOK_CATEGORIES, type Book, type BookCategory } from "@/types";

export const metadata = { title: "All Books", description: "Browse the ReadMera library catalogue." };

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

async function BooksContent({ searchParams }: Props) {
  const params = await searchParams;
  const rawCategory = getParam(params.category);
  const rawSort = getParam(params.sort);
  const rawAvailable = getParam(params.available);
  const rawSearch = getParam(params.search);
  const category = BOOK_CATEGORIES.includes(rawCategory as BookCategory) ? rawCategory : "";
  const sort = (["newest", "oldest", "title-asc", "title-desc", "available"] as const)
    .find((value) => value === rawSort) ?? "newest";
  const initialFilters = {
    search: rawSearch,
    category,
    sort,
    available: rawAvailable === "1",
  };
  let books: Book[] = [];
  try {
    books = await getBooks();
  } catch (error) {
    return (
      <LibraryFetchError
        title="The catalogue could not be loaded"
        message={error instanceof Error ? error.message : "Please try again in a little while."}
      />
    );
  }
  return <BooksBrowser books={books} initialFilters={initialFilters} />;
}

export default function BooksPage(props: Props) {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading
          eyebrow="Library catalogue"
          title="Find your next good read."
          subtitle="Browse books by title, author, or category and discover something new."
        />
        <Suspense fallback={<div className="mt-8"><Skeleton className="h-48 w-full rounded-2xl" /><Skeleton className="mt-6 h-[600px] w-full rounded-2xl" /></div>}>
          <BooksContent searchParams={props.searchParams} />
        </Suspense>
      </Container>
    </section>
  );
}
