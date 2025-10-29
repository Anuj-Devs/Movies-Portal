import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(3, "Min 3 characters"),
  remember: z.boolean().optional(),
})

export const movieSchema = z.object({
  title: z.string().min(1, "Title required").max(100),
  publishingYear: z
    .string()
    .regex(/^\d{4}$/, "Enter 4-digit year")
    .transform((s) => Number(s)),
  posterFile: z.instanceof(File).optional().nullable(),
})

export const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});