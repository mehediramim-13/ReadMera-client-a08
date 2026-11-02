import { z } from "zod";

// ─── Login ────────────────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginValues = z.infer<typeof loginSchema>;

// ─── Register ─────────────────────────────────────────────────────────────────
export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  image: z
    .string()
    .trim()
    .url("Enter a valid image URL")
    .or(z.literal(""))
    .optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[a-z]/, "Password must include at least one lowercase letter"),
});

export type RegisterValues = z.infer<typeof registerSchema>;

// ─── Password rules (shared with the live checklist) ─────────────────────────
export const PASSWORD_RULES = [
  {
    id: "minLength",
    label: "At least 6 characters",
    test: (value: string) => value.length >= 6,
  },
  {
    id: "uppercase",
    label: "At least one uppercase letter (A–Z)",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    id: "lowercase",
    label: "At least one lowercase letter (a–z)",
    test: (value: string) => /[a-z]/.test(value),
  },
] as const;

// ─── Profile ──────────────────────────────────────────────────────────────────
export const profileSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  image: z
    .string()
    .trim()
    .min(1, "Photo URL is required")
    .refine((value) => {
      if (!value) return true;
      try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
      } catch {
        return false;
      }
    }, "Enter a valid image URL (http or https)"),
});

export type ProfileValues = z.infer<typeof profileSchema>;

// ─── Newsletter ───────────────────────────────────────────────────────────────
