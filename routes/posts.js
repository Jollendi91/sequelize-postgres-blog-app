'use strict';

const express = require('express');
const router = express.Router();


const {Post, Comment} = require('../models');

router.get('/', (req, res) => Post.findAll()
    .then(posts => res.json({
        posts: posts.map(post => post.apiRepr())
    }))
);

router.post('/', (req, res) => {
    const requiredFields = ['authorId', 'title', 'content'];

    for(let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];

        if(!(field in req.body)) {
            const message = `Missing "${field}" in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

    return Post.create({
        author_id: req.body.authorId,
        title: req.body.title,
        content: req.body.content
    })
    .then(post => res.status(201).json(post.apiRepr()))
    .catch(err => res.status(500).send({message: err.message}));
});




module.exports = router;