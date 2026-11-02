"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpDown, Search, X } from "lucide-react";

import { BookCard } from "@/components/book-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { BOOK_CATEGORIES, type Book, type BookCategory } from "@/types";

type SortOrder = "newest" | "oldest" | "title-asc" | "title-desc" | "available";
type Filters = { search: string; category: string; sort: SortOrder; available: boolean };

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "title-asc", label: "Title (A to Z)" },
  { value: "title-desc", label: "Title (Z to A)" },
  { value: "available", label: "Most copies available" },
];

export function BooksBrowser({ books, initialFilters }: { books: Book[]; initialFilters: Filters }) {
  const router = useRouter();
  const pathname = usePathname();
  const [category, setCategory] = useState<BookCategory | "All">(
    initialFilters.category ? initialFilters.category as BookCategory : "All",
  );
  const [search, setSearch] = useState(initialFilters.search);
  const [debouncedSearch, setDebouncedSearch] = useState(initialFilters.search);
  const [sort, setSort] = useState<SortOrder>(initialFilters.sort);
  const [available, setAvailable] = useState(initialFilters.available);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    router.refresh();
  }, [router, router.bfcacheId]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const values: [string, string][] = [
      ["search", debouncedSearch],
      ["category", category === "All" ? "" : category],
      ["sort", sort === "newest" ? "" : sort],
      ["available", available ? "1" : ""],
    ];
    for (const [key, value] of values) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const query = params.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;
    if (`${pathname}${window.location.search}` !== nextUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [available, category, debouncedSearch, pathname, router, sort]);

  const filtered = useMemo(() => {
    const term = debouncedSearch.toLowerCase();
    const visible = books.filter((book) => (
      (category === "All" || book.category === category)
      && (!term || `${book.title} ${book.author}`.toLowerCase().includes(term))
      && (!available || book.availableCopies > 0)
    ));
    const newestFirst = (left: Book, right: Book) =>
      new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
    return visible.sort((left, right) => {
      switch (sort) {
        case "oldest":
          return -newestFirst(left, right);
        case "title-asc":
          return left.title.localeCompare(right.title, "en-GB", { sensitivity: "base" });
        case "title-desc":
          return right.title.localeCompare(left.title, "en-GB", { sensitivity: "base" });
        case "available":
          return right.availableCopies - left.availableCopies || newestFirst(left, right);
        default:
          return newestFirst(left, right);
      }
    });
  }, [available, books, category, debouncedSearch, sort]);

  const activeFilters = [
    ...(debouncedSearch ? [{ label: `Search: "${debouncedSearch}"`, remove: () => setSearch("") }] : []),
    ...(category !== "All" ? [{ label: `Category: ${category}`, remove: () => setCategory("All" as const) }] : []),
    ...(available ? [{ label: "Available now", remove: () => setAvailable(false) }] : []),
    ...(sort !== "newest"
      ? [{ label: `Sort: ${SORT_OPTIONS.find((option) => option.value === sort)?.label ?? ""}`, remove: () => setSort("newest" as const) }]
      : []),
  ];

  const clearAll = () => {
    setSearch("");
    setDebouncedSearch("");
    setCategory("All");
    setAvailable(false);
    setSort("newest");
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center">
        <div className="relative col-span-2 min-w-0 md:col-span-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") setSearch("");
            }}
            placeholder="Search by title or author..."
            aria-label="Search books"
            className="h-11 rounded-xl pl-10 pr-10"
          />
          {search ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-1 size-9 -translate-y-1/2 rounded-full"
            >
              <X aria-hidden="true" />
            </Button>
          ) : null}
        </div>

        <div className="col-span-2 row-start-2 flex gap-2 overflow-x-auto whitespace-nowrap md:col-span-3 md:col-start-1 md:row-start-2 md:flex-wrap md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {(["All", ...BOOK_CATEGORIES] as const).map((value) => (
            <Button
              key={value}
              type="button"
              variant={category === value ? "default" : "outline"}
              onClick={() => setCategory(value)}
              className="rounded-full"
            >
              {value}
            </Button>
          ))}
        </div>

        <label htmlFor="available-switch" className="col-start-1 row-start-3 flex min-h-11 cursor-pointer items-center gap-2 whitespace-nowrap text-sm font-medium md:col-start-2 md:row-start-1">
          <Switch
            id="available-switch"
            checked={available}
            onCheckedChange={setAvailable}
            aria-label="Available now"
          />
          Available now
        </label>

        <Select value={sort} onValueChange={(value) => setSort(value as SortOrder)}>
          <SelectTrigger aria-label="Sort by" className="col-start-2 row-start-3 h-11 w-full rounded-xl md:col-start-3 md:row-start-1 md:w-56">
            <ArrowUpDown className="size-4 text-muted-foreground" aria-hidden="true" />
            <SelectValue>{SORT_OPTIONS.find((option) => option.value === sort)?.label ?? "Newest first"}</SelectValue>
          </SelectTrigger>
          <SelectContent align="end">
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value} className="min-h-10">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2" aria-live="polite">
        <p className="mr-1 text-sm text-muted-foreground">
          Showing {filtered.length} {filtered.length === 1 ? "book" : "books"}
        </p>
        {activeFilters.map((filter) => (
          <Badge key={filter.label} variant="secondary" className="h-7 gap-1">
            {filter.label}
            <button type="button" onClick={filter.remove} aria-label={`Remove ${filter.label} filter`} className="rounded-full p-0.5 hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <X className="size-3" aria-hidden="true" />
            </button>
          </Badge>
        ))}
        {activeFilters.length ? (
          <Button type="button" variant="link" onClick={clearAll} className="h-auto min-h-7 px-1 text-sm">
            Clear all
          </Button>
        ) : null}
      </div>

        {filtered.length ? (
          <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((book) => <BookCard key={book._id} book={book} />)}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-border/70 bg-card p-6 text-center sm:p-12">
            <h2 className="font-heading text-xl font-bold">No books match your filters</h2>
            <p className="mt-2 text-sm text-muted-foreground">Try a different title, author, or category.</p>
            <Button variant="outline" className="mt-5 rounded-full" onClick={clearAll}>Clear all</Button>
          </div>
        )}
    </div>
  );
}
