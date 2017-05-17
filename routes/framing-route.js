'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('buildpro:framing-route');

const framing = require('../lib/framing-calculator.js');
const bearerAuth = require('../lib/bearer-auth-middleware');

const framingRouter = module.exports = Router();

framingRouter.get('/api/calculator/exterior/', bearerAuth, function(req, res, next) {
  debug('GET: /api/calculator/exterior/?perimeter=?studSpacing=?corners=?openings');

  if(!req.query.perimeter) return next(createError(400, 'perimeter required'));
  if(!req.query.studSpacing) return next(createError(400, 'stud spacing required'));
  if(!req.query.corners) return next(createError(400, 'corners required'));
  if(!req.query.openings) return next(createError(400, 'openings required'));

  let results = exteriorFramingCalc(req.query.perimeter, req.query.studSpacing, req.query.corners, req.query.openings);
  debug(results, 'this is the results');
})
