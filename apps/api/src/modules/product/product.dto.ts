import { z } from "zod";

export const CreateProductDTO = z.object({
  body: z.object({
    name: z.string().min(2, "Name is required"),
    description: z.string().optional(),
    price: z.number().min(1, "Price must be at least 1"),
  }),
});

export const UpdateProductDTO = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    description: z.string().optional(),
    price: z.number().min(1).optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const ParamsProductIdDTO = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
