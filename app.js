'use strict';

const express = require('express');
const morgan = require('morgan');

const authorsRouter = require('./routes/authors');
const postsRouter = require('./routes/posts');
//const commentsRouter = require('./routes/comments');

const app = express();

app.use(morgan('common'));
app.use(express.json());

app.use('/authors', authorsRouter);
app.use('/posts', postsRouter);
//app.use('/comments', commentsRouter);

app.use('*', function(req, res) {
    res.status(404).json({message: 'Not Found'});
});

module.exports = app;