const { Thought, User } = require('../models');

const thoughtController = {

    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                return res.status(400);
            });
    },

    // get single thought by _id
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // create new thought
    addThought(req, res) {
        Thought.create(req.body)
        .then(({ _id }) => 
            User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { thoughts: _id } },
                { new: true }
            )
        )
        .then(dbuserData => {
            res.json(dbuserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // update thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this ID' });
                return;
            }

            res.json(dbthoughtData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // delete thought by _id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
        .then(dbThoughtData => {
            User.findOneAndDelete(
                { username: thoughtData.username },
                { $pull: { thoughts: { _id: req.params.id }}}
            )
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // post reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID!' });
                    return;
                }
                return res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No reaction found with that ID!' });
                    return;
                }
                return res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;