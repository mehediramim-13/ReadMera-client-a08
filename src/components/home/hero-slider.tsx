"use client";

import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    eyebrow: "A nook for curious minds",
    title: "Every shelf holds a new world.",
    text: "Explore stories, ideas, and discoveries shared by readers across Bangladesh.",
  },
  {
    eyebrow: "Read together",
    title: "A good book travels far.",
    text: "Borrow a title from a neighbour and pass along the joy of reading.",
  },
  {
    eyebrow: "Make room for stories",
    title: "Share the books you love.",
    text: "Add a book to the library and help another reader find their next favourite.",
  },
];

export function HeroSlider() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-highlight/10 py-14 sm:py-20">
      <Container>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="rounded-3xl"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <div className="mx-auto flex min-h-[330px] max-w-4xl flex-col items-center justify-center px-6 pb-12 text-center sm:min-h-[390px]">
                <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">{slide.eyebrow}</p>
                <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-tight font-extrabold tracking-tight text-foreground sm:text-6xl">{slide.title}</h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{slide.text}</p>
                <Button render={<Link href="/books" />} nativeButton={false} size="lg" className="mt-7 rounded-full px-7">Browse Books</Button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
