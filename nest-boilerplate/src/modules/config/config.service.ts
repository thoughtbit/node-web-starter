import * as Joi from 'joi';
import { Config } from './interfaces/config.interface';
import { packageJson, loadYamlConfigure } from '../../utils';

export class ConfigService {
  private _config: Config;

  constructor(configPath: string) {
    const conf = loadYamlConfigure(configPath);
    this.config = this.validateInput(conf);
  }

  set config(value: Config) {
    this._config = value;
  }

  get config(): Config {
    return this._config;
  }

  // public setConfig(configPath: string) {
  //   const conf = loadYamlConfigure(configPath);
  //   this.config = this.validateInput(conf);
  // }

  private validateInput(config): Config {
    const configVarsSchema: Joi.ObjectSchema = Joi.object(
      this.getValidateDefinition(),
    );
    const { error, value: validatedConfig } = Joi.validate(
      config,
      configVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedConfig;
  }
  private getValidateDefinition(): any {
    return {
      env: {
        NODE_ENV: Joi.string()
          .valid(['development', 'production', 'test'])
          .default('development'),
        LOG_LEVEL: Joi.string().default('debug'),
        NODE_TLS_REJECT_UNAUTHORIZED: Joi.number().default(0),
      },
      core: {
        host: Joi.string().default('0.0.0.0'),
        port: Joi.number().default(3000),
        baseUrl: Joi.string().default('http://localhost:300'),
        passport: {
          local: {
            usernameField: Joi.string(),
            passwordField: Joi.string(),
          },
          github: {
            key: Joi.string(),
            secret: Joi.string(),
          },
        },
        crossDomain: {
          allowedOrigins: Joi.array(),
          allowedReferer: Joi.string(),
        },
      },
      db: {
        dialect: Joi.string().default('mysql'),
        host: Joi.string().default('0.0.0.0'),
        port: Joi.number().default(3000),
        database: Joi.string(),
        username: Joi.string(),
        password: Joi.string(),
        logMode: Joi.boolean(),
      },
      mail: {
        enabled: Joi.boolean(),
        transport: {
          host: Joi.string(),
          port: Joi.number(),
          secure: Joi.boolean(),
          auth: {
            user: Joi.string(),
            pass: Joi.string(),
          },
        },
        defaults: {
          from: Joi.string(),
        },
        templateDir: Joi.string(),
        mailerType: Joi.number(),
      },
      cache: {
        redis: {
          client: {
            host: Joi.string().default('0.0.0.0'),
            port: Joi.number().default(6379),
            password: Joi.string(),
            db: Joi.string(),
          },
        },
      },
    };
  }

  public getVersion(): string {
    if (!process.env.APP_VERSION) {
      process.env.APP_VERSION = packageJson.version;
    }
    return process.env.APP_VERSION;
  }

  // get env() {
  //   return {
  //     NODE_ENV: nodeEnv || this.config.env.NODE_ENV,
  //     LOG_LEVEL: this.config.env.LOG_LEVEL,
  //     NODE_TLS_REJECT_UNAUTHORIZED: this.config.env.NODE_TLS_REJECT_UNAUTHORIZED,
  //   };
  // }

  // get coreConfig() {
  //   return {

  //   };
  // }

  // get dbConfig() {
  //   return {};
  // }

  // get mailConfig() {
  //   return {};
  // }

  // get redisConfig() {
  //   return {
  //     redis: {

  //     }
  //   };
  // }
}
