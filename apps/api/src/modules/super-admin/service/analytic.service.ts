import { prisma } from "../../../config/prisma";

export const analyticsService = {
  async dashboard() {
    const totalUsers = await prisma.user.count();
    const totalProducts = await prisma.product.count();
    const totalTransactions = await prisma.transaction.count();

    const totalIncome = await prisma.transaction.aggregate({
      _sum: { total: true },
      where: { status: "SUCCESS" },
    });

    const bookkeepingIncome = await prisma.bookkeeping.aggregate({
      _sum: { amount: true },
      where: { type: "income" },
    });

    const bookkeepingExpense = await prisma.bookkeeping.aggregate({
      _sum: { amount: true },
      where: { type: "expense" },
    });

    return {
      totalUsers,
      totalProducts,
      totalTransactions,
      totalIncome: totalIncome._sum.total || 0,
      bookkeeping: {
        income: bookkeepingIncome._sum.amount || 0,
        expense: bookkeepingExpense._sum.amount || 0,
      },
    };
  },
};
