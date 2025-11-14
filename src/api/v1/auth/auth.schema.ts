import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "username must be at least 3 characters"),
  email: z.email("invalid email"),
  password: z
    .string()
    .min(8, "password must be at least 8 characters"), 
  first_name: z.string().trim().optional(),
  last_name: z.string().trim().optional(),
});

// export const loginSchema = z.object({
//   email: z.email(),
//   password: z.string().min(6, "Password must be at least 6 chars"),
// });

export type RegisterInput = z.infer<typeof registerSchema>;
// export type LoginInput = z.infer<typeof loginSchema>;
