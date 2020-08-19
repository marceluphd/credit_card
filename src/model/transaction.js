const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

mongoose.model('Transaction', TransactionSchema);
