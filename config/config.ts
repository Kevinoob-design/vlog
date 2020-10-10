import {IEnviroment, IEnviromentConfig} from './config.types';

const enviroment: IEnviroment = {
    development: {
        'PORT':     3000,
        'DBURI':    'mongodb://localhost:27017/vlog',
        'SALT':     10,
        'SECRET':   'SecretMessage123!@',
    },
    testing: {
        'PORT':     3000,
        'DBURI':    process.env.MONGO_HOST,
        'SALT':     10,
        'SECRET':   'SecretMessage123!@',
    },
    production: {
        'PORT':     Number(process.env.PORT) || 3000,
        'DBURI':    process.env.DBURI || process.env.MONGO_HOST,
        'SALT':     Number(process.env.SALT),
        'SECRET':   process.env.SECRET,
    },
};
console.log(`> Enviroment: ${process.env.NODE_ENV}`);

const config: IEnviromentConfig = enviroment[process.env.NODE_ENV || 'development'];
export default config;
