export class EmailModelOptions {
  enabled: boolean;
  transport: {
    host: string;
    port?: number;
    secure?: boolean;
    auth?: {
      user: string;
      pass: string;
    };
  };
  defaults: {
    forceEmbeddedImages?: boolean;
    from: string;
  };
  templateDir?: string;
  mailerType: number;
}