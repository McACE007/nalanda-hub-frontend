import z from "zod";

export const userRegistrationSchema = z.object({
  fullName: z.string().min(10).max(30),
  email: z.string().email(),
  password: z.string().min(8).max(16),
  confirmPassword: z.string().min(8).max(16),
  branchId: z.number(),
});
