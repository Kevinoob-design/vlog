import CategorySchema from './model/category.schema';
import { ICategory } from './category';
import { User as fb_User } from 'firebase';

export default class Article {
  public createNewCategory = (category: ICategory, fbUser?: fb_User): Promise<ICategory> => {
    return new Promise((resolve, rejects) => {
      const Category = new CategorySchema(category);

      const verified = Category.verifyRequiredProps();

      if (!verified.valid) return rejects({ msg: verified.missing });
      if (fbUser.uid) Category.createdby = fbUser.uid;

      Category.save()
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
