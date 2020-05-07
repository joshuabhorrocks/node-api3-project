const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(`A ${req.method} request to ${req.url} occured at [${time}]`)

  next();
};

server.use(logger);

module.exports = server