export type RegisterInput = {
  username: string;
  email: string;
  password?: string | undefined;
};

export type LoginInput = {
  email: string;
  password?: string | undefined;
};

export type OAuthInput = {
  googleId: string;
  email: string;
  username: string;
};
