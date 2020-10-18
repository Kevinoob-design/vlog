import { User as fb_User } from 'firebase';

export declare global {
  namespace Express {
    interface Request {
      uid: string;
      token: string;
      fbUser: fb_User;
    }
  }
}
