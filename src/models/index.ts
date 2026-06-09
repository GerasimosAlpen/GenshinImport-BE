export type WeaponType = 'SWORD' | 'CLAYMORE' | 'POLEARM' | 'CATALYST' | 'BOW';

export type ArtifactType = 'FLOWER' | 'PLUME' | 'SANDS' | 'GOBLET' | 'CIRCLET';

export type Role = 'ADMIN' | 'USER';

export type PurchaseStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';

export interface User {
  id: number;
  username: string;
  email: string;
  password?: string | null;
  role: Role;
  googleId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Weapon {
  id: number;
  name: string;
  type: WeaponType;
  description: string;
  stock: number;
  imageUrl: string;
  price: string; 
  createdAt: Date;
  updatedAt: Date;
}

export interface Artifact {
  id: number;
  name: string;
  type: ArtifactType;
  description: string;
  stock: number;
  imageUrl: string;
  price: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Purchase {
  id: string; // cuid
  userId: number;
  totalPrice: string;
  status: PurchaseStatus;
  createdAt: Date;
  
  // Relations
  items?: PurchaseItem[];
}

export interface PurchaseItem {
  id: string; // cuid
  purchaseId: string;
  weaponId?: number | null;
  artifactId?: number | null;
  quantity: number;
  unitPrice: string;

  // Relations
  weapon?: Weapon | null;
  artifact?: Artifact | null;
}

// Input types for repositories
export type UserCreateInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type WeaponCreateInput = Omit<Weapon, 'id' | 'createdAt' | 'updatedAt'>;
export type WeaponUpdateInput = Partial<WeaponCreateInput>;
export type ArtifactCreateInput = Omit<Artifact, 'id' | 'createdAt' | 'updatedAt'>;
export type ArtifactUpdateInput = Partial<ArtifactCreateInput>;
