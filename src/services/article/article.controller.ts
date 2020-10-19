import ArticleSchema from './model/article.schema';
import UserSchema from '../user/model/user.schema';
import { IArticle } from './article';
import { User as fb_User } from 'firebase';

export default class Article {
  public postArticle = (article: IArticle, fbUser: fb_User): Promise<IArticle> => {
    return new Promise((resolve, rejects) => {
      if (!fbUser) return rejects({ msg: 'No user found' });

      article.uid = fbUser.uid;
      const NewArticle = new ArticleSchema(article);

      const verified = NewArticle.verifyRequiredProps();

      if (!verified.valid) return rejects({ msg: verified.missing });

      NewArticle.save()
        .then((doc) => {
          if (!doc) return rejects({ msg: 'Cannot post article' });
          resolve(doc);
        })
        .catch((err) => {
          console.error(err);
          rejects({ err, msg: 'An error occured posting your article' });
        });
    });
  };

  public getArticles = (): Promise<IArticle[]> => {
    return new Promise((resolve, rejects) => {
      ArticleSchema.find({ 'avalability.isAvailable': true }, { lastModified: 0, avalability: 0, post: 0 })
        .populate('uid', { account: 0, createdDate: 0, _id: 0, role: 0, bookmarks: 0, deleted: 0, articles: 0 })
        .then((docs) => {
          if (!docs) return rejects({ msg: 'there is no article posted' });
          resolve(docs);
        })
        .catch((err) => {
          rejects({ err, msg: 'Unable to get articles' });
        });
    });
  };

  public getFullArticle = (_id: string, fbUser?: fb_User): Promise<IArticle> => {
    return new Promise((resolve, rejects) => {
      if (!_id) return rejects({ msg: 'missing ID' });

      ArticleSchema.findOne({ _id, 'avalability.isAvailable': true }, { lastModified: 0, avalability: 0 })
        .populate('uid', { account: 0, createdDate: 0, _id: 0, role: 0, bookmarks: 0, deleted: 0, articles: 0 })
        .then((docs) => {
          if (!docs) return rejects({ msg: 'there is no article posted' });
          resolve(docs);

          if (fbUser) {
            UserSchema.findById(fbUser.uid).then((doc) => {
              const viewed = doc.articles.viewed.filter((v) => v === _id);
              if (viewed.length > 0) return 0;

              return UserSchema.updateOne({ _id: fbUser.uid }, { $addToSet: { 'articles.viewed': _id } }).then(() => {
                return ArticleSchema.updateOne({ _id }, { $inc: { 'data.views': 1 } });
              });
            });
          }
        })
        .catch((err) => {
          rejects({ err, msg: 'Unable to get article' });
        });
    });
  };

  public likeArticle = (_id: string, fbUser: fb_User): Promise<IArticle> => {
    return new Promise((resolve, rejects) => {
      if (!_id) return rejects({ msg: 'missing ID' });

      UserSchema.findOne({ _id: fbUser.uid })
        .then((doc) => {
          const liked = doc.articles.likes.filter((l) => l === _id);
          const disliked = doc.articles.dislikes.filter((l) => l === _id);

          if (liked.length > 0) {
            return ArticleSchema.updateOne({ _id, 'avalability.isAvailable': true }, { $inc: { 'data.likes': -1 } }, { lastModified: 0, avalability: 0 })
              .populate('uid', { account: 0, createdDate: 0, _id: 0, role: 0, bookmarks: 0, deleted: 0 })
              .then((docs: IArticle) => {
                if (!docs) return rejects({ msg: 'there is no article' });
                resolve(docs);

                return UserSchema.updateOne({ _id: fbUser.uid }, { $pull: { 'articles.likes': _id } });
              });
          } else {
            return ArticleSchema.updateOne(
              { _id, 'avalability.isAvailable': true },
              { $inc: { 'data.likes': 1, 'data.dislikes': -disliked.length } },
              { lastModified: 0, avalability: 0 }
            )
              .populate('uid', { account: 0, createdDate: 0, _id: 0, role: 0, bookmarks: 0, deleted: 0 })
              .then((docs: IArticle) => {
                if (!docs) return rejects({ msg: 'there is no article' });
                resolve(docs);

                return UserSchema.updateOne({ _id: fbUser.uid }, { $addToSet: { 'articles.likes': _id }, $pull: { 'articles.dislikes': _id } });
              });
          }
        })
        .catch((err) => {
          rejects({ err, msg: 'Unable to get articles' });
        });
    });
  };

  public dislikeArticle = (_id: string, fbUser: fb_User): Promise<IArticle> => {
    return new Promise((resolve, rejects) => {
      if (!_id) return rejects({ msg: 'missing ID' });

      UserSchema.findOne({ _id: fbUser.uid })
        .then((doc) => {
          const liked = doc.articles.likes.filter((l) => l === _id);
          const disliked = doc.articles.dislikes.filter((l) => l === _id);

          if (disliked.length > 0) {
            return ArticleSchema.updateOne({ _id, 'avalability.isAvailable': true }, { $inc: { 'data.dislikes': -1 } }, { lastModified: 0, avalability: 0 })
              .populate('uid', { account: 0, createdDate: 0, _id: 0, role: 0, bookmarks: 0, deleted: 0 })
              .then((docs: IArticle) => {
                if (!docs) return rejects({ msg: 'there is no article' });
                resolve(docs);

                return UserSchema.updateOne({ _id: fbUser.uid }, { $pull: { 'articles.dislikes': _id } });
              });
          } else {
            return ArticleSchema.updateOne(
              { _id, 'avalability.isAvailable': true },
              { $inc: { 'data.dislikes': 1, 'data.likes': -liked.length } },
              { lastModified: 0, avalability: 0 }
            )
              .populate('uid', { account: 0, createdDate: 0, _id: 0, role: 0, bookmarks: 0, deleted: 0 })
              .then((docs: IArticle) => {
                if (!docs) return rejects({ msg: 'there is no article' });
                resolve(docs);

                return UserSchema.updateOne({ _id: fbUser.uid }, { $addToSet: { 'articles.dislikes': _id }, $pull: { 'articles.likes': _id } });
              });
          }
        })
        .catch((err) => {
          rejects({ err, msg: 'Unable to get articles' });
        });
    });
  };
}
