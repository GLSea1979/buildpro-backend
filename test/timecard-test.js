'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const debug = require('debug')('buildpro:timecard-route-test');

const Timecard = require('../model/timecard.js');
const Employee = require('../model/employee.js');
const User = require('../model/user.js');

const url = `http://localhost:${process.env.PORT}`;

require('../server.js');

const sampleTimecard = {
    payPeriod: 'some pay period',
    week1Monday: 8,
    week1Tuesday: 8,
    week1Wednesday: 8,
    week1Thursday: 8,
    week1Friday: 8,
    week1Saturday: 8,
    week1Sunday: 8,
    week2Monday: 8,
    week2Tuesday: 8,
    week2Wednesday: 8,
    week2Thursday: 8,
    week2Friday: 8,
    week2Saturday: 8,
    weed2Sunday: 8,
    notes: 'some notes'
};
const sampleTimecardTwo = {
  payPeriod: 'some pay period two',
  week1Monday: 6,
  week2Friday: 6,
  notes: 'some notes two'
};
const sampleUser = {
  username: 'test user',
  email: 'testemail@email.com',
  password: 'testpassword',
  admin: false
};
const sampleEmployee = {
  firstName: 'testFirst',
  lastName: 'testLast',
  startDate: new Date('2000, 01, 01'),
  address: 'somewhere',
  phoneNumber: 333-3333,
  admin: false
};

describe('Timecard Routes', function() {
  afterEach( done => {
    Promise.all([
      Timecard.remove({}),
      Employee.remove({}),
      User.remove({})
    ])
    .then( () => done())
    .catch(done);
  });
  describe('POST: /api/employee/:employeeID/timecard', function() {
    before( done => {
      Promise.all([
        Timecard.remove({}),
        Employee.remove({}),
        User.remove({})
      ])
      .then( () => done())
      .catch(done);
    });
    before( done => {
      new User(sampleUser)
      .generatePasswordHash(sampleUser.password)
      .then( user => user.save())
      .then( user => {
        this.tempUser = user;
        return user.generateToken();
      })
      .then( token => {
        this.tempToken = token;
        done();
      })
      .catch(done);
    });
    before( done => {
      sampleEmployee.userID = this.tempUser._id;

      new Employee(sampleEmployee).save()
      .then( employee => {
        this.tempEmployee = employee;
        sampleTimecard.employeeID = this.tempEmployee._id;
        done();
      })
      .catch(done);
    });
    describe('with a valid body', () => {
      it('should return a new timecard', done => {
        request.post(`${url}/api/employee/${this.tempEmployee._id}/timecard`)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .send(sampleTimecard)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.payPeriod).to.equal('some pay period');
          done();
        });
      });
    });
    describe('without a valid body', () => {
      it('should return a', done => {
        request.post(`${url}/api/employee/2222/timecard`)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
    describe('without an auth token', () => {
      it('should return a 401', done => {
        request.post(`${url}/api/employee/${this.tempEmployee._id}/timecard`)
        .set({
          Authorization: 'Bearer '
        })
        .send(sampleTimecard)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(err.message).to.equal('Unauthorized');
          done();
        });
      });
    });
  });
  describe('GET: api/timecard/:employeeID', () => {
    before( done => {
      new User(sampleUser)
      .generatePasswordHash(sampleUser.password)
      .then( user => user.save())
      .then( user => {
        this.tempUser = user;
        return user.generateToken();
      })
      .then( token => {
        this.tempToken = token;
        done();
      })
      .catch(done);
    });
    before( done => {
      new Employee(sampleEmployee).save()
      .then( employee => {
        this.tempEmployee = employee;
        done();
      })
      .catch(done);
    });
    before( done => {
      sampleTimecard.employeeID = this.tempEmployee._id;
      new Timecard(sampleTimecard).save()
      .then( timecard => {
        this.tempTimecard = timecard;
        done();
      })
      .catch(done);
    });
    describe('Request all timecards for an employee', () => {
      it('should return a list of all timecards for an employee', done => {
        request.get(`${url}/api/timecard/${this.tempEmployee._id}`)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body[0].payPeriod).to.equal(sampleTimecard.payPeriod);
          expect(res.body[0].week1Monday).to.equal(sampleTimecard.week1Monday);
          done();
        });
      });
    });
    describe('with an invalid employee id', () => {
      it('should return a 400', done => {
        request.get(`${url}/api/timecard/2222`)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
});
