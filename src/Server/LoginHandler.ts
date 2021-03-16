import { IncomingMessage, ServerResponse } from 'http';
import { HTTP_METHODS, HTTP_STATUS } from '../shared/Model';
import { BaseRequestHandler } from './BaseRequestHandler';
import { Account, TokenGenerator } from './Model';

export class LoginHandler extends BaseRequestHandler {
  private tokenGenerator: TokenGenerator;

  public constructor(
    req: IncomingMessage,
    res: ServerResponse,
    tokenGenerator: TokenGenerator
  ) {
    super(req, res);
    this.tokenGenerator = tokenGenerator;
  }

  public async handleRequest(): Promise<void> {
    switch (this.req.method) {
      case HTTP_METHODS.POST:
        await this.handlePost();
        break;
        case HTTP_METHODS.OPTIONS:
        this.res.writeHead(HTTP_STATUS.OK);
        break;
      // case HTTP_METHODS.GET:
      // case HTTP_METHODS.DELETE:
      default:
        this.handleNotFound();
        break;
    }
  }

  private async handlePost() {
    try {
      const body: Account = await this.getRequestBody();
      const sessionToken = await this.tokenGenerator.generateToken(body);
      console.log(body, sessionToken);
      if (sessionToken) {
        this.res.statusCode = HTTP_STATUS.CREATED;
        this.res.writeHead(HTTP_STATUS.CREATED, {
          'Content-Type': 'application/json',
        });
        this.res.write(JSON.stringify(sessionToken));
      } else {
        this.req.statusCode = HTTP_STATUS.NOT_FOUND;
        this.res.write('wrong credentials');
      }
    } catch (error) {
      console.error(error.stack);
      this.res.write('error: ' + error.message);
    }
  }
}
