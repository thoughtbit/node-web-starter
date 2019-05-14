import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './modules/main/app.module';
import { ConfigService } from './modules/config/config.service';
import { setupSwagger } from './swagger';

declare const module: any;

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

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
