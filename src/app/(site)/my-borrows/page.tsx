import type { Metadata } from "next";
import { Suspense } from "react";

import { MyBorrowsList } from "@/components/my-borrows-list";
import { LibraryFetchError } from "@/components/library-fetch-error";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { getMyBorrows } from "@/lib/api";
import { getServerToken } from "@/lib/token";
import { requireUser } from "@/lib/server-auth";
import type { Borrow } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = { title: "My Borrows", description: "Review and return books you have borrowed." };

async function MyBorrowsListContent() {
  await requireUser("/my-borrows");
  let borrows: Borrow[];
  try {
    borrows = await getMyBorrows(await getServerToken());
  } catch (error) {
    return (
      <LibraryFetchError
        title="Your borrows could not be loaded"
        message={error instanceof Error ? error.message : "Please try again in a little while."}
      />
    );
  }
  return <MyBorrowsList initialBorrows={borrows} />;
}

export default function MyBorrowsPage() {
  return <section className="py-12 md:py-16"><Container>
    <SectionHeading align="left" eyebrow="Your reading list" title="My Borrows" subtitle="Check your borrowed titles and return a book when you are finished." />
    <Suspense fallback={<Skeleton className="mt-8 h-72 rounded-2xl" />}>
      <div className="mt-8"><MyBorrowsListContent /></div>
    </Suspense>
  </Container></section>;
}
