import { Request, Response, NextFunction } from 'express';
import { adminService } from '../services/admin.service';
import { weaponService } from '../services/weapon.service';
import { artifactService } from '../services/artifact.service';

export class AdminController {
  async getDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await adminService.getDashboardStats();
      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }

  // Weapons CRUD
  async createWeapon(req: Request, res: Response, next: NextFunction) {
    try {
      const weapon = await weaponService.createWeapon(req.body);
      res.status(201).json({
        success: true,
        message: 'Weapon created successfully',
        data: weapon,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateWeapon(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number.parseInt(req.params.id as string);
      if (Number.isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid Weapon ID' });

      const weapon = await weaponService.updateWeapon(id, req.body);
      res.status(200).json({
        success: true,
        message: 'Weapon updated successfully',
        data: weapon,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteWeapon(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number.parseInt(req.params.id as string);
      if (Number.isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid Weapon ID' });

      await weaponService.deleteWeapon(id);
      res.status(200).json({
        success: true,
        message: 'Weapon deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  // Artifacts CRUD
  async createArtifact(req: Request, res: Response, next: NextFunction) {
    try {
      const artifact = await artifactService.createArtifact(req.body);
      res.status(201).json({
        success: true,
        message: 'Artifact created successfully',
        data: artifact,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateArtifact(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number.parseInt(req.params.id as string);
      if (Number.isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid Artifact ID' });

      const artifact = await artifactService.updateArtifact(id, req.body);
      res.status(200).json({
        success: true,
        message: 'Artifact updated successfully',
        data: artifact,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteArtifact(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number.parseInt(req.params.id as string);
      if (Number.isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid Artifact ID' });

      await artifactService.deleteArtifact(id);
      res.status(200).json({
        success: true,
        message: 'Artifact deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export const adminController = new AdminController();
