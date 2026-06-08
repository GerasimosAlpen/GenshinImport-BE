import { purchaseRepository, CheckoutItemInput } from '../repositories/purchase.repository';
import { CustomError } from '../utils/custom-error';

export class PurchaseService {
  async checkout(userId: number, items: CheckoutItemInput[]) {
    return purchaseRepository.checkout(userId, items);
  }

  async getPurchaseHistory(userId: number) {
    return purchaseRepository.findByUserId(userId);
  }

  async getPurchaseDetail(id: string, userId: number) {
    const purchase = await purchaseRepository.findByIdAndUserId(id, userId);
    if (!purchase) {
      throw new CustomError(404, 'Purchase not found');
    }
    return purchase;
  }
}

export const purchaseService = new PurchaseService();
