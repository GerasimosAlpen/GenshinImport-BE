import { Request, Response, NextFunction } from 'express';
import { purchaseService } from '../services/purchase.service';

export class PurchaseController {
  async checkout(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { items } = req.body;

      const purchase = await purchaseService.checkout(userId, items);

      res.status(201).json({
        success: true,
        message: 'Purchase completed successfully',
        data: purchase,
      });
    } catch (error) {
      next(error);
    }
  }

  async getHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const history = await purchaseService.getPurchaseHistory(userId);

      res.status(200).json({
        success: true,
        data: history,
      });
    } catch (error) {
      next(error);
    }
  }

  async getDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const id = req.params.id as string;

      const purchase = await purchaseService.getPurchaseDetail(id, userId);

      res.status(200).json({
        success: true,
        data: purchase,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const purchaseController = new PurchaseController();
