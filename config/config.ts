import { IEnvironment, IEnvironmentConfig, IFireBaseConfig, IAdminFireBaseConfig } from './config.d';
import { readFileSync } from 'fs';

const AdminFirebasePrivateKey = readFileSync('key.pem').toString();

// Creating config based environment
const environment: IEnvironment = {
    development: {
        'PORT':                                         3000,
        'DBURI':                                        process.env.MONGO_HOST || 'mongodb://localhost:27017/vlog',
        'SERVER':                                       process.env.SERVER_HOST || 'http://localhost:3000/api',
        'SALT':                                         10,
        'SECRET':                                       'SecretMessage123!@',
        FIRE_BASE_API_KEY:                              'AIzaSyCjJLZWdaIFju_8e01BOiyg_AYhxzj349k',
        FIRE_BASE_AUTH_DOMAIN:                          'vlog-ef753.firebaseapp.com',
        FIRE_BASE_DATA_BASE_URL:                        'https://vlog-ef753.firebaseio.com',
        FIRE_BASE_PROJECT_ID:                           'vlog-ef753',
        FIRE_BASE_STORAGE_BUCKET:                       'vlog-ef753.appspot.com',
        FIRE_BASE_MESSAGING_SENDER_ID:                  '307422040444',
        FIRE_BASE_APP_ID:                               '1:307422040444:web:52198af42677b79a3514f9',
        FIRE_BASE_MEASUREMENT_ID:                        'G-9LRTHKDH8R',
        ADMIN_FIRE_BASE_TYPE:                           'service_account',
        ADMIN_FIRE_BASE_PROJECT_ID:                     'vlog-ef753',
        ADMIN_FIRE_BASE_PRIVATE_KEY_ID:                 '5870b46a21c2d4904674b77afb5b354375d69216',
        ADMIN_FIRE_BASE_PRIVATE_KEY:                    AdminFirebasePrivateKey,
        ADMIN_FIRE_BASE_CLIENT_EMAIL:                   'firebase-adminsdk-899ce@vlog-ef753.iam.gserviceaccount.com',
        ADMIN_FIRE_BASE_CLIENT_ID:                      '101121767040848898797',
        ADMIN_FIRE_BASE_AUTH_URI:                       'https://accounts.google.com/o/oauth2/auth',
        ADMIN_FIRE_BASE_TOKEN_URI:                      'https://oauth2.googleapis.com/token',
        ADMIN_FIRE_BASE_AUTH_PROVIDER_X509_CERT_URL:    'https://www.googleapis.com/oauth2/v1/certs',
        ADMIN_FIRE_BASE_CLIENT_X509_CERT_URL:           'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-899ce%40vlog-ef753.iam.gserviceaccount.com',
    },
    testing: {
        'PORT':                                         3000,
        'DBURI':                                        process.env.MONGO_HOST,
        'SERVER':                                       process.env.SERVER_HOST || 'http://localhost:3000/api',
        'SALT':                                         10,
        'SECRET':                                       'SecretMessage123!@',
        FIRE_BASE_API_KEY:                              'AIzaSyCjJLZWdaIFju_8e01BOiyg_AYhxzj349k',
        FIRE_BASE_AUTH_DOMAIN:                          'vlog-ef753.firebaseapp.com',
        FIRE_BASE_DATA_BASE_URL:                        'https://vlog-ef753.firebaseio.com',
        FIRE_BASE_PROJECT_ID:                           'vlog-ef753',
        FIRE_BASE_STORAGE_BUCKET:                       'vlog-ef753.appspot.com',
        FIRE_BASE_MESSAGING_SENDER_ID:                  '307422040444',
        FIRE_BASE_APP_ID:                               '1:307422040444:web:52198af42677b79a3514f9',
        FIRE_BASE_MEASUREMENT_ID:                        'G-9LRTHKDH8R',
        ADMIN_FIRE_BASE_TYPE:                           'service_account',
        ADMIN_FIRE_BASE_PROJECT_ID:                     'vlog-ef753',
        ADMIN_FIRE_BASE_PRIVATE_KEY_ID:                 '5870b46a21c2d4904674b77afb5b354375d69216',
        ADMIN_FIRE_BASE_PRIVATE_KEY:                    '',
        ADMIN_FIRE_BASE_CLIENT_EMAIL:                   'firebase-adminsdk-899ce@vlog-ef753.iam.gserviceaccount.com',
        ADMIN_FIRE_BASE_CLIENT_ID:                      '101121767040848898797',
        ADMIN_FIRE_BASE_AUTH_URI:                       'https://accounts.google.com/o/oauth2/auth',
        ADMIN_FIRE_BASE_TOKEN_URI:                      'https://oauth2.googleapis.com/token',
        ADMIN_FIRE_BASE_AUTH_PROVIDER_X509_CERT_URL:    'https://www.googleapis.com/oauth2/v1/certs',
        ADMIN_FIRE_BASE_CLIENT_X509_CERT_URL:           'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-899ce%40vlog-ef753.iam.gserviceaccount.com',
    },
    production: {
        'PORT':                                         Number(process.env.PORT) || 3000,
        'DBURI':                                        process.env.DBURI || process.env.MONGO_HOST,
        'SERVER':                                       process.env.SERVER_HOST || 'http://localhost:3000/api',
        'SALT':                                         Number(process.env.SALT),
        'SECRET':                                       process.env.SECRET,
        FIRE_BASE_API_KEY:                              process.env.FIRE_BASE_API_KEY,
        FIRE_BASE_AUTH_DOMAIN:                          process.env.FIRE_BASE_AUTH_DOMAIN,
        FIRE_BASE_DATA_BASE_URL:                        process.env.FIRE_BASE_DATA_BASE_URL,
        FIRE_BASE_PROJECT_ID:                           process.env.FIRE_BASE_PROJECT_ID,
        FIRE_BASE_STORAGE_BUCKET:                       process.env.FIRE_BASE_STORAGE_BUCKET,
        FIRE_BASE_MESSAGING_SENDER_ID:                  process.env.FIRE_BASE_MESSAGING_SENDER_ID,
        FIRE_BASE_APP_ID:                               process.env.FIRE_BASE_APP_ID,
        FIRE_BASE_MEASUREMENT_ID:                        process.env.FIRE_BASE_MEASURMENT_ID,
        ADMIN_FIRE_BASE_TYPE:                           process.env.ADMIN_FIRE_BASE_TYPE,
        ADMIN_FIRE_BASE_PROJECT_ID:                     process.env.ADMIN_FIRE_BASE_PROJECT_ID,
        ADMIN_FIRE_BASE_PRIVATE_KEY_ID:                 process.env.ADMIN_FIRE_BASE_PRIVATE_KEY_ID,
        ADMIN_FIRE_BASE_PRIVATE_KEY:                    process.env.ADMIN_FIRE_BASE_PRIVATE_KEY,
        ADMIN_FIRE_BASE_CLIENT_EMAIL:                   process.env.ADMIN_FIRE_BASE_CLIENT_EMAIL,
        ADMIN_FIRE_BASE_CLIENT_ID:                      process.env.ADMIN_FIRE_BASE_CLIENT_ID,
        ADMIN_FIRE_BASE_AUTH_URI:                       process.env.ADMIN_FIRE_BASE_AUTH_URI,
        ADMIN_FIRE_BASE_TOKEN_URI:                      process.env.ADMIN_FIRE_BASE_TOKEN_URI,
        ADMIN_FIRE_BASE_AUTH_PROVIDER_X509_CERT_URL:    process.env.ADMIN_FIRE_BASE_AUTH_PROVIDER_X509_CERT_URL,
        ADMIN_FIRE_BASE_CLIENT_X509_CERT_URL:           process.env.ADMIN_FIRE_BASE_CLIENT_X509_CERT_URL,
    },
};
console.log(`> Environment: ${process.env.NODE_ENV}`);

