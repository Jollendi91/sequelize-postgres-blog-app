'use strict';

const {Author} = require('./authors');
const {Post} = require('./posts');
const {Comment} = require('./comments');

const db = {
    Author,
    Post,
    Comment
};

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;