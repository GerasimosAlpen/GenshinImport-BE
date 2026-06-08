import { Request, Response, NextFunction } from 'express';
import { profileService } from '../services/profile.service';
import { authService } from '../services/auth.service';

export class ProfileController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      // We can reuse authService.getMe for basic profile data or expand it
      const user = await authService.getMe(userId);
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const updatedUser = await profileService.updateProfile(userId, req.body);
      
      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const profileController = new ProfileController();
