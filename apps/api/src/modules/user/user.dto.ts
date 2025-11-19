import { z } from "zod";

export const UpdateProfileDTO = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
  }),
});
