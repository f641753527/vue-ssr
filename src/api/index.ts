import db, { IUser } from '../db';

export const fetchUserList = async () => {
  const [e, data] = await db.getAll<IUser>('user');
  if (!e) {
    return Promise.resolve({ code: 0, data });
  }
  return Promise.reject({ code: -1, message: e });
};
