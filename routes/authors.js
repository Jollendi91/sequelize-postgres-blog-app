const express = require('express');
const router = express.Router();

const {Author, Post, Comment} = require('../models');


router.get('/', (req, res) => Author.findAll()
    .then(authors => res.json({
        authors: authors.map(author => author.apiRepr())
    }))
);

router.post('/', (req, res) => {
    if(!('username' in req.body)) {
        const message = `Missing username in request body`;
        console.error(message);
        return res.status(404).send(message);
    }

    Author.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username
    })
    .then(author => res.status(201).json(author.apiRepr()))
    .catch(err => res.status(500).send({message: err.message}));
});

router.put('/:id', (req, res) => {
    if(!(req.params.id && req.body.id && req.params.id === req.body.id.toString())) {
        const message = (`Request path id(${req.params.id}) and request body id (${req.body.id}) must match`);

        console.error(message);
        res.status(400).json({message});
    }

    const toUpdate = {};
    const updateableFields = ['firstName', 'lastName','username'];

    updateableFields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });

    return Author
        .update(toUpdate, {
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(204).end())
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.get('/:id/posts', (req, res) => Post.findAll({
    where: {
        author_id: req.params.id
    }
})
.then(posts => res.json({
    posts: posts.map(post => post.apiRepr())
}))
);

router.get('/:id/comments', (req, res) => Comment.findAll({
    where: {
        author_id: req.params.id
    }
})
.then(comments => res.json({
    comments: comments.map(comment => comment.apiRepr())
}))
);

module.exports = router;