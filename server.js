'use strict';

const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const debug = require('debug')('buildpro:server');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.load();

const errors = require('./lib/error-middleware.js');
const authRouter = require('./routes/auth-route.js');
const employee = require('./routes/employee-route.js');
const timecard = require('./routes/timecard-route.js');

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(authRouter);
app.use(employee);
app.use(timecard);
app.use(errors);

app.listen(PORT, () => debug('the server is up on:', PORT));
