'use strict';

const AWS = require('aws-sdk');
const debug = require('debug')('buildSuite:s3-methods');
const s3 = new AWS.S3();

AWS.config.setPromisesDependency(require('bluebird'));

module.exports = exports = {};

exports.uploadObjectProm = function(params) {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) console.error(reject);
      resolve(data);
    });
  });
};

exports.deleteObjectProm = function(params) {
  debug('deleteS3Prom');
  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if (reject) console.error(err);
      resolve(data);
    });
  });
};
