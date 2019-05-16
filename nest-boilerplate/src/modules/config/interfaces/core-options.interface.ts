export interface Auth {
  JWT_SECRET_KEY: string;
  JWT_EXPIRATION_TIME?: string;
}

export class CoreModelOptions {
  host: string;
  port?: number;
  baseUrl?: string;
  auth: Auth;
  crossDomain?: {
    allowedOrigins: any[];
    allowedReferer: string;
  };
}
