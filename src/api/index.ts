import db, { ILanguage, IUser } from '../db';

// #region 语言包
/** 保存语言包 */
const userId = 99;
export const saveLanguage = async (lang: string) => {
  const [error, data] = await db.getAll<ILanguage>('language');
  if (error) return Promise.reject(error);
  const item = data?.find((v) => v.userId === userId);
  const [error2] = await db.put('language', {
    ...item,
    userId,
    language: lang,
  });
  if (error2) return Promise.reject(error2);
  return Promise.resolve({ code: 0, data: null, message: '' });
};

export const getLanguage = async () => {
  const [error, data] = await db.getAll<ILanguage>('language');
  if (error) return Promise.reject(error);
  const item = data?.find((v) => v.userId === userId);
  if (!item) return Promise.reject({ code: -1, message: '用户未保存语言包' });
  return Promise.resolve({ code: 0, data: item.language, message: '' });
};
// #endregion

// #region 登录注册模块

/** 注册 */
export const signup = async (user: IUser) => {
  const [error, data] = await db.add<IUser>('user', user);

  if (error) return Promise.reject(error);

  return Promise.resolve({ code: 0, data, message: '' });
};

/** 登录 */
export const signin = async (user: IUser) => {
  const [error, data] = await db.getAll<IUser>('user');

  if (error) return Promise.reject(error);
  const item = data?.find((v) => v.phone === user.phone);
  if (!item) return Promise.reject({ code: -1, message: '用户不存在' });
  if (item.password !== user.password)
    return Promise.reject({ code: -1, message: '密码错误' });

  return Promise.resolve({ code: 0, data: item, message: '' });
};

// #endregion
