import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import IComment from '../comment';

const type = Schema.Types;

const commentSchema: Schema = new Schema({
  _id: {
    type: type.ObjectId,
    required: [true, 'ID most be provided'],
  },
  uid: {
    type: type.ObjectId,
    required: [true, 'Owner of comment most be provided'],
    ref: 'User',
  },
  articleId: {
    type: type.ObjectId,
    required: [true, 'This comment must be attached to an article'],
    ref: 'Article',
  },
  targetCommentId: {
    type: type.ObjectId,
    required: false,
    ref: 'Comment',
  },
  type: {
    type: type.String,
    enum: ['ArticleReply', 'CommentReply'],
    required: [true, 'This comment have to specify a type'],
  },
  comment: {
    type: type.String,
    required: [true, 'A comment must be provided'],
    minlength: 2,
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

commentSchema.plugin(uniqueValidator, {
  message: '{PATH} must be unique',
});

export default model<IComment>('User', commentSchema);
