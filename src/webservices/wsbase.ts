interface IWsbase<T> {
  _get: (endpoint: string) => Promise<T>;
  _getBy: (endpoint: string, bodyOptions?: object, paramOption?: string, queryOption?: string) => Promise<T>;
  _post: (endpoint: string, payLoad?: T) => Promise<T>;
  _put: (endpoint: string, payLoad: T) => Promise<T>;
  _delete: (endpoint: string, payLoad: T) => Promise<T>;
  baseUrl: string;
}

class WsBase<T> implements IWsbase<T> {
  public _get: (endpoint: string) => Promise<T>;

  public _getBy: (endpoint: string, bodyOptions?: object, paramOption?: string, queryOption?: string) => Promise<T>;

  public _post: (endpoint: string, payLoad?: T) => Promise<T>;

  public _put: (endpoint: string, payLoad: T) => Promise<T>;

  public _delete: (endpoint: string, payLoad: T) => Promise<T>;

  public baseUrl = `${process.env.API}/api/`;
}

export default WsBase;
