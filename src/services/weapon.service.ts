import { weaponRepository } from '../repositories/weapon.repository';
import { CustomError } from '../utils/custom-error';
import { WeaponType, WeaponCreateInput, WeaponUpdateInput } from '../models';

export class WeaponService {
  async getAllWeapons(query: { page: number; limit: number; type?: WeaponType; search?: string }) {
    const result = await weaponRepository.findAll(query);
    
    return {
      data: result.data,
      meta: {
        currentPage: result.page,
        totalPages: Math.ceil(result.total / result.limit),
        totalItems: result.total,
      },
    };
  }

  async getWeaponById(id: number) {
    const weapon = await weaponRepository.findById(id);
    if (!weapon) {
      throw new CustomError(404, 'Weapon not found');
    }
    return weapon;
  }

  // Admin methods
  async createWeapon(data: WeaponCreateInput) {
    return weaponRepository.create(data);
  }

  async updateWeapon(id: number, data: WeaponUpdateInput) {
    await this.getWeaponById(id); // Check existence
    return weaponRepository.update(id, data);
  }

  async deleteWeapon(id: number) {
    await this.getWeaponById(id); // Check existence
    return weaponRepository.delete(id);
  }
}

export const weaponService = new WeaponService();
