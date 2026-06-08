import { Router } from 'express';
import { profileController } from '../controllers/profile.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { updateProfileSchema } from '../validations/profile.validation';

const router = Router();

// All profile routes require authentication
router.use(requireAuth);

router.get('/', profileController.getProfile);
router.patch('/', validateRequest(updateProfileSchema), profileController.updateProfile);

export default router;
