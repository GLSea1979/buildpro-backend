'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static(`${__dirname}/build`));

app.listen(PORT, () => {
  console.log('the server is up on:', PORT);
});
