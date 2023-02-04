import * as dotenv from 'dotenv';
import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as staticFile from '@midwayjs/static-file';
import * as upload from '@midwayjs/upload';

// ! config
import * as DefaultConfig from './config/config.default';
import * as UnittestConfig from './config/config.unittest';

// ! filter
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';

// ! middleware
import { ReportMiddleware } from './middleware/report.middleware';

// load .env file in process.cwd
dotenv.config();

@Configuration({
  imports: [
    koa,
    staticFile,
    upload,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [
    {
      default: DefaultConfig,
      test: UnittestConfig,
    },
  ],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
