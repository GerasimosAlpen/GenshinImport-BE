import { Router } from 'express';
import { purchaseController } from '../controllers/purchase.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { checkoutSchema } from '../validations/purchase.validation';

const router = Router();

// Protect all purchase routes
router.use(requireAuth);

router.post('/', validateRequest(checkoutSchema), purchaseController.checkout);
router.get('/', purchaseController.getHistory);
router.get('/:id', purchaseController.getDetail);

export default router;
