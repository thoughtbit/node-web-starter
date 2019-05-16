import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('API 接口文档')
    .setDescription('NestJS Boilerplate API 接口文档')
    .setVersion('1.0')
    // .setBasePath('api')
    .addBearerAuth('Authorization', 'header')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document, {
    // swaggerUrl: `localhost:3000/api/docs-json`,
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
    // customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API 接口文档',
  });
};
