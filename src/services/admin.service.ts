import { adminRepository } from '../repositories/admin.repository';

export class AdminService {
  async getDashboardStats() {
    return adminRepository.getDashboardStats();
  }
}

export const adminService = new AdminService();
