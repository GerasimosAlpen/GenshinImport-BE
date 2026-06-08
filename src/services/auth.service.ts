import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authRepository } from '../repositories/auth.repository';
import { env } from '../config/env';
import { CustomError } from '../utils/custom-error';
import { Prisma } from '../../generated/prisma/client';

export class AuthService {
  async register(data: Prisma.UserCreateInput) {
    const existingUser = await authRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new CustomError(400, 'Email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password!, 10);
    const user = await authRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
  }

  async login(email: string, passwordString: string) {
    const user = await authRepository.findUserByEmail(email);
    if (!user?.password) {
      throw new CustomError(401, 'Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(passwordString, user.password);
    if (!isValidPassword) {
      throw new CustomError(401, 'Invalid credentials');
    }

    const token = this.generateToken(user.id, user.role);

    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  }

  async googleLogin(googleId: string, email: string, username: string) {
    let user = await authRepository.findUserByGoogleId(googleId);

    user ??= await authRepository.createUser({
      googleId,
      email,
      username,
    });

    const token = this.generateToken(user.id, user.role);

    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  }

  async getMe(userId: number) {
    const user = await authRepository.findUserById(userId);
    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
  }

  private generateToken(id: number, role: string): string {
    return jwt.sign({ id, role }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as any,
    });
  }
}

export const authService = new AuthService();
