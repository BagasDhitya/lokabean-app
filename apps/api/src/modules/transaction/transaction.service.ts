import { prisma } from "../../config/prisma";
import { HttpException } from "../../core/httpException";
import { CreateTransactionDTO } from "./transaction.dto";
import snap from "../../utils/midtrans";

export const transactionService = {
  async create(userId: string, dto: CreateTransactionDTO) {
    const product = await prisma.product.findUnique({
      where: { id: dto.productId },
      include: { discount: true },
    });

    if (!product) {
      throw new HttpException(404, "Product not found");
    }

    const discount = product.discount ? product.discount.amount : 0;
    const total = product.price * dto.amount - discount;

    // jika paymentType = MIDTRANS
    if (dto.paymentType === "MIDTRANS") {
      const midtransPayload = {
        transaction_details: {
          order_id: `ORDER-${Date.now()}`,
          gross_amount: total,
        },
        item_details: [
          {
            id: dto.productId,
            price: product.price - discount,
            quantity: dto.amount,
            name: product.name,
          },
        ],
        customer_details: {
          user_id: userId,
        },
      };

      const midtransResponse = await snap.createTransaction(midtransPayload);

      // simpan transaksi (status = PENDING)
      const trx = await prisma.transaction.create({
        data: {
          userId,
          productId: dto.productId,
          amount: dto.amount,
          total,
          paymentType: "MIDTRANS",
          status: "PENDING",
        },
      });

      return {
        transaction: trx,
        snapToken: midtransResponse.token,
        redirectUrl: midtransResponse.redirect_url,
      };
    }

    // jika paymentType = CASH (khusus cashier)
    const trx = await prisma.transaction.create({
      data: {
        userId,
        productId: dto.productId,
        amount: dto.amount,
        total,
        paymentType: "CASH",
        status: "PAID",
      },
    });

    return trx;
  },

  async getAll() {
    return prisma.transaction.findMany({
      include: { user: true, product: true },
    });
  },

  async getById(id: string) {
    const trx = await prisma.transaction.findUnique({
      where: { id },
      include: { user: true, product: true },
    });

    if (!trx) throw new HttpException(404, "Transaction not found");
    return trx;
  },

  async updateStatus(id: string, status: string) {
    const trx = await prisma.transaction.findUnique({ where: { id } });
    if (!trx) throw new HttpException(404, "Transaction not found");

    return prisma.transaction.update({
      where: { id },
      data: { status },
    });
  },
};
