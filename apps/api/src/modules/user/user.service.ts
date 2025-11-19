import { prisma } from "../../config/prisma";
import { HttpException } from "../../core/httpException";

class UserService {
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) throw new HttpException(404, "User not found");

    return user;
  }

  async updateProfile(userId: string, data: any) {
    const existingEmail = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (data.email && existingEmail && existingEmail.id !== userId) {
      throw new HttpException(400, "Email already taken");
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        updatedAt: true,
      },
    });

    return user;
  }
}

export const userService = new UserService();
