import { IncomingMessage, ServerResponse } from 'http';
import { Account, Handler, TokenGenerator } from './Model';

export class LoginHandler implements Handler {
  private req: IncomingMessage;
  private res: ServerResponse;
  private tokenGenerator: TokenGenerator;

  public constructor(
    req: IncomingMessage,
    res: ServerResponse,
    tokenGenerator: TokenGenerator
  ) {
    this.req = req;
    this.res = res;
    this.tokenGenerator = tokenGenerator;
  }

  public async handleRequest(): Promise<void> {
    try {
      const body = await this.getRequestBody();
      const sessionToken = await this.tokenGenerator.generateToken(body);
      console.log(body,sessionToken)
      if (sessionToken) {
        this.res.write('valid credentials');
      } else {
        this.res.write('wrong credentials');
      }
    } catch (error) {
      console.error(error.stack);
      this.res.write('error: ' + error.message);
    }
  }

  private async getRequestBody(): Promise<Account> {
    return new Promise((resolve, reject) => {
      let body = '';
      this.req.on('data', (data: string) => {
        body += data;
      });
      this.req.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
      this.req.on('error', (error: any) => {
        console.error(error.stack)
        reject(error);
      });
    });
  }
}
