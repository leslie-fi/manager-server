import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Authorizer } from '../Authorization/Authorizer';
import { LoginHandler } from './LoginHandler';
import { UsersHandler } from './UsersHandler';
import { Utils } from './Utils';

export class Server {
  private authorizer: Authorizer = new Authorizer();
  public createServer() {
    createServer(async (req: IncomingMessage, res: ServerResponse) => {
      this.addCORSHeader(res);
      const basePath = Utils.getUrlBasePath(req.url);

      switch (basePath) {
        case 'login':
          await new LoginHandler(req, res, this.authorizer).handleRequest();
        case 'users':
          await new UsersHandler(req, res, this.authorizer).handleRequest();
        default:
          return;
      }
    })
      .on('error', (err: Error | null) => console.trace(err, err?.stack))
      .listen(8080, () => console.log(`server up and running on 8080`));
  }

  private addCORSHeader(res: ServerResponse) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
  }
}
