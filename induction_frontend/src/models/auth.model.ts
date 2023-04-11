export type AuthUser = {
  email: string;
  password: string;
};

export type Token = {
  token: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};
