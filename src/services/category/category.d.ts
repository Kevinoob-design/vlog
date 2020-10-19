import { Document } from 'mongoose';

export interface ICategory extends Document {
  _id: string;
  category: string;
  createdby: string;
  created: Date;
  verifyRequiredProps: () => { valid: boolean; missing: string };
}
