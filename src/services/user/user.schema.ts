import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IUser } from './user.types';

const type = Schema.Types;

const userSchema: Schema<IUser> = new Schema({
  _id: {
    type: type.ObjectId,
    required: [true, 'ID most be provided'],
  },
  firstName: {
    type: type.String,
    required: [true, 'User most have a name'],
  },
  lastName: {
    type: type.String,
    required: [true, 'User most provide a last name'],
  },
  followers: {
    type: type.Number,
    required: false,
    default: 0,
  },
  bio: {
    type: type.String,
    required: false,
  },
  socialMedia: {
    type: [type.Map],
    of: type.String,
    required: false,
  },
  bookmarks: {
    type: [type.ObjectId],
    required: false,
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  role: {
    type: type.String,
    enum: ['user', 'admin'],
    required: [true, 'A new user most have a role'],
    default: 'user',
  },
});

userSchema.plugin(uniqueValidator, {
  message: '{PATH} must be unique',
});

userSchema.virtual('fullName').get((): string => {
    const user: IUser = this;
    return `${user.firstName} ${user.lastName}`;
});

export default model<IUser>('User', userSchema);
