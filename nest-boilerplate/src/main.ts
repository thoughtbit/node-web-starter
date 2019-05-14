import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './modules/main/app.module';
import { ConfigService } from './modules/config/config.service';
import { setupSwagger } from './swagger';
import { isDevEnv } from './utils';

// 解决 Nodejs 环境中请求 HTTPS 的证书授信问题
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// 替换 console 为更统一友好的
const { log, warn, info } = console;
const color = c => (isDevEnv ? c : '');
global.console = Object.assign(console, {
  log: (...args) => log('[log]', ...args),
  warn: (...args) =>
    warn(color('\x1b[33m%s\x1b[0m'), '[warn]', '[ApiServer]', ...args),
  info: (...args) =>
    info(color('\x1b[34m%s\x1b[0m'), '[info]', '[ApiServer]', ...args),
  error: (...args) =>
    info(color('\x1b[31m%s\x1b[0m'), '[error]', '[ApiServer]', ...args),
});

async function bootstrap() {
  const logger = new Logger('ApiServer');
  const app = await NestFactory.create(AppModule);
  const appConfig: ConfigService = app.get(ConfigService);
  // 启动Swagger
  setupSwagger(app);

  // Starts listening to shutdown hooks
  app.enableShutdownHooks();

  await app.listen(appConfig.config.core.port, appConfig.config.core.host, () => {
    logger.log(`Start to listening the incoming requests on http address: ${appConfig.config.core.baseUrl}`);
  });
}
bootstrap();
