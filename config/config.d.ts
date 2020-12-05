export interface IEnvironmentConfig {
  PORT:                                                     number;
  DBURI:                                                    string;
  SERVER:                                                   string;
  SALT:                                                     number;
  SECRET:                                                   string;
  FIRE_BASE_API_KEY:                                        string;
  FIRE_BASE_AUTH_DOMAIN:                                    string;
  FIRE_BASE_DATA_BASE_URL:                                  string;
  FIRE_BASE_PROJECT_ID:                                     string;
  FIRE_BASE_STORAGE_BUCKET:                                 string;
  FIRE_BASE_MESSAGING_SENDER_ID:                            string;
  FIRE_BASE_APP_ID:                                         string;
  FIRE_BASE_MEASUREMENT_ID:                                 string;
  ADMIN_FIRE_BASE_TYPE:                                     string;
  ADMIN_FIRE_BASE_PROJECT_ID:                               string;
  ADMIN_FIRE_BASE_PRIVATE_KEY_ID:                           string;
  ADMIN_FIRE_BASE_PRIVATE_KEY:                              string;
  ADMIN_FIRE_BASE_CLIENT_EMAIL:                             string;
  ADMIN_FIRE_BASE_CLIENT_ID:                                string;
  ADMIN_FIRE_BASE_AUTH_URI:                                 string;
  ADMIN_FIRE_BASE_TOKEN_URI:                                string;
  ADMIN_FIRE_BASE_AUTH_PROVIDER_X509_CERT_URL:              string;
  ADMIN_FIRE_BASE_CLIENT_X509_CERT_URL:                     string;
}

export interface IFireBaseConfig {
  apiKey:                                                   string;
  authDomain:                                               string;
  databaseURL:                                              string;
  projectId:                                                string;
  storageBucket:                                            string;
  messagingSenderId:                                        string;
  appId:                                                    string;
  measurementId:                                            string;
}

export interface IAdminFireBaseConfig {
  type:                                                     string;
  project_id:                                               string;
  private_key_id:                                           string;
  private_key:                                              string;
  client_email:                                             string;
  client_id:                                                string;
  auth_uri:                                                 string;
  token_uri:                                                string;
  auth_provider_x509_cert_url:                              string;
  client_x509_cert_url:                                     string;                                    
}

export interface IEnvironment {
  development:                                              IEnvironmentConfig;
  testing:                                                  IEnvironmentConfig;
  production:                                               IEnvironmentConfig;
}
