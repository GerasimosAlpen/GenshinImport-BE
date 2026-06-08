import { Request, Response, NextFunction } from 'express';
import { weaponService } from '../services/weapon.service';
import { WeaponType } from '../../generated/prisma/client';

export class WeaponController {
  async getAllWeapons(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number.parseInt(req.query.page as string) || 1;
      const limit = Number.parseInt(req.query.limit as string) || 10;
      const type = req.query.type as WeaponType | undefined;
      const search = req.query.search as string | undefined;

      const result = await weaponService.getAllWeapons({ 
        page, 
        limit, 
        ...(type ? { type } : {}), 
        ...(search ? { search } : {}) 
      });
      
      res.status(200).json({
        success: true,
        data: result.data,
        meta: result.meta,
      });
    } catch (error) {
      next(error);
    }
  }

  async getWeaponById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number.parseInt(req.params.id as string);
      if (Number.isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid ID' });

      const weapon = await weaponService.getWeaponById(id);
      
      res.status(200).json({
        success: true,
        data: weapon,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const weaponController = new WeaponController();
