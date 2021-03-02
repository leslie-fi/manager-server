import { Server } from './Server';

class Launcher {
  // instance vars
  private name = 'jake';
  private server: Server;

  constructor() {
    this.server = new Server();
  }

  public launchApp() {
    console.log('started app');
    this.server.createServer();
    // cast to any -- last resort
    (this.server as any).somePrivateLogic()
  }

  
}

new Launcher().launchApp()