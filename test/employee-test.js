'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('buildpro:employee-route-test');
const del = require('del');

const User = require('../model/user.js');
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
  startDate: new Date('2000, 01, 01'),
  address: 'somewhere',
  phoneNumber: 333-3333,
  admin: false
};

const sampleUpdatedEmployee = {
  firstName: 'newFirst',
  lastName: 'newLast',
  startDate: new Date('2000, 11, 11'),
  address: 'newAddress',
  phoneNumber: 4444444,
  admin: false
};

describe('Employee Routes', function() {
  afterEach( done => {
    Promise.all([
      User.remove({}),
      Employee.remove({})
    ])
    .then( () => done())
    .catch(done);
  });

  describe('POST: /api/employee/:id', function() {
    beforeEach( done => {
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

    describe('with a valid request body', () => {
      it('should return a new employee object', done => {
        request.post(`${url}/api/employee/${this.tempUser._id}`)
        .send(sampleUpdatedEmployee)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    describe('with an invalid id', () => {
      it('should return a 400 error', done => {
        request.post(`${url}/api/employee/2222222`)
        .send(sampleUpdatedEmployee)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(err.name).to.equal('Error');
          done();
        });
      });
    });
  });

  describe('GET: api/employee', function() {
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
        done();
      })
      .catch(done);
    });

    describe('an Employee a valid id', () => {
      it('should return a valid employee', done => {
        request.get(`${url}/api/employee/${this.tempUser._id}`)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          done();
        });
      });
    });

  });
  describe('GET: /api/all/employee', function() {
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
        done();
      })
      .catch(done);
    });
    describe('get all the employees in the DataBase', () => {
      it('should return a list of all employees', done => {
        request.get(`${url}/api/all/employee`)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body[0].firstName).to.equal(sampleEmployee.firstName);
          done();
        });
      });
    });
  });
  describe('PUT: /api/employee/:id', function() {
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
        done();
      })
      .catch(done);
    });
    describe('with a valid request body', () => {
      it('should return an updated employee object', done => {
        request.put(`${url}/api/employee/${this.tempEmployee._id}`)
        .send(sampleUpdatedEmployee)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.firstName).to.equal(sampleUpdatedEmployee.firstName);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });
});
