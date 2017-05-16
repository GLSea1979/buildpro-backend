'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const debug = require('debug')('yesterdays:auth-test');

const User = require('../model/user.js');
const PORT = process.env.PORT || 8000;
const url = `http://localhost:${PORT}`;

require('../server.js');

const sampleUser = {
  username: 'test username',
  email: 'test email',
  password: 'testpassword',
  admin: true
};

describe('Auth Routes', function() {
  describe('POST: /api/signup', function() {
    describe('with a valid body', function() {
      after( done => {
        User.remove({})
        .then( () => done())
        .catch(done);
      });
      it('should return a token', done => {
        request.post(`${url}/api/signup`)
        .send(sampleUser)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.text).to.be.a('string');
          done();
        });
      });
    });
    describe('with an invalid body', function() {
      it('should return a 400 for a bad request', done => {
        request.post(`${url}/api/signup`)
        .send('nothing lives here')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
    describe('missing required signin information', function() {
      describe('missing username', function() {
        afterEach( done => {
          User.remove({})
          .then( () => done())
          .catch(done);
        });
        it('should return a 400 error, with no username', done => {
          let brokenUser = {
            email: 'test email',
            password: 'testpassword',
            admin: true
          };
          request.post(`${url}/api/signup`)
          .send(brokenUser)
          .set('Content-Type', 'applicatoin/json')
          .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
          });
        });
        it('should return a 400 error, with no email', done => {
          let brokenUser = {
            username: 'test username',
            password: 'testpassword',
            admin: true
          };
          request.post(`${url}/api/signup`)
          .send(brokenUser)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
          });
        });
        it('should return a 400 error, with no password', done => {
          let brokenUser = {
            username: 'test username',
            email: 'test email',
            admin: true
          };
          request.post(`${url}/api/signup`)
          .send(brokenUser)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
          });
        });
      });
    });
  });
});
