import { Schema, HookNextFunction } from 'mongoose';
import { IUserAccount } from './user';
import uniqueValidator from 'mongoose-unique-validator';
import { compare, hash } from 'bcrypt';
import { config } from '../../../config/config';

const type = Schema.Types;

export const userAccountSchema: Schema<IUserAccount> = new Schema({
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
  recovery: {
    email: {
      type: type.String,
      required: false,
      lowercase: true,
      trim: true,
    },
    telephone: {
      type: type.String,
      required: false,
    },
  },
});

userAccountSchema.plugin(uniqueValidator, {
  message: '{PATH} must be unique',
});

userAccountSchema.methods.encryptPassword = async function name(next: HookNextFunction): Promise<void> {
  if (!this.isModified('password')) next();

  const hashed = await hash(this.password, config.SALT);
  this.password = hashed;
  next();
};

userAccountSchema.methods.comparePassword = function name(password: string): Promise<boolean> {
  return compare(password, this.password);
};

userAccountSchema.pre('save', userAccountSchema.methods.encryptPassword);
