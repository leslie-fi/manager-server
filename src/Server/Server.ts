import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Authorizer } from '../Authorization/Authorizer';
import { LoginHandler } from './LoginHandler';
import { UsersHandler } from './UsersHandler';
import { Utils } from './Utils';

export class Server {
  private authorizer: Authorizer = new Authorizer();
  public createServer() {
    createServer(async (req: IncomingMessage, res: ServerResponse) => {
      const basePath = Utils.getUrlBasePath(req.url);

      switch (basePath) {
        case 'login':
          await new LoginHandler(req, res, this.authorizer).handleRequest();
        case 'users':
          await new UsersHandler(req, res, this.authorizer).handleRequest();
        default:
          return;
      }
    }).listen(8080, () => console.log(`server up and running on 8080`));
  }
}
1;
