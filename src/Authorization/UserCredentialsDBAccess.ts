import { UserCredentials } from '../shared/Model';
import * as Nedb from 'nedb';

export class UserCredentialsDBAccess {
  private nedb: Nedb;

  constructor() {
    this.nedb = new Nedb('database/UserCredentials.db');
    this.nedb.loadDatabase();
  }

  public async putUserCredentials(
    userCredentials: UserCredentials
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.nedb.insert(userCredentials, (err: Error | null, docs: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }

  public async getUserCredential(
    username: string,
    password: string
  ): Promise<UserCredentials | undefined> {
    return new Promise((resolve, reject) => {
      this.nedb.find(
        { username, password },
        (err: Error | undefined, docs: UserCredentials[]) => {
          if (err) {
            reject(err);
          } else {
            if (!docs.length) {
              resolve(undefined);
            } else {
              resolve(docs[0]);
            }
          }
        }
      );
    });
  }
}
