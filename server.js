// Verifying enviroment for Next.JS
const dev = process.env.NODE_ENV !== "production";

// Starting next app with enviroment config and requesting handler to pass down on express.
const next = require("next");
const app = next({ dev });
const handle = app.getRequestHandler();

// initializing next app --------------------------------
app.prepare().then(() => {
  // Getting default enviroment variables.
  const { PORT, DBURI } = require("./config/config");
  const mongoose = require("mongoose");

  // Database connection with URI link AUTH
  mongoose.connect(DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
    (err, res) => {
      if (err) {
        throw err;
      }
      console.log("> Data Base Online");
    }
  );

  // Require of third party middleware.
  const express = require("express");
  const morgan = require("morgan");
  const helmet = require("helmet");

  // Require native Node modules
  const fs = require('fs');
  const path = require('path');
  
  // Init constants
  const server = express();
  const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });

  // Injection of third party middlewares
  server.use(morgan('combined', { stream: accessLogStream }));
  server.use(helmet());

  // Injection of first party middlewares
  server.use("/api/user/singin", (req, res, next) => {
    req.sing = "you are signed!!";
    next();
  });

  // Redirecting all trafic to Next.JS Handle
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.post("*", (req, res) => {
    return handle(req, res);
  });

  server.put("*", (req, res) => {
    return handle(req, res);
  });

  server.delete("*", (req, res) => {
    return handle(req, res);
  });

  // Starting server
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on  on port: ${PORT}`);
  });

}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
