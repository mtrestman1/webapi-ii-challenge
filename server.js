const express = require('express');

const postsRouter = require('./data/seeds/postsRouter');

const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter);



module.exports = server;