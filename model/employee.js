'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = Schema({
  firstName: { type: String },
  lastName: { type: String},
  startDate: { type: Date},
  quitDate: { type: Date},
  wage: { type: Number },
  nextReviewDate: { type: Date},
  photoURI: { type: String },
  photoKey: { type: String },
  address: { type: String },
  email: { type: String },
  phoneNumber: { type: Number },
  admin: { type: Boolean, default: false, required: true},
  userID: { type: Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('employee', employeeSchema);
