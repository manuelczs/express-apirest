const mongoose = require('mongoose');
const User = require('../models/user');

const signUp = (req, res) => {
  const { email, displayName } = req.body;
  const user = new User({
    email,
    displayName,
  });

  user.save((err) => {
    if (err) res.status(500).send({ message: 'There was an error: ' + err });
    return res.status(200).send({ token: })
  });
};

const signIn = (req, res) => {};

module.exports = { signIn, signUp };
