'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const timecardSchema = Schema({
  employeeID: { type: Schema.Types.ObjectId, required: true },
  payPeriod: { type: String },
  week1Monday: { type: Number },
  week1Tuesday: { type: Number},
  week1Wednesday: { type: Number },
  week1Thursday: { type: Number},
  week1Friday: { type: Number },
  week1Saturday: { type: Number},
  week1Sunday: { type: Number },
  week2Monday: { type: Number },
  week2Tuesday: { type: Number},
  week2Wednesday: { type: Number },
  week2Thursday: { type: Number},
  week2Friday: { type: Number },
  week2Saturday: { type: Number},
  weed2Sunday: { type: Number},
  notes: { type: String}
});

module.exports = mongoose.model('timecard', timecardSchema);
// todo : build out the functionality
