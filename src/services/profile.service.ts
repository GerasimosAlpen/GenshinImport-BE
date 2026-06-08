import bcrypt from 'bcrypt';
import { profileRepository } from '../repositories/profile.repository';
import { authRepository } from '../repositories/auth.repository';
import { CustomError } from '../utils/custom-error';
import { Prisma } from '../../generated/prisma/client';

export class ProfileService {
  async updateProfile(userId: number, data: { username?: string; email?: string; password?: string }) {
    // Check if user exists
    const user = await authRepository.findUserById(userId);
    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    const updateData: Prisma.UserUpdateInput = {};

    if (data.username) updateData.username = data.username;
    if (data.email) {
      // Check if email is already taken
      const existingUser = await authRepository.findUserByEmail(data.email);
      if (existingUser && existingUser.id !== userId) {
        throw new CustomError(400, 'Email is already in use by another account');
      }
      updateData.email = data.email;
    }
    
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return profileRepository.updateProfile(userId, updateData);
  }
}

export const profileService = new ProfileService();
