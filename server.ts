// Require interface types
import { Application } from 'express';
import { Mongoose } from 'mongoose';
import { IEnviromentConfig } from './config/config.types';

// Imports
import next from 'next';
import express from 'express';

// Require of third party middleware.
import morgan from 'morgan';
import helmet from 'helmet';

// Require native Node modules
import fs from 'fs';
import path from 'path';

// Require first handlers || helpers
import RoutesHandler from './src/shared/handle.routes';

export default (() => {
  // Verifying enviroment for Next.JS
  const dev = process.env.NODE_ENV !== 'production';

  // Starting next app with enviroment config and requesting handler to pass down on express.
  const app = next({ dev });
  const handle = app.getRequestHandler();

  // initializing next app --------------------------------
  app
    .prepare()
    .then(() => {
      // Getting default enviroment variables.
      const config: IEnviromentConfig = require('./config/config').default;

      // Init constants
      const server: Application = express();
      const mongoose: Mongoose = new Mongoose();
      const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });

      // Database connection with URI link AUTH
      mongoose.connect(
        config.DBURI,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        },
        (err) => {
          if (err) {
            throw err;
          }
          console.log('> Data Base Online');
        }
      );

      // Injection of third party middlewares
      server.use(morgan('dev', {stream: accessLogStream}));
      server.use(helmet());

      // Injection of first party middlewares

      // Initiation API routes
      require('./src/services/user/user.routes')('/api/user', server, new RoutesHandler());

      // Redirecting front end trafic to Next.JS Handle
      server.get('*', (req, res) => {
        return handle(req, res);
      });

      // Starting server
      server.listen(config.PORT, () => {
        console.log(`> Ready on  on port: ${config.PORT}`);
      });
    })
    .catch((ex) => {
      console.error(ex.stack);
      process.exit(1);
    });
})();
