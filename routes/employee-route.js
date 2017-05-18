'use strict';

const debug = require('debug')('buildpro:employee-route');
const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const createError = require('http-errors');

const User = require('../model/user.js');
const Employee = require('../model/employee.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const fs = require('fs');
const path = require('path');
const del = require('del');
const multer = require('multer');
const s3methods = require('../lib/s3-methods.js');
const dataDir = `${__dirname}/../data`;
const upload = multer({dest: dataDir});

const employeeRouter = module.exports = Router();

employeeRouter.post('/api/employee/:userid', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST: /api/employee/:userid');

  req.body.userID = req.params.userid;
  debug('--------------->', req.body);
  new Employee(req.body).save()
  .then( employee => {
    return res.json(employee);
  })
  .catch(next);
});
