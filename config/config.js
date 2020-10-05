const enviroment = {
    development: {
        "PORT": 3000,
        "DBURI": "mongodb://localhost:27017/vlog"
    },
    testing: {
        "PORT": 3000,
        "DBURI": process.env.MONGO_HOST
    },
    production: {
        "PORT": Number(process.env.PORT) || 3000,
        "DBURI": process.env.DBURI || process.env.MONGO_HOST
    }
}
console.log(`> Enviroment: ${process.env.NODE_ENV}`);
module.exports = enviroment[process.env.NODE_ENV || "development"];