import { tables } from './constants';

export default class IndexedDB {
  private readonly _dbName = '__VUE_SSR_DB_NAME__';
  private readonly _dbVersion = 4;
  private _db: any;

  constructor() {
    this.open();
  }

  private async open(): Promise<[any, any]> {
    return new Promise((resolve) => {
      if (this._db) return resolve([null, this._db]);
      const request = window.indexedDB.open(this._dbName, this._dbVersion);

      request.onerror = (e) => {
        console.error('数据库连接失败!', e);
        resolve([e, null]);
      };

      request.onsuccess = (e: any) => {
        console.log('数据库连接成功!', e);
        this._db = e.target.result;
        resolve([null, e.target.result]);
      };

      request.onupgradeneeded = (e: any) => {
        console.log(
          `数据库更新!, 旧版本：${e.oldVersion}, 新版本: ${e.newVersion}`,
          e,
        );
        const db = e.target.result;

        tables.forEach((table) => {
          if (!db.objectStoreNames.contains(table.name)) {
            db.createObjectStore(table.name, {
              keyPath: table.key,
              autoIncrement: true,
            });
          }
        });
      };
    });
  }

  /** 新增数据 */
  public async add<T = any>(
    tableName: string,
    data: T,
  ): Promise<[any, T | null]> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const [error, db] = await this.open();
      if (error) return resolve([error, null]);

      const transaction = db.transaction([tableName], 'readwrite');
      const request = transaction.objectStore(tableName).add(data);

      request.onsuccess = (e: any) => {
        const row = { ...data, id: e.target.result };
        console.log('数据插入成功!', `表: ${tableName}, 数据:`, row);
        resolve([null, row]);
      };
      request.onerror = (e: any) => {
        console.error(
          '数据插入失败!',
          `表: ${tableName}, 数据:`,
          data,
          e.target.error,
        );
        resolve([e, null]);
      };
    });
  }

  /** 修改数据 */
  public async put<T = any>(
    tableName: string,
    data: T,
  ): Promise<[any, T | null]> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const [error, db] = await this.open();
      if (error) return resolve([error, null]);

      const transaction = db.transaction([tableName], 'readwrite');
      const request = transaction.objectStore(tableName).put(data);

      request.onsuccess = () => {
        console.log('数据修改成功!', `表: ${tableName}, 数据:`, data);
        resolve([null, data]);
      };
      request.onerror = (e: any) => {
        console.error(
          '数据修改失败!',
          `表: ${tableName}, 数据:`,
          data,
          e.target.error,
        );
        resolve([e, null]);
      };
    });
  }

  /** 删除数据 */
  public async delete(
    tableName: string,
    key: string | number,
  ): Promise<[any, null]> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const [error, db] = await this.open();
      if (error) return resolve([error, null]);

      const store = db
        .transaction([tableName], 'readwrite')
        .objectStore([tableName]);
      const request = store.delete(key);

      request.onsuccess = () => {
        console.log('数据删除成功!', `表: ${tableName}, key:`, key);
        resolve([null, null]);
      };
      request.onerror = (e: any) => {
        console.error(
          '数据删除失败!',
          `表: ${tableName}, 数据:`,
          key,
          e.target.error,
        );
        resolve([e, null]);
      };
    });
  }

  /** 查询数据 */
  public async get<T>(
    tableName: string,
    key: string | number,
  ): Promise<[any, T | null]> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const [error, db] = await this.open();
      if (error) return resolve([error, null]);

      const store = db
        .transaction([tableName], 'readwrite')
        .objectStore([tableName]);
      const request = store.get(key);

      request.onsuccess = (e: any) => {
        const data = e.target.result;
        if (!data) {
          console.log(
            '数据获取失败!',
            `表: ${tableName}, key: ${key}, 未找到数据`,
          );
          return resolve([null, null]);
        }
        console.log('数据获取成功!', `表: ${tableName}, data:`, data);
        resolve([null, data]);
      };
      request.onerror = (e: any) => {
        console.error(
          '数据获取失败!',
          `表: ${tableName}, key:`,
          key,
          e.target.error,
        );
        resolve([e, null]);
      };
    });
  }

  /** 查询所有数据 */
  public async getAll<T>(tableName: string): Promise<[any, T[] | null]> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const [error, db] = await this.open();
      if (error) return resolve([error, null]);

      const store = db
        .transaction([tableName], 'readwrite')
        .objectStore([tableName]);
      const request = store.getAll();

      request.onsuccess = (e: any) => {
        const data = e.target.result;
        console.log('数据获取成功!', `表: ${tableName}, data:`, data);
        resolve([null, data]);
      };
      request.onerror = (e: any) => {
        console.error('数据获取失败!', `表: ${tableName}`, e.target.error);
        resolve([e, null]);
      };
    });
  }
}
