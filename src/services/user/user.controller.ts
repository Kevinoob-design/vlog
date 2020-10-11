import UserSchema from './user.schema';
import { IUser } from './user.types';

export default class User {

  public getUserByID = (payload: IUser): Promise<IUser> => {
    return new Promise((resolve, rejects) => {
      if (!payload._id) return rejects({ msg: 'Error, required ID missing' });
      UserSchema.findById(payload._id, {}).then(user => {
        if (!user) return rejects({ msg: 'The user does not exist' });
        resolve(user);
      }).catch(err => {
        rejects({ err, msg: 'Something went wrong while looking for the user' });
      });
    });
  }
}
