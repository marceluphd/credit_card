const mongoose = require('mongoose');

const CreditCardSchema = new mongoose.Schema(
  {
    number: { type: String, required: true },
    cvv: { type: String, required: true },
    name: { type: String, required: true },
    validation: { type: String, required: true },
    status: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    transactionHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],
  },
  {
    timestamps: true,
  }
);

mongoose.model('CreditCard', CreditCardSchema);
