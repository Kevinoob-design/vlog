import WsBase from './wsbase';
import axios from 'axios';

export declare type Article = {
  _id: string;
  data: {
    views: number;
    likes: number;
    dislikes: number;
  };
  category: string[];
  imgUrl?: string;
  created: Date;
  edited: boolean;
  title: string;
  post: string;
  uid: {
    followers: number;
    firstName: string;
    lastName: string;
    socialMedia: Map<string, string>;
  };
};

class WsArticles extends WsBase<Article> implements Article {
  public _id: string;
  public data: { views: number; likes: number; dislikes: number };
  public category: string[];
  public imgUrl?: string;
  public created: Date;
  public edited: boolean;
  public title: string;
  public post: string;
  public uid: { followers: number; firstName: string; lastName: string; socialMedia: Map<string, string> };

  WsArticles(init: Article) {
    this._id = init._id;
    this.category = init.category;
    this.created = init.created || new Date();
    this.data = init.data;
    this.edited = init.edited || false;
    this.imgUrl = init.imgUrl || '';
    this.post = init.post;
    this.title = init.title;
    this.uid = init.uid;
  }
}

export default WsArticles;
