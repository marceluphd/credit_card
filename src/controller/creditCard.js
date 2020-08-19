'use strict';

const mongoose = require('mongoose');

const CreditCard = mongoose.model('CreditCard');

module.exports = app => {
  const { existOrError } = app.src.config.validation;

  const index = async (req, res) => {
    const { _id: owner } = req.user;

    const creditCards = await CreditCard.find({ owner })
      .populate('owner')
      .populate('transactionHistory');

    return res.status(200).json(creditCards);
  };

  const show = async (req, res) => {
    const { id: _id } = req.params;

    const creditCard = await CreditCard.findOne({ _id })
      .populate('owner')
      .populate('transactionHistory');

    if (!creditCard) {
      return res.status(404).json('Cartão de crédito não encontrado');
    }

    return res.status(200).json(creditCard);
  };

  const store = async (req, res) => {
    const { number, cvv, validation, name } = req.body;
    const { _id: owner } = req.user;

    try {
      existOrError(number, 'Digite o número do cartão de crédito');
      existOrError(cvv, 'Digite o CVV do cartão de crédito');
      existOrError(validation, 'Digite a validade do cartão de crédito');
      existOrError(name, 'Digite o nome do titular do cartão de crédito');
    } catch (msg) {
      return res.status(400).json(msg);
    }

    const creditCard = await CreditCard.create({
      number,
      cvv,
      validation,
      name,
      status: 'active',
      owner,
    });

    return res.status(200).json(creditCard);
  };

  const update = async (req, res) => {
    const { id: _id } = req.params;
    const { number, cvv, validation, name, status } = req.body;

    try {
      existOrError(number, 'Digite o número do cartão de crédito');
      existOrError(cvv, 'Digite o CVV do cartão de crédito');
      existOrError(validation, 'Digite a validade do cartão de crédito');
      existOrError(name, 'Digite o nome do titular do cartão de crédito');
      existOrError(status, 'Digite o status do cartão de crédito');
    } catch (msg) {
      return res.status(400).json(msg);
    }

    await CreditCard.findOneAndUpdate(
      {
        _id,
      },
      {
        number,
        cvv,
        validation,
        name,
        status,
      }
    );

    const creditCard = await CreditCard.findOne({ _id })
      .populate('owner')
      .populate('transactionHistory');

    if (!creditCard) {
      return res.status(404).json('Cartão de crédito não encontrado');
    }

    return res.status(200).json(creditCard);
  };

  const remove = async (req, res) => {
    const { id: _id } = req.params;

    await CreditCard.findOneAndRemove({ _id });

    return res.status(200).end();
  };

  return {
    index,
    show,
    store,
    update,
    remove,
  };
};
