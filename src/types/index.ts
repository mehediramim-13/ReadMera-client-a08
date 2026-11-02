export const BOOK_CATEGORIES = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
] as const;

export type BookCategory = (typeof BOOK_CATEGORIES)[number];

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: BookCategory;
  image: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  userName: string;
  userEmail: string;
  createdAt: string;
}

export interface Borrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  userName: string;
  borrowDate: string;
  returnDate: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface BookQuery {
  limit?: number;
  search?: string;
  category?: BookCategory;
  userEmail?: string;
}

export interface CreateBookInput {
  title: string;
  author: string;
  category: BookCategory;
  image: string;
  description: string;
  totalCopies: number;
}

export type UpdateBookInput = Partial<CreateBookInput>;

export interface ProfileUpdateInput {
  name: string;
  image: string;
}
