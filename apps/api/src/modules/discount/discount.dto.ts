import { z } from "zod";

export const CreateDiscountDTO = z.object({
  body: z.object({
    productId: z.string().uuid(),
    amount: z.number().min(1, "Discount amount must be at least 1"),
  }),
});

export const UpdateDiscountDTO = z.object({
  body: z.object({
    amount: z.number().min(1).optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const ParamsDiscountIdDTO = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