// Export configurations
export const config: IEnvironmentConfig = environment[process.env.NODE_ENV || 'development'];

export const fireBaseConfig: IFireBaseConfig = {
    apiKey:                                             config.FIRE_BASE_API_KEY,
    authDomain:                                         config.FIRE_BASE_AUTH_DOMAIN,
    databaseURL:                                        config.FIRE_BASE_DATA_BASE_URL,
    projectId:                                          config.FIRE_BASE_PROJECT_ID,
    storageBucket:                                      config.FIRE_BASE_STORAGE_BUCKET,
    messagingSenderId:                                  config.FIRE_BASE_MESSAGING_SENDER_ID,
    appId:                                              config.FIRE_BASE_APP_ID,
    measurementId:                                      config.FIRE_BASE_MEASUREMENT_ID,
};

export const serviceAccount: IAdminFireBaseConfig = {
    type:                                               config.ADMIN_FIRE_BASE_TYPE,
    project_id:                                         config.ADMIN_FIRE_BASE_PROJECT_ID,
    private_key_id:                                     config.ADMIN_FIRE_BASE_PRIVATE_KEY_ID,
    private_key:                                        config.ADMIN_FIRE_BASE_PRIVATE_KEY,
    client_email:                                       config.ADMIN_FIRE_BASE_CLIENT_EMAIL,
    client_id:                                          config.ADMIN_FIRE_BASE_CLIENT_ID,
    auth_uri:                                           config.ADMIN_FIRE_BASE_AUTH_URI,
    token_uri:                                          config.ADMIN_FIRE_BASE_TOKEN_URI,
    auth_provider_x509_cert_url:                        config.ADMIN_FIRE_BASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url:                               config.ADMIN_FIRE_BASE_CLIENT_X509_CERT_URL,
};
