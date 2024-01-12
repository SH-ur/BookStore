const express = require('express');
const morgan = require('morgan');
const path = require("path");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes/index.js');
require('./db.js');
const stripe = require('stripe')('process.env.Sripe_SECRET');
const {insertDBAuthors,insertDBCategories} = require("./controllers/settingsBooks/createSettings.js")

const server = express();
server.name = 'API';
server.use(express.urlencoded({ extended: true }));
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(morgan('dev'));
server.use(cookieParser());
server.use(
  cors({
    origin: "*",
  })
)

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.set('view engine', 'ejs');
server.use('/', routes);


server.use(express.static(path.resolve("src/handlers/Stripe/Templates-Prueba")));


server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;