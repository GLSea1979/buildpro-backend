'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('buildpro:employee-route-test');
const del = require('del');

const Employee = require('../model/employee.js');

mongoose.Promise = Promise;

const s3methods = require('../lib/s3-methods.js');

const url = `http://localhost:${process.env.PORT}`;
const dataDir = `${__dirname}/../data`;

require('../server.js');

const sampleUser = {
  username: 'test user',
  email: 'testemail@email.com',
  password: 'testpassword',
  admin: false
};
const sampleEmployee = {
  firstName: 'testFirst',
  lastName: 'testLast',
  startDate:
}
