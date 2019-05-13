enum MailerType {
  NodeMailer = 0,
  SendGrid,
  Extend,
}

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
  mailerType: MailerType;
}
