import { Injectable } from '@nestjs/common';
import { ConfigService } from './../config/config.service';

@Injectable()
export class AppService {
  constructor(
    private readonly config: ConfigService,
  ) {}

  root(): string {
    return this.config.getVersion();
  }

  async sayHello(name: string) {
    return `Hello ${name}!`;
  }
}
