const express = require('express');
const cookieParser = require('cookie-parser');
const { verifyAccessToken } = require('../middleware/verifyJWT');
const expressfileupload = require('express-fileupload');
const path = require('path');

const serverConfig = (app) => {
  app.use(expressfileupload());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: 'true' }));
  app.use(express.json());
  app.use(verifyAccessToken);
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(express.static(path.join(__dirname, '../dist')));
};

module.exports = serverConfig;
