const { PORT, DBURI } = require("./config/config");
const mongoose = require("mongoose");
const express = require("express");

// Database connection with URI link AUTH
mongoose.connect(
  DBURI,
  {
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

const next = require("next");

const morgan = require("morgan");
const helmet = require("helmet");
const fs = require('fs');
var path = require('path');

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });

    const server = express();

    server.use(morgan('combined', { stream: accessLogStream }));
    server.use(helmet());

    server.use("/api/hello", (req, res, next) => {
      req.test = "it worked!!";
      next();
    });

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

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log(`> Ready on  on port: ${PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
