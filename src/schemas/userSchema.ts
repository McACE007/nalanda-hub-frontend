import z from "zod";

export const userRegistrationSchema = z.object({
  fullName: z
    .string()
    .min(10, "Full name must be at least 10 characters")
    .max(30, "Full name must be at most 30 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters"),
  confirmPassword: z
    .string()
    .min(8, "Confirm password must be at least 8 characters")
    .max(16, "Confirm password must be at most 16 characters"),
  branchId: z.number(),
});
