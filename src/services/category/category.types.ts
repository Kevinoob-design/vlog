import { Document } from 'mongoose';

export default interface IArticle extends Document {
  _id: string;
  category: string;
  createdby: string;
  created: Date;
}
