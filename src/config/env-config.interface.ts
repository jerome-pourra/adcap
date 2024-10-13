export interface EnvConfigServer {
  port: number;
}

export interface EnvConfigDatabase {
  type: 'mysql';
  host: string;
  port: number;
  name: string;
  synchronize: boolean;
  user: {
    name: string;
    password: string;
  };
}
