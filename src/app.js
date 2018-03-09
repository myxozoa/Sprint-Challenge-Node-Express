const fetch = require('node-fetch');
const express = require('express');
const coinController = require('./controllers/coins.js');

const PORT = 3030;
const server = express();

server.use(coinController);

server.listen(PORT, (err) => {
  if (err) console.error(err);
  else console.log(`Server is listening on port ${PORT}`)
});