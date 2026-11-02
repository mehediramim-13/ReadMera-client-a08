import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Not Found" };

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-svh flex-col overflow-x-hidden bg-background">
      <Navbar />
      <main
        id="main-content"
        className="mesh-glow grain-overlay relative flex flex-1 flex-col overflow-hidden"
      >
        <Container className="flex flex-1 flex-col items-center justify-center py-16 text-center">
          <div className="relative flex items-center justify-center">
            <span
              aria-hidden="true"
              className="font-heading text-[7.5rem] leading-none font-extrabold tracking-tighter text-primary/10 select-none sm:text-[11rem]"
            >
              404
            </span>
            <span className="absolute inline-flex items-center justify-center rounded-full bg-card p-4 shadow-lift ring-1 ring-border">
              <Logo size="lg" showWordmark={false} />
            </span>
          </div>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-primary uppercase">
            <Compass className="size-3.5" aria-hidden="true" />
            Off the map
          </span>

          <h1 className="mt-4 max-w-2xl font-heading text-3xl font-extrabold text-foreground sm:text-5xl">
            This page is not on our shelves.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            The page may have moved or the link may be incorrect. Browse the catalogue to find your next read.
          </p>

          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Button render={<Link href="/books" />} nativeButton={false} size="lg" className="gap-2">
              Browse Books
              <ArrowRight aria-hidden="true" />
            </Button>
            <Button variant="outline" render={<Link href="/" />} nativeButton={false} size="lg">
              Back to Home
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
