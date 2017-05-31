'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('buildpro:timecard-route');

const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Employee = require('../model/employee.js');
const Timecard = require('../model/timecard.js');

const timecardRouter = module.exports = Router();

timecardRouter.post('/api/employee/:employeeID/timecard', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST: /api/employee/:employeeID/timecard ---->', req.body);

  if(!req.body.payPeriod) return next(createError(400, 'pay period required'));

  return Timecard(req.body).save()
  .then( timecard => {
    res.json(timecard);
  })
  .catch(next);
});

timecardRouter.get('/api/timecard/:employeeID', bearerAuth, jsonParser, function(req, res, next) {
  debug('GET: /api/timecard/:employeeID')

  Timecard.find({employeeID: req.params.employeeID})
  .then( timecards => {
    if(!timecards) return next(createError(400, 'no timecards'));
    res.json(timecards);
  })
  .catch(next);
});
