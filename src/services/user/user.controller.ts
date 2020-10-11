import UserSchema from './user.schema';
import { IUser } from './user.types';
import * as fb from 'firebase';
export default class User {

  public singUpUserWithFB = (payload: IUser): Promise<any> => {
    return new Promise((resolve, rejects) => {
      if (!payload) return rejects({ msg: 'Missing required payload to sign in' });

      const user = new UserSchema(payload);
      const verified = user.verifyRequiredProps();

      if (!verified.valid) return rejects({ msg: verified.missing });

      fb.auth()
        .createUserWithEmailAndPassword(payload.account.email, payload.account.password)
        .then((resp) => {
          if (!resp) return rejects({ msg: 'Unable to create user' });

          user._id = resp.user.uid;
          user.account.recovery.email = resp.user.email;
          if (resp.user.phoneNumber) user.account.recovery.telephone = resp.user.phoneNumber;

          return user.save().then((doc) => {
            doc.account = undefined;
            doc.role = undefined;
            resolve({ doc, bearer: resp.user.refreshToken });
          });
        })
        .catch((err) => {
          rejects({ err, msg: err.message });
        });
    });
  }

  public logInUserWithFB = (payload: IUser): Promise<any> => {
    return new Promise((resolve, rejects) => {
      if (!payload || !payload.account || !payload.account.email || !payload.account.password)
        return rejects({ msg: 'Missing email or password' });

      fb.auth()
        .signInWithEmailAndPassword(payload.account.email, payload.account.password)
        .then((resp) => {
          if (!resp) return rejects({ msg: 'Unable to create user' });

          return this.getUserByID(resp.user.uid).then((doc) => {
            resolve({ doc, bearer: resp.user.refreshToken });
          });
        })
        .catch((err) => {
          rejects({ err, msg: err.message });
        });
    });
  }

  public getUserByID = (_id: string): Promise<IUser> => {
    return new Promise((resolve, rejects) => {
      if (!_id) return rejects({ msg: 'Error, required ID missing' });

      UserSchema.findById(_id, {account: 0, createdDate: 0, _id: 0, role: 0})
        .then((user) => {
          if (!user) return rejects({ msg: 'The user does not exist' });
          resolve(user);
        })
        .catch((err) => {
          rejects({ err, msg: 'Something went wrong while looking for the user' });
        });
    });
  }
}
