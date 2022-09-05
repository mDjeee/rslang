export class User {
  constructor(public messge: string, public name: string, public userId: string, private _token: string, private _refreshToken: string) {}

  get token() {
    return this._token;
  }
}
