export interface IUser {
  id: string;
  username: string;
  password: string;
}

export interface IContact {
  name: string;
  surname: string;
  tel: string;
  city: string;
}

export interface IToken {
  token: string;
  username: string;
}
