const { User, Thought } = require('../models/index');

const userController = {

    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                path: 'friends',
                select: '-__v'
            })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                return res.status(400);
            });
    },

    // get single user by _id
    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID!' });
                    return;
                }
                return res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                return res.status(400);
            });
    },

    // create new user
    createUser(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData))

    },

    // update user by _id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(400).json({ message: 'No user found with this ID' });
                    return;
                }

                return res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // delete user by _id
    deleteUser(req, res) {
        User.findOneAndDelete(
            {
                _id: req.params.id
            })
            .then(dbUserData => {
                Thought.deleteMany(
                    {
                        _id: {
                            $in: userData.thoughts
                        }
                    }
                ).then(dbThoughtData => {
                    res.json(dbThoughtData);
                })
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // add friends
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userID },
            {
                $addToSet: {
                    friends: {
                        _id: req.params.friendID
                    }
                }
            },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // delete friends
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userID },
            {
                $pull: {
                    friends: req.params.friendID
                }
            }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    }
};
module.exports = userController;