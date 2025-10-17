import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email({ message: "Por favor, insira um email válido." }),
  password: z.string().min(1, { message: "A senha é obrigatória." }),
});

export const TokenResponseSchema = z.object({
  type: z.string(),
  token: z.string(),
});

export const UserResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  role: z.string(),
  name: z.string(),
  status: z.string(),
  mobile: z.string(),
  institution: z.string().nullable(),
  expires_at: z.string().nullable(),
  remember_me_token: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  prefix: z.string().nullable(),
});

export const LoginResponseSchema = z.object({
  token: TokenResponseSchema,
  user: UserResponseSchema,
});

export type LoginFormData = z.infer<typeof LoginSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type TokenResponse = z.infer<typeof TokenResponseSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
