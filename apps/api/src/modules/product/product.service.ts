import { prisma } from "../../config/prisma";
import { HttpException } from "../../core/httpException";

class ProductService {
  async createProduct(data: any) {
    return prisma.product.create({ data });
  }

  async getAllProducts() {
    return prisma.product.findMany({
      include: { discount: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async getProductById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { discount: true },
    });

    if (!product) throw new HttpException(404, "Product not found");

    return product;
  }

  async updateProduct(id: string, data: any) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new HttpException(404, "Product not found");

    return prisma.product.update({
      where: { id },
      data,
    });
  }

  async deleteProduct(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new HttpException(404, "Product not found");

    return prisma.product.delete({
      where: { id },
    });
  }
}

export const productService = new ProductService();
