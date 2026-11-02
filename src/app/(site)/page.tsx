import { Suspense } from "react";
import Link from "next/link";

import { BookCard } from "@/components/book-card";
import { HeroSlider } from "@/components/home/hero-slider";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LibraryFetchError } from "@/components/library-fetch-error";
import { getBooks } from "@/lib/api";
import { SITE_NAME } from "@/lib/constants";
import { BOOK_CATEGORIES } from "@/types";
import type { Book } from "@/types";

export const metadata = { title: "Home", description: `${SITE_NAME} is a welcoming library to discover and share books.` };

const steps = [
  { number: "01", title: "Add or find a book", text: "Browse the catalogue or add a title from your own shelf." },
  { number: "02", title: "Borrow it", text: "Choose an available book and confirm your library account details." },
  { number: "03", title: "Return the book", text: "Bring it back when you are finished so another reader can enjoy it." },
];

async function NewArrivals() {
  let books: Book[];
  try {
    books = await getBooks({ limit: 6 });
  } catch (error) {
    return (
      <div className="mt-9">
        <LibraryFetchError
          title="New arrivals could not be loaded"
          message={error instanceof Error ? error.message : "Please try again in a little while."}
        />
      </div>
    );
  }

  return books.length ? (
      <div className="mt-9 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => <BookCard key={book._id} book={book} />)}
      </div>
    ) : (
      <div className="mt-9 rounded-2xl border border-dashed border-border/70 bg-card p-10 text-center">
        <p className="font-heading text-lg font-bold">Books are finding their way to the shelves.</p>
        <p className="mt-2 text-sm text-muted-foreground">Please check back soon or browse the full catalogue.</p>
      </div>
    );
}

function NewArrivalsSkeleton() {
  return (
    <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="overflow-hidden rounded-2xl border border-border/70 bg-card p-4">
          <Skeleton className="aspect-[4/3] w-full rounded-xl" />
          <Skeleton className="mt-4 h-5 w-3/4" />
          <Skeleton className="mt-2 h-4 w-1/2" />
          <Skeleton className="mt-5 h-10 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <section className="py-14 md:py-20">
        <Container>
          <SectionHeading eyebrow="Fresh on the shelves" title="New Arrivals" subtitle="Explore the latest books shared by our readers." />
          <Suspense fallback={<NewArrivalsSkeleton />}>
            <NewArrivals />
          </Suspense>
          <div className="mt-8 text-center"><Button render={<Link href="/books" />} nativeButton={false} variant="outline" className="rounded-full">See All Books</Button></div>
        </Container>
      </section>

      <section id="how-it-works" className="bg-muted/40 py-14 md:py-20">
        <Container>
          <SectionHeading eyebrow="Simple sharing" title="How Borrowing Works" subtitle="A few simple steps bring more books within everyone's reach." />
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {steps.map((step) => <Reveal key={step.number} className="h-full"><article className="h-full rounded-2xl border border-border/70 bg-card p-6"><p className="font-heading text-3xl font-extrabold text-primary">{step.number}</p><h3 className="mt-4 font-heading text-lg font-bold">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p></article></Reveal>)}
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <SectionHeading eyebrow="Browse by interest" title="Top Categories" subtitle="Start with a subject you love and follow your curiosity." />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {BOOK_CATEGORIES.map((category, index) => <Reveal key={category}><Link href={`/books?category=${encodeURIComponent(category)}`} className="group flex min-h-32 flex-col justify-between rounded-2xl border border-border/70 bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"><span className="text-sm font-medium text-muted-foreground">0{index + 1}</span><span className="font-heading text-lg font-bold group-hover:text-primary">{category}</span></Link></Reveal>)}
          </div>
        </Container>
      </section>
    </>
  );
}
