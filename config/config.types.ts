interface IEnviromentConfig {
    PORT: number;
    DBURI: string;
}

export default interface IEnviroment {
    development: IEnviromentConfig;
    testing: IEnviromentConfig;
    production: IEnviromentConfig;
}