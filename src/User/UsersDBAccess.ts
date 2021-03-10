import * as Nedb from 'nedb';
import { User } from '../shared/Model';

export class UsersDBAccess {
  private nedb: Nedb;

  constructor() {
    this.nedb = new Nedb('database/Users.db');
    this.nedb.loadDatabase();
  }

  public async putUser(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      this.nedb.insert(user, (err: Error | null) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public async getUserById(userId: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      this.nedb.find({ id: userId }, (err: Error | null, docs: any[]) => {
        if (err) {
          reject(err);
        } else {
          if (!docs.length) {
            resolve(undefined);
          }
          resolve(docs[0]);
        }
      });
    });
  }

  public async getUserByName(userName: string): Promise<User[]> {
    const regEx = new RegExp(userName);
    return new Promise((resolve, reject) => {
      this.nedb.find({ name: regEx }, (err: Error | null, docs: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }

  public async deleteUser(userId: string): Promise<boolean> {
    const operationSuccess = await this.deleteUserFromDB(userId);
    this.nedb.loadDatabase();
    return operationSuccess;
  }

  private async deleteUserFromDB(userId: string): Promise<boolean> {
    const isUserInDB = await this.getUserById(userId);

    return new Promise((resolve, reject) => {
      if (!!isUserInDB) {
        this.nedb.remove(
          { id: userId },
          (err: Error | null, numRemoved: number) => {
            if (err) reject(err);
            if (numRemoved == 0) {
              resolve(false);
            } else {
              resolve(true);
            }
          }
        );
      } else {
        resolve(false)
      }
    });
  }
}
