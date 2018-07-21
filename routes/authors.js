const express = require('express');
const router = express.Router();

const {Author, Post, Comment} = require('../models');


router.get('/', (req, res) => Author.findAll()
    .then(authors => res.json({
        authors: authors.map(author => author.apiRepr())
    }))
);

module.exports = router;