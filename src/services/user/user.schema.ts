import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import {userAccountSchema} from './userAccount.schema';
import { IUser } from './user';

const type = Schema.Types;

const userSchema: Schema<IUser> = new Schema({
  _id: {
    type: type.String,
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
  account: userAccountSchema,
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
  deleted: {
    type: type.Boolean,
    required: false,
    default: false,
  },
});

userSchema.plugin(uniqueValidator, {
  message: '{PATH} must be unique',
});

userSchema.virtual('fullName').get((): string => {
    const user: IUser = this;
    return `${user.firstName} ${user.lastName}`;
});

userSchema.methods.verifyRequiredProps = function(): { valid: boolean, missing: string } {
  const user = this;

  if (!user.account) return { valid: false, missing: 'Account info is required' };
  if (!user.account.email) return { valid: false, missing: 'Missing email' };
  if (!user.account.password) return { valid: false, missing: 'Missing password' };
  if (!user.firstName) return { valid: false, missing: 'Missing first name' };
  if (!user.lastName) return { valid: false, missing: 'Missing last name' };

  return { valid: true, missing: 'None' };
};

export default model<IUser>('User', userSchema);
