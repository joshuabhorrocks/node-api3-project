const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Go to https://lotrcharactersapi.herokuapp.com/api/users to see a list of some characters from LOTR!</h2>`);
});

//custom middleware
function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(`A ${req.method} request to ${req.url} occured at [${time}]`)

  next();
};

server.use(logger);

module.exports = server