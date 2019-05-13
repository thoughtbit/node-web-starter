import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(`config/config.${process.env.NODE_ENV}.yaml`),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
