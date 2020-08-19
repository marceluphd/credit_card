'use strict';

const validator = require('email-validator');
const PasswordValidator = require('password-validator');

module.exports = app => {
  function existOrError(value, msg) {
    if (!value) throw msg;
    if (Array.isArray(value) && value.length === 0) throw msg;
    if (typeof value === 'string' && !value.trim()) throw msg;
  }

  function notExistOrError(value, msg) {
    try {
      existOrError(value, msg);
    } catch (msg) {
      return;
    }
    throw msg;
  }

  function notSpaceOrError(value, msg) {
    const schema = new PasswordValidator();
    if (
      schema
        .has()
        .spaces()
        .validate(value)
    )
      throw msg;
  }

  function validEmailOrError(value, msg) {
    if (!validator.validate(value)) throw msg;
  }

  function notSpecialOrError(value, msg) {
    const schema = new PasswordValidator();
    if (
      schema
        .has()
        .symbols()
        .validate(value)
    )
      throw msg;
  }

  return {
    existOrError,
    notExistOrError,
    notSpaceOrError,
    validEmailOrError,
    notSpecialOrError,
  };
};
