export class DbModelOptions {
  type: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  synchronize?: boolean;
  logging?: boolean;
}
