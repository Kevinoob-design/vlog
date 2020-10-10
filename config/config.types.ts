export interface IEnviromentConfig {
    PORT: number;
    DBURI: string;
    SALT: number;
    SECRET: string;
}

export interface IEnviroment {
    development: IEnviromentConfig;
    testing: IEnviromentConfig;
    production: IEnviromentConfig;
}
