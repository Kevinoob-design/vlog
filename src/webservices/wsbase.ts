import axios from 'axios';

interface IWsbase<T> {
  _get: (endpoint: string) => Promise<T>;
  _getBy: (endpoint: string, bodyOptions?: object, paramOption?: string, queryOption?: string) => Promise<T>;
  _post: (endpoint: string, payLoad?: T) => Promise<T>;
  _put: (endpoint: string, payLoad: T) => Promise<T>;
  _delete: (endpoint: string, payLoad: T) => Promise<T>;
  baseUrl: string;
}

class WsBase<T> implements IWsbase<T> {
  public baseUrl = `/api`;

  public _get = (endpoint: string): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      axios
        .get<T>(`${this.baseUrl}/${endpoint}`)
        .then((response) => resolve(response.data))
        .catch(reject);
    });
  };

  public _getBy = (endpoint: string, bodyOptions?: object, paramOption?: string, queryOption?: string): Promise<T> => {
    return new Promise<T>((resolve, reject) => {});
  };

  public _post = (endpoint: string, payLoad?: T, headers?): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      axios
        .post<T>(`${this.baseUrl}/${endpoint}`, payLoad, { headers })
        .then((response) => resolve(response.data))
        .catch(reject);
    });
  };

  public _put = (endpoint: string, payLoad: T): Promise<T> => {
    return new Promise<T>((resolve, reject) => {});
  };

  public _delete = (endpoint: string, payLoad: T): Promise<T> => {
    return new Promise<T>((resolve, reject) => {});
  };
}

export default WsBase;
