import { App, Controller, Get, Inject } from '@midwayjs/decorator';
import type { Application, Context } from '@midwayjs/koa';

@Controller('/')
export class HomeController {
  @App()
  app: Application;

  @Inject()
  ctx: Context;

  @Get('/hello')
  async home(): Promise<string> {
    const isDev = process.env.NODE_ENV !== 'prod';
    const port = process.env.PROT;
    const distPath = this.app.getConfig('workspace.dist');
    return `Hello, isDev:${isDev} dotenv:${port}, distPath: ${distPath}`;
  }
}
