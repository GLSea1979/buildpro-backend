'use strict';

const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const debug = require('debug')('yesterdays:server');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.load();

const errors = require('./lib/error-middleware.js');
// const basic = require('./routes/')
const authRouter = require('./routes/auth-route.js');

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(morgan('dev'));
// app.use(basic);
app.use(authRouter);
app.use(errors);

app.listen(PORT, () => debug('the server is up on:', PORT));
