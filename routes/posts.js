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

router.put('/:id', (req, res) => {
    if(!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        const message = `Request path id(${req.params.id}) and request body id (${req.body.id}) must match`;

        res.status(400).json({message});
    }

    const toUpdate = {};
    const updateableFields = ['title', 'content'];

    updateableFields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });

    return Post
        .update(toUpdate, {
            where: {
                id: req.body.id
            }
        })
        .then(() => res.status(204).end())
        .catch(err => res.status(500).json({message: 'Internal server error'}));
    }
);

router.delete('/:id', (req, res) => {
    return Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});


router.get('/:id/comments', (req, res) => {
    return Comment.findAll({
        where: {
            post_id: req.params.id
        }
    })
    .then(posts => res.json({
        posts: posts.map(post => post.apiRepr())
    }))
});


module.exports = router;