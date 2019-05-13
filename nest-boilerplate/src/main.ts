import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/main/app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 启动Swagger
  setupSwagger(app);

  // Starts listening to shutdown hooks
  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();
