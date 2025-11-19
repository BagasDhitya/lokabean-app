import { prisma } from "../../config/prisma";
import { HttpException } from "../../core/httpException";
import { comparePassword, hashPassword } from "../../utils/password";
import { signToken } from "../../utils/jwt";

class AuthService {
  async registerVisitor(data: any) {
    const exists = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (exists) throw new HttpException(400, "Email already registered");

    const hashed = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashed,
        name: data.name,
        role: "VISITOR",
      },
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new HttpException(404, "User not found");

    const match = await comparePassword(password, user.password);
    if (!match) throw new HttpException(401, "Invalid password");

    const token = signToken({
      id: user.id,
      role: user.role,
      email: user.email,
    });

    return { token, user };
  }

  async resetPassword(email: string, newPassword: string) {
    const hashed = await hashPassword(newPassword);

    await prisma.user.update({
      where: { email },
      data: { password: hashed },
    });

    return "Password updated";
  }
}

export const authService = new AuthService();
