import type { loginUserSchema } from "@/schemas/userSchema";
import z from "zod";

export type UserLoginInput = z.infer<typeof loginUserSchema>;
