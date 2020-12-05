import WsBase from '../../webservices/wsbase';
import axios from 'axios';

export declare type Account = {
  followers?: number;
  socialMedia?: Map<string, string>;
  firstName?: string;
  lastName?: string;
  bookmarks?: string[];
  articles?: {
    dontShow: string[];
    viewed: string[];
    dislikes: string[];
    likes: string[];
  };
  account?: object;
};

class WsAccount extends WsBase<Account> implements Account {
  public followers: number;
  public socialMedia: Map<string, string>;
  public firstName: string;
  public lastName: string;
  public bookmarks: string[];
  public articles: { dontShow: string[]; viewed: string[]; dislikes: string[]; likes: string[] };

  private WsAccount(init: Account): void {
    this.firstName = init.firstName;
    this.lastName = init.lastName;
    this.socialMedia = init.socialMedia;
    this.bookmarks = init.bookmarks;
    this.articles = init.articles;
  }
}

export default WsAccount;
