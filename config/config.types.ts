export interface IEnviromentConfig {
  PORT: number;
  DBURI: string;
  SALT: number;
  SECRET: string;
  FIRE_BASE_API_KEY: string;
  FIRE_BASE_AUTH_DOMAIN: string;
  FIRE_BASE_DATA_BASE_URL: string;
  FIRE_BASE_PROJECT_ID: string;
  FIRE_BASE_STORAGE_BUCKET: string;
  FIRE_BASE_MESSAGING_SENDER_ID: string;
  FIRE_BASE_APP_ID: string;
  FIRE_BASE_MEASURMENT_ID: string;
}

export interface IFireBaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}
export interface IEnviroment {
  development: IEnviromentConfig;
  testing: IEnviromentConfig;
  production: IEnviromentConfig;
}
