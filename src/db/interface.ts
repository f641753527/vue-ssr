export interface ILanguage {
  id: number | null;
  userId: number;
  language: string;
}

export interface IUser {
  id?: number;
  phone: string;
  password: string;
}
