import { prisma } from "../../../config/prisma";
import { HttpException } from "../../../core/httpException";
import { UpdateUserRoleDTO } from "../dto/user.dto";

export class AdminUserService {
  async getAllUsers() {
    return prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new HttpException(404, "User not found");
    return user;
  }

  async updateRole(id: string, dto: UpdateUserRoleDTO) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new HttpException(404, "User not found");

    const updated = await prisma.user.update({
      where: { id },
      data: { role: dto.role },
    });

    return updated;
  }

  async deleteUser(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new HttpException(404, "User not found");

    await prisma.user.delete({ where: { id } });
    return { message: "User deleted" };
  }
}
