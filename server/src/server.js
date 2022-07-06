// Requiring module
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const routes = require('./api/routes');

// Creating express object and configure server port
const server = express();
const PORT = process.env.PORT || 8080;

server.use(express.json());
server.use(cookieParser());
server.use(cors());
server.use(routes);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = server;
