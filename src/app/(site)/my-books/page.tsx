import type { Metadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { LibraryFetchError } from "@/components/library-fetch-error";
import { MyBooksManager } from "@/components/my-books-manager";
import { getBooks } from "@/lib/api";
import { requireUser } from "@/lib/server-auth";
import type { Book } from "@/types";

export const metadata: Metadata = { title: "My Books", description: "Manage the books you have added to ReadMera." };

async function MyBooksList() {
  const user = await requireUser("/my-books");
  if (!user.email.trim()) {
    return (
      <LibraryFetchError
        title="Your books could not be loaded"
        message="Your session does not include an email address. Please sign in again."
      />
    );
  }
  let books: Book[];
  try {
    books = await getBooks({ userEmail: user.email });
  } catch (error) {
    return (
      <LibraryFetchError
        title="Your books could not be loaded"
        message={error instanceof Error ? error.message : "Please try again in a little while."}
      />
    );
  }
  return <MyBooksManager key={JSON.stringify(books)} initialBooks={books} user={user} />;
}

export default function MyBooksPage() {
  return <section className="py-12 md:py-16"><Container>
    <SectionHeading align="left" eyebrow="Your collection" title="My Books" subtitle="Edit your book details and keep your shared collection up to date." />
    <Suspense fallback={<Skeleton className="mt-8 h-[500px] rounded-2xl" />}>
      <div className="mt-8"><MyBooksList /></div>
    </Suspense>
  </Container></section>;
}
