import type { Metadata } from "next";

import { AddBookForm } from "@/components/add-book-form";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { requireUser } from "@/lib/server-auth";

export const metadata: Metadata = { title: "Add Book", description: "Share a book with the ReadMera library." };

export default async function AddBookPage() {
  const user = await requireUser("/add-book");
  return (
    <section className="py-12 md:py-16"><Container>
      <SectionHeading align="left" eyebrow="Share a title" title="Add Book" subtitle="Add a book to the library so another reader can discover it." />
      <div className="mt-8"><AddBookForm user={user} /></div>
    </Container></section>
  );
}
