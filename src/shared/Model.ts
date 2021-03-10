import { Account } from '../Server/Model';

export enum AccessRights {
  CREATE,
  READ,
  UPDATE,
  DELETE
}

export interface UserCredentials extends Account {
  accessRights: AccessRights[];
}

export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export interface User {
  id: string,
  name: string,
  age: number,
  email: string,
  workingPosition: WorkingPosition
}

export enum WorkingPosition {
  JUNIOR,
  PROGRAMMER,
  ENGINEER,
  EXPERT,
  MANAGER
}
