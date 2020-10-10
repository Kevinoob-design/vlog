import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import IArticle from './article.types';

const type = Schema.Types;

const articleSchema: Schema = new Schema({
  _id: {
    type: type.ObjectId,
    unique: true,
    required: [true, 'ID must be generated as an object id'],
  },
  uid: {
    type: type.ObjectId,
    required: [true, 'Owner user ID most be pressent on the article'],
    ref: 'User',
  },
  category: {
    type: type.Array,
    required: [true, 'At least one category most be passed to the article'],
  },
  title: {
    type: type.String,
    required: [true, 'The title most be provided'],
  },
  post: {
    type: type.String,
    required: [true, 'Post most be at least 250 words minimum'],
    minlength: 250,
  },
  data: {
    views: {
      type: type.Number,
      required: false,
      default: 0,
    },
    likes : {
      type: type.Number,
      required: false,
      default: 0,
    },
    dislikes: {
      type: type.Number,
      required: false,
      default: 0,
    },
  },
  avalability: {
    isAvailable: {
      type: type.Boolean,
      required: false,
      default: true,
    },
    reason: {
      type: type.String,
      required: false,
      default: 'Article aproved by system',
    },
  },
  created: {
    type: type.Date,
    required: true,
    default: Date.now(),
  },
  edited: {
    type: type.Boolean,
    required: false,
    default: false,
  },
  lastModified: {
    type: type.Date,
    required: false,
    default: Date.now(),
  },
});

articleSchema.plugin(uniqueValidator, {
  message: '{PATH} must be unique',
});

export default model<IArticle>('Article', articleSchema);
