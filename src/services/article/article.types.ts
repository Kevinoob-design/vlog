import { Document } from 'mongoose';

interface IData {
  views: number;
  likes: number;
  dislikes: number;
}

interface IAvalability {
  isAvailable: boolean;
  reason: string;
}

export default interface IArticle extends Document {
  _id: string;
  uid: string;
  category: [string];
  title: string;
  post: string;
  data: IData;
  avalability: IAvalability;
  created: Date;
  edited: boolean;
  lastModified: Date;
}
