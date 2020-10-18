import UserSchema from './model/user.schema';
import { IUser } from './user';
import { auth, User as fb_User } from 'firebase';
import { auth as authAdmin, storage } from 'firebase-admin';
export default class User {
  /**
   * Method to create a new user with Fire Base
   * @param  {IUser} payload
   * @returns Promise with user Doc
   */
  public singUpUserWithFB = (payload: IUser): Promise<any> => {
    return new Promise((resolve, rejects) => {
      if (!payload) return rejects({ msg: 'Missing required payload to sign in' });

      const user = new UserSchema(payload);
      const verified = user.verifyRequiredProps();

      if (!verified.valid) return rejects({ msg: verified.missing });

      auth()
        .createUserWithEmailAndPassword(payload.account.email, payload.account.password)
        .then(async (fbUser) => {
          if (!fbUser) return rejects({ msg: 'Unable to create user' });

          user._id = fbUser.user.uid;
          user.account.recovery.email = fbUser.user.email;
          if (fbUser.user.phoneNumber) user.account.recovery.telephone = fbUser.user.phoneNumber;

          const bearer = await authAdmin().createCustomToken(fbUser.user.uid);

          return user.save().then((doc) => {
            doc.account = undefined;
            doc.role = undefined;
            resolve({ doc, bearer });
          });
        })
        .catch((err) => {
          rejects({ err, msg: err.message });
        });
    });
  };

  /**
   * Method to login a user with fireabse
   * @param  {IUser} payload
   * @returns Promise with user Doc
   */
  public logInUserWithFB = (payload: IUser): Promise<any> => {
    return new Promise((resolve, rejects) => {
      if (!payload || !payload.account || !payload.account.email || !payload.account.password) return rejects({ msg: 'Missing email or password' });

      auth()
        .signInWithEmailAndPassword(payload.account.email, payload.account.password)
        .then(async (resp) => {
          if (!resp) return rejects({ msg: 'Unable to create user' });

          const bearer = await authAdmin().createCustomToken(resp.user.uid);

          return this.getUserByID(resp.user.uid).then((doc) => {
            resolve({ doc, bearer, resp });
          });
        })
        .catch((err) => {
          rejects({ err, msg: err.message });
        });
    });
  };

  /**
   * Gets user based ID
   * @param  {string} _id
   * @returns Promise with user Doc
   */
  public getUserByID = (_id: string): Promise<IUser> => {
    return new Promise((resolve, rejects) => {
      if (!_id) return rejects({ msg: 'Error, required ID missing' });

      UserSchema.findOne({ _id, deleted: false }, { account: 0, createdDate: 0, _id: 0, role: 0 })
        .then((user) => {
          if (!user) return rejects({ msg: 'The user does not exist' });
          resolve(user);
        })
        .catch((err) => {
          rejects({ err, msg: 'Something went wrong while looking for the user' });
        });
    });
  };

  public disableUserByID = (_id: string, token?: string): Promise<object> => {
    return new Promise((resolve, rejects) => {
      authAdmin().deleteUser(_id);
      authAdmin().revokeRefreshTokens(_id);

      return UserSchema.updateOne({ _id }, { $set: { deleted: true } })
        .then(({ nModified }) => {
          if (nModified === 0) return rejects({ msg: 'User was not deleted' });
          resolve({ nModified });
        })
        .catch((err) => {
          console.error(err);
          rejects({ err, msg: 'User was not deleted' });
        });
    });
  };

  public addRecoveryPhone = (telephone: string, _id: string): Promise<object> => {
    return new Promise((resolve, rejects) => {
      if ((!telephone && typeof telephone !== 'string') || !_id) return rejects({ msg: 'Missing required payload' });

      authAdmin()
        .updateUser(_id, { phoneNumber: telephone })
        .then((usr) => {
          return UserSchema.updateOne({ _id }, { $set: { 'account.recovery.telephone': usr.phoneNumber } }).then(({ nModified }) => {
            if (nModified === 0) return rejects({ msg: 'Phone number was not updated' });
            resolve({ nModified });
          });
        })
        .catch((err) => {
          console.error(err);
          rejects({ err, msg: 'Phone number was not updated' });
        });
    });
  };

  // TODO: Send reset password email link
  public recoverPassword = (fbUser: fb_User): Promise<object> => {
    return new Promise((resolve, rejects) => {
      if (!fbUser) return rejects({ msg: 'Missing user info' });

      auth().sendPasswordResetEmail(fbUser.email);
      resolve({ ok: true });
    });
  };

  // TODO: Send validate email
  public sendVerifyEmail = (fbUser: fb_User): Promise<object> => {
    return new Promise((resolve, rejects) => {
      if (!!fbUser || fbUser.emailVerified) return rejects({ msg: 'Email already verified' });

      fbUser
        .sendEmailVerification()
        .then(() => {
          return UserSchema.updateOne({ _id: fbUser.uid }, { $set: { 'account.recovery.emailVerified': true } }).then(({ nModified }) => {
            if (nModified === 0) return rejects({ msg: 'Phone number was not updated' });
            resolve({ nModified });
          });
        })
        .catch((err) => {
          rejects({ err, msg: 'Email could not be verified' });
        });
    });
  };

  // TODO: Upload photo and save the photo url tu fb user profile and mongo collection
  public addProfilePhoto = (photo: string, _id: string): Promise<object> => {
    return new Promise((resolve, rejects) => {
      if (!photo || !_id) return rejects({ msg: 'Missing required payload' });

      storage()
        .bucket(`Usuarios/${_id}/`)
        .upload(photo, {})
        .then((resp) => {})
        .catch((err) => {
          console.error(err);
          rejects({ err, msg: 'Phone number was not updated' });
        });
    });
  };
}
