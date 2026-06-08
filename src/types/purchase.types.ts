export type CheckoutItemInput = {
  weaponId?: number | null | undefined;
  artifactId?: number | null | undefined;
  quantity: number;
};

export type CheckoutInput = {
  items: CheckoutItemInput[];
};
