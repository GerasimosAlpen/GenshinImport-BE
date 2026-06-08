import { Router } from 'express';
import { weaponController } from '../controllers/weapon.controller';
import { validateRequest } from '../middlewares/validate.middleware';
import { weaponQuerySchema } from '../validations/weapon.validation';

const router = Router();

// Public routes for weapons
router.get('/', validateRequest(weaponQuerySchema, 'query'), weaponController.getAllWeapons);
router.get('/:id', weaponController.getWeaponById);

export default router;
