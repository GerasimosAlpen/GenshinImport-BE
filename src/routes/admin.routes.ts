import { Router } from 'express';
import { adminController } from '../controllers/admin.controller';
import { requireAuth, requireAdmin } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import {
  createWeaponSchema,
  updateWeaponSchema,
  createArtifactSchema,
  updateArtifactSchema,
} from '../validations/admin.validation';

const router = Router();

// Protect all admin routes
router.use(requireAuth);
router.use(requireAdmin);

// Dashboard
router.get('/dashboard', adminController.getDashboard);

// Weapons CRUD
router.post('/weapons', validateRequest(createWeaponSchema), adminController.createWeapon);
router.put('/weapons/:id', validateRequest(updateWeaponSchema), adminController.updateWeapon);
router.delete('/weapons/:id', adminController.deleteWeapon);

// Artifacts CRUD
router.post('/artifacts', validateRequest(createArtifactSchema), adminController.createArtifact);
router.put('/artifacts/:id', validateRequest(updateArtifactSchema), adminController.updateArtifact);
router.delete('/artifacts/:id', adminController.deleteArtifact);

export default router;
