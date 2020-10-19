import { Document } from 'mongoose';
import { ICategory } from '../category/category';

interface IData {
  views: number;
  likes: number;
  dislikes: number;
}

interface IAvalability {
  isAvailable: boolean;
  reason: string;
}

export interface IArticle extends Document {
  _id: string;
  uid: string;
  category: [ICategory];
  title: string;
  imgUrl: string;
  post: string;
  data: IData;
  avalability: IAvalability;
  created: Date;
  edited: boolean;
  lastModified: Date;
  verifyRequiredProps: () => { valid: boolean; missing: string };
}
