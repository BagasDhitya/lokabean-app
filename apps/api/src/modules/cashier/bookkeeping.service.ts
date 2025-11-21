import { prisma } from "../../config/prisma";
import { HttpException } from "../../core/httpException";
import { CreateBookkeepingDTO, FilterBookkeepingDTO } from "./bookkeeping.dto";

export class BookkeepingService {
  async create(cashierId: string, dto: CreateBookkeepingDTO) {
    if (!["income", "expense"].includes(dto.type)) {
      throw new HttpException(400, "Invalid type, must be income or expense");
    }

    const result = await prisma.bookkeeping.create({
      data: {
        cashierId,
        type: dto.type,
        amount: dto.amount,
      },
    });

    return result;
  }

  async getOwn(cashierId: string) {
    return prisma.bookkeeping.findMany({
      where: { cashierId },
      orderBy: { createdAt: "desc" },
    });
  }

  async getAll(filter: FilterBookkeepingDTO) {
    return prisma.bookkeeping.findMany({
      where: {
        cashierId: filter.cashierId,
      },
      include: {
        cashier: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getById(id: string, userId: string, role: string) {
    const record = await prisma.bookkeeping.findUnique({
      where: { id },
    });

    if (!record) throw new HttpException(404, "Record not found");

    if (role !== "SUPERADMIN" && record.cashierId !== userId) {
      throw new HttpException(403, "You are not allowed to view this record");
    }

    return record;
  }
}
