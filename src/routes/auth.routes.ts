import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validate.middleware';
import { registerSchema, loginSchema, oauthSchema } from '../validations/auth.validation';
import { authentication } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/login', validateRequest(loginSchema), authController.login);
router.post('/google', validateRequest(oauthSchema), authController.googleOAuth);

// Protected routes
router.get('/me', authentication, authController.getMe);

export default router;
