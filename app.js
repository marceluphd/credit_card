'use strict';

const express = require('express');

const app = express();

const consign = require('consign');

const db = require('./src/config/db');
require('dotenv').config();

db.openConn();

consign()
  .include('./src/config/passport.js')
  .then('./src/config/middlewares.js')
  .then('./src/config/validation.js')
  .then('./src/controller')
  .then('./src/config/routes.js')
  .into(app);

app.listen(process.env.PORT, () => {
  console.log(`Servidor funcionando na porta ${process.env.PORT}`);
});
