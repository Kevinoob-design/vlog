import IEnviroment from "./config.types";

const enviroment: IEnviroment = {
    development: {
        "PORT":     3000,
        "DBURI":    "mongodb://localhost:27017/vlog"
    },
    testing: {
        "PORT":     3000,
        "DBURI":    process.env.MONGO_HOST
    },
    production: {
        "PORT":     Number(process.env.PORT) || 3000,
        "DBURI":    process.env.DBURI || process.env.MONGO_HOST
    }
}
console.log(`> Enviroment: ${process.env.NODE_ENV}`);

export default enviroment[process.env.NODE_ENV || "development"];

export const PORT = enviroment[process.env.NODE_ENV || "development"].PORT;
export const DBURI = enviroment[process.env.NODE_ENV || "development"].DBURI;