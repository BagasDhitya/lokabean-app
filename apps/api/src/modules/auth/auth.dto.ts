import { z } from "zod";

export const RegisterDTO = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
  }),
});

export const LoginDTO = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});
