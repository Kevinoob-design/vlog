// Getting default enviroment variables.
import { config, fireBaseConfig } from './config/config';

// Require interface types
import { Application } from 'express';

// Imports
import next from 'next';
import express from 'express';
import { connect } from 'mongoose';
import { initializeApp } from 'firebase';
import { initializeApp as initializeAppAdmin, credential } from 'firebase-admin';

// Require of third party middleware.
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';

// Require first party middleware.
import { verifyAuthUser, requireAuth } from './src/middleware/auth';

// Require native Node modules
import fs from 'fs';
import path from 'path';

// Require first handlers || helpers
import RoutesHandler from './src/shared/routes/handle.routes';

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
      // Init constants
      const server: Application = express();
      const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });

      // Database connection with URI link AUTH
      connect(
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

      const serviceAccount = require('./serviceAccountKey.json');

      initializeApp(fireBaseConfig);
      initializeAppAdmin({
        credential: credential.cert(serviceAccount),
        databaseURL: 'https://vlog-ef753.firebaseio.com',
      });

      console.log('> Fire Base Online');

      // Injection of third party middlewares
      server.use(morgan('dev', { stream: accessLogStream }));
      server.use(helmet());
      server.use(bodyParser.json());

      // Injection of first party middlewares
      server.use('/api/', verifyAuthUser);
      server.use('/api/user/access/', requireAuth);
      server.use('/api/category/access/', requireAuth);
      server.use('/api/article/access/', requireAuth);

      // Initiation API routes
      require('./src/services/user/user.routes')('/api/user', server, new RoutesHandler());
      require('./src/services/category/category.routes')('/api/category', server, new RoutesHandler());
      require('./src/services/article/article.routes')('/api/article', server, new RoutesHandler());

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
