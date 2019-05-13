import { EmailModelOptions } from "./email-options.interface";
import { RedisModelOptions } from "./redis-options.interface";
import { DbModelOptions } from "./db-options.interface";
import { CoreModelOptions } from "./core-options.interface";

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Env {
  NODE_ENV: string;
  LOG_LEVEL?: LogLevel;
  [key: string]: string;
}

export interface IConfig {
  env?: Env;
  core: CoreModelOptions;
  db: DbModelOptions;
  email: EmailModelOptions;
  cache: {
    redis: RedisModelOptions;
  }
};