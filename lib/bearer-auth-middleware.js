'use strict';

const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const debug = require('debug')('buildpro:bearer-auth-middleware');

const User = require('../model/user.js');

module.exports = function(req, res, next) {
  debug('inside the Bearer auth');

  var authHeader = req.headers.authoriztion;
  if (!authHeader) {
    return next(createError(401, 'authorization header is required'));
  }

  var token = authHeader.split('Bearer ')[1];
  if (!token) {
    return next(createError(401, 'token is required'));
  }

  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    if (err) return next(err);
    User.findOne({ findHash: decoded.token })
    .then( user => {
      req.user = user;
      next();
    })
    .catch(err => {
      next(createError(401, err.message));
    });
  });
};
