'use strict';

const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = app => {
  const {
    existOrError,
    validEmailOrError,
    notExistOrError,
  } = app.src.config.validation;

  const store = async (req, res) => {
    const { email } = req.body;

    try {
      existOrError(email, 'Digite seu email');
      validEmailOrError(email, 'Email inválido');
      const userFromDB = await User.findOne({ email });
      notExistOrError(userFromDB, 'Esse Email já está registrado');
    } catch (msg) {
      return res.status(400).json(msg);
    }

    const user = await User.create({ email });

    return res.status(200).json(user);
  };

  return {
    store,
  };
};
