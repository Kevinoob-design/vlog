import UserSchema from './user.schema';
import { IUser } from './user.types';

export default class User {
  public getUserByID = (_id: string): Promise<IUser> => {
    return new Promise((resolve, rejects) => {
      UserSchema.findById(_id)
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }
}
