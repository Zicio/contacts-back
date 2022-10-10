export interface IUser {
  id: string;
  username: string;
  password: string;
}

export interface IContact {
  id: string;
  name: string;
  surname: string;
  tel: string;
  city: string;
}

export interface IToken {
  token: string;
  username: string;
}
