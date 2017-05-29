'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debub')('buildpro:timecard-route');

const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Employee = require('../model/employee.js');
const Timecard = require('../model/timecard.js');

const timecardRouter = module.exports = Router();

timecardRouter.post('/api/timecard', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST: /api/timecard');


})
