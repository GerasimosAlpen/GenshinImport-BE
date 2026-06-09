import { Request, Response, NextFunction } from 'express';
import { artifactService } from '../services/artifact.service';
import { ArtifactType } from '../models';

export class ArtifactController {
  async getAllArtifacts(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number.parseInt(req.query.page as string) || 1;
      const limit = Number.parseInt(req.query.limit as string) || 10;
      const type = req.query.type as ArtifactType | undefined;
      const search = req.query.search as string | undefined;

      const result = await artifactService.getAllArtifacts({ 
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

  async getArtifactById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number.parseInt(req.params.id as string);
      if (Number.isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid ID' });

      const artifact = await artifactService.getArtifactById(id);
      
      res.status(200).json({
        success: true,
        data: artifact,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const artifactController = new ArtifactController();
