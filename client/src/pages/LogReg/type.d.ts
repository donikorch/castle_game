export type User = {
  id: number;
  img: string;
  username: string;
  email: string;
  password: string;
  user_level: number;
  theme_id: number;
};

export type UserType = {
  user: User | undefined;
  error: string | undefined;
};

// export type UserReg = Omit<User, 'id'>;

export type UserLog = {
  username: string;
  password: string;
};

export type UserReg = {
  username: string;
  email: string;
  password: string;
  checkPassword: string;
  user_level: number;
};
