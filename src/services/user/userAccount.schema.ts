import { Schema, model, HookNextFunction } from 'mongoose';
import { IUserAccount } from './user.types';
import { compare, hash } from 'bcrypt';

import config from 'config/config';
import uniqueValidator from 'mongoose-unique-validator';

const type = Schema.Types;

const userAccountSchema: Schema<IUserAccount> = new Schema({
  _id: {
    type: type.ObjectId,
    required: [true, 'ID most be provided'],
  },
  account: {
    email: {
      type: type.String,
      required: [true, 'Login email most be provided'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: type.String,
      required: [true, 'Login password most be provided'],
    },
  },
  recovery: {
    email: {
      type: [type.String],
      required: false,
      lowercase: true,
      trim: true,
    },
    telephone: {
      type: [type.String],
      required: false,
    },
  },
  createdDate: {
    type: type.Date,
    default: Date.now,
    required: true,
  },
});

userAccountSchema.plugin(uniqueValidator, {
  message: '{PATH} must be unique',
});

userAccountSchema.methods.encryptPassword = async function(next: HookNextFunction): Promise<void> {
  if (!this.isModified('account.password')) next();
  this.account.password = await hash(this.account.password, config.SALT);
  next();
};

userAccountSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
   return compare(password, this.account.password);
};

userAccountSchema.pre('updateOne', userAccountSchema.methods.encryptPassword);

export default model<IUserAccount>('UserAccount', userAccountSchema);
