import {IEnviroment, IEnviromentConfig, IFireBaseConfig} from './config.types';

// Creating config based enviroment
const enviroment: IEnviroment = {
    development: {
        'PORT':                             3000,
        'DBURI':                            'mongodb://localhost:27017/vlog',
        'SALT':                             10,
        'SECRET':                           'SecretMessage123!@',
        FIRE_BASE_API_KEY:                  'AIzaSyCjJLZWdaIFju_8e01BOiyg_AYhxzj349k',
        FIRE_BASE_AUTH_DOMAIN:              'vlog-ef753.firebaseapp.com',
        FIRE_BASE_DATA_BASE_URL:            'https://vlog-ef753.firebaseio.com',
        FIRE_BASE_PROJECT_ID:               'vlog-ef753',
        FIRE_BASE_STORAGE_BUCKET:           'vlog-ef753.appspot.com',
        FIRE_BASE_MESSAGING_SENDER_ID:      '307422040444',
        FIRE_BASE_APP_ID:                   '1:307422040444:web:52198af42677b79a3514f9',
        FIRE_BASE_MEASURMENT_ID:            'G-9LRTHKDH8R',
    },
    testing: {
        'PORT':                             3000,
        'DBURI':                            process.env.MONGO_HOST,
        'SALT':                             10,
        'SECRET':                           'SecretMessage123!@',
        FIRE_BASE_API_KEY:                  'AIzaSyCjJLZWdaIFju_8e01BOiyg_AYhxzj349k',
        FIRE_BASE_AUTH_DOMAIN:              'vlog-ef753.firebaseapp.com',
        FIRE_BASE_DATA_BASE_URL:            'https://vlog-ef753.firebaseio.com',
        FIRE_BASE_PROJECT_ID:               'vlog-ef753',
        FIRE_BASE_STORAGE_BUCKET:           'vlog-ef753.appspot.com',
        FIRE_BASE_MESSAGING_SENDER_ID:      '307422040444',
        FIRE_BASE_APP_ID:                   '1:307422040444:web:52198af42677b79a3514f9',
        FIRE_BASE_MEASURMENT_ID:            'G-9LRTHKDH8R',
    },
    production: {
        'PORT':                             Number(process.env.PORT) || 3000,
        'DBURI':                            process.env.DBURI || process.env.MONGO_HOST,
        'SALT':                             Number(process.env.SALT),
        'SECRET':                           process.env.SECRET,
        FIRE_BASE_API_KEY:                  process.env.FIRE_BASE_API_KEY,
        FIRE_BASE_AUTH_DOMAIN:              process.env.FIRE_BASE_AUTH_DOMAIN,
        FIRE_BASE_DATA_BASE_URL:            process.env.FIRE_BASE_DATA_BASE_URL,
        FIRE_BASE_PROJECT_ID:               process.env.FIRE_BASE_PROJECT_ID,
        FIRE_BASE_STORAGE_BUCKET:           process.env.FIRE_BASE_STORAGE_BUCKET,
        FIRE_BASE_MESSAGING_SENDER_ID:      process.env.FIRE_BASE_MESSAGING_SENDER_ID,
        FIRE_BASE_APP_ID:                   process.env.FIRE_BASE_APP_ID,
        FIRE_BASE_MEASURMENT_ID:            process.env.FIRE_BASE_MEASURMENT_ID,
    },
};
console.log(`> Enviroment: ${process.env.NODE_ENV}`);

// Export configurations
export const config: IEnviromentConfig = enviroment[process.env.NODE_ENV || 'development'];

export const fireBaseConfig: IFireBaseConfig = {
  apiKey:                                   config.FIRE_BASE_API_KEY,
  authDomain:                               config.FIRE_BASE_AUTH_DOMAIN,
  databaseURL:                              config.FIRE_BASE_DATA_BASE_URL,
  projectId:                                config.FIRE_BASE_PROJECT_ID,
  storageBucket:                            config.FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId:                        config.FIRE_BASE_MESSAGING_SENDER_ID,
  appId:                                    config.FIRE_BASE_APP_ID,
  measurementId:                            config.FIRE_BASE_MEASURMENT_ID,
};
