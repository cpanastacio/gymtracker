// Requiring module
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const cookieParser = require('cookie-parser');

const routes = require('./api/routes');

// Creating express object and configure server port
const server = express();
const PORT = process.env.NODE_PORT || 8000;

server.use(express.json());
server.use(cookieParser());
server.use(cors());
server.use(routes);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = server;
