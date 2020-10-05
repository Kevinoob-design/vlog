import { Document } from "mongoose";

interface IAccount {
  email: string;
  password: string;
}

interface IContactInfo {
  email: string;
  telephone: number;
}

export default interface IUser extends Document {
  _id: number;
  name: string;
  lastName: string;
  fullName?: string;
  account: IAccount;
  contactInfo: IContactInfo;
  createdDate: Date;
}
