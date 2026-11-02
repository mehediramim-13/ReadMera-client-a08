export const SITE_NAME = "ReadMera";

export const SITE = {
  name: SITE_NAME,
  tagline: "A welcoming nook for every reader.",
  description:
    "Discover, borrow, and share books with readers across Bangladesh.",
  contact: {
    address: "House 42, Road 11, Banani, Dhaka 1213, Bangladesh",
    phone: "+880 1711 204 588",
    email: "hello@readmera.org",
  },
} as const;

export interface NavLink {
  label: string;
  href: string;
}

export const PRIMARY_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
];

export const MEMBER_NAV: NavLink[] = [
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
];

export const FOOTER_QUICK_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
  { label: "How Borrowing Works", href: "/#how-it-works" },
];

export const FOOTER_LIBRARY_LINKS: NavLink[] = [
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
  { label: "My Profile", href: "/profile" },
];

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "X", href: "https://x.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "GitHub", href: "https://github.com/" },
] as const;

export const LIBRARY_STEPS = [
  { value: 1, suffix: "", label: "Find a book" },
  { value: 2, suffix: "", label: "Borrow a book" },
  { value: 3, suffix: "", label: "Enjoy your read" },
  { value: 4, suffix: "", label: "Return a book" },
] as const;
