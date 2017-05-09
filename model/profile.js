'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = Schema({
  name: { type: String },
  photoURI: { type: String },
  photoKey: { type: String },
  hometown: { type: String },
  userID: { type: Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('profile', profileSchema);
