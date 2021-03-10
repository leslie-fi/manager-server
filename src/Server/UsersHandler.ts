import { IncomingMessage, ServerResponse } from 'http';
import { HTTP_METHODS, HTTP_STATUS, AccessRights, User } from '../shared/Model';
import { UsersDBAccess } from '../User/UsersDBAccess';
import { BaseRequestHandler } from './BaseRequestHandler';
import { TokenValidator } from './Model';
import { Utils } from './Utils';

export class UsersHandler extends BaseRequestHandler {
  private usersDbAccess: UsersDBAccess = new UsersDBAccess();
  private tokenValidator: TokenValidator;

  public constructor(
    req: IncomingMessage,
    res: ServerResponse,
    tokenValidator: TokenValidator
  ) {
    super(req, res);
    this.tokenValidator = tokenValidator;
  }

  public async handleRequest(): Promise<void> {
    switch (this.req.method) {
      case HTTP_METHODS.GET:
        await this.handleGet();
        break;
      case HTTP_METHODS.PUT:
        await this.handlePut();
        break;
      case HTTP_METHODS.DELETE:
        await this.handleDelete();
        break;
      default:
        this.handleNotFound();
        break;
    }
  }
  private async handleDelete() {
    const operationAuthorized = await this.operationAuthorized(
      AccessRights.DELETE
    );
    if (operationAuthorized) {
      const userId = Utils.getQueryParams(this.req.url!, 'id');
      if (userId) {
        const deleteResult = this.usersDbAccess.deleteUser(userId);
        if (!!deleteResult) {
          this.responseText(
            HTTP_STATUS.OK,
            `user ${userId} deleted successfully`
          );
        } else {
          this.responseText(
            HTTP_STATUS.NOT_FOUND,
            `user ${userId} was not deleted`
          );
        }
      } else {
        this.responseBadRequest(`missing id in the request`);
      }
    }
  }

  private async handlePut(): Promise<any> {
    const operationAuthorized = await this.operationAuthorized(
      AccessRights.CREATE
    );
    if (operationAuthorized) {
      try {
        const user: User = await this.getRequestBody();
        await this.usersDbAccess.putUser(user);
        this.responseText(
          HTTP_STATUS.CREATED,
          `user ${user.name} created successfully`
        );
      } catch (err) {
        this.responseBadRequest(err.message);
      }
    } else {
      this.responseUnauthorized(`MISSING OR INVALID AUTHENTICATION`);
    }
  }
  private async handleGet() {
    const operationAuthorized = await this.operationAuthorized(
      AccessRights.READ
    );
    if (operationAuthorized) {
      const userId = Utils.getQueryParams(this.req.url!, 'id');
      const userName = Utils.getQueryParams(this.req.url!, 'name');
      if (!!userId) {
        const user = await this.usersDbAccess.getUserById(userId);
        if (user) {
          this.responseJsonObject(HTTP_STATUS.OK, user);
        } else {
          this.handleNotFound();
        }
      } else if (!!userName) {
        const user = await this.usersDbAccess.getUserByName(userName);
        if (user) {
          this.responseJsonObject(HTTP_STATUS.OK, user);
        } else {
          this.handleNotFound();
        }
      } else {
        this.responseBadRequest(
          `userId or user name are not present in request`
        );
      }
    } else {
      this.responseUnauthorized(`MISSING OR INVALID AUTHENTICATION`);
    }
  }

  private async operationAuthorized(operation: AccessRights): Promise<boolean> {
    const tokenId = this.req.headers.authorization;
    if (tokenId) {
      const tokenRights = await this.tokenValidator.validateToken(tokenId);
      if (tokenRights.accessRights.includes(operation)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
