import { artifactRepository } from '../repositories/artifact.repository';
import { CustomError } from '../utils/custom-error';
import { ArtifactType, ArtifactCreateInput, ArtifactUpdateInput } from '../models';

export class ArtifactService {
  async getAllArtifacts(query: { page: number; limit: number; type?: ArtifactType; search?: string }) {
    const result = await artifactRepository.findAll(query);
    
    return {
      data: result.data,
      meta: {
        currentPage: result.page,
        totalPages: Math.ceil(result.total / result.limit),
        totalItems: result.total,
      },
    };
  }

  async getArtifactById(id: number) {
    const artifact = await artifactRepository.findById(id);
    if (!artifact) {
      throw new CustomError(404, 'Artifact not found');
    }
    return artifact;
  }

  // Admin methods
  async createArtifact(data: ArtifactCreateInput) {
    return artifactRepository.create(data);
  }

  async updateArtifact(id: number, data: ArtifactUpdateInput) {
    await this.getArtifactById(id); // Check existence
    return artifactRepository.update(id, data);
  }

  async deleteArtifact(id: number) {
    await this.getArtifactById(id); // Check existence
    return artifactRepository.delete(id);
  }
}

export const artifactService = new ArtifactService();
