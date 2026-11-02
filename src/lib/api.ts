import { getApiBaseUrl } from "@/lib/api-config";
import { authClient } from "@/lib/better-auth-client";
import type { AppUser, Book, BookQuery, Borrow, CreateBookInput, ProfileUpdateInput, UpdateBookInput } from "@/types";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string,
  protectedCall = false,
  allowEmpty = false,
): Promise<T> {
  let accessToken = token;
  if (protectedCall && !accessToken) {
    const result = await authClient.token();
    if (result.error || !result.data?.token) throw new Error("Please sign in again.");
    accessToken = result.data.token;
  }
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...options,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
  });
  const result = (await response.json()) as ApiResponse<T>;
  if (!response.ok || !result.success) {
    throw new ApiError(result.message || "The request could not be completed.", response.status);
  }
  if (result.data === undefined && !allowEmpty) {
    throw new Error(result.message || "The service returned an empty response.");
  }
  return result.data as T;
}

export async function getBooks(params: BookQuery = {}): Promise<Book[]> {
  const query = new URLSearchParams();
  if (params.limit) query.set("limit", String(params.limit));
  if (params.category) query.set("category", params.category);
  if (params.search) query.set("search", params.search);
  if (params.userEmail) query.set("userEmail", params.userEmail);
  const suffix = query.size ? `?${query.toString()}` : "";
  return request<Book[]>(`/api/books${suffix}`);
}

export function getBookById(id: string, token?: string): Promise<Book> {
  return request<Book>(`/api/books/${encodeURIComponent(id)}`, {}, token, true);
}

export function createBook(input: CreateBookInput): Promise<Book> {
  return request<Book>("/api/books", { method: "POST", body: JSON.stringify(input) }, undefined, true);
}

export function updateBook(id: string, input: UpdateBookInput): Promise<Book> {
  return request<Book>(`/api/books/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  }, undefined, true);
}

export async function deleteBook(id: string): Promise<void> {
  await request<void>(`/api/books/${encodeURIComponent(id)}`, { method: "DELETE" }, undefined, true, true);
}

export function borrowBook(bookId: string): Promise<Borrow> {
  return request<Borrow>("/api/borrows", { method: "POST", body: JSON.stringify({ bookId }) }, undefined, true);
}

export function getMyBorrows(token?: string): Promise<Borrow[]> {
  return request<Borrow[]>("/api/borrows", {}, token, true);
}

export async function returnBook(borrowId: string): Promise<void> {
  await request<void>(`/api/borrows/${encodeURIComponent(borrowId)}`, { method: "DELETE" }, undefined, true, true);
}

export async function updateProfile(input: ProfileUpdateInput): Promise<AppUser> {
  const [{ data: session }, { data: result, error }] = await Promise.all([
    authClient.getSession(),
    authClient.updateUser({ name: input.name.trim(), image: input.image.trim() }),
  ]);
  if (error || !result?.status || !session?.user) {
    throw new Error(error?.message || "Could not update your profile.");
  }
  return {
    id: session.user.id,
    name: input.name.trim(),
    email: session.user.email,
    image: input.image.trim(),
  };
}
