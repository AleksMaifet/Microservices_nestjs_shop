export enum UserRole {
  User = 'User',
  Admin = 'Admin',
}

export interface IUser {
  _id?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}
