import { Application } from 'express';
import { Mongoose } from 'mongoose';

// Require of third party middleware.
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

// Require native Node modules
import fs from 'fs';
import path from 'path';

export default (() => {
  // Verifying enviroment for Next.JS
  const dev = process.env.NODE_ENV !== 'production';

  // Starting next app with enviroment config and requesting handler to pass down on express.
  const next = require('next');
  const app = next({ dev });
  const handle = app.getRequestHandler();

  // initializing next app --------------------------------
  app
    .prepare()
    .then(() => {
      // Getting default enviroment variables.
      const { PORT, DBURI } = require('./config/config');
      const mongoose: Mongoose = require('mongoose');

      // Database connection with URI link AUTH
      mongoose.connect(
        DBURI,
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

      // Init constants
      const server: Application = express();
      const accessLogStream = fs.createWriteStream(
        path.join(__dirname, 'logs/access.log'),
        { flags: 'a' }
      );

      // Injection of third party middlewares
      server.use(
        morgan('dev', {
          stream: accessLogStream,
        })
      );
      server.use(helmet());

      // Injection of first party middlewares

      // Initiation API routes
      require('./src/services/user/user.service')(
        '/api/user',
        server,
        mongoose
      );

      // Redirecting front end trafic to Next.JS Handle
      server.get('*', (req, res) => {
        return handle(req, res);
      });

      // Starting server
      server.listen(PORT, () => {
        console.log(`> Ready on  on port: ${PORT}`);
      });
    })
    .catch((ex) => {
      console.error(ex.stack);
      process.exit(1);
    });
})();
