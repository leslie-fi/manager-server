import { IncomingMessage, ServerResponse } from 'node:http';
import { HTTP_STATUS } from '../shared/Model';

export abstract class BaseRequestHandler {
  protected req: IncomingMessage;
  protected res: ServerResponse;

  public constructor(req: IncomingMessage, res: ServerResponse) {
    this.req = req;
    this.res = res;
  }
  abstract handleRequest(): Promise<void>;

  protected handleNotFound() {
    this.res.write('', (err: Error | null | undefined) => console.error('handle not found err', err));
  }

  protected responseJsonObject(code: HTTP_STATUS, object: any) {
    this.res.writeHead(code, {
      'Content-Type': 'application/json',
    });
    this.res.write(JSON.stringify(object));
  }

  protected responseBadRequest(message: string) {
    this.res.statusCode = HTTP_STATUS.BAD_REQUEST;
    this.res.write(message);
  }

  protected responseUnauthorized(message: string) {
    this.res.statusCode = HTTP_STATUS.UNAUTHORIZED;
    this.res.write(message);
  }

  protected responseText(code: HTTP_STATUS, message: string) {
    this.res.statusCode = code;
    this.res.write(message);
  }

  protected async getRequestBody(): Promise<any> {
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
        console.error(error.stack);
        // reject(error);
      });
    });
  }
}
