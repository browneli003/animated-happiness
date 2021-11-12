
const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// set up GET all thoughts at /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(addThought)

// set up GET single, PUT, and DELETE thought at /api/thoughts/:userId/:thoughtId
router.route('/:userId/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

// set up POST reaction at /api/thoughts/:userId/:thoughtId/reaction
router.route('/:thoughtId/reactions/')
    .post(addReaction)

// set up POST reaction at /api/thoughts/:userId/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)

module.exports = router;