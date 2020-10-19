import CommentSchema from './model/comment.schema';
import { IComment } from './comment';
import { User as fb_User } from 'firebase';

export default class Comment {
  public createComment = (payload: IComment, fbUser?: fb_User): Promise<IComment> => {
    return new Promise((resolve, rejects) => {
      const comment = new CommentSchema(payload);
      comment.uid = fbUser.uid;

      const verified = comment.verifyRequiredProps();

      if (!verified.valid) return rejects({ msg: verified.missing });

      comment
        .save()
        .then((doc) => {
          if (!doc) return rejects({ msg: 'Unable to create category' });
          resolve(doc);
        })
        .catch((err) => {
          rejects({ err, msg: 'Something went wrong creating the category' });
        });
    });
  };
}
