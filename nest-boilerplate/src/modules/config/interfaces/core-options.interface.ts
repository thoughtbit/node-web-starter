export class CoreModelOptions {
  host: string;
  port?: number;
  baseUrl?: string;
  passport: {
    local: {
      usernameField: string;
      passwordField: string;
    };
    github?: {
      key: string;
      secret: string;
    };
  };
  crossDomain?: {
    allowedOrigins: any[];
    allowedReferer: string;
  };
}
