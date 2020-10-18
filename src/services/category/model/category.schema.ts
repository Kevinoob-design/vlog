import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import ICategory from '../category';

const type = Schema.Types;

const categorySchema: Schema = new Schema({
  _id: {
    type: type.ObjectId,
    required: [true, 'ID most be provided'],
  },
  category: {
    type: type.String,
    required: [true, 'The category type most be provided'],
    unique: true,
  },
  createdby: {
    type: type.ObjectId,
    required: false,
    ref: 'User',
  },
  created: {
    type: type.Date,
    required: true,
    default: Date.now(),
  },
});

categorySchema.plugin(uniqueValidator, {
  message: '{PATH} must be unique',
});

export default model<ICategory>('User', categorySchema);
