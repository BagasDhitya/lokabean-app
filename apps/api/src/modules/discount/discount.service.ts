import { prisma } from "../../config/prisma";
import { HttpException } from "../../core/httpException";

class DiscountService {
  async createDiscount(data: { productId: string; amount: number }) {
    // Cek apakah product exist
    const product = await prisma.product.findUnique({
      where: { id: data.productId },
    });
    if (!product) throw new HttpException(404, "Product not found");

    // Cek apakah product sudah ada diskon
    const exist = await prisma.discount.findUnique({
      where: { productId: data.productId },
    });
    if (exist)
      throw new HttpException(400, "Discount already exists for this product");

    return prisma.discount.create({ data });
  }

  async getAll() {
    return prisma.discount.findMany({
      include: { product: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async getById(id: string) {
    const discount = await prisma.discount.findUnique({
      where: { id },
      include: { product: true },
    });

    if (!discount) throw new HttpException(404, "Discount not found");

    return discount;
  }

  async updateDiscount(id: string, data: any) {
    const discount = await prisma.discount.findUnique({ where: { id } });
    if (!discount) throw new HttpException(404, "Discount not found");

    return prisma.discount.update({
      where: { id },
      data,
    });
  }

  async deleteDiscount(id: string) {
    const discount = await prisma.discount.findUnique({ where: { id } });
    if (!discount) throw new HttpException(404, "Discount not found");

    return prisma.discount.delete({
      where: { id },
    });
  }
}

export const discountService = new DiscountService();
