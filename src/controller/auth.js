'use strict';

const mongoose = require('mongoose');

const User = mongoose.model('User');
const jwt = require('jwt-simple');

module.exports = app => {
  const { existOrError, validEmailOrError } = app.src.config.validation;

  const store = async (req, res) => {
    const { email } = req.body;

    try {
      existOrError(email, 'Digite seu email');
      validEmailOrError(email, 'Email inválido');
    } catch (msg) {
      return res.status(400).json(msg);
    }

    const user = await User.findOne({ email });

    if (!user) return res.status(401).json('Email inválido');

    const now = Math.floor(Date.now() / 1000);

    const payload = {
      id: user._id,
      iat: now,
      exp: now + 60 * 60 * 24,
    };

    return res.status(200).json({
      token: jwt.encode(payload, process.env.AUTH_SECRET),
    });
  };

  return {
    store,
  };
};
