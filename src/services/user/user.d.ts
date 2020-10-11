import { Document, HookNextFunction } from 'mongoose';

interface IRecovery {
  email: string;
  telephone: string;
}

enum role {
  user,
  admin,
}

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  followers: number;
  bio?: string;
  socialMedia?: [Map<string, string>];
  bookmarks?: [string];
  account: IUserAccount;
  createdDate: Date;
  role: role;
  verifyRequiredProps: () => { valid: boolean, missing: string };
}

export interface IUserAccount extends Document {
  email: string;
  password: string;
  recovery: IRecovery;
  createdDate: Date;
  encryptPassword: (next: HookNextFunction) => Promise<void>;
  comparePassword: (password: string) => Promise<boolean>;
}
