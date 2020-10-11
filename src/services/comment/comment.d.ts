import { Document } from 'mongoose';

enum commentType {
    ArticleReply,
    CommentReply,
}

export default interface IComment extends Document {
  _id: string;
  uid: string;
  articleId: string;
  targetCommentId: string;
  type: commentType;
  comment: string;
  created: Date;
  edited: boolean;
  lastModified: Date;
}
