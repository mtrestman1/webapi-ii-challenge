const express = require('express');

const Posts = require('../db');

const router = express.Router();

router.post('/', (req, res) => {
const { title, contents } = req.body;

if(!title || !contents) {
    return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
} else {
    return Posts.insert(req.body)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
    
}
})

router.get('/', (req, res) => {
    return Posts.find()
    .then(posts => {
        res.status(201).json(posts);
    })
    .catch(error => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {
        return Posts.findById(id)
        .then(posts => {
            res.status(201).json(posts)
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {
        return Posts.remove(id)
        .then(deleted => {
            res.status(204).end();
        })
        .catch(error => {
            res.status(500).json({ error: "The post could not be removed" })
        })
    }
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    if(!id) {
        return res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else if (!title || !contents) {
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        return Posts.update(id, {title, contents})
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be modified." })
        })
    }
})




module.exports = router;