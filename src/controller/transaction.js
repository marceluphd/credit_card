'use strict';

const mongoose = require('mongoose');

const CreditCard = mongoose.model('CreditCard');
const Transaction = mongoose.model('Transaction');

module.exports = app => {
  const { existOrError } = app.src.config.validation;

  const index = async (req, res) => {
    const { id: _id } = req.params;

    const transactions = await CreditCard.findOne({ _id }).populate(
      'transactionHistory'
    );

    return res.status(200).json(transactions.transactionHistory);
  };

  const show = async (req, res) => {
    const { id: _id } = req.params;

    const transaction = await Transaction.findOne({ _id });

    if (!transaction) {
      return res.status(404).json('Transação não encontrada');
    }

    return res.status(200).json(transaction);
  };

  const store = async (req, res) => {
    const { amount, currency } = req.body;
    const { id: _id } = req.params;

    try {
      existOrError(amount, 'Digite o valor da transação');
      existOrError(currency, 'Digite a moeda utilizada na transação');
    } catch (msg) {
      return res.status(400).json(msg);
    }

    const creditCard = await CreditCard.findOne({ _id });

    if (!creditCard) {
      return res.status(404).json('Cartão de crédito não encontrado');
    }

    const transaction = await Transaction.create({
      amount,
      currency,
      status: 'paid',
    });

    creditCard.transactionHistory.push(transaction._id);

    await creditCard.save();

    return res.status(200).json(transaction);
  };

  const update = async (req, res) => {
    const { id: _id } = req.params;
    const { amount, currency, status } = req.body;

    try {
      existOrError(amount, 'Digite o valor da transação');
      existOrError(currency, 'Digite a moeda utilizada na transação');
      existOrError(status, 'Digite o status da transação');
    } catch (msg) {
      return res.status(400).json(msg);
    }

    await Transaction.findOneAndUpdate(
      {
        _id,
      },
      {
        amount,
        currency,
        status,
      }
    );

    const transaction = await Transaction.findOne({ _id });

    if (!transaction) {
      return res.status(404).json('Transação não encontrada');
    }

    return res.status(200).json(transaction);
  };

  const remove = async (req, res) => {
    const { id: _id } = req.params;

    await Transaction.findOneAndRemove({ _id });

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
